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
    username = db.Column(db.String(30), nullable=False, unique=True)
    full_name = db.Column(db.String)
    bio = db.Column(db.String(150))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String)
    phone_number = db.Column(db.String(10), unique=True)
    gender = db.Column(db.Enum("Male", "Female", "Non-binary", "Prefer not to say",
                       name='gender'), nullable=False, default="Prefer not to say")
    is_verified = db.Column(db.Boolean, nullable=False, default=False)
    is_private = db.Column(db.Boolean, nullable=False, default=False)

    posts = db.relationship("Post", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    replies = db.relationship("Reply", back_populates="user", cascade="all, delete-orphan")
    likes = db.relationship("Like", back_populates="user", cascade="all, delete-orphan")
    views = db.relationship("View", back_populates="user", cascade="all, delete-orphan")
    followers = db.relationship("Follow", foreign_keys="Follow.following_id", back_populates="following", cascade="all, delete-orphan")
    followings = db.relationship("Follow", foreign_keys="Follow.follower_id", back_populates="follower", cascade="all, delete-orphan")
    # senders = db.relationship("Message", foreign_keys="Message.recipient_id", back_populates="recipient", cascade="all, delete-orphan")
    # recipients = db.relationship("Message", foreign_keys="Message.sender_id", back_populates="sender", cascade="all, delete-orphan")
    rooms = db.relationship("Room", secondary="room_user", back_populates="users")
    messages = db.relationship("Message", back_populates="user", cascade="all, delete-orphan")

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
            'full_name': self.full_name,
            'bio': self.bio,
            'phone_number': self.phone_number,
            'profile_picture': self.profile_picture,
            'gender': self.gender,
            'is_verified': self.is_verified,
            'is_private': self.is_private
        }

    def to_dict_all(self):
        return {
            'id': self.id,
            'username': self.username,
            'full_name': self.full_name,
            'profile_picture': self.profile_picture,
            'is_verified': self.is_verified
        }

    def to_dict_user_id(self):
        return {
            'id': self.id,
            'username': self.username,
            'full_name': self.full_name,
            'bio': self.bio,
            'num_of_followers': len([follower for follower in self.followers if not follower.is_pending]),
            'num_of_followings': len([following for following in self.followings if not following.is_pending]),
            'profile_picture': self.profile_picture,
            'is_verified': self.is_verified,
            'is_private': self.is_private,
            'num_of_posts': len([post for post in self.posts if not post.is_story]),
            'posts': [post.to_dict_user_details() for post in self.posts]
        }
