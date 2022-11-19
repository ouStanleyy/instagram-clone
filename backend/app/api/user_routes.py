from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Follow, db
from app.forms import UpdateProfileForm
from .auth_routes import validation_errors_to_error_messages

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

@user_routes.route('/profile', methods=["PUT"])
@login_required
def update_user_profile():
    """
    Update current user's profile with provided data
    """
    form = UpdateProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        for key, val in form.data.items():
            if val:
                setattr(current_user, key, val)
        db.session.commit()
        return current_user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
