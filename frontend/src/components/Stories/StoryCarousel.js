import styles from "./StoryCarousel.module.css";
import { useSelector } from "react-redux";
import { ProfilePicture } from "../Elements";
import StoryItem from "./StoryItem";

const StoryCarousel = () => {
  /* For now, carousel for the followings, then replace for just stories */
  const followings = useSelector((state) =>
    Object.values(state.session.following).filter((user) => !user.is_pending)
  );

  return (
    <div className={styles.storyCarouselContainer}>
      {followings.map((user) => {
        return <StoryItem user={user?.following_user} />;
      })}
    </div>
  );
};

export default StoryCarousel;
