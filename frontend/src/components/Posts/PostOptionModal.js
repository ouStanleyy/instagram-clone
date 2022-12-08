import styles from "./PostOptionModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updatePost, deletePost } from "../../store/posts";
import Modal from "../../context/Modal";
import { EditPost } from "./EditPost";
import { useState } from "react";

const PostOptionModal = ({ postId, toggleOptionModal, toggleEditModal }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.posts[postId]);
  const isOwner = post?.user_id === user.id;
  // const [showEditModal, setShowEditModal] = useState(false);

  // const toggleEdit = () => {
  //   // toggleModal();
  //   setShowEditModal((prev) => !prev);
  // };

  const redirectToPost = (e) => {
    e.preventDefault();
    history.push(`/posts/${post?.id}`);
  };

  const toggleOptions = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", post?.caption);

    if (e.target.id === "likes") {
      formData.append("show_like_count", !post?.show_like_count);
      formData.append("allow_comments", post?.allow_comments);
      await dispatch(updatePost(post?.id, formData));
    }

    if (e.target.id === "comments") {
      formData.append("allow_comments", !post?.allow_comments);
      formData.append("show_like_count", post?.show_like_count);
      await dispatch(updatePost(post?.id, formData));
    }
  };

  const handleDeletePost = async () => {
    await dispatch(deletePost(post?.id));
    toggleOptionModal();
    history.push("/");
  };

  return isOwner ? (
    <>
      <div className={styles.postOptionContainer}>
        <div className={styles.redButton} onClick={handleDeletePost}>
          Delete
        </div>
        <div onClick={toggleEditModal}>Edit</div>
        <div onClick={toggleOptions} id={"likes"}>
          {post?.show_like_count ? "Hide" : "Unhide"} like count
        </div>
        <div onClick={toggleOptions} id={"comments"}>
          Turn {post?.allow_comments ? "off" : "on"} commenting
        </div>
        <div onClick={redirectToPost}>Go to post</div>
        <div onClick={toggleOptionModal}>Cancel</div>
      </div>
    </>
  ) : (
    <div className={styles.postOptionContainer}>
      <div className={styles.redButton}>Unfollow</div>
      <div onClick={redirectToPost}>Go to post</div>
      <div>Copy link</div>
      <div onClick={toggleOptionModal}>Cancel</div>
    </div>
  );
};

export default PostOptionModal;
