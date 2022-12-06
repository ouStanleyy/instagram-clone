from app.models import db, User, Post, environment, SCHEMA

users = [
    {
        "username": "Demo_User",
        "full_name": "Demo User",
        "gender": "Prefer not to say",
        "email": "demo_user@email.com",
        "password": "demouserpw",
        "phone_number": "1111111111",
        "profile_picture": "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/3/31/1427823466140/1fe69f2c-59d6-4e07-ab3a-8b60dbe35db2-1020x1020.jpeg?width=700&quality=85&auto=format&fit=max&s=488d904c14758c38d8010de62c742e4b",
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
        "profile_picture": "https://www.crystalknows.com/hubfs/API/celebrities/mark_zuckerberg.jpg",
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
        "profile_picture": "https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1098,format=auto/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/05/19/4eb393f3-d671-4d58-8680-89ccd6607acf_5e3be874.jpg?itok=CEBu_LXQ&v=1652966452",
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
        "profile_picture": "data:image/jpeg;base64,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",
        "is_verified": True,
        "is_private": True
    },
    {
        "username": "Rey_Demo",
        "full_name": "Reyhaneh Demo",
        "gender": "Female",
        "bio": "It's Rey",
        "email": "reyhaneh_demo@email.com",
        "password": "reyhanehdemopw",
        "phone_number": "5555555555",
        "profile_picture": "https://www.animalhospitalofspringfield.com/sites/default/files/styles/large/public/golden-retriever-dog-breed-info.jpg?itok=mFt6R_EN",
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
        "profile_picture": "",
        "is_verified": True,
        "is_private": True
    },
    {
        "username": "Maddy_daily",
        "full_name": "Maddy Hellen",
        "gender": "Female",
        "email": "maddy_daily@email.com",
        "password": "madydailypw",
        "phone_number": "4666666666",
        "profile_picture": "https://cdn.i-scmp.com/sites/default/files/d8/images/2020/09/07/shutterstock_410560285.jpg",
        "is_verified": True,
        "is_private": False
    },
    {
        "username": "Jim_photogram",
        "full_name": "Jim Harley",
        "gender": "Male",
        "email": "jim_photogram@email.com",
        "password": "jimphotogrampw",
        "phone_number": "7777777777",
        "profile_picture": "https://static-cse.canva.com/image/129579/ShootInTheRain21.jpg",
        "is_verified": False,
        "is_private": False
    },
    {
        "username": "Lily_tattoo",
        "full_name": "Lily Haze",
        "gender": "Female",
        "email": "lily_tattoo@email.com",
        "password": "lilytattoopw",
        "phone_number": "8888888888",
        "profile_picture": "https://lonestartattoo.com/wp-content/uploads/2022/04/dallas-tattoo-artist-kat.jpg",
        "is_verified": False,
        "is_private": False
    },
    {
        "username": "Hailey_beauty",
        "full_name": "Hailey Monroe",
        "gender": "Female",
        "email": "hailey_beauty@email.com",
        "password": "haileybeautypw",
        "phone_number": "9999999999",
        "profile_picture": "https://www.upfluence.com/wp-content/uploads/2019/03/Top-Beauty-YouTubers-2019.jpg",
        "is_verified": True,
        "is_private": False
    },
    {
        "username": "John_22",
        "full_name": "John Milly",
        "gender": "Male",
        "email": "john_22@email.com",
        "password": "john22pw",
        "phone_number": "1999999999",
        "profile_picture": "https://www.gannett-cdn.com/presto/2020/09/24/PLOU/c70cbf26-6df4-4936-ad97-28e531425ee2-USATSI_13577258.jpg",
        "is_verified": False,
        "is_private": False
    },
    {
        "username": "Chef_Ana",
        "full_name": "Ana Li",
        "gender": "Female",
        "email": "chef_ana@email.com",
        "password": "chefanapw",
        "phone_number": "2999999999",
        "profile_picture": "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/09/13/sous-chef-plating-garnish.jpg.rend.hgtvcom.616.462.suffix/1631578604699.jpeg",
        "is_verified": False,
        "is_private": False
    },
    {
        "username": "kobebyrant",
        "full_name": "Kobe Bryant",
        "bio": "One of the greatest basketball players and scorers of all time, Bryant won five NBA championships, was an 18-time All-Star, a 15-time member of the All-NBA Team, a 12-time member of the All-Defensive Team, the 2008 NBA Most Valuable Player (MVP), and a two-time NBA Finals MVP.",
        "gender": "Male",
        "email": "kobebyrant@email.com",
        "password": "kobebyrantpw",
        "phone_number": "7892341234",
        "profile_picture": "https://image.cnbcfm.com/api/v1/image/101524695-457220551.jpg?v=1395781183&w=929&h=523&vtcrop=y",
        "is_verified": True,
        "is_private": False
    },
    {
        "username": "archdigest",
        "full_name": "Architectural Digest",
        "bio": "The International Design Authority. \nTap the link below to read more about any photo. \nJust kidding, there's no link.",
        "gender": "Male",
        "email": "archdigest@email.com",
        "password": "archdigestpw",
        "phone_number": "7892309834",
        "profile_picture": "data:image/png;base64,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",
        "is_verified": True,
        "is_private": False
    },
    {
        "username": "codemonkey",
        "full_name": "Tips and tricks",
        "bio": "Just coding tricks",
        "gender": "Male",
        "email": "codemonkey@email.com",
        "password": "codemonkeypw",
        "phone_number": "7892229834",
        "profile_picture": "https://s3.amazonaws.com/rails-camp-tutorials/blog/programming+memes/programming-or-googling.jpg",
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
