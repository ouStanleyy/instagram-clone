import styles from "./LikeBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadAllLikes, createLike, deleteLikeThunk } from "../../store/likes";
import { getDate } from "../Utill";
import LikesModal from "./LikesModal";
import { Modal } from "../../context/Modal";
import { ProfilePicture } from "../Elements";

const LikeBar = ({ post, onInputClick, showDate = false, hideLikeCount }) => {
  const dispatch = useDispatch();
  const allLikes = useSelector((state) => Object.values(state.likes));
  const user = useSelector((state) => state.session.user);
  const likes = allLikes?.filter((like) => like?.post_id === post?.id);
  const firstLiker = likes[0]?.username;
  const firstLiker_pp = likes[0]?.profile_picture;
  const liked = likes?.filter(
    (like) => like?.user_id === user?.id && like?.post_id === post?.id
  );

  const [likesModal, setLikesModal] = useState(false);

  // const handleShare = (e) => {
  //   e.preventDefault();
  //   // const url = window.location.href.split(".com/");
  //   // url[1] = `/posts/${post.id}`;
  //   const url = `http://localhost:3000/posts/${post.id}`;
  //   navigator.clipboard.writeText(url);
  //   console.log("HERE", window.location.hostname);
  // };

  useEffect(() => {
    (async () => {
      await dispatch(loadAllLikes(post?.id));
    })();
  }, [dispatch, post?.id]);

  const like = () => {
    dispatch(createLike(post?.id));
  };

  const unlike = () => {
    dispatch(deleteLikeThunk(post?.id));
  };

  const toggleLikesModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLikesModal((state) => !state);
  };

  return (
    <div className={styles.likeBarContainer}>
      <div className={styles.icons}>
        {!liked.length && (
          <svg
            id={styles.svg}
            aria-label="Like"
            // class="_ab6-"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
            onClick={like}
          >
            <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
          </svg>
        )}
        {liked.length > 0 && (
          <svg
            id={styles.svg}
            aria-label="Unlike"
            // class="_ab6-"
            color="#ed4956"
            fill="#ed4956"
            height="24"
            role="img"
            viewBox="0 0 48 48"
            width="24"
            onClick={unlike}
          >
            <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
          </svg>
        )}
        <svg
          id={styles.svg}
          aria-label="Comment"
          // class="_ab6-"
          color="#262626"
          fill="#262626"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
          onClick={onInputClick}
        >
          <path
            d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
        </svg>
        <svg
          // onClick={handleShare}
          id={styles.svg}
          aria-label="Share Post"
          // class="_ab6-"
          color="#262626"
          fill="#262626"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <line
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="22"
            x2="9.218"
            y1="3"
            y2="10.083"
          ></line>
          <polygon
            fill="none"
            points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
          ></polygon>
        </svg>
      </div>

      <div>
        {likes.length === 0 && (
          <div className={styles.likesLabelDiv}>
            <span className={styles.likesLabel}>
              Be the first to
              <span className={styles.likesLabelBold}>like this</span>
            </span>
          </div>
        )}
        {likes.length > 0 &&
          (likes.length > 1 ? (
            <div className={styles.likesLabelDiv}>
              <span className={styles.likesLabel}>
                <span>
                  <img
                    className={styles.profileSmall}
                    onClick={toggleLikesModal}
                    src={
                      firstLiker_pp ||
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png?20220226140232"
                    }
                    alt={"profile"}
                  />
                </span>
                Liked by
                <span className={styles.likesLabelBold}>{firstLiker}</span> and
                {!hideLikeCount && <span className={styles.likesLabelBold}>
                  {likes.length - 1}
                </span>}{" "}
                others
              </span>
            </div>
          ) : (
            <div className={styles.likesLabelDiv}>
              <span className={styles.likesLabel}>
                <span>
                <img
                    className={styles.profileSmall}
                    onClick={toggleLikesModal}
                    src={
                      firstLiker_pp ||
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png?20220226140232"
                    }
                    alt={"profile"}
                  />
                </span>
                Liked by
                <span className={styles.likesLabelBold}>{firstLiker}</span>
              </span>
            </div>
          ))}
      </div>
      <div className={styles.timeStampDiv}>
        <span className={styles.timeStamp}>
          {showDate && `${getDate(post?.created_at)}`}
        </span>
      </div>
      {likesModal && (
        <Modal onClose={toggleLikesModal}>
          <LikesModal
            likes={likes}
            onClose={toggleLikesModal}
            currUser={user}
          />
        </Modal>
      )}
    </div>
  );
};

export default LikeBar;
