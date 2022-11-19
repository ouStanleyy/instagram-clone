from flask import Blueprint, request, redirect
from app.models import db, Like, Post, Follow, User
from flask_login import current_user, login_user, login_required

like_routes = Blueprint("likes", __name__, url_prefix="/likes")


@like_routes.route("/")
@login_required
def get_likes(post_id):
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
        - Post can NOT be a story
        - Like can NOT already exist
    """

    post = Post.query.get_or_404(post_id)
    owner = User.query.get(post.user_id)
    like_exists = Like.query.filter_by(
        post_id=post_id, user_id=current_user.id).first()
    is_follower = Follow.query.filter_by(
        follower_id=current_user.id, following_id=post.user_id, is_pending=False).first()

    if (not owner.is_private or is_follower or owner.id == current_user.id) and not like_exists and not post.is_story:
        like = Like(
            post_id=post.id,
            user_id=current_user.id
        )
        db.session.add(like)
        db.session.commit()
        return {"message": "Successfully liked"}
    return redirect("../auth/unauthorized")


@like_routes.route("/", methods=["DELETE"])
@login_required
def unlike(post_id):
    """
      Query for the like and delete it

      Validations:
        - Like and Post must exist
        - Can only remove if like belongs to Current User
    """

    like = Like.query.filter_by(
        user_id=current_user.id, post_id=post_id).first_or_404()

    db.session.delete(like)
    db.session.commit()
    return {"message": "Successfully unliked"}
