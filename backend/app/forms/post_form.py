from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError


class PostForm(FlaskForm):
    """
      1. Add photo
      2. Caption, Location, Alt Text, Hide likes/Hide views, Turn Off Comments
    """
    pass
