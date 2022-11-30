from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    '''
    Relationships:
        Comment has many Replies
        Comment belongs to User, Post
    '''
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
    comment = db.Column(db.Text(2200))

    user = db.relationship("User", back_populates='comments')
    post = db.relationship("Post", back_populates='comments')
    replies = db.relationship("Reply", back_populates="comment", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'comment': self.comment,
            'user': self.user.to_dict_all()

        }
