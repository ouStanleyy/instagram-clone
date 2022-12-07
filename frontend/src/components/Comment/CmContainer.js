import { useDispatch, useSelector } from "react-redux";
import { loadAllComments } from "../../store/comments";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import styles from "./Comment.module.css";
import { ProfilePicture } from "../Elements";

const CmContainer = ({ post, cmInputRef }) => {
  const dispatch = useDispatch();
  let comments = useSelector((state) => Object.values(state.comments));
  // let comments = useSelector((state) => state.posts[post?.id]?.comments);
  const [deleteModal, setDeleteModal] = useState({});

  const toggleDeleteModal = (idx) => () => {
    setDeleteModal((state) => ({
      ...state,
      [idx]: !state[idx],
    }));
  };

  useEffect(() => {
    comments?.forEach((_, idx) => {
      setDeleteModal((state) => ({
        ...state,
        [idx]: false,
      }));
    });
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(loadAllComments(post?.id));
    })();
  }, [dispatch, post?.id]);

  return (
    <>
      {comments.length === 0 && (
        <div className={styles.cmContainer}>
          <div className={styles.noCmContainer}>
            <div className={styles.noCommentsDiv}>
              <span className={styles.noCommentsLabel}>No comments yet.</span>
            </div>
            <div>
              <span className={styles.startConLabel}>
                Start the conversation.
              </span>
            </div>
          </div>
        </div>
      )}
      {comments.length > 0 && (
        <div className={styles.cmContainer}>
          <div className={styles.cmHome}>
            <div className={styles.container}>
              <div className={styles.profilePicture}>
                {/* <img
                src={post?.user?.profile_picture}
                alt={post?.user?.username}
              /> */}
                <ProfilePicture user={post?.user} size={"medium"} />
              </div>
              <div className={styles.captionContainer}>
                <span className={styles.username}>{post?.user?.username}</span>
                <span className={styles.comment}>{post?.caption}</span>
              </div>
            </div>
            {comments?.map((comment, i) => {
              return (
                <Comment
                  key={i}
                  comment={comment}
                  toggleDeleteModal={toggleDeleteModal}
                  deleteModal={deleteModal}
                  cmInputRef={cmInputRef}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default CmContainer;
