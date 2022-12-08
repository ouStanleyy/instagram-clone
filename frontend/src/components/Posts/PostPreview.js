import { useState } from "react";
import styles from "./PostPreview.module.css";
import { NavLink } from "react-router-dom";
import { Modal } from "../../context/Modal";
import PostDetailCard from "./PostDetailCard";

const PostPreview = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const commentPreview = post?.comments?.[post?.comments?.length - 1];

  const handleToggleModal = () => setShowModal((prev) => !prev);

  return (
    <div className={styles.previewContainer}>
      <div className={styles.captionContainer}>
        <NavLink to={`/users/${post?.user_id}`} className={styles.username}>
          {post?.user?.username}
        </NavLink>
        {post?.caption}
      </div>
      <div className={styles.captionContainer}>
        <NavLink
          to={`/users/${commentPreview?.user_id}`}
          className={styles.username}
        >
          {commentPreview?.user?.username}
        </NavLink>
        {commentPreview?.comment}
      </div>
      {post?.num_of_comments > 0 && (
        <button
          className={styles.viewCommentsButton}
          onClick={handleToggleModal}
        >
          View all {post?.num_of_comments} comments
        </button>
      )}
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <PostDetailCard postId={post.id} />
        </Modal>
      )}
    </div>
  );
};

export default PostPreview;
