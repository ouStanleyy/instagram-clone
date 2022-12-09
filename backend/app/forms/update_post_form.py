from flask_wtf import FlaskForm
from wtforms import StringField, FieldList, BooleanField, Form, FormField
from wtforms.validators import DataRequired, Length, ValidationError


class PostUpdateForm(FlaskForm):
    """
      Update Post
        - Only allow caption, hide like count, turn off comments
    """

    caption = StringField(validators=[Length(
        max=2200, message="Caption must be less than 2200 characters")])
    show_like_count = BooleanField("Show Likes/Views")
    allow_comments = BooleanField("Allow Comments")
