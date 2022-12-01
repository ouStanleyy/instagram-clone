import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../store/users";
import { ProfilePicture } from "../Elements";
import { UserPopUp } from "../Users";
import styles from "./FollowUser.module.css";

function FollowUser({ followId, onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[followId]);
  const [loaded, setLoaded] = useState(false);
  const [userPopUp, setUserPopUp] = useState(false);
  const [overPopUp, setOverPopUp] = useState(false);
  const [overUser, setOverUser] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => (overUser || overPopUp ? setUserPopUp(true) : setUserPopUp(false)),
      400
    );

    return () => clearTimeout(timeout);
  }, [overUser, overPopUp]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getUserById(followId));
        setLoaded(true);
      } catch (err) {}
    })();
  }, [dispatch, followId]);

  return (
    loaded && (
      <div className={styles.userContainer}>
        <div
          onMouseEnter={() => setOverUser(true)}
          onMouseLeave={() => setOverUser(false)}
          className={styles.profilePicture}
        >
          <ProfilePicture user={user} size={"large"} onClose={onClose} />
        </div>
        <div className={styles.userDetails}>
          <p
            onMouseEnter={() => setOverUser(true)}
            onMouseLeave={() => setOverUser(false)}
            className={styles.username}
          >
            {user?.username}
          </p>
          <p className={styles.fullName}>{user?.full_name}</p>
        </div>
        <button className={styles.followButton}>Following</button>
        {userPopUp && (
          <div
            onMouseEnter={() => setOverPopUp(true)}
            onMouseLeave={() => setOverPopUp(false)}
            className={styles.userPopUp}
          >
            <UserPopUp userId={user.id} onClose={onClose} />
          </div>
        )}
      </div>
    )
  );
}

export default FollowUser;
