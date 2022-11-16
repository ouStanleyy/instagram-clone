from app.models import db, Comment, User, Post, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment_1 = Comment(user_id=1, post_id=1, comment="User 1 commenting on post 1")
    comment_2 = Comment(user_id=1, post_id=2, comment="User 1 commenting on post 2")
    comment_3 = Comment(user_id=2, post_id=1, comment="User 2 commenting post 1")
    comment_4 = Comment(user_id=3, post_id=1, comment="User 3 commenting post 1")
    comment_5 = Comment(user_id=3, post_id=2, comment="User 3 commenting post 2")
    comment_6 = Comment(user_id=1, post_id=3, comment="User 1 commenting post 3")

    db.session.add_all([comment_1, comment_2, comment_3, comment_4, comment_5, comment_6])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
