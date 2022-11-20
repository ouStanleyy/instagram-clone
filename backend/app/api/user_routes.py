from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import User, Follow, db
from app.forms import UpdateProfileForm
from sqlalchemy import or_
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


@user_routes.route('/profile', methods=['PUT'])
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


@user_routes.route('/profile', methods=['DELETE'])
@login_required
def delete_user_profile():
    """
    Delete current user's profile permanently
    """
    db.session.delete(current_user)
    db.session.commit()
    return {'message': 'Successfully deleted'}


@user_routes.route('/<int:user_id>/follows')
@login_required
def follows_of_user(user_id):
    """
    Query for all follows of the specified user by id and returns them in a list of follow dictionaries
    """
    user = User.query.get_or_404(user_id)
    follows = Follow.query.filter(or_(Follow.follower_id==user_id, Follow.following_id==user_id)).all()

    if user_id == current_user.id:
        return {'Follows': [follow.to_dict() for follow in follows]}

    if (not user.is_private or current_user.id in (follow.follower_id for follow in follows)):
        return {'Follows': [follow.to_dict() for follow in follows if not follow.is_pending]}

    return redirect(url_for('auth.unauthorized'))


@user_routes.route('/<int:user_id>/follows', methods=['POST'])
@login_required
def follow_user(user_id):
    """
    Creates a new follow between current user and user specifed by id
    """
    if current_user.id == user_id:
        return {'message': 'User cannot follow self'}, 400

    user = User.query.get_or_404(user_id)

    for follower in user.followers:
        if current_user.id == follower.follower_id:
            return {'message': f'{"Request is already pending" if follower.is_pending else "User is already a follower" }'}, 400

    follow = Follow(follower_id=current_user.id, following_id=user.id, is_pending=user.is_private)

    db.session.add(follow)
    db.session.commit()

    return follow.to_dict()
