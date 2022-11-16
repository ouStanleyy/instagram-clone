from app.models import db, View, environment, SCHEMA
# 3 4 5 6 11
views = [
    {
        "user_id": 2,
        "post_id": 3,
    },
    {
        "user_id": 3,
        "post_id": 3,
    },
    {
        "user_id": 4,
        "post_id": 3,
    },
    {
        "user_id": 1,
        "post_id": 4,
    },
    {
        "user_id": 2,
        "post_id": 4,
    },
    {
        "user_id": 3,
        "post_id": 4,
    },
    {
        "user_id": 4,
        "post_id": 4,
    },
    {
        "user_id": 6,
        "post_id": 4,
    },
    {
        "user_id": 1,
        "post_id": 5,
    },
    {
        "user_id": 2,
        "post_id": 5,
    },
    {
        "user_id": 3,
        "post_id": 5,
    },
    {
        "user_id": 1,
        "post_id": 6,
    },
    {
        "user_id": 2,
        "post_id": 6,
    },
    {
        "user_id": 1,
        "post_id": 11,
    },
    {
        "user_id": 5,
        "post_id": 11,
    },
    {
        "user_id": 6,
        "post_id": 11,
    },
]


def seed_views():
    db.session.add_all([View(**view) for view in views])
    # user = User.query.get(1)
    # db.session.delete(user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_views():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM views")

    db.session.commit()
