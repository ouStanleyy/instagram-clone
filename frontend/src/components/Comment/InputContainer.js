import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { createComment } from "../../store/comments";
import styles from "./Comment.module.css";
// import styleSvg from "../NavBar/NavItem.module.css";
import EmojiWindow from "./EmojiWindow";
// import CommentsForm from "./CmContainer";

const InputContainer = ({ post, cmInputRef }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { id } = user;
  const [comment, setComment] = useState("");
  // const [errors, setErrors] = useState([]);
  const [emojiWindow, setEmojiWindow] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { comment, user_id: id };

    dispatch(createComment(payload, post.id));
    setComment("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <div className={styles.emojiInput}>
          <img
            className={styles.emojiIcon}
            alt="emoji window"
            aria-expanded={emojiWindow ? "true" : "false"}
            onClick={() => setEmojiWindow((prev) => !prev)}
            src="https://cdn2.iconfinder.com/data/icons/instagram-outline/19/15-512.png"
          />
          <EmojiWindow emojiWindow={emojiWindow} />
        </div>
        <input
          className={styles.commentInput}
          placeholder="Add a comment..."
          value={comment}
          ref={cmInputRef}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button
        className={`${styles.postComment} ${
          !comment.length && styles.disablePost
        }`}
        type="submit"
        disabled={!comment.length}
      >
        Post
      </button>
    </form>
  );
};

export default InputContainer;
