import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createComment } from "../../store/comments";
import styles from "./Comment.module.css";
// import styleSvg from "../NavBar/NavItem.module.css";
import EmojiWindow from "./EmojiWindow";
// import CommentsForm from "./CmContainer";
// import { createReply } from "../../store/replies";

const InputContainer = ({ post, cmInputRef}) => {
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

  // const handleComment = (e)=>{
  //   setComment({
  //     comment: e.target.value

  //   })
  // }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <div className={styles.emojiInput}>
          <svg
            className={styles.emojiIcon}
            aria-label="Emoji"
            class="_ab6-"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
          </svg>
          {/* <img
            className={styles.emojiIcon}
            alt="emoji window"
            aria-expanded={emojiWindow ? "true" : "false"}
            onClick={() => setEmojiWindow((prev) => !prev)}
            src="https://cdn2.iconfinder.com/data/icons/instagram-outline/19/15-512.png"
          /> */}
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
