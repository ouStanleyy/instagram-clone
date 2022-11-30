import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers } from "../../store/follows";
import FollowUser from "./FollowUser";
// import styles from "./Followers.module.css";

function FollowersList({ userId, onClose }) {
  const dispatch = useDispatch();
  const followers = useSelector((state) =>
    Object.values(state.follows.followers)
  );

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getFollowers(userId));
      } catch (err) {}
    })();
  }, [dispatch, userId]);

  return (
    <>
      {followers
        .filter((follow) => !follow.is_pending)
        .map((follow) => {
          return (
            <div key={follow.id}>
              <FollowUser followId={follow.follower_id} onClose={onClose} />
            </div>
          );
        })}
    </>
  );
}

export default FollowersList;
