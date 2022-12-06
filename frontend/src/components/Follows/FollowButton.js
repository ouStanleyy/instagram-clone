import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { followUser, getFollowing } from "../../store/session";
import styles from "./FollowButton.module.css";
import UnfollowModal from "./UnfollowModal";
import suggestionStyles from "./Suggestion.module.css"

function FollowButton({ user, isSuggestion = false}) {
  const dispatch = useDispatch();
  const follow = useSelector((state) =>
    Object.values(state.session.following)
  ).find((follow) => follow.following_id === user?.id);
  const isFollowing = follow?.id;
  const [loaded, setLoaded] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);

  const followingHandler = (e) => {
    e.preventDefault();
    setFollowingModal(true);
  };

  const followHandler = (e) => {
    e.preventDefault();
    dispatch(followUser(user?.id));
  };

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
      <>
        <button
          className={`${!isSuggestion && styles[isFollowing ? "followingButton" : "followButton"]} ${isSuggestion && suggestionStyles[isFollowing ? "followingButton" : "followButton"]}`}
          onClick={isFollowing ? followingHandler : followHandler}
        >
          {isFollowing
            ? follow.is_pending
              ? "Requested"
              : "Following"
            : "Follow"}
        </button>
        {followingModal && (
          <Modal onClose={() => setFollowingModal(false)}>
            <UnfollowModal
              user={user}
              follow={follow}
              onClose={() => setFollowingModal(false)}
            />
          </Modal>
        )}
      </>
    )
  );
}

export default FollowButton;
