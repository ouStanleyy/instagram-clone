import { ProfilePicture } from "../../Elements";
import MediaCarousel from "../MediaCarousel";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../../store/posts";
import styles from "./EditPost.module.css";

const EditPost = ({ post, toggleEditModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [charCount, setCharCount] = useState(post?.caption?.length);
  const [caption, setCaption] = useState(post?.caption);

  const updateCaption = (e) => {
    setCaption(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleUpdateCaption = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("allow_comments", post?.allow_comments);
    formData.append("show_like_count", post?.show_like_count);
    dispatch(updatePost(post?.id, formData));
    toggleEditModal();
  };

  return (
    <div className={styles.editPostContainer}>
      <div className={styles.containerHeader}>
        <button onClick={toggleEditModal}>Cancel</button>
        <h1>Edit Info</h1>
        <button onClick={handleUpdateCaption} className={styles.doneButton}>
          Done
        </button>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.mediaCarouselContainer}>
          <MediaCarousel medias={post?.media} />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.userCard}>
            <ProfilePicture user={user} size="small" />
            <span className={styles.username}>{user?.username}</span>
          </div>
          <div className={styles.textAreaContainer}>
            <textarea
              className={styles.caption}
              maxLength={2200}
              rows={7}
              value={caption}
              onChange={updateCaption}
            />
            <span className={styles.charCount}>{charCount}/2200</span>
          </div>
          {/* <span className={styles.charCount}>{charCount}/2200</span> */}
        </div>
      </div>
    </div>
  );
};

export default EditPost;
