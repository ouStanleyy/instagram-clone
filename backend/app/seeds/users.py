from app.models import db, User, Post, environment, SCHEMA

users = [
    {
        "username": "Demo_User",
        "full_name": "Demo User",
        "gender": "Prefer not to say",
        "email": "demo_user@email.com",
        "password": "demouserpw",
        "phone_number": "1111111111",
        "is_verified": True,
        "is_private": True
    },
    {
        "username": "Marnie_Demo",
        "full_name": "Marnie Demo",
        "gender": "Prefer not to say",
        "email": "marnie_demo@email.com",
        "password": "marniedemopw",
        "phone_number": "2222222222",
        "is_verified": False,
        "is_private": False
    },
    {
        "username": "Bobbie_Demo",
        "full_name": "Bobbie Demo",
        "gender": "Prefer not to say",
        "email": "bobbie_demo@email.com",
        "password": "bobbiedemopw",
        "phone_number": "3333333333",
        "is_verified": False,
        "is_private": False
    },
    {
        "username": "Stan_Demo",
        "full_name": "Stanley Demo",
        "gender": "Male",
        "email": "stanley_demo@email.com",
        "password": "stanleydemopw",
        "phone_number": "4444444444",
        "is_verified": True,
        "is_private": False
    },
    {
        "username": "Rey_Demo",
        "full_name": "Reyhaneh Demo",
        "gender": "Female",
        "email": "reyhaneh_demo@email.com",
        "password": "reyhanehdemopw",
        "phone_number": "5555555555",
        "is_verified": True,
        "is_private": False
    },
    {
        "username": "Dan_Demo",
        "full_name": "Daniel Demo",
        "gender": "Male",
        "email": "daniel_demo@email.com",
        "password": "danieldemopw",
        "phone_number": "6666666666",
        "is_verified": True,
        "is_private": False
    },
]


def seed_users():
    db.session.add_all([User(**user) for user in users])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
