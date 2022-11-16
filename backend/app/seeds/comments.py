from app.models import db, Comment, environment, SCHEMA

comments = [
    {
        "user_id": 1,
        "post_id": 1,
        "comment": "Demo_User comments on their own post 1."
    },
    {
        "user_id": 2,
        "post_id": 1,
        "comment": "Marnie_Demo comments on Demo_user's first post."
    },
    {
        "user_id": 3,
        "post_id": 1,
        "comment": "Bobbie_Demo comments on Demo_user's first post."
    },
    {
        "user_id": 4,
        "post_id": 1,
        "comment": "Stan_demo comments on Demo_user's first post."
    },
    {
        "user_id": 5,
        "post_id": 1,
        "comment": "Rey_demo comments on Demo_user's first post."
    },
    {
        "user_id": 6,
        "post_id": 1,
        "comment": "Dan_demo comments on Demo_user's first post."
    },
    {
        "user_id": 1,
        "post_id": 7,
        "comment": "Demo_User comments on Bobbie_Demo's first post."
    },
    {
        "user_id": 5,
        "post_id": 10,
        "comment": "Rey_User comments on Stan_Demo's second post."
    },
    {
        "user_id": 6,
        "post_id": 10,
        "comment": "Dan_User comments on Stan_Demo's second post."
    },
    {
        "user_id": 4,
        "post_id": 14,
        "comment": "Stan_User comments on Dan_Demo's first post."
    },
    {
        "user_id": 4,
        "post_id": 12,
        "comment": "Stan_User comments on Rey_Demo's first post."
    },
]

# Adds a demo user, you can add other users here if you want


def seed_comments():
    db.session.add_all([Comment(**comment) for comment in comments])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
