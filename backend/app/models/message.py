from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func


class Message(db.Model):
    '''
    Relationships:
        Message belongs to User and Room
    '''
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    # recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    room_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('rooms.id')))
    message = db.Column(db.Text)
    time_sent = db.Column(db.DateTime(timezone=True),
                          server_default=func.now())

    # sender = db.relationship("User", foreign_keys=[
    #                          sender_id], back_populates='recipients')
    # recipient = db.relationship(
    #     "User", foreign_keys=[recipient_id], back_populates='senders')
    user = db.relationship("User", back_populates="messages")
    room = db.relationship("Room", back_populates="messages")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'room_id': self.room_id,
            'message': self.message,
            'time_sent': self.time_sent
        }
