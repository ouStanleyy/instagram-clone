import ExploreItem from "./ExploreItem";
import styles from "./Explore.module.css";
import { useEffect } from "react";
import { getPostsExplore } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";

const Explore = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => Object.values(state?.posts));

  useEffect(() => {
    (async () => {
      await dispatch(getPostsExplore());
    })();
  }, [dispatch]);

  return (
    <div className={styles.exploreContainer}>
      {posts?.map((post) => {
        return <ExploreItem post={post} key={post.id} />;
      })}
    </div>
  );
};

export default Explore;
