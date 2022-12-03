import { useDispatch } from "react-redux";
import { unfollowUser } from "../../store/session";
import { ProfilePicture } from "../Elements";
import styles from "./UnfollowModal.module.css";

function UnfollowModal({ user, follow, onClose }) {
  const dispatch = useDispatch();

  const unFollowHandler = (e) => {
    e.preventDefault();
    dispatch(unfollowUser(follow.id));
    onClose();
  };

  return (
    <div className={styles.unfollowModalContainer}>
      <div className={styles.header}>
        <ProfilePicture user={user} size="xlarge" />
        <p className={styles.unfollowMessage}>
          {user.is_private
            ? `If you change your mind, you'll have to request to follow @${user.username} again.`
            : `Unfollow @${user.username}?`}
        </p>
      </div>
      <div onClick={unFollowHandler} className={styles.unfollowButton}>
        Unfollow
      </div>
      <div onClick={onClose} className={styles.cancelButton}>
        Cancel
      </div>
    </div>
  );
}

export default UnfollowModal;
