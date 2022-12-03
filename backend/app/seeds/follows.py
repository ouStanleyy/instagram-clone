from app.models import db, Follow, environment, SCHEMA

follows = [
    {
        "follower_id": 2,
        "following_id": 1,
        "is_pending": False
    },
    {
        "follower_id": 3,
        "following_id": 1,
        "is_pending": False
    },
    {
        "follower_id": 4,
        "following_id": 1,
        "is_pending": False
    },
    {
        "follower_id": 5,
        "following_id": 1,
        "is_pending": True
    },
    {
        "follower_id": 6,
        "following_id": 1,
        "is_pending": True
    },
    {
        "follower_id": 1,
        "following_id": 2,
        "is_pending": False
    },
    {
        "follower_id": 3,
        "following_id": 2,
        "is_pending": False
    },
    {
        "follower_id": 4,
        "following_id": 2,
        "is_pending": False
    },
    {
        "follower_id": 5,
        "following_id": 2,
        "is_pending": False
    },
    {
        "follower_id": 1,
        "following_id": 3,
        "is_pending": False
    },
    {
        "follower_id": 4,
        "following_id": 3,
        "is_pending": False
    },
    {
        "follower_id": 5,
        "following_id": 3,
        "is_pending": False
    },
    {
        "follower_id": 6,
        "following_id": 3,
        "is_pending": False
    },
    {
        "follower_id": 5,
        "following_id": 4,
        "is_pending": False
    },
    {
        "follower_id": 6,
        "following_id": 4,
        "is_pending": False
    },
    {
        "follower_id": 2,
        "following_id": 5,
        "is_pending": False
    },
    {
        "follower_id": 4,
        "following_id": 5,
        "is_pending": False
    },
    {
        "follower_id": 6,
        "following_id": 5,
        "is_pending": False
    },
    {
        "follower_id": 3,
        "following_id": 6,
        "is_pending": True
    },
    {
        "follower_id": 4,
        "following_id": 6,
        "is_pending": True
    },
    {
        "follower_id": 5,
        "following_id": 6,
        "is_pending": False
    },
    {
        "follower_id": 5,
        "following_id": 7,
        "is_pending": False
    },
    {
        "follower_id": 5,
        "following_id": 8,
        "is_pending": False
    },
    {
        "follower_id": 5,
        "following_id": 9,
        "is_pending": False
    },
    {
        "follower_id": 5,
        "following_id": 10,
        "is_pending": False
    },
    {
        "follower_id": 5,
        "following_id": 11,
        "is_pending": False
    },
    {
        "follower_id": 5,
        "following_id": 12,
        "is_pending": False
    },
]

# Adds a demo user, you can add other users here if you want


def seed_follows():
    db.session.add_all([Follow(**follow) for follow in follows])
    # user = User.query.get(1)
    # db.session.delete(user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_follows():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM follows")

    db.session.commit()
