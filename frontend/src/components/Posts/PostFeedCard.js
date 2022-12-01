import MediaCarousel from "./MediaCarousel";
import PostHeader from "./PostHeader";
import styles from "./PostFeedCard.module.css";
import { InputContainer, CmContainer, LikeBar } from "../Comment";
import { Modal } from "../../context/Modal";
import { useState } from "react";
import PostDetailCard from "./PostDetailCard";
import { NavLink } from "react-router-dom";
import PostPreview from "./PostPreview";

const PostFeedCard = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const commentPreview = post?.comments?.[0];

  const handleToggleModal = () => setShowModal((prev) => !prev);

  return (
    <div className={styles.cardContainer}>
      <PostHeader user={post?.user} createdAt={post?.created_at} />
      <MediaCarousel medias={post?.media} />
      <LikeBar post={post} />
      {/* <div className={styles.captionContainer}>
        <NavLink to={`/users/${post?.user_id}`} className={styles.username}>
          {post?.user?.username}
        </NavLink>
        <span className={styles.caption}>{post?.caption}</span>
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
      <InputContainer post={post} />
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <PostDetailCard postId={post.id} />
        </Modal>
      )} */}
      <PostPreview post={post} />
      <InputContainer post={post} />
    </div>
  );
};

export default PostFeedCard;
