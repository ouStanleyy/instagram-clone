from .db import db, environment, SCHEMA, add_prefix_for_prod


class Follow(db.Model):
    '''
    Relationships:
        Follow belongs to User
    '''
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    following_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    is_pending = db.Column(db.Boolean, nullable=False, default=False)

    follower = db.relationship("User", foreign_keys=[follower_id], back_populates='followers')
    following = db.relationship("User", foreign_keys=[following_id], back_populates='followings')

    def to_dict(self):
        return {
            'id': self.id,
            'follower_id': self.follower_id,
            'following_id': self.following_id,
            'is_pending': self.is_pending
        }
