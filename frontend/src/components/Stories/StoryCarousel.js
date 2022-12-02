import styles from "./StoryCarousel.module.css";
import { getStoriesFeed } from "../../store/stories";
import { getFollowing } from "../../store/follows";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const StoryCarousel = () => {
  /* For now, carousel for the followings, then replace for just stories */
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // const stories = useSelector((state) => Object.values(state.stories));
  const followings = useSelector((state) =>
    Object.values(state.follows.following)
  );

  console.log(followings);
  useEffect(() => {
    (async () => {
      // await dispatch(getStoriesFeed(user.id));
      await dispatch(getFollowing(user.id));
    })();
  }, [dispatch]);

  return <div className={styles.storyCarouselContainer}></div>;
};

export default StoryCarousel;
