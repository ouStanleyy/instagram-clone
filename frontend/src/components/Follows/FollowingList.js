import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowing } from "../../store/follows";
import FollowUser from "./FollowUser";
// import styles from "./Followers.module.css";

function FollowingList({ userId, onClose }) {
  const dispatch = useDispatch();
  const following = useSelector((state) =>
    Object.values(state.follows.following)
  );
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
    loaded && (
      <>
        {following
          .filter((follow) => !follow.is_pending)
          .map((follow) => {
            return (
              <FollowUser
                key={follow.id}
                followId={follow.following_id}
                onClose={onClose}
              />
            );
          })}
      </>
    )
  );
}

export default FollowingList;
