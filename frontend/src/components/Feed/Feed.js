import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsFeed } from "../../store/posts";
import { PostFeedCard } from "../Posts";
import styles from "./Feed.module.css";
import { UsersList } from "../Users";
import { ProfilePicture } from "../Elements";
import usersReducer from "../../store/users";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) => Object.values(state?.posts));

  useEffect(() => {
    (async () => {
      await dispatch(getPostsFeed());
    })();
  }, [dispatch]);

  return (
    <div className={styles.feedLayout}>
      <div className={styles.feed}>
        STORIES CAROUSEL
        {posts?.map((post, idx) => (
          <PostFeedCard post={post} key={idx} />
        ))}
      </div>
      <div className={styles.sideSection}>
        <div className={styles.userCard}>
          <div className={styles.userInfo}>
            <ProfilePicture user={user} size={"large"} />
            <div>
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
