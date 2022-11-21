from flask import Blueprint, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Reply, Comment,Post, db
from app.forms import ReplyForm

reply_routes = Blueprint("replies", __name__)


@reply_routes.route("/<int:reply_id>", methods=["PUT"])
@login_required
def edit_reply(reply_id):
    """
    Query for a reply by id and return it

    Use: edit the reply by reply owner
    """
    reply = Reply.query.get_or_404(reply_id)
    form = ReplyForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if reply.user_id == current_user.id:
            reply.reply = form.data["reply"]
            db.session.commit()
            return reply.to_dict()
        return redirect(url_for("auth.unauthorized"))


@reply_routes.route("/<int:reply_id>", methods=["DELETE"])
@login_required
def delete_reply(reply_id):
    """
    Query for a reply by id

    Use: delete the reply by reply owner or post owner
    """
    reply = Reply.query.get_or_404(reply_id)
    owner_id = reply.comment.post.user_id
    if reply.user_id == current_user.id or owner_id == current_user.id:
        db.session.delete(reply)
        db.session.commit()
        return "Reply successfully deleted"
    return redirect(url_for("auth.unauthorized"))