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
      <div className={styles.postInfo}>
        <LikeBar post={post} />
        <PostPreview post={post} />
      </div>
      <InputContainer post={post} />
    </div>
  );
};

export default PostFeedCard;
