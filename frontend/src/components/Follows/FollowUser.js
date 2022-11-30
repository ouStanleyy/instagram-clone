import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../store/users";
import { ProfilePicture } from "../Elements";
import styles from "./FollowUser.module.css";

function FollowUser({ followId, onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[followId]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getUserById(followId));
      } catch (err) {}
    })();
  }, [dispatch, followId]);

  return (
    <>
      <ProfilePicture user={user} size={"large"} onClose={onClose} />
      <p className={styles.username}>{user?.username}</p>
      <p className={styles.fullName}>{user?.full_name}</p>
    </>
  );
}

export default FollowUser;
