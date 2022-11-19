from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, Follow, db


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