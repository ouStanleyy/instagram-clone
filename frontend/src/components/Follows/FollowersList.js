import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers } from "../../store/follows";
import FollowUser from "./FollowUser";
// import styles from "./Followers.module.css";

function FollowersList({ userId, onClose }) {
  const dispatch = useDispatch();
  const followers = useSelector((state) =>
    Object.values(state.follows.followers)
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getFollowers(userId));
        setLoaded(true);
      } catch (err) {}
    })();
  }, [dispatch, userId]);

  return (
    loaded && (
      <>
        {followers
          .filter((follow) => !follow.is_pending)
          .map((follow) => {
            return (
              <FollowUser
                key={follow.id}
                followId={follow.follower_id}
                onClose={onClose}
              />
            );
          })}
      </>
    )
  );
}

export default FollowersList;
