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
    {
        "user_id": 7,
        "caption": "Be Stylish 🎀"
    },
    {
        "user_id": 7,
        "caption": "Check this out!!!!!"
    },
    {
        "user_id": 7,
        "caption": "Fasion lifestyle"
    },
    {
        "user_id": 7,
        "caption": "New day... New style"
    },
    {
        "user_id": 7,
        "caption": "Shine everyday ⭐️"
    },
    {
        "user_id": 7,
        "caption": "How cool is this 💃🏻"
    },
    {
        "user_id": 8,
        "caption": "How cool is this!!"
    },
    {
        "user_id": 8,
        "caption": "Check this out!!!!!"
    },
    {
        "user_id": 8,
        "caption": "Photography and art 🌉"
    },
    {
        "user_id": 8,
        "caption": "What a cool location!"
    },
    {
        "user_id": 8,
        "caption": "Creative photography"
    },
    {
        "user_id": 8,
        "caption": "everyday photography"
    },
    {
        "user_id": 8,
        "caption": "Nature photography 🌄"
    },
    {
        "user_id": 9,
        "caption": "Tattoos of Human Trafficking Victims"
    },
    {
        "user_id": 9,
        "caption": "Beautiful Shoulder Tattoos"
    },
    {
        "user_id": 9,
        "caption": "Check out this hand tattoo!"
    },
    {
        "user_id": 9,
        "caption": "cute little kittys"
    },
    {
        "user_id": 9,
        "caption": "flower tattoo 🌸"
    },
    {
        "user_id": 10,
        "caption": "Blank Canvas 🎨"
    },
    {
        "user_id": 10,
        "caption": "What's in my everyday makeup bag!"
    },
    {
        "user_id": 10,
        "caption": "Life of a beauty blogger!"
    },
    {
        "user_id": 10,
        "caption": "fantasy makeup"
    },
    {
        "user_id": 10,
        "caption": "Makeup & Skin care"
    },
    {
        "user_id": 11,
        "caption": "Americam football day! 🏈"
    },
    {
        "user_id": 11,
        "caption": "Football Season"
    },
    {
        "user_id": 12,
        "caption": "Most expensive foods"
    },
    {
        "user_id": 12,
        "caption": "🍱 🥘 🥙"
    },
    {
        "user_id": 12,
        "caption": "Luxury food industry turns sour amid global coronavirus lockdowns"
    },
    {
        "user_id": 12,
        "caption": "Sushiban Express!"
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
