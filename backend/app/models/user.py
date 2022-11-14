from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import enum


# class GenderType(enum.Enum):
#     MALE = "Male"
#     FEMALE = "Female"
#     NON_BINARY = "Non-binary"
#     NOT_PREFER = "Prefer not to say"


class User(db.Model, UserMixin):
    '''
    Relationships:
        User has many Comments, Likes, Replies, Posts, Stories
    '''
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(10), unique=True)
    gender = db.Column(db.Enum("Male", "Female", "Non-binary", "Prefer not to say"), nullable=False, default="Prefer not to say")
    is_verified = db.Column(db.Boolean, nullable=False, default=False)
    is_private = db.Column(db.Boolean, nullable=False, default=False)

    posts = db.relationship("Post", back_populates="user", cascade="all, delete-orphan", passive_deletes=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'phone_number': self.phone_number,
            'gender': self.gender,
            'is_verified': self.is_verified,
            'is_private': self.is_private
        }
