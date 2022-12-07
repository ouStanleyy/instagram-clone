import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers } from "../../store/follows";
import FollowerUser from "./FollowerUser";
import styles from "./Notification.module.css";

const Notification = ({ hideNotification }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const followers = useSelector((state) =>
    Object.values(state.follows.followers)
  );
  const pendingFollowers = followers.filter(
    (follower) => follower?.is_pending == true
  );

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getFollowers(user?.id));
      } catch (err) {}
    })();
  }, [dispatch, user?.id]);

  return (
    <div
      className={`${styles.notifContainer} ${
        hideNotification && styles.hideNotification
      }`}
    >
      <div className={styles.notifHeader}>
        <span className={styles.notifLabel}>Notifications</span>
      </div>
      {pendingFollowers.map((follow) => {
        return (
          <FollowerUser
            follow_id={follow?.id}
            follower_id={follow?.follower_id}
          />
        );
      })}
    </div>
  );
};

export default Notification;
