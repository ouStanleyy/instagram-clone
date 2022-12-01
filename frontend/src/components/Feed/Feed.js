import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsFeed } from "../../store/posts";
import { PostFeedCard } from "../Posts";
import styles from "./Feed.module.css";

const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => Object.values(state?.posts));

  useEffect(() => {
    (async () => {
      await dispatch(getPostsFeed());
    })();
  }, [dispatch]);

  return (
    <div className={styles.feedContainer}>
      {posts?.map((post, idx) => (
        <PostFeedCard post={post} key={idx} />
      ))}
    </div>
  );
};

export default Feed;
