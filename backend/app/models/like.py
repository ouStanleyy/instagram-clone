from .db import db, environment, SCHEMA, add_prefix_for_prod


class Like(db.Model):
    '''
    Relationships:
        Like belongs to User, Post
    '''
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id', ondelete="CASCADE"))

    user = db.relationship("User", back_populates='likes')
    post = db.relationship("Post", back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id
        }
