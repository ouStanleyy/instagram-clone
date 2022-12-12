import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsFeed, getMorePostsFeed } from "../../store/posts";
import { PostFeedCard } from "../Posts";
import styles from "./Feed.module.css";
import { UsersList } from "../Users";
import { ProfilePicture } from "../Elements";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { StoryCarousel } from "../Stories";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
import NoFollowing from "./NoFollowing";

const Feed = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const following = useSelector((state) =>
    Object.values(state.session.following)
  );
  const posts = useSelector((state) => Object.values(state?.posts));
  const orderedPosts = posts?.sort((a, b) => b.id - a.id);

  // For first mount only, grab inital pages
  // Add debounce to allow only the latest event to trigger dispatch
  useEffect(() => {
    dispatch(getPostsFeed(page));
    const onScroll = debounce(handleScrollFetch, 100);
    document.addEventListener("scroll", onScroll);
    setIsLoaded(true);

    return () => document.removeEventListener("scroll", onScroll);
  }, [dispatch]);

  // For every page update, grab more pages
  useEffect(() => {
    dispatch(getMorePostsFeed(page));
  }, [dispatch, page]);

  const handleLogout = async (e) => {
    await dispatch(logout());
    history.push("/");
  };

  const handleScrollFetch = () => {
    const fetchMorePosts = () => {
      const windowHeight = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (windowHeight + clientHeight >= scrollHeight)
        setPage((prev) => ++prev);
    };
    fetchMorePosts();
  };

  return (
    isLoaded &&
    (following.length > 0 ? (
      <div className={styles.feedLayout}>
        <div className={styles.feed}>
          <StoryCarousel stories={""} />
          {orderedPosts?.map((post, idx) => {
            return <PostFeedCard post={post} key={idx} />;
          })}
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
            <div className={styles.switchButton} onClick={handleLogout}>
              Switch
            </div>
          </div>
          <UsersList />
          <Footer />
        </div>
      </div>
    ) : (
      <NoFollowing />
    ))
  );
};

export default Feed;
