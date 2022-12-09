from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Message, User, Follow, Comment, db


message_routes = Blueprint("messages", __name__)


@message_routes.route("/")
@login_required
def messages():
    """
      Query for all the messages of current user
    """

    messages = Message.query.filter(
        (Message.sender_id == current_user.id) | (Message.recipient_id == current_user.id)).order_by(Message.time_sent).all()

    return {"Messages": [message.to_dict() for message in messages], "preview_message": messages[-1].to_dict()}


# @message_routes.route("/")
# @login_required
# def messages():
#     """
#       Query for all the messages of current user
#     """

#     messages = Message.query.filter(
#         (Message.sender_id == current_user.id) | (Message.recipient_id == current_user.id)).all()

#     return {"Messages": [message.to_dict() for message in messages]}
