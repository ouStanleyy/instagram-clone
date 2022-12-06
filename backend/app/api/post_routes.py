from flask import Blueprint, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Post, Media, User, Follow, Comment, db
from app.forms import PostForm, CommentForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime, timedelta
from ..aws import get_unique_filename, allowed_file, upload_file_to_s3

post_routes = Blueprint("posts", __name__)


def authorized_follower(cb):
    """
    Check's if:
        - Post belongs to a Public User or
        - Current user is a follower or
        - Post belongs to current user

        OPTIMIZE THIS
    """
    def wrapper(*args, **kwargs):

        post_id = kwargs.get("post_id")
        if "comment_id" in kwargs:
            comment = Comment.query.get_or_404(kwargs["comment_id"])
            post_id = comment.post_id

        post = Post.query.get_or_404(post_id)
        owner = User.query.get_or_404(post.user_id)
        is_owner = owner.id == current_user.id

        if not is_owner and owner.is_private and not post.is_story:
            follow = Follow.query.filter_by(
                follower_id=current_user.id, following_id=post.user_id, is_pending=False).first()
            if not follow:
                return redirect(url_for("auth.unauthorized"))

        return cb(kwargs.get("post_id") or kwargs.get("comment_id"))
    wrapper.__name__ = cb.__name__
    return wrapper


@post_routes.route("/")
@login_required
def posts():
    """
    Query for all posts and their media and returns them in a list of post dictionaries

    Validations:
        - Exclude: Current User's Post, Stories, Current Followings, and Private User Posts

    Use: explore page
    """

    posts = Post.query.filter(Post.user.has(User.is_private == False),
                              Post.user_id != current_user.id,
                              Post.is_story == False).order_by(Post.id.desc()).all()

    return {"Posts": [post.to_dict_discovery()
                      for post in posts
                      if post.user_id not in
                      [following.following_id for following in current_user.followings if not following.is_pending]]}


@post_routes.route("/<int:post_id>")
@login_required
@authorized_follower
def post_detail(post_id):
    """
    Query for a post and return that post in a dictionary

    Validations:
        - Post must belong to Public User or a Following

    Use: post detail page
    """
    # post = Post.query.get_or_404(post_id)
    # return post.to_dict_detail()
    post = Post.query.get_or_404(post_id).to_dict_detail()
    return post


@post_routes.route("/following")
@login_required
def posts_feed():
    """
    Query for all posts of the current user's following

    Filter: Only posts from Current User's following, Not Stories

    Use: feed page
    """
    page = request.args.get('page', 1, type=int)
    SIZE = 25 if page == 0 else 8

    posts = Post.query\
        .join(User, Post.user_id == User.id)\
        .join(Follow, Follow.following_id == User.id)\
        .filter(Follow.follower_id == current_user.id,
                Follow.is_pending == False, Post.is_story == False)\
        .paginate(page=page, per_page=SIZE)

    return {"Posts": [post.to_dict_feed() for post in posts.items]}

    # # Get the current user's following
    # followings = Follow.query.filter_by(
    #     follower_id=current_user.id, is_pending=False).all()

    # # Get the posts that are not stories from followings
    # posts = [Post.query.filter_by(
    #     user_id=following.following_id, is_story=False).all() for following in followings]

    # return {"Posts": [post.to_dict_feed() for sub_post in posts for post in sub_post]}


@post_routes.route("/following/stories")
@login_required
def stories_feed():
    """
    Query for all posts of the current user's following

    Filter: Only stories from Current User's following

    Use: story carousel
    """
    # Get the current user's following
    followings = Follow.query.filter_by(
        follower_id=current_user.id, is_pending=False).all()

    # Get the posts that are not stories from followings
    posts = [Post.query.filter_by(
        user_id=following.following_id, is_story=True).all() for following in followings]

    return {"Posts": [post.to_dict_story() for sub_post in posts for post in sub_post]}


@post_routes.route("/", methods=["POST"])
@login_required
def create_post():
    """
    Creates a post from form and Sets a 24 hour expiration if story

    Validations:
        - If story, can NOT set: caption, show_like_count, and allow_comments

    Why NOT to set Content type: https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
    """

    print("BEFORE", request.headers)

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post(
            user_id=current_user.id,
            caption=form.data['caption'],
            is_story=form.data['is_story'],
            expires_at=datetime.now() +
            timedelta(hours=24) if form.data['is_story'] else None,
            show_like_count=form.data['show_like_count'],
            allow_comments=form.data['allow_comments']
        )
        # IMAGE UPLOAD TO AWS
        if "images" not in request.files:
            return {"errors": "image required"}, 400
        medias = request.files.getlist('images')
        print("MEDIAS", medias)

        for media in medias:
            if not allowed_file(media.filename):
                return {"errors": "file type not permitted"}, 400
            media.filename = get_unique_filename(media.filename)
            upload = upload_file_to_s3(media)
            if "url" not in upload:
                return upload, 400
            url = upload['url']
            new_media = Media(url=url)
            post.media.append(new_media)
        # medias = [Media(url=obj["url"]) for obj in form.media.data]
        # for media in medias:
        #     post.media.append(media)

        db.session.add(post)
        db.session.commit()
        return {**post.to_dict(), "media": [media.to_dict() for media in post.media]}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route("/<int:post_id>", methods=["PUT"])
@login_required
def edit_post(post_id):
    """
    Query for a post (not story) by id, update the post

    Validations:
        - Can NOT edit: media and is_story
        - If post is story, can NOT edit caption

    FrontEnd: Uses the same form as create a post
    """

    post = Post.query.get_or_404(post_id)

    if post.user_id == current_user.id and not post.is_story:
        form = PostForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            post.caption = form.data['caption']
            post.show_like_count = form.data['show_like_count']
            post.allow_comments = form.data['allow_comments']
            db.session.commit()
            return {"message": "Succesfully updated"}
    return redirect(url_for("auth.unauthorized"))


@post_routes.route("/<int:post_id>", methods=["DELETE"])
@login_required
def delete_post(post_id):
    """
    Query for a post or story and deletes it

    Validations:
        - Current user must be the owner of the post
        - Post must exist
    """

    post = Post.query.get_or_404(post_id)

    if post.user_id == current_user.id:
        db.session.delete(post)
        db.session.commit()
        return {"message": "Successfully deleted"}
    return redirect("../auth/unauthorized")


@post_routes.route("/<int:post_id>/comments", methods=["GET"])
@login_required
@authorized_follower
def get_comments(post_id):
    """
    Query for all comments of a post

    Validations:
        - Post must belong to Public User or Following
    """
    post = Post.query.get_or_404(post_id)
    return {"Comments": [comment.to_dict() for comment in post.comments]}


@post_routes.route("/<int:post_id>/comments", methods=["POST"])
@login_required
@authorized_follower
def add_comment(post_id):
    """
    Query for a post by id

    Creates a comment on the post

    Validations:
        - Post must belong to Public User or Following
        - Post must have allow_comments = True
        - Post must is_story = False
    """
    form = CommentForm()
    post = Post.query.get_or_404(post_id)
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        if post.allow_comments and not post.is_story:
            comment = Comment(
                user_id=current_user.id,
                post_id=post.id,
                comment=form.data["comment"]
            )
            db.session.add(comment)
            db.session.commit()
            return comment.to_dict()
        return redirect(url_for("auth.unauthorized"))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
