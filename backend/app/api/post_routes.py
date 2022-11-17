from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Post, Media, User, db

post_routes = Blueprint("posts", __name__)


@post_routes.route("/", methods=["GET"])
# @login_required
def posts():
    """
    Query for all posts and their first media and returns them in a list of post dictionaries

    Use: discovery page
    """
    posts = Post.query.order_by(Post.id.desc()).all()
    return {'Posts': [post.to_dict_media() for post in posts]}
