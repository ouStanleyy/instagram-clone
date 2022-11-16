from app.models import db, Like, User, environment, SCHEMA

likes = [
    {
        "user_id": 1,
        "post_id": 2,
    },
    {
        "user_id": 1,
        "post_id": 15,
    },
    {
        "user_id": 1,
        "post_id": 12,
    },
    {
        "user_id": 2,
        "post_id": 1,
    },
    {
        "user_id": 3,
        "post_id": 1,
    },
    {
        "user_id": 4,
        "post_id": 1,
    },
    {
        "user_id": 5,
        "post_id": 1,
    },
    {
        "user_id": 6,
        "post_id": 1,
    },
    {
        "user_id": 1,
        "post_id": 7,
    },
    {
        "user_id": 5,
        "post_id": 10,
    },
    {
        "user_id": 6,
        "post_id": 10,
    },
    {
        "user_id": 4,
        "post_id": 14,
    },
    {
        "user_id": 4,
        "post_id": 12,
    },
    {
        "user_id": 1,
        "post_id": 14,
    },
    {
        "user_id": 6,
        "post_id": 12,
    },
]

# Adds a demo user, you can add other users here if you want


def seed_likes():
    db.session.add_all([Like(**like) for like in likes])
    # user = User.query.get(1)
    # db.session.delete(user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_likes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()
