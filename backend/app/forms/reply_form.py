from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField


class ReplyForm(FlaskForm):
    reply = StringField("reply")
    submit = SubmitField("submit")

