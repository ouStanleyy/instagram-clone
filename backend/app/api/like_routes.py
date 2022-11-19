from flask import Blueprint, request, redirect
from app.models import Like, Post
from flask_login import current_user, login_user, login_required

like_routes = Blueprint("likes", __name__, url_prefix="/likes")


@like_routes.route("/")
@login_required
def test(post_id):
    """
      Query for all likes of a post

      Validations:
        - Always show likes if current user owns the post
        - Likes are only for non-stories
    """
    post = Post.query.get_or_404(post_id)
    is_owner = post.user_id == current_user.id

    if is_owner or not post.is_story:
        return {"Likes": [like.to_dict() for like in post.likes]}
    return redirect("../auth/unauthorized")


@like_routes.route("/", methods=["POST"])
@login_required
def like(post_id):
    """
      Query for a post and create a like

      Validations:
        - Current User can like their own post
        - Post must belong to a public user or Current User is a follower
    """

    post = Post.query.get_or_404(post_id)
