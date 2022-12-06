import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsFeed } from "../../store/posts";
import { PostFeedCard } from "../Posts";
import styles from "./Feed.module.css";
import { UsersList } from "../Users";
import { ProfilePicture } from "../Elements";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { StoryCarousel } from "../Stories";
// import { getFollowing } from "../../store/session";

const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) => Object.values(state?.posts));

  useEffect(() => {
    (async () => {
      await dispatch(getPostsFeed());
      // await dispatch(getFollowing(user?.id));
    })();
  }, [dispatch]);

  return (
    <div className={styles.feedLayout}>
      <div className={styles.feed}>
        <StoryCarousel stories={""} />
        {posts?.map((post, idx) => (
          <PostFeedCard post={post} key={idx} />
        ))}
      </div>
      <div className={styles.sideSection}>
        <div className={styles.userCard}>
          <div className={styles.userInfoContainer}>
            <ProfilePicture user={user} size={"large"} />
            <div className={styles.userInfo}>
              <Link to={`/users/${user.id}`}>
                <span className={styles.username}>{user?.username}</span>
              </Link>
              <div className={styles.fullname}>{user?.full_name}</div>
            </div>
          </div>
          <div className={styles.switchButton}>Switch</div>
        </div>
        <UsersList />
        <Footer />
      </div>
    </div>
  );
};

export default Feed;
