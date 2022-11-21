from flask import Blueprint, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Comment, Post, Reply, db
from app.forms import CommentForm, ReplyForm
from .post_routes import authorized_follower
from .auth_routes import validation_errors_to_error_messages


comment_routes = Blueprint("comments", __name__)


@comment_routes.route("/<int:comment_id>", methods=["PUT"])
@login_required
def edit_comment(comment_id):
    """
    Query for a comment by id and update it

    Validations:
        - Comment must belong to current user

    Use: edit a comment by comment owner
    """

    comment = Comment.query.get_or_404(comment_id)

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if comment.user_id == current_user.id:
            comment.comment = form.data["comment"]
            db.session.commit()
            return comment.to_dict()
        return redirect(url_for("auth.unauthorized"))


@comment_routes.route("/<int:comment_id>", methods=["DELETE"])
@login_required
def delete_comment(comment_id):
    """
    Query for a comment by id

    Validations:
        - Comment must belong to current user OR Post belongs to Current User

    Use: delete the comment by comment owner or post owner
    """
    comment = Comment.query.get_or_404(comment_id)
    owner_id = comment.post.user.id

    if comment.user_id == current_user.id or owner_id == current_user.id:
        db.session.delete(comment)
        db.session.commit()
        return "Successfully deleted"
    return redirect("../auth/unauthorized")


@comment_routes.route("/<int:comment_id>/replies", methods=["POST"])
@login_required
@authorized_follower
def add_reply(comment_id):
    """
    Query for a comment by id

    Validations:
        - Post must belong to Public User or Following

    Creates a reply on the comment
    """
    comment = Comment.query.get_or_404(comment_id)

    form = ReplyForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        reply = Reply(
            user_id=current_user.id,
            comment_id=comment.id,
            reply=form.data["reply"]
        )
        db.session.add(reply)
        db.session.commit()
        return reply.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route("/<int:comment_id>/replies", methods=["GET"])
@login_required
@authorized_follower
def get_replies(comment_id):
    """
    Query for all replies of a comment
    """
    comment = Comment.query.get_or_404(comment_id)
    replies = comment.replies
    return {"Replies": [reply.to_dict() for reply in replies]}
