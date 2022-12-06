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
    {
        "user_id": 13,
        "caption": "GOAT"
    },
    {
        "user_id": 13,
        "caption": "2 GOATs"
    },
    {
        "user_id": 13,
        "caption": "3 GOATs"
    },
    {
        "user_id": 13,
        "caption": "Kobe Bean Bryant was born in Philadelphia, USA on August 23, 1978. He was the son of a former NBA player Joe Bryant. As a child his family moved to Italy where Kobe’s basketball career started. Later, they moved back to the USA and Kobe went to the Lower Merion High School where his basketball career really took off. Bryant, who played at the shooting guard position, received some of the most famous basketball accolades for players who are still in high school. This made young Kobe Bryant declare for the NBA draft straight out of high school, opting out of the college experience. He was only the sixth player to declare for the draft straight out of high school."
    },
    {
        "user_id": 13,
        "caption": "Apart from his 5 championships and 2 Finals MVPs, Bryant’s accolades are endless. He was the league’s MVP in 2008. He was an All Star a total of 18 times, which is considered great honor even more so because he was the MVP of four of those games. What’s more, he was named many times the All-NBA’s first, second and third teams, as well as the All-NBA Defensive teams. Bryant was a Slam Dunk Champion in 1997 and has 2 scoring titles.To top it all off, he has 3 gold medals with the USA’s men’s basketball team."
    },
    {
        "user_id": 13,
        "caption": "Kobe dunking on LeBron James with Dwyane Wade watching."
    },
    {
        "user_id": 13,
        "caption": "Linsanity"
    },
    {
        "user_id": 14,
        "caption": 'Step Inside Ellen Pompeo’s Midcentury Malibu Beach House \n“I like to say I manifested this house,” the Grey’s Anatomy star jokes of her Martyn Lawrence Bullard–designed home'
    },
    {
        "user_id": 14,
        "caption": "Tour a Dutchess County, New York, Manse That Puts a Bright, Contemporary Spin on Gothic Revival"
    },
    {
        "user_id": 14,
        "caption": "5 Fabulous Home Gym Ideas From Our Favorite AD-Featured Homes"
    },
    {
        "user_id": 14,
        "caption": "Inside an East Hampton Farmhouse That Marries Old and New"
    },
    {
        "user_id": 14,
        "caption": "Step Inside a Moody and Maximalist Home That’s Loaded With Purpose in Upstate New York"
    },
    {
        "user_id": 14,
        "caption": "The Highest Outdoor Pool in the World Soars 1,060 Feet Above the Ground"
    },
    {
        "user_id": 14,
        "caption": "The Real Locations Behind IKEA’s Iconic Product Names"
    },
    {
        "user_id": 14,
        "caption": "Tour a Storied Connecticut House Made New With Vibrant Color and Pattern"
    },
    {
        "user_id": 14,
        "caption": "8 Wallpaper Textures That Dial Up the Drama in Any Space"
    },
    {
        "user_id": 15,
        "caption": "Not really a tip"
    },
    {
        "user_id": 15,
        "caption": "Designers vs SWEs"
    },
    {
        "user_id": 15,
        "caption": "Yup"
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
