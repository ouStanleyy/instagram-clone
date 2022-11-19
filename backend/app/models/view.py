from .db import db, environment, SCHEMA, add_prefix_for_prod


class View(db.Model):
    '''
    Relationships:
        View belongs to User, Post
    '''
    __tablename__ = 'views'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    user = db.relationship("User", back_populates='views')
    post = db.relationship("Post", back_populates='views')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id
        }
