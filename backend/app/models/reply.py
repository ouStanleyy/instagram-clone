from .db import db, environment, SCHEMA, add_prefix_for_prod


class Reply(db.Model):
    '''
    Relationships:
        Reply belongs to User, Comment
    '''
    __tablename__ = 'replies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')))
    reply = db.Column(db.Text(2200))

    user = db.relationship("User", back_populates='replies')
    comment = db.relationship("Comment", back_populates='replies')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'comment_id': self.comment_id,
            'reply': self.reply
        }
