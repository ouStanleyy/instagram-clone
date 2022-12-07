from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
from sqlalchemy import func
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(func.lower(User.email) ==
                             func.lower(email)).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(func.lower(User.username)
                             == func.lower(username)).first()
    if user:
        raise ValidationError('Username is already in use.')


def username_no_space(form, field):
    username = field.data
    if any(not char.isalnum() for char in username.replace("_", "")):
        raise ValidationError(
            "Special characters aren't allowed here. You can only use letters, periods, numbers, or underscores")


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_no_space, Length(min=5, max=30, message="Username must be between 5-30 characters"), username_exists])
    email = StringField('email', validators=[
                        DataRequired(), Email(), user_exists])
    full_name = StringField("full_name", validators=[DataRequired(), Length(
        max=30, message="Fullname may not be longer than 30 characters"), ])
    password = StringField('password', validators=[DataRequired(), Length(
        min=6, max=15, message="Password must be between 6-15 characters long")])
