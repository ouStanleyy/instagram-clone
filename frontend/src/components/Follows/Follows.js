import FollowersList from "./FollowersList";
import FollowingList from "./FollowingList";
import styles from "./Follows.module.css";

function Follows({ followType, userId, onClose }) {
  return (
    <>
      <div className={styles.followsContainer}>
        <h3 className={styles.title}>{followType}</h3>
        {followType === "Followers" ? (
          <FollowersList userId={userId} onClose={onClose} />
        ) : (
          <FollowingList userId={userId} onClose={onClose} />
        )}
      </div>
    </>
  );
}

export default Follows;
