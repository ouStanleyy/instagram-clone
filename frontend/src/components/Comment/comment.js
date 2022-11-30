import { NavLink } from "react-router-dom";
import styles from "./Comment.module.css";
import { useSelector } from "react-redux";

const Comment = ({ comment }) => {
    const user = useSelector((state) => state.session.user);
    const owner_id = useSelector((state) =>state.posts[comment?.post_id].user_id)
    const is_owner = (user.id == owner_id) || (user.id == comment.user_id)
    const handleDeleteComponent = ()=>{

    }
  return (
    <div className={styles.container}>
      <div className={styles.profilePicture}>
        <img
          src={comment?.user?.profile_picture}
          alt={comment?.user?.username}
        />

      </div>
      <div>
        <div className={styles.textContainer}>
          <span className={styles.username}>{comment?.user?.username}</span>
          <span className={styles.comment}>{comment?.comment}</span>
        </div>
        <div className={styles.replyContainer}>
          <span className={styles.reply} >
            Reply
          </span>
          {is_owner && <button
          onClick={handleDeleteComponent}
          className={styles.moreButton}>
            <svg
              aria-label="More options"
              class="_ab6-"
              color="#262626"
              fill="#262626"
              height="20"
              role="img"
              viewBox="0 0 24 24"
              width="20"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="6" cy="12" r="1"></circle>
              <circle cx="18" cy="12" r="1"></circle>
            </svg>
          </button>}
        </div>
      </div>
    </div>
  );
};

export default Comment;
