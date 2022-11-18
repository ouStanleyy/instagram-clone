from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Follow

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict_all() for user in users]}


@user_routes.route('/<int:user_id>')
@login_required
def user(user_id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get_or_404(user_id).to_dict_user_id()

    if (not user_id == current_user.id
        and user['is_private']
        and not Follow.query.filter_by(follower_id=current_user.id, following_id=user_id, is_pending=False).first()):
        user.pop('posts')

    return user
