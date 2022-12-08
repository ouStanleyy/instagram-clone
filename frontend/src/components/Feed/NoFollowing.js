import styles from "./NoFollowing.module.css";
import { Link } from "react-router-dom";

const NoFollowing = () => {
  return (
    <div className={styles.noFollowingContainer}>
      <span>You are currently not following any users!</span>
      <span>
        Start <Link to="/explore">exploring</Link> users to follow
      </span>
    </div>
  );
};

export default NoFollowing;
