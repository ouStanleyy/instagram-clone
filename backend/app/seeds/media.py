from app.models import db, Media, environment, SCHEMA

medias = [
    {
        "post_id": 1,
        "url": "https://expertphotography.b-cdn.net/wp-content/uploads/2022/05/Landscape-Photography-Sophie-Turner.jpg",
    },
    {
        "post_id": 1,
        "url": "https://www.travelandleisure.com/thmb/VscfMXHNO6uBpaX2cuIW1q2ZtA8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tokyo-japan-TOKYOTG0621-52012ff551dc46c4a87ac8e3151307a4.jpg",
    },
    {
        "post_id": 1,
        "url": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dG9reW98ZW58MHx8MHx8&w=1000&q=80",
    },
    {
        "post_id": 1,
        "url": "https://i.guim.co.uk/img/media/36c2f80951eb4efd941af3f74cb54741cc08cc82/0_1097_7829_4695/master/7829.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=239adec63d677461e6d5ca4210be3579",
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
    {
        "post_id": 16,
        "url": "https://vikrampathak.com/wp-content/uploads/2021/01/New-york-lifestyle-fashion-photography-0.jpg",
    },
    {
        "post_id": 17,
        "url": "https://www.irisvanherpen.com/_uploaded/202207/_IKA5231_1-LRG.jpg",
    },
    {
        "post_id": 18,
        "url": "https://www.lovethispic.com/uploaded_images/144955-High-Fashion-Lifestyle.jpg",
    },
    {
        "post_id": 19,
        "url": "https://64.media.tumblr.com/94cc4713ffacd6db5c9fc897477f5e80/tumblr_oba506CWiy1v104apo1_1280.jpg",
    },
    {
        "post_id": 20,
        "url": "https://www.dupattaonline.com/wp-content/uploads/2018/09/fashion-lifestyle.jpg",
    },
    {
        "post_id": 21,
        "url": "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/H22QrVJSiphb57vz/fashion-designer-is-working-on-a-new-collection-making-sketches_h3e4vl8zg__5c02b67444cd49a3aeebfe5f014d67c7__P360.mp4",
    },
    {
        "post_id": 22,
        "url": "http://cdn.cnn.com/cnnnext/dam/assets/211130161931-26-wildlife-photographer-peoples-choice-shortlist-2021-scli-intl-gbr.jpg",
    },
    {
        "post_id": 23,
        "url": "https://i.pinimg.com/originals/4f/1d/d4/4f1dd45081da9bc55164ccb3f51131b9.jpg",
    },
    {
        "post_id": 24,
        "url": "https://i.pinimg.com/originals/6a/8e/f2/6a8ef22c42cffb5d4ba3cb6595b907be.jpg",
    },
    {
        "post_id": 25,
        "url": "http://static.demilked.com/wp-content/uploads/2015/04/crazy-dedicated-photographers-extreme-photography-04.jpg",
    },
    {
        "post_id": 26,
        "url": "https://static-cse.canva.com/blob/691411/00gross_IG_hubs_adriansava.7536b79e.jpg",
    },
    {
        "post_id": 27,
        "url": "https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2019/09/shutterstock_1399037558.jpg",
    },
    {
        "post_id": 28,
        "url": "https://i.pinimg.com/originals/63/41/17/634117ad7df88ba951684426a4f4f4ee.jpg",
    },
    {
        "post_id": 29,
        "url": "https://www.napnappartners.org/sites/default/files/pictures/TraffickingTattoo%20Barcode.jpg",
    },
    {
        "post_id": 30,
        "url": "https://www.ourmindfullife.com/wp-content/uploads/2021/09/Beautiful-purple-butterflies-by-@palette.tt_.jpg.webp",
    },
    {
        "post_id": 31,
        "url": "https://ichef.bbci.co.uk/news/976/cpsprodpb/1786E/production/_107366369_image3.jpg",
    },
    {
        "post_id": 32,
        "url": "https://inkupaw.com/wp-content/uploads/cute-cat-with-wine-tattoo.jpg",
    },
    {
        "post_id": 32,
        "url": "https://belloblog.com/wp-content/uploads/2018/07/175040518-cat-tattoo-1-1.jpg",
    },
    {
        "post_id": 32,
        "url": "https://crayon.pk/wp-content/uploads/2018/08/Small-Kitten-Tattoo-Design-600x600.jpg",
    },
    {
        "post_id": 33,
        "url": "https://www.awesomeinventions.com/wp-content/uploads/2020/02/blue-orchid-cute-tattoos.jpg",
    },
    {
        "post_id": 33,
        "url": "https://pbs.twimg.com/media/DfHnGlLWkAECRtJ.jpg",
    },
    {
        "post_id": 34,
        "url": "https://cs11.livemaster.ru/storage/topic/NxN/69/e7/09273c76aa92b510fd0a608d2acd49a339a3sx.jpg?h=hglA4GAv2M90f9SWVuFprQ",

    },
    {
        "post_id": 34,
        "url": "https://raiderrelease.com/wp-content/uploads/2018/11/James-Charles.jpg",
    },
    {
        "post_id": 34,
        "url": "https://i.pinimg.com/originals/52/9f/3c/529f3cd7bd72ecc3d57564811f5f5522.jpg",
    },
    {
        "post_id": 35,
        "url": "https://3.bp.blogspot.com/-zxq-XZo-Hb4/Wq5V8ImmDBI/AAAAAAAAEKY/RAjmNOyNodMFuweDe3SkGkFrSsMF_4oZQCLcBGAs/s1600/Whats%2Bin%2Bthe%2BEveryday%2BMakeup%2BBag.jpg",
    },
    {
        "post_id": 36,
        "url": "https://cdn2.stylecraze.com/wp-content/uploads/2021/08/20-Popular-Beauty-Blogs-You-Should-Follow-Banner.jpg",
    },
    {
        "post_id": 37,
        "url": "https://i.pinimg.com/736x/53/48/75/534875187d64f019c7dafa51ddb5538e.jpg",
    },
    {
        "post_id": 38,
        "url": "https://cdn.shopify.com/s/files/1/0080/1056/3650/files/zoeva-weekend-trip_550x.jpg?v=1655459083",
    },
    {
        "post_id": 38,
        "url": "https://www.beautyill.nl/wp-content/uploads/2020/03/untitled-10-3.jpg",
    },
    {
        "post_id": 39,
        "url": "https://nationaltoday.com/wp-content/uploads/2019/11/american-football-day.jpg",
    },
    {
        "post_id": 40,
        "url": "https://www.si.com/.image/t_share/MTg1Njk3Nzg2MDk4OTUxODA4/2361b5f9-fe32-4837-82d5-b2f199c22bec.jpg",
    },
    {
        "post_id": 41,
        "url": "https://www.eatthis.com/wp-content/uploads/sites/4/2018/08/japanese-wagu-ribeye-cute-wolfgang-puck-yelp-photoshop.jpg?quality=82&strip=1",
    },
    {
        "post_id": 41,
        "url": "https://d.newsweek.com/en/full/1531808/7-best-splurge-worthy-restaurants-london.jpg",
    },
    {
        "post_id": 42,
        "url": "https://www.restaurantware.com/media/magefan_blog/Top_10_Most_Luxurious_Foods_-_Thumbnail.png",
    },
    {
        "post_id": 43,
        "url": "https://www.deccanherald.com/sites/dh/files/articleimages/2020/06/12/iStock-1081560570-1591947820.jpg",
    },
    {
        "post_id": 44,
        "url": "https://t3.ftcdn.net/jpg/03/32/16/52/360_F_332165231_B81gcGf8AMRKMB0MjZZnqWMLbaF2JaVL.jpg",
    },
    {
        "post_id": 44,
        "url": "https://tofuu.getjusto.com/orioneat-local/resized2/oyRHtR6bZDqqPRrZD-1200-1200.jpeg",
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
