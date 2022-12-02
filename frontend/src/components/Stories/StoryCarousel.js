import styles from "./StoryCarousel.module.css";
import { useSelector } from "react-redux";

const StoryCarousel = () => {
  /* For now, carousel for the followings, then replace for just stories */
  const followings = useSelector((state) =>
    Object.values(state.follows.following)
  );

  return <div className={styles.storyCarouselContainer}></div>;
};

export default StoryCarousel;
