import ExploreItem from "./ExploreItem";
import styles from "./Explore.module.css";
import { useEffect } from "react";
import { getPostsExplore } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
// import { debounce } from "lodash";

const Explore = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => Object.values(state?.posts));
  // const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPostsExplore());
    // const getMorePosts = debounce(() => handleScrollFetch(), 100);
    // document.addEventListener("scroll", getMorePosts);

    // return () => document.removeEventListener("scroll", getMorePosts);
  }, [dispatch]);

  // For every page update, grab more pages
  // useEffect(() => {
  //   dispatch(getMorePostsExplore(page));
  // }, [page]);

  // const handleScrollFetch = (e) => {
  //   const fetchMorePosts = () => {
  //     const windowHeight = document.documentElement.scrollTop;
  //     const clientHeight = document.documentElement.clientHeight;
  //     const scrollHeight = document.documentElement.scrollHeight;

  //     if (windowHeight + clientHeight + 500 >= scrollHeight)
  //       setPage((prev) => ++prev);
  //   };
  //   fetchMorePosts();
  // };

  return (
    <div className={styles.exploreContainer}>
      {posts?.map((post, idx) => {
        return <ExploreItem post={post} key={idx} />;
      })}
    </div>
  );
};

export default Explore;
