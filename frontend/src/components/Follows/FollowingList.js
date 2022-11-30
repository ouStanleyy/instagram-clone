import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowing } from "../../store/follows";
import FollowUser from "./FollowUser";
// import styles from "./Followers.module.css";

function FollowingList({ userId, onClose }) {
  const dispatch = useDispatch();
  const following = useSelector((state) =>
    Object.values(state.follows.following)
  );

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getFollowing(userId));
      } catch (err) {}
    })();
  }, [dispatch, userId]);

  return (
    <>
      {following
        .filter((follow) => !follow.is_pending)
        .map((follow) => {
          return (
            <div key={follow.id}>
              <FollowUser followId={follow.following_id} onClose={onClose} />
            </div>
          );
        })}
    </>
  );
}

export default FollowingList;
