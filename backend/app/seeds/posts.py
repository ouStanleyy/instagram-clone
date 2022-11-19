from app.models import db, Post, environment, SCHEMA
from datetime import datetime, timedelta

posts = [
    {
        "user_id": 1,
        "caption": "Demo_User's first post."
    },
    {
        "user_id": 1,
        "caption": "Demo_User's second post."
    },
    {
        "user_id": 1,
        "is_story": True,
        "expires_at": datetime.now() + timedelta(days=1)
    },
    {
        "user_id": 2,
        "is_story": True,
        "expires_at": datetime.now() + timedelta(days=1)
    },
    {
        "user_id": 2,
        "is_story": True,
        "expires_at": datetime.now() + timedelta(days=1)
    },
    {
        "user_id": 2,
        "is_story": True,
        "expires_at": datetime.now() + timedelta(days=1)
    },
    {
        "user_id": 3,
        "caption": "Bobbie_Demo's first post."
    },
    {
        "user_id": 3,
        "caption": "Bobbie_Demo's second post."
    },
    {
        "user_id": 4,
        "caption": "Stan_Demo's first post."
    },
    {
        "user_id": 4,
        "caption": "Stan_Demo's second post."
    },
    {
        "user_id": 4,
        "is_story": True,
        "expires_at": datetime.now() + timedelta(days=1)
    },
    {
        "user_id": 5,
        "caption": "Rey_Demo's first post."
    },
    {
        "user_id": 5,
        "caption": "Rey_Demo's second post."
    },
    {
        "user_id": 6,
        "caption": "Dan_Demo's first post."
    },
    {
        "user_id": 6,
        "caption": "Dan_Demo's second post."
    },

]


def seed_posts():
    db.session.add_all([Post(**post) for post in posts])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
