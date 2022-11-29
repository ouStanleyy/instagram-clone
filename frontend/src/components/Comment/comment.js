import { NavLink } from "react-router-dom";
import styles from "./Comment.module.css";

const Comment = ({ comment }) => {
  return (
    <form>
      <div className={styles.container}>
        <div className={styles.profilePicture}>
          <img src={comment.user.profile_picture} alt={comment.user.username} />
        </div>
        <div>
          <div className={styles.textContainer}>
            <span className={styles.username}>{comment.user.username}</span>
            <span className={styles.comment}>{comment.comment}</span>
          </div>
          <div className={styles.replyContainer}>
            <NavLink className={styles.reply} to="">
              Reply
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Comment;
