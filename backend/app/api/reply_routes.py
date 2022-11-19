from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import Reply, Comment, db
from app.forms import ReplyForm

reply_routes = Blueprint("replies", __name__)


@reply_routes.route("/<int:reply_id>", methods=["PUT"])
@login_required
def edit_reply(reply_id):
    """
    Query for a reply by id and return it

    Use: edit the reply by reply owner
    """
    form = ReplyForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        reply = Reply.query.get_or_404(reply_id)
        if reply.user_id == current_user.id:
            reply.reply = form.data["reply"]
            db.session.commit()
            return reply.to_dict()
        return redirect("../auth/unauthorized")
