import { icons } from "../NavBar/icons";
import styles from "./Comment.module.css";

const LikeBar = ({ post }) => {
  return (
    <div className={styles.likesDiv}>
      <div id={styles.likeButton}>{icons["Notifications"]}</div>
    </div>
  );
};

export default LikeBar;
