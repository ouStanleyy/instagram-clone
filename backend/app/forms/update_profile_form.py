from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Optional, StopValidation
from app.models import User
from flask_login import current_user


def email_exists(form, field):
    # Checking if user exists
    email = field.data
    if current_user.email != email:
        user = User.query.filter(User.email == email).first()
        if user:
            raise ValidationError('Email address is already in use')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    if current_user.username != username:
        user = User.query.filter(User.username == username).first()
        if user:
            raise ValidationError('Username is already in use')


def phone_number_proper_length(form, field):
    # Checking if phone number is exactly 0 or 10 digits
    if field.data and len(field.data) != 10:
        raise ValidationError('Invalid phone number')


def optional(form, field):
    # Checks if input is empty and stops the validation sequence
    if field.raw_data is None or not len(field.raw_data):
        raise StopValidation()


def validate_gender(form, field):
    # Checks if gender is one of the enumerable choices
    if field.data not in ["Male", "Female", "Non-binary", "Prefer not to say"]:
        raise ValidationError('Invalid gender choice')


class UpdateProfileForm(FlaskForm):
    username = StringField(
        'username', validators=[optional, DataRequired(), Length(max=30), username_exists])
    email = StringField('email', validators=[optional, DataRequired(), Email(), Length(max=255), email_exists])
    full_name = StringField("full_name")
    phone_number = StringField('phone_number', validators=[optional, Length(min=10, max=10)])
    gender = StringField('gender', validators=[optional, validate_gender])
    bio = StringField('bio', validators=[Length(max=150)])
    is_private = BooleanField('is_private')
    profile_picture = StringField('profile_picture')
