from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func


class Post(db.Model):
    '''
    Relationships:
        Post has many Comments, Likes, Stories
    '''
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")))
    caption = db.Column(db.Text())
    is_story = db.Column(db.Boolean, nullable=False, default=False)
    show_like_count = db.Column(db.Boolean, nullable=False, default=True)
    allow_comments = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    expires_at = db.Column(db.DateTime)

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship(
        "Comment", back_populates="post", cascade="all, delete-orphan")
    likes = db.relationship("Like", back_populates="post",
                            cascade="all, delete-orphan")
    views = db.relationship("View", back_populates="post",
                            cascade="all, delete-orphan")
    media = db.relationship("Media", back_populates="post",
                            cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'caption': self.caption,
            'is_story': self.is_story,
            'show_like_count': self.show_like_count,
            'allow_comments': self.allow_comments,
            'created_at': self.created_at
        }

    def to_dict_discovery(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'preview_media': self.media[0].url,
            'num_of_media': len(self.media)
        }

    def to_dict_feed(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'caption': self.caption,
            'is_story': self.is_story,
            'show_like_count': self.show_like_count,
            'allow_comments': self.allow_comments,
            'created_at': self.created_at,
            'num_of_comments': len(self.comments),
            'media': [media.to_dict() for media in self.media],
            'likes': [like.to_dict() for like in self.likes],
            'user': self.user.to_dict(),
            'comments': [comment.to_dict() for comment in self.comments]
        }

    def to_dict_story(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'is_story': self.is_story,
            'created_at': self.created_at,
            'media': [media.to_dict() for media in self.media],
            'user': self.user.to_dict()
        }

    def to_dict_detail(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'caption': self.caption,
            'is_story': self.is_story,
            'show_like_count': self.show_like_count,
            'allow_comments': self.allow_comments,
            'created_at': self.created_at,
            'media': [media.to_dict() for media in self.media],
            'likes': [like.to_dict() for like in self.likes],
            'comments': [comment.to_dict() for comment in self.comments],
            'user': self.user.to_dict()
        }

    def to_dict_user_details(self):
        return {
            'id': self.id,
            'num_of_likes': len(self.likes),
            'num_of_comments': len(self.comments),
            'preview_media': self.media[0].url,
            'num_of_media': len(self.media),
            'is_story': self.is_story
        }
