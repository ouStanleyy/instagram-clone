import { useSelector } from "react-redux";
import FollowersList from "./FollowersList";
import FollowingList from "./FollowingList";
import styles from "./Follows.module.css";

function Follows({ followType, userId, onClose }) {
  const currUser = useSelector((state) => state.session.user);

  return (
    <div className={styles.followsContainer}>
      <h3 className={styles.title}>{followType}</h3>
      {followType === "Followers" ? (
        <FollowersList userId={userId} currUser={currUser} onClose={onClose} />
      ) : (
        <FollowingList userId={userId} currUser={currUser} onClose={onClose} />
      )}
    </div>
  );
}

export default Follows;
