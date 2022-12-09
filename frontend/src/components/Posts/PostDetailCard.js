import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../store/posts";
import { useParams } from "react-router-dom";
import MediaCarousel from "./MediaCarousel";
import PostHeader from "./PostHeader";
import styles from "./PostDetailCard.module.css";
import { InputContainer, CmContainer, LikeBar } from "../Comment";
import PostOptionModal from "./PostOptionModal";
import { Modal } from "../../context/Modal";
import { EditPost } from "./EditPost";

const PostDetailCard = (props) => {
  const dispatch = useDispatch();
  const cmInputRef = useRef(null);
  const { postId } = useParams();
  const post = useSelector(
    (state) => state.posts[props.postId ? props.postId : postId]
  );
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const isStory = post?.is_story;

  const handleInputFocus = () => cmInputRef.current.focus();

  useEffect(() => {
    (async () => {
      await dispatch(getPostById(props.postId ? props.postId : postId));
    })();
  }, [dispatch]);

  const toggleOptionModal = () => setShowOptionModal((prev) => !prev);
  const toggleEditModal = () => {
    setShowEditModal((prev) => !prev);
    toggleOptionModal();
  };

  return isStory ? (
    <>404 Not Found</>
  ) : (
    <>
      <div className={styles.cardContainer}>
        <MediaCarousel medias={post?.media} />
        <div className={styles.info}>
          <PostHeader
            user={post?.user}
            post={post}
            toggleOptionModal={toggleOptionModal}
            toggleEditModal={toggleEditModal}
          />
          <CmContainer post={post} cmInputRef={cmInputRef} />
          <div className={styles.likes}>
            <LikeBar
              post={post}
              onInputClick={handleInputFocus}
              showDate={true}
            />
          </div>
          <InputContainer post={post} cmInputRef={cmInputRef} />
        </div>
      </div>
      {showOptionModal && (
        <Modal onClose={toggleOptionModal}>
          <PostOptionModal
            post={post}
            toggleOptionModal={toggleOptionModal}
            toggleEditModal={toggleEditModal}
          />
        </Modal>
      )}
      {showEditModal && (
        <Modal onClose={toggleEditModal}>
          <EditPost post={post} toggleEditModal={toggleEditModal} />
        </Modal>
      )}
    </>
  );
};

export default PostDetailCard;
