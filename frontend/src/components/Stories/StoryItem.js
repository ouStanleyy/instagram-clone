import { ProfilePicture } from "../Elements";
import styles from "./StoryItem.module.css";

const StoryItem = ({ user }) => {
  return (
    <div className={styles.storyItemContainer}>
      <ProfilePicture user={user} sizes={"large"} hasStory={true} />
      <span className={styles.username}>{user?.username}</span>
    </div>
  );
};

export default StoryItem;
