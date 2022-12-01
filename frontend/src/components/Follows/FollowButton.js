import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowing } from "../../store/session";
import styles from "./FollowButton.module.css";

function FollowButton({ user }) {
  const dispatch = useDispatch();
  const isFollowing = useSelector((state) =>
    Object.values(state.session.following)
  ).filter((follow) => follow.following_id === user.id).length;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getFollowing());
        setLoaded(true);
      } catch (err) {}
    })();
  }, [dispatch]);

  return (
    loaded && (
      <button
        className={styles[isFollowing ? "followingButton" : "followButton"]}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    )
  );
}

export default FollowButton;
