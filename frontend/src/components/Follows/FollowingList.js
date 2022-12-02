import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowing } from "../../store/follows";
import FollowUser from "./FollowUser";
// import styles from "./Followers.module.css";

function FollowingList({ userId, currUser, onClose }) {
  const dispatch = useDispatch();
  const following = useSelector((state) =>
    Object.values(state.follows.following)
  ).sort(({ following_id }) => (following_id === currUser.id ? -1 : 0));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getFollowing(userId));
        setLoaded(true);
      } catch (err) {}
    })();
  }, [dispatch, userId]);

  return (
    loaded &&
    following
      .filter((follow) => !follow.is_pending)
      .map((follow) => {
        return (
          <FollowUser
            key={follow.id}
            followId={follow.following_id}
            currUser={currUser}
            onClose={onClose}
          />
        );
      })
  );
}

export default FollowingList;
