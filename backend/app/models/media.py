from .db import db, environment, SCHEMA, add_prefix_for_prod


class Media(db.Model):
    '''
    Relationships:
        Like belongs to User, Post
    '''
    __tablename__ = 'media'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
    url = db.Column(db.String, nullable=False)

    post = db.relationship("Post", back_populates='media')

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'url': self.url
        }
