from flask_wtf import FlaskForm
from wtforms import StringField, FieldList, BooleanField, Form, FormField
from wtforms.validators import DataRequired, Length, ValidationError


def story_post_disable_likes_comments(form, field):
    """
      If post is a story:
        - Disable show like counts
        - Disable allow comments
    """
    is_story = form.data["is_story"]

    if is_story and field.data == True:
        raise ValidationError(f'Story must disable {field.name}')


def story_post_disable_captions(form, field):
    """
      If post is a story:
        - Disable captions
    """
    is_story = form.data["is_story"]

    if is_story and len(field.data) > 0:
        raise ValidationError("Story must disable Captions")


class MediaForm(Form):
    url = StringField("media url")


class PostForm(FlaskForm):
    """
    User Side:
      1. Add photo
      2. Caption, Location, Alt Text, Hide likes/Hide views, Turn Off Comments

    Backend Handle:
      1. Build media field list [list of media urls]
      2. Create the post first
      3. Iterate through the media:
          1. Create media in db
          2. Append to post
    """
    media = FieldList(FormField(MediaForm), min_entries=1,
                      max_entries=10, validators=[DataRequired()])
    caption = StringField('Write a caption...', validators=[
        Length(max=2200), story_post_disable_captions])
    show_like_count = BooleanField(
        "Show Likes/Views", default=True, validators=[story_post_disable_likes_comments])
    allow_comments = BooleanField("Allow Comments", default=True, validators=[
        story_post_disable_likes_comments])
    is_story = BooleanField("Story", default=False)
