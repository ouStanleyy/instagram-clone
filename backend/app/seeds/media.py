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
        "url": "https://nypost.com/wp-content/uploads/sites/2/2021/12/chinese-elon-musk2.jpg?quality=75&strip=all",
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
    {
        "post_id": 45,
        "url": "https://c4.wallpaperflare.com/wallpaper/175/589/120/kobe-bryant-computer-wallpaper-preview.jpg",
    },
    {
        "post_id": 46,
        "url": "https://static01.nyt.com/images/2020/01/28/sports/28KOBE-LEBRON-1/28KOBE-LEBRON-1-mobileMasterAt3x.jpg",
    },
    {
        "post_id": 47,
        "url": "https://i.pinimg.com/736x/59/9b/81/599b814e5c9ddc8c137b826aba03e714.jpg",
    },
    {
        "post_id": 48,
        "url": "https://archziner.com/wp-content/uploads/2020/09/kobe-sitting-on-a-bench-under-showers-cool-kobe-bryant-wallpapers-championship-trophy-on-the-floor-in-front-of-him-wearing-purple-jacket.jpg",
    },
    {
        "post_id": 49,
        "url": "https://archziner.com/wp-content/uploads/2020/09/black-and-white-photo-of-kobe-sitting-holding-a-basketball-photographed-from-the-side-kobe-wallpaper-black-background.jpg",
    },
    {
        "post_id": 50,
        "url": "https://archziner.com/wp-content/uploads/2020/09/kobe-bryant-dunking-on-lebron-james-dwyane-wade-in-the-back-kobe-bryant-and-gigi-wallpaper-wearing-yellow-lakers-jersey.jpg",
    },
    {
        "post_id": 51,
        "url": "http://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/4c0bb4b5cec87775501f079252b93481",
    },
    {
        "post_id": 51,
        "url": "https://img.bleacherreport.net/img/images/photos/001/567/922/138693133_crop_north.jpg?1328972994&w=3072&h=2048",
    },
    {
        "post_id": 51,
        "url": "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/boh0rc9vrqldik1sq9qf/kobe-bryant-jeremy-lin?fimg-ssr-default",
    },
    {
        "post_id": 52,
        "url": "https://media.architecturaldigest.com/photos/61b0ce48dccdb75fa170f8f7/16:9/w_2560%2Cc_limit/PurpleCherry_Williams_0012.jpg",
    },
    {
        "post_id": 53,
        "url": "https://media.architecturaldigest.com/photos/620bd9289f3070a4c7c4992a/master/w_2580%2Cc_limit/Tivoli_0191%2520copy.jpg",
    },
    {
        "post_id": 53,
        "url": "https://media.architecturaldigest.com/photos/620bd92b9494f79a45ba0ded/master/w_2580%2Cc_limit/Tivoli_0277%2520copy.jpg",
    },
    {
        "post_id": 53,
        "url": "https://media.architecturaldigest.com/photos/620bd9311de6774a1e2776d7/master/w_2580%2Cc_limit/Tivoli_0578%2520copy.jpg",
    },
    {
        "post_id": 53,
        "url": "https://media.architecturaldigest.com/photos/620bd9319494f79a45ba0df0/master/w_2580%2Cc_limit/Tivoli_0628%2520copy.jpg",
    },
    {
        "post_id": 53,
        "url": "https://media.architecturaldigest.com/photos/620bd932026e6f5992462db5/master/w_2580%2Cc_limit/Tivoli_0660%2520copy.jpg",
    },
    {
        "post_id": 54,
        "url": "https://media.architecturaldigest.com/photos/63084796bab7603078f00328/master/w_1920%2Cc_limit/AlexanderDesign_Ohana_461.jpg",
    },
    {
        "post_id": 55,
        "url": "https://media.architecturaldigest.com/photos/6388cf9ac6c719e8ddb639db/master/w_2580%2Cc_limit/22060_press_jcarlyle_9-16-22_84.jpg",
    },
    {
        "post_id": 55,
        "url": "https://media.architecturaldigest.com/photos/6388cf9f8301919648ec046c/master/w_2580%2Cc_limit/22060_press_jcarlyle_9-16-22_189.jpg",
    },
    {
        "post_id": 55,
        "url": "https://media.architecturaldigest.com/photos/6388cf9fde9d9bfbc5c424ec/master/w_2580%2Cc_limit/22060_press_jcarlyle_9-16-22_11%25201.jpg",
    },
    {
        "post_id": 55,
        "url": "https://media.architecturaldigest.com/photos/6388cf94f5e42ed57ef9275a/master/w_2580%2Cc_limit/22060_press_jcarlyle_9-16-22_46%25201.jpg",
    },
    {
        "post_id": 55,
        "url": "https://media.architecturaldigest.com/photos/6388cf99de9d9bfbc5c424ea/master/w_2580%2Cc_limit/22060_press_jcarlyle_9-16-22_110.jpg",
    },
    {
        "post_id": 55,
        "url": "https://media.architecturaldigest.com/photos/6388cf9463d52d63aab3e1eb/master/w_2580%2Cc_limit/22060_press_jcarlyle_9-16-22_09%25201.jpg",
    },
    {
        "post_id": 56,
        "url": "https://media.architecturaldigest.com/photos/637c2b32a38f1233b1bfd8bd/master/w_2580%2Cc_limit/Madrigal_House_18.jpg",
    },
    {
        "post_id": 56,
        "url": "https://media.architecturaldigest.com/photos/637c2b3405aee881010b77e4/master/w_2580%2Cc_limit/Madrigal_House_17.jpg",
    },
    {
        "post_id": 56,
        "url": "https://media.architecturaldigest.com/photos/637c2b2255354fd6222df827/master/w_2580%2Cc_limit/Madrigal_House_3.jpg",
    },
    {
        "post_id": 56,
        "url": "https://media.architecturaldigest.com/photos/637c2b190d1db0a30f58003c/master/w_2580%2Cc_limit/Madrigal_House_15.jpg",
    },
    {
        "post_id": 57,
        "url": "https://media.architecturaldigest.com/photos/6388fe6d7c7d908b8ba494c1/1:1/w_960,c_limit/Guangxi%20China%20Resources%20Tower_(c)%20Arch-Exist_07.jpg",
    },
    {
        "post_id": 57,
        "url": "https://media.architecturaldigest.com/photos/6388fe6e7abfaa8863f3be36/master/w_1600,c_limit/Guangxi%20China%20Resources%20Tower_(c)%20Arch-Exist_08.jpg",
    },
    {
        "post_id": 57,
        "url": "https://media.architecturaldigest.com/photos/6388fe6cde9d9bfbc5c424f7/master/w_1280,c_limit/Guangxi%20China%20Resources%20Tower_(c)%20Arch-Exist_06.jpg",
    },
    {
        "post_id": 58,
        "url": "https://media.architecturaldigest.com/photos/6376556a49247ea910900082/16:9/w_2240,c_limit/toftan_cred_Mikael_Svensson.jpg",
    },
    {
        "post_id": 58,
        "url": "https://media.architecturaldigest.com/photos/63765644635a1f2c06ac68e5/master/w_1600,c_limit/Kvarntorp_1910LS_0037.jpg",
    },
    {
        "post_id": 58,
        "url": "https://media.architecturaldigest.com/photos/637658a62ae6947686c103ca/master/w_1600,c_limit/Innerg%C3%A5rd%20i%20Askersund.jpg",
    },
    {
        "post_id": 59,
        "url": "https://media.architecturaldigest.com/photos/638779f066ac9bb6610acf22/1:1/w_960,c_limit/AD0123_TUPKER_1%20copy.jpg",
    },
    {
        "post_id": 59,
        "url": "https://media.architecturaldigest.com/photos/638779f421b38b119a99ce25/master/w_1600,c_limit/AD0123_TUPKER_16%20copy.jpg",
    },
    {
        "post_id": 59,
        "url": "https://media.architecturaldigest.com/photos/638779f4f94546381283d0a0/master/w_1600,c_limit/AD0123_TUPKER_15%20copy.jpg",
    },
    {
        "post_id": 59,
        "url": "https://media.architecturaldigest.com/photos/63878559e7f5a4a139386e34/master/w_1600,c_limit/AD0123_TUPKER_4%20copy.jpg",
    },
    {
        "post_id": 59,
        "url": "https://media.architecturaldigest.com/photos/638779f67a6dc63ff504aed5/master/w_1600,c_limit/AD0123_TUPKER_21%20copy.jpg",
    },
    {
        "post_id": 60,
        "url": "https://media.architecturaldigest.com/photos/638502144e358184e5cfff8b/16:9/w_2240,c_limit/3S2A0939_HDR-Pano-Edit%20(1).jpg",
    },
    {
        "post_id": 61,
        "url": "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/GTYSdDW/videoblocks-computer-hacking-in-process-cyber-security-concept_h-l3zbu4xb__0a7b0b12279471d24693c0d1a1aa7c82__P360.mp4",
    },
    {
        "post_id": 62,
        "url": "https://codingbootcamps.io/wp-content/uploads/m2.png",
    },
    {
        "post_id": 63,
        "url": "https://www.multidots.com/wp-content/uploads/2020/01/code-quality-standard.png?quality=90",
    },
    {
        "post_id": 63,
        "url": "https://images7.memedroid.com/images/UPLOADED808/6368782c7bef3.jpeg",
    },
    {
        "post_id": 64,
        "url": "https://i.pinimg.com/originals/8b/74/db/8b74db48aecf7f948d1a9c41743ed8bb.jpg",
    },
    {
        "post_id": 65,
        "url": "https://media-exp1.licdn.com/dms/image/C5622AQEyn5kYlxGz-w/feedshare-shrink_2048_1536/0/1661520557100?e=2147483647&v=beta&t=r6HRgLIgk6FiQmCEynnj2MDSBWNkrUCtE6UyhVxvj5M",
    },
    {
        "post_id": 66,
        "url": "https://media-exp1.licdn.com/dms/image/C5622AQFARn-TytJrDQ/feedshare-shrink_480/0/1660306491989?e=2147483647&v=beta&t=Qxv-lrw8TL4YtM-hbW4jGOFfd1-G9ueO62qGMtH_9X4",
    },
    {
        "post_id": 67,
        "url": "http://images7.memedroid.com/images/UPLOADED867/62d4f870aa98b.jpeg",
    },
    {
        "post_id": 67,
        "url": "https://cdn4.visualstories.com/officialrajdeepsingh/images/1/14424134/14424134-928_90b73dcd76b0d8ec6b400cd9e869a359.png",
    },
    {
        "post_id": 68,
        "url": "https://coursereport-s3-production.global.ssl.fastly.net/rich/rich_files/rich_files/5497/original/7-tips-before-you-learn-to-code.png",
    },
    {
        "post_id": 69,
        "url": "https://i.pinimg.com/736x/e5/af/f0/e5aff0825a13b7dfeed184368d511f01.jpg",
    },
    {
        "post_id": 70,
        "url": "https://res.cloudinary.com/practicaldev/image/fetch/s--ij_hqKUb--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://github.com/damiancipolat/js_vs_memes/blob/master/doc/mind_js.jpg%3Fraw%3Dtrue",
    },
    {
        "post_id": 71,
        "url": "https://i.pinimg.com/564x/33/38/a8/3338a87664d342edb53fcf70aef72986.jpg",
    },
    {
        "post_id": 71,
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgKMN7ip4PJX4nvrMZbIuUulSzxY3l-yE-tA&usqp=CAU",
    },
    {
        "post_id": 71,
        "url": "https://cdn.memegenerator.es/descargar/12331123",
    },
    {
        "post_id": 72,
        "url": "https://origympersonaltrainercourses.co.uk/files/img_cache/2124/450_450__1554970272_wokroutmeme6.jpg",
    },
    {
        "post_id": 73,
        "url": "https://www.wellandgood.com/wp-content/uploads/2019/12/Stocksy-cooking-for-one-Andrey-Pavlov.jpeg",
    },
    {
        "post_id": 74,
        "url": "https://modernhealthmonk.com/wp-content/uploads/2015/08/grunting-at-gym.jpg",
    },
    {
        "post_id": 75,
        "url": "https://sneakernews.com/wp-content/uploads/2022/11/Concepts-Nike-SB-Dunk-Low-Orange-Lobster-4.jpg",
    },
    {
        "post_id": 75,
        "url": "https://sneakerbardetroit.com/wp-content/uploads/2022/07/Concepts-Nike-SB-Dunk-Low-Orange-Lobster-FD8776-800-Release-Date-On-Feet.jpg",
    },
    {
        "post_id": 75,
        "url": "https://houseofheat.co/app/uploads/2022/06/concepts-nike-dunk-low-orange-lobster-release-date-10.jpg",
    },
    {
        "post_id": 76,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-dunk-low-womens-ice-blue-barely-volt-dd1503-123-4.jpg",
    },
    {
        "post_id": 76,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-dunk-low-womens-ice-blue-barely-volt-dd1503-123-3.jpg",
    },
    {
        "post_id": 76,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-dunk-low-womens-ice-blue-barely-volt-dd1503-123-5.jpg",
    },
    {
        "post_id": 76,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-dunk-low-womens-ice-blue-barely-volt-dd1503-123-7.jpg",
    },
    {
        "post_id": 76,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-dunk-low-womens-ice-blue-barely-volt-dd1503-123-1.jpg",
    },
    {
        "post_id": 76,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-dunk-low-womens-ice-blue-barely-volt-dd1503-123-2.jpg",
    },
    {
        "post_id": 77,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-air-force-1-patchwork-fb4957-111-4.jpg",
    },
    {
        "post_id": 77,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-air-force-1-patchwork-fb4957-111-1.jpg",
    },
    {
        "post_id": 77,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-air-force-1-patchwork-fb4957-111-8.jpg",
    },
    {
        "post_id": 77,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-air-force-1-patchwork-fb4957-111-11.jpg",
    },
    {
        "post_id": 78,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-cortez-sail-aloe-vera-pale-vanilla-FD0728-133-7.jpg",
    },
    {
        "post_id": 78,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-cortez-sail-aloe-vera-pale-vanilla-FD0728-133-8.jpg",
    },
    {
        "post_id": 78,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-cortez-sail-aloe-vera-pale-vanilla-FD0728-133-2.jpg",
    },
    {
        "post_id": 78,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-cortez-sail-aloe-vera-pale-vanilla-FD0728-133-4.jpg",
    },
    {
        "post_id": 78,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-cortez-sail-aloe-vera-pale-vanilla-FD0728-133-3.jpg",
    },
    {
        "post_id": 79,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-blazer-mid-77-white-peach-FD0287-100-8.jpg",
    },
    {
        "post_id": 79,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-blazer-mid-77-white-peach-FD0287-100-6.jpg",
    },
    {
        "post_id": 79,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-blazer-mid-77-white-peach-FD0287-100-2.jpg",
    },
    {
        "post_id": 79,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-blazer-mid-77-white-peach-FD0287-100-3.jpg",
    },
    {
        "post_id": 79,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/nike-blazer-mid-77-white-peach-FD0287-100-7.jpg",
    },
    {
        "post_id": 80,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/jordan-series-01-dear-imagination-FD4325-171-4.jpg",
    },
    {
        "post_id": 80,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/jordan-series-01-dear-imagination-FD4325-171-3.jpg",
    },
    {
        "post_id": 80,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/jordan-series-01-dear-imagination-FD4325-171-6.jpg",
    },
    {
        "post_id": 80,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/jordan-series-01-dear-imagination-FD4325-171-8.jpg",
    },
    {
        "post_id": 81,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/jordan-legacy-312-year-of-the-rabbit-6.jpg",
    },
    {
        "post_id": 81,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/jordan-legacy-312-year-of-the-rabbit-2.jpg?w=1140",
    },
    {
        "post_id": 81,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/jordan-legacy-312-year-of-the-rabbit-1.jpg?w=1140",
    },
    {
        "post_id": 81,
        "url": "https://sneakernews.com/wp-content/uploads/2022/12/jordan-legacy-312-year-of-the-rabbit-5.jpg?w=1140",
    },
    {
        "post_id": 82,
        "url": "https://sneakernews.com/wp-content/uploads/2022/11/nike-air-force-1-shadow-pastel-multi-color-FJ0735-100-1.jpg",
    },
    {
        "post_id": 82,
        "url": "https://sneakernews.com/wp-content/uploads/2022/11/nike-air-force-1-shadow-pastel-multi-color-FJ0735-100-7.jpg",
    },
    {
        "post_id": 82,
        "url": "https://sneakernews.com/wp-content/uploads/2022/11/nike-air-force-1-shadow-pastel-multi-color-FJ0735-100-2.jpg",
    },
    {
        "post_id": 83,
        "url": "https://media.architecturaldigest.com/photos/634ee4aba8f3f42b54e9ba9a/master/w_2580%2Cc_limit/Alpine%2520Shelter%2520Skuta%2520by%2520OFIS%2520Architects%2520__%2520Harvard%2520GSD%2520__%2520AKT%2520II_photo%2520%25E2%2594%25AC%25C2%25AE%2520Janez%2520Martincic.jpg",
    },
    {
        "post_id": 83,
        "url": "https://media.architecturaldigest.com/photos/634ee4ae71ea5ab8b1a71c0f/master/w_1920%2Cc_limit/Cliff%2520House%2520by%2520Modscape%2520%25C2%25A9Modscape%2520.jpg",
    },
    {
        "post_id": 83,
        "url": "https://media.architecturaldigest.com/photos/634ee4b0ad68993731cfd874/master/w_1920%2Cc_limit/Concrete%2520House%2520by%2520Maria%25C2%25A6%25C3%2587%2520Castello%25C2%25A6%25C3%25BC%2520+%2520Jose%25C2%25A6%25C3%25BC%2520Antonio%2520Molina_photo%2520-%25C2%25AE%2520Maria%25C2%25A6%25C3%2587%2520Castello%25C2%25A6%25C3%25BC.jpg",
    },
    {
        "post_id": 84,
        "url": "https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg",
    },
    {
        "post_id": 84,
        "url": "https://ultimastatus.com/wp-content/uploads/2021/06/dog-love-quotes-3.jpg",
    },
    {
        "post_id": 85,
        "url": "https://images.squarespace-cdn.com/content/v1/5999b55abe6594fce2334596/1560180575998-1UNAZVRZSY8VSEMKTJFR/Photographs+of+New+York+City.jpg",
    },
    {
        "post_id": 85,
        "url": "https://www.thewholeworldisaplayground.com/wp-content/uploads/2018/06/New-York-City-Best-Instagram-Spots-8.webp",
    },
    {
        "post_id": 86,
        "url": "https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?cs=srgb&dl=pexels-pixabay-247431.jpg&fm=jpg",
    },
    {
        "post_id": 87,
        "url": "https://imageio.forbes.com/specials-images/imageserve/60bb9a03824a727e00a753d1/A-lion-cub-playing-on-the-carcass-of-a-giraffe-/960x0.jpg?format=jpg&width=960",
    },
    {
        "post_id": 87,
        "url": "https://www.viewbug.com/media/mediafiles/2013/06/02/3589143_large1300.jpg",
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
