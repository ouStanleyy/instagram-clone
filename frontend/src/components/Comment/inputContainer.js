import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createComment } from "../../store/comments";
import styles from "./Comment.module.css";
// import styleSvg from "../NavBar/NavItem.module.css";
import EmojiWindow from "./EmojiWindow";
// import CommentsForm from "./CmContainer";

const InputContainer = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // let post_id = 1
  const { id } = user;
  const [comment, setComment] = useState("");
  // const [errors, setErrors] = useState([]);
  const [emojiWindow, setEmojiWindow] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { comment, user_id: id };
    console.log("HERE", post.id);
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
          onChange={(e) => setComment(e.target.value)}
        />
        <button className={styles.postComment} type="submit">
          Post
        </button>
      </div>
    </form>
  );
};

export default InputContainer;
