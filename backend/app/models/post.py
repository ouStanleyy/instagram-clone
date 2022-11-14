from .db import db, environment, SCHEMA, add_prefix_for_prod


class Post(db.Model):
    '''
    Relationships:
        Post has many Comments, Likes, Replies, Posts, Stories
    '''
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    caption = db.Column(db.Text(2200))

    user = db.relationship("User", back_populates='posts')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'caption': self.caption
        }
