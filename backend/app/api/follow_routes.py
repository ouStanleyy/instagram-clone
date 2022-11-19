from flask import Blueprint, redirect
from flask_login import login_required, current_user
from app.models import Follow, db


follow_routes = Blueprint("follows", __name__)

@follow_routes.route("/<int:follow_id>", methods=["PUT"])
@login_required
def accept_follow(follow_id):
    """
    Accepts a follow request

    Request must be for current user
    """
    follow = Follow.query.filter_by(follower_id=follow_id,
                                    following_id=current_user.id,
                                    is_pending=True).first_or_404()
    follow.is_pending = False
    db.session.commit()
    return follow.to_dict()


@follow_routes.route("/<int:follow_id>", methods=["DELETE"])
@login_required
def delete_follow(follow_id):
    """
    Undo pending request or unfollow

    Reject request or remove follower
    """
    follow = Follow.query.get_or_404(follow_id)
    if current_user.id == follow.follower_id or current_user.id == follow.following_id:
        db.session.delete(follow)
        db.session.commit()
        return "Successfully deleted"
    return redirect("../auth/unauthorized")

