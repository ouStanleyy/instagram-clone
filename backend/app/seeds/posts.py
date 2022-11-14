from app.models import db, Post, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post_1 = Post(user_id=1, caption="User 1's first post.")
    post_2 = Post(user_id=1, caption="User 1's second post.")
    post_3 = Post(user_id=1, caption="User 1's third post.")
    post_4 = Post(user_id=2, caption="User 2's first post.")
    post_5 = Post(user_id=3, caption="User 3's first post.")

    db.session.add(post_1)
    db.session.add(post_2)
    db.session.add(post_3)
    db.session.add(post_4)
    db.session.add(post_5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
