from flask import Blueprint, jsonify, session, request, redirect
from flask_login import login_required, current_user
from app.models import Post, Media, User, Follow, db
from app.forms import PostForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime, timedelta

post_routes = Blueprint("posts", __name__)


def authorized_follower(cb):
    """
    Check's if:
        - Post belongs to a Public User or
        - Current user is a follower or
        - Post belongs to current user

        OPTIMIZE THIS
    """
    def wrapper(post_id):
        post = Post.query.get_or_404(post_id)
        owner = User.query.get(post.user_id)
        is_owner = owner.id == current_user.id

        if not is_owner and owner.is_private:
            follow = Follow.query.filter_by(
                follower_id=current_user.id, following_id=post.user_id, is_pending=False).first()
            if not follow:
                return redirect("../auth/unauthorized")
        return cb(post_id)
    return wrapper


@post_routes.route("/")
@login_required
def posts():
    """
    Query for all posts and their media and returns them in a list of post dictionaries

    Filter: Not Current User's Post, Not Stories, Not Private User's Post

    Use: discovery page
    """

    posts = Post.query.filter(Post.user.has(
        User.is_private == False), Post.user_id != current_user.id, Post.is_story == False).order_by(Post.id.desc()).all()

    return {"Posts": [post.to_dict_discovery() for post in posts]}


@post_routes.route("/<int:post_id>")
@login_required
@authorized_follower
def post_detail(post_id):
    """
    Query for a post and return that post in a dictionary

    Use: post detail page
    """
    post = Post.query.get_or_404(post_id)
    return post.to_dict_detail()


@post_routes.route("/following")
@login_required
def posts_feed():
    """
    Query for all posts of the current user's following

    Filter: Only posts from Current User's following, Not Stories

    Use: feed page
    """
    # Get the current user's following
    followings = Follow.query.filter_by(follower_id=current_user.id).all()

    # Get the posts that are not stories from followings
    posts = [Post.query.filter_by(
        user_id=following.following_id, is_story=False).all() for following in followings]

    return {"Posts": [post.to_dict_feed() for sub_post in posts for post in sub_post]}


@post_routes.route("/", methods=["POST"])
@login_required
def create_post():
    """
    Creates a post from form and returns post details
    Sets a 24 hour expiration if story

    Use: Make post
    """
    # ADD MEDIA TO FORM
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
        db.session.add(post)
        db.session.commit()
        # AFTER COMMIT, YOU CAN ACCESS NEWLY CREATED POST.ID
        # CREATE MEDIA HERE?
        return {"message": "Post created successfully"}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route("/<int:post_id>", methods=["PUT"])
@login_required
def edit_post(post_id):
    """
    Query for a post (not story) by id, update the post

    FrontEnd: Uses the same form as create a post, but disables image uploads and is_story toggle

    Use: Edit post
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
    return redirect("../auth/unauthorized")
