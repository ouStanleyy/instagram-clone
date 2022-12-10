import { useDispatch, useSelector } from "react-redux";
import { loadAllComments } from "../../store/comments";
import { loadReplies } from "../../store/replies";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import styles from "./Comment.module.css";
import { ProfilePicture } from "../Elements";
import Caption from "./Caption";

const CmContainer = ({ post, cmInputRef, setCommentIdState, value, setValue, turnOffComment=false }) => {
  const dispatch = useDispatch();
  let comments = useSelector((state) => Object.values(state.comments));
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
    <div className={styles.cmContainer}>
      {turnOffComment &&
        <Caption post={post}/>
      }
      {comments.length === 0 &&  !turnOffComment && (
        <div>
          <Caption post={post}/>
          {/* <div className={styles.Cmcontainer}> */}
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
          // </div>
      )}
      {comments.length > 0 &&  !turnOffComment && (
          <div className={styles.cmHome}>
          <Caption post={post}/>
            {comments?.map((comment, i) => {
              return (
                <Comment
                  key={i}
                  comment={comment}
                  toggleDeleteModal={toggleDeleteModal}
                  deleteModal={deleteModal}
                  cmInputRef={cmInputRef}
                  setCommentIdState={setCommentIdState}
                  value={value}
                  setValue={setValue}
                />
              );
            })}
          </div>
        )}
      </div>

    </>
  );
};

export default CmContainer;
