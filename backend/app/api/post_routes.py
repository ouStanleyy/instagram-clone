from flask import Blueprint, jsonify, session, request
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

    user_id = current_user.get_id()

    posts = Post.query.filter(Post.user.has(
        User.is_private == False), Post.user_id != user_id, Post.is_story == False).order_by(Post.id.desc()).all()

    return {"Posts": [post.to_dict_discovery() for post in posts]}


@post_routes.route("/following", methods=["GET"])
@login_required
def posts_feed():
    """
    Query for all posts of the current user's following

    Filter: Only posts from Current User's following, Not Stories

    User: feed page
    """
    # Get the current user's following
    user_id = current_user.get_id()
    followings = Follow.query.filter_by(follower_id=user_id).all()

    # Get the posts that are not stories from followings
    posts = [Post.query.filter_by(
        user_id=following.following_id, is_story=False).all() for following in followings]

    return {"Posts": [post.to_dict_feed() for sub_post in posts for post in sub_post]}
