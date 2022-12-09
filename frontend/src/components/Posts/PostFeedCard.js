import MediaCarousel from "./MediaCarousel";
import PostHeader from "./PostHeader";
import styles from "./PostFeedCard.module.css";
import { InputContainer, LikeBar } from "../Comment";
import PostPreview from "./PostPreview";
import { useState } from "react";
import PostOptionModal from "./PostOptionModal";
import { Modal } from "../../context/Modal";

const PostFeedCard = ({ post }) => {
  const [showOptionModal, setShowOptionModal] = useState(false);
  const toggleOptionModal = () => setShowOptionModal((prev) => !prev);

  return (
    <>
      <div className={styles.cardContainer}>
        <PostHeader
          user={post?.user}
          createdAt={post?.created_at}
          toggleOptionModal={toggleOptionModal}
        />
        <MediaCarousel medias={post?.media} />
        <div className={styles.postInfo}>
          <LikeBar post={post} />
          <PostPreview post={post} />
        </div>
        <InputContainer post={post} />
      </div>
      {showOptionModal && (
        <Modal onClose={toggleOptionModal}>
          <PostOptionModal post={post} toggleOptionModal={toggleOptionModal} />
        </Modal>
      )}
    </>
  );
};

export default PostFeedCard;
