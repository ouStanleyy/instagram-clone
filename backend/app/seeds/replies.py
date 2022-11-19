from app.models import db, Reply, environment, SCHEMA

replies = [
    {
        "user_id": 1,
        "comment_id": 2,
        "reply": "Demo_User replies to Marnie_Demo's comment on post 1."
    },
    {
        "user_id": 1,
        "comment_id": 3,
        "reply": "Demo_User replies to Bobbie_Demo's comment on post 1."
    },
    {
        "user_id": 1,
        "comment_id": 10,
        "reply": "Demo_User replies to Stan_Demo's comment on post 14."
    },
    {
        "user_id": 1,
        "comment_id": 11,
        "reply": "Demo_User replies to Stan_Demo's comment on post 12."
    },
    {
        "user_id": 2,
        "comment_id": 2,
        "reply": "Marnie_Demo replies to her own reply on post 1."
    },
    {
        "user_id": 2,
        "comment_id": 1,
        "reply": "Marnie_demo replies to Demo_user's comment on post 1."
    },
    {
        "user_id": 3,
        "comment_id": 1,
        "reply": "Bobbie_demo replies to Demo_user's comment on post 1."
    },
    {
        "user_id": 3,
        "comment_id": 8,
        "reply": "Bobbie_demo replies to Rey_user's comment on post 10."
    },
    {
        "user_id": 3,
        "comment_id": 9,
        "reply": "Bobbie_demo replies to Dan_user's comment on post 10."
    },
    {
        "user_id": 4,
        "comment_id": 4,
        "reply": "Stan_Demo replies to his own comment on post 1."
    },
    {
        "user_id": 4,
        "comment_id": 9,
        "reply": "Stan_Demo replies to Dan_Demo's comment on post 10."
    },
    {
        "user_id": 4,
        "comment_id": 10,
        "reply": "Stan_Demo replies to his own comment on post 14."
    },
    {
        "user_id": 5,
        "comment_id": 10,
        "reply": "Rey_Demo replies to Stan_Demo's comment on post 14."
    },
    {
        "user_id": 6,
        "comment_id": 10,
        "reply": "Dan_User replies to Stan_Demo's comment on post 14."
    }
]

# Adds a demo user, you can add other users here if you want


def seed_replies():
    db.session.add_all([Reply(**reply) for reply in replies])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_replies():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM replies")

    db.session.commit()
