from flask import Blueprint, jsonify, session, request, redirect
from flask_login import login_required, current_user
from app.models import Post, Media, User, Follow, db

post_routes = Blueprint("posts", __name__)


@post_routes.route("/", methods=["GET"])
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


@post_routes.route("/following", methods=["GET"])
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


def authorized_follower(cb):
    def wrapper(post_id):
        post = Post.query.get(post_id)
        is_owner = post.user_id == current_user.id

        if not is_owner:
            follow = Follow.query.filter_by(
                follower_id=current_user.id, following_id=post.user_id, is_pending=False).first()
            if not follow:
                return redirect("../auth/unauthorized")
        return cb(post_id)
    return wrapper


@post_routes.route("/<int:post_id>", methods=["GET"])
@login_required
@authorized_follower
def post_detail(post_id):
    """
    Query for a post and return that post in a dictionary

    Use: post detail page
    """
    post = Post.query.get(post_id)
    return post.to_dict_detail()
