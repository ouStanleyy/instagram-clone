from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField


class CommentForm(FlaskForm):
    comment = StringField("comment")
    submit = SubmitField("submit")

