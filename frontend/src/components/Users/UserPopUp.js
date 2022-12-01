import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserById } from "../../store/users";
import { ProfilePicture } from "../Elements";
import styles from "./UserPopUp.module.css";

function UserPopUp({ userId, onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[userId]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getUserById(userId));
      } catch (err) {}
      setLoaded(true);
    })();
  }, [dispatch, userId]);

  return (
    loaded && (
      <>
        <div className={styles.userHeader}>
          <ProfilePicture user={user} size={"large"} onClose={onClose} />
          <div className={styles.userDetails}>
            <p onClick={onClose} className={styles.username}>
              <Link to={`/users/${userId}`}>{user?.username}</Link>
            </p>
            <p className={styles.fullName}>{user?.full_name}</p>
          </div>
        </div>
        <div className={styles.detailsStats}>
          <p>
            <span>{user?.posts?.length}</span> posts
          </p>
          <p>
            <span>{user?.num_of_followers}</span> followers
          </p>
          <p>
            <span>{user?.num_of_followings}</span> following
          </p>
        </div>
        <div className={styles.postsContainer}>
          {user?.posts?.slice(0, 3).map((post) => {
            return (
              <div key={post.id} className={styles.postContainer}>
                <Link to={`/posts/${post.id}`}>
                  <img
                    src={post.preview_media}
                    alt="preview media"
                    className={styles.previewMedia}
                  />
                </Link>
              </div>
            );
          })}
        </div>
        <div className={styles.userFooter}>
          <button>Message</button>
          <button>Following</button>
        </div>
      </>
    )
  );
}
export default UserPopUp;
