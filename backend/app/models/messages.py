from .db import db, environment, SCHEMA, add_prefix_for_prod


class Message(db.Model):
    '''
    Relationships:
        Message belongs to User
    '''
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    recipient_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    message = db.Column(db.Text(1000))

    sender = db.relationship("User", back_populates='senders')
    recipient = db.relationship("User", back_populates='recipients')

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'message': self.message
        }
