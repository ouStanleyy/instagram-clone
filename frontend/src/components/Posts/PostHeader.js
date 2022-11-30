import styles from "./PostHeader.module.css";
import ProfilePicture from "../Elements/ProfilePIcture";
import { Link } from "react-router-dom";

const PostHeader = ({ user }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.profile}>
        <ProfilePicture user={user} size={"medium"} />
        <Link to={`/users/${user?.id}`}>
          <span className={styles.username}>{user?.username}</span>
        </Link>
        <span>
          {user?.is_verified && (
            <img
              alt="verified"
              className={styles.blueCheck}
              referrerPolicy="origin-when-cross-origin"
              src="https://static.xx.fbcdn.net/assets/?revision=1889448554733237&amp;name=ig-verifiedbadge-shared&amp;density=1"
            />
          )}
        </span>
      </div>
      <button className={styles.moreButton}>
        <svg
          aria-label="More options"
          class="_ab6-"
          color="#262626"
          fill="#262626"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <circle cx="12" cy="12" r="1.5"></circle>
          <circle cx="6" cy="12" r="1.5"></circle>
          <circle cx="18" cy="12" r="1.5"></circle>
        </svg>
      </button>
    </div>
  );
};

export default PostHeader;
