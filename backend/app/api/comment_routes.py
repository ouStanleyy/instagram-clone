from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import Comment, db
from app.forms import CommentForm


comment_routes = Blueprint("comments", __name__)

@comment_routes.route("/<int:comment_id>", methods=["PUT"])
@login_required
def edit_comment(comment_id):
    """
    Query for a comment by id and return it

    Use: edit a comment by comment owner
    """
    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        comment = Comment.query.get(comment_id)
        if comment.user_id == current_user.id:
            comment.comment = form.data["comment"]
            db.session.commit()
            return comment.to_dict()
        return redirect("../auth/unauthorized")


