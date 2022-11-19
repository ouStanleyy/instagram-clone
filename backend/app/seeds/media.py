from app.models import db, Media, environment, SCHEMA

medias = [
    {
        "post_id": 1,
        "url": "https://expertphotography.b-cdn.net/wp-content/uploads/2022/05/Landscape-Photography-Sophie-Turner.jpg",
    },
    {
        "post_id": 2,
        "url": "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg",
    },
    {
        "post_id": 3,
        "url": "https://iso.500px.com/wp-content/uploads/2014/07/big-one.jpg",
    },
    {
        "post_id": 4,
        "url": "https://postmuseapp.com/wp-content/uploads/2019/05/BON-apetit-Instagram-Story-Template-LWqna6LJwyrKQF15GTC-foodstory.png",
    },
    {
        "post_id": 5,
        "url": "https://ourfoodstories.com/wp-content/uploads/2019/07/Peanut-butter-tartsjpg-933x1400.jpg",
    },
    {
        "post_id": 6,
        "url": "https://i.pinimg.com/736x/1c/5c/35/1c5c3509c985776c08d502a2e08f1c0a.jpg",
    },
    {
        "post_id": 7,
        "url": "https://i.pinimg.com/736x/b2/27/84/b22784a8d7f94fbb0b132ca138be1cdf--style-instagram-instagram-posts.jpg",
    },
    {
        "post_id": 8,
        "url": "https://2.bp.blogspot.com/-ELKvTfAup7M/Vq6cRyZMYrI/AAAAAAAAjTE/QMO01dNm7as/s1600/acoest1984%2Bacoworkout%2Bnike%2Bblazer%2Bweights%2Bgym%2Bfit%2Bfam.jpg",
    },
    {
        "post_id": 9,
        "url": "https://wallpapershome.com/images/pages/pic_v/15407.jpeg",
    },
    {
        "post_id": 10,
        "url": "https://www.bmwusa.com/content/dam/bmwusa/common/vehicles/2022/my23/m-models/m5-sedan/overview/mobile/BMW-MY23-M5-Overview-Hero-Mobile.jpg",
    },
    {
        "post_id": 11,
        "url": "https://cdn.motor1.com/images/mgl/LpzJl/s3/bmw-m5.jpg",
    },
    {
        "post_id": 12,
        "url": "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
    },
    {
        "post_id": 12,
        "url": "https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg?_=42445",
    },
    {
        "post_id": 13,
        "url": "https://cdn.arstechnica.net/wp-content/uploads/2022/04/GettyImages-997016774.jpg",
    },
    {
        "post_id": 14,
        "url": "https://helios-i.mashable.com/imagery/articles/07llAlBU83pdmYjR4YAvErH/hero-image.fill.size_1248x702.v1623387516.jpg",
    },
    {
        "post_id": 15,
        "url": "https://thumbor.bigedition.com/cat-being-polite/YBt4bz6_ciWKIwWcidZkI4RZdHo=/631x0/filters:quality(80)/granite-web-prod/99/fa/99fadde6696e4d808b0f0731a1f499f2.jpeg",
    },
]


def seed_media():
    db.session.add_all([Media(**media) for media in medias])
    # user = User.query.get(1)
    # db.session.delete(user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_media():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM media")

    db.session.commit()
