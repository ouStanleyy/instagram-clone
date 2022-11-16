from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from .follows import seed_follows, undo_follows
from .replies import seed_replies, undo_replies
from .media import seed_media, undo_media
from .views import seed_views, undo_views
from .messages import seed_messages, undo_messages

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_posts()
        undo_comments()
        undo_likes()
        undo_follows()
        undo_replies()
        undo_media()
        undo_messages()
        undo_views()
        
    seed_users()
    seed_posts()
    seed_comments()
    seed_likes()
    seed_follows()
    seed_replies()
    seed_media()
    seed_messages()
    seed_views()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_posts()
    undo_comments()
    undo_likes()
    undo_follows()
    undo_replies()
    undo_media()
    undo_messages()
    undo_views()
    # Add other undo functions here
