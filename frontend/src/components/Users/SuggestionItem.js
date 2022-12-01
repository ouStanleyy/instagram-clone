import { ProfilePicture } from "../Elements";
import { Link } from "react-router-dom";
import styles from "./SuggestionItem.module.css";

const SuggestionItem = ({ user }) => {
  return (
    <div className={styles.suggestionContainer}>
      <div className={styles.userInfo}>
        <ProfilePicture user={user} size={"medium"} />
        <Link to={`/users/${user.id}`}>
          <span className={styles.username}>{user?.username}</span>
        </Link>
      </div>
      <div className={styles.follow}>Follow</div>
    </div>
  );
};

export default SuggestionItem;
