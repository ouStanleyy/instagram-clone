from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Message, User, Room, db

room_routes = Blueprint('rooms', __name__)


@room_routes.route('/')
@login_required
def rooms():
    """
    Query for all rooms of the current user and returns them in a list of room dictionaries
    """
    return {'Rooms': [room.to_dict() for room in current_user.rooms]}


@room_routes.route('/', methods=['POST'])
@login_required
def create_room():
    """
    Creates a new room for current user and user specified by id
    """
    print(request.json)
    user = User.query.get_or_404(request.json['user_id'])
    room = Room()

    room.users.extend([current_user, user])

    db.session.add(room)
    db.session.commit()

    return room.to_dict()
