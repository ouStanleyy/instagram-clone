import styles from "./Comment.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteModal from "./DeleteModal";
import { ProfilePicture } from "../Elements";
import { loadReplies } from "../../store/replies";
import ReplyContainer from "./ReplyContainer";


const Comment = ({ comment, toggleDeleteModal, deleteModal, cmInputRef, setCommentIdState, value, setValue}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user);
  const allReplies = useSelector((state)=> Object.values(state.replies))
  const replies = allReplies.filter((reply) => reply.comment_id === comment?.id)
  const owner_id = useSelector((state) => state.posts[comment?.post_id]?.user_id);
  const is_owner = user.id === owner_id || user.id === comment?.user_id;
  const [showReply, setshowReply] = useState(false)


  useEffect(() => {
    (async () => {
      await dispatch(loadReplies(comment?.id));
    })();
  }, [dispatch, comment?.id]);

  useEffect(()=>{
    if(cmInputRef || value){
      cmInputRef.current.value = value
    }
  },[value])

  const handleReply = (e)=>{
    e.preventDefault()
    cmInputRef.current.value =`@${comment?.user?.username} `
    setValue(`@${comment?.user?.username} `)
    cmInputRef.current.focus()
    setCommentIdState(comment?.id)
  }

  const toggleViewReplies = ()=>{
    setshowReply((state) => !state)
  }

  return (
    <>
      <div className={styles.container}>
        <div
        // className={styles.profilePicture}
        >
          <ProfilePicture user={comment?.user} size={"small"} />
        </div>
        <div>
          <div className={styles.textContainer}>
            <span className={styles.username}>{comment?.user?.username}</span>
            <span className={styles.comment}>{comment?.comment}</span>
          </div>
          <div className={styles.replyContainer}>
            <p
            className={styles.reply}
            onClick={handleReply}
            >Reply
            </p>
            {is_owner && (
              <div  className={styles.buttonDiv}>
                <button
                  onClick={toggleDeleteModal(comment?.id)}
                  className={styles.moreButton}
                >
                  <svg
                    aria-label="More options"
                    className="_ab6-"
                    color="#262626"
                    fill="#262626"
                    height="20"
                    role="img"
                    viewBox="0 0 24 18"
                    width="20"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="6" cy="12" r="1"></circle>
                    <circle cx="18" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>
            )}
          </div>
              {
              replies.length > 0 &&
              <div className={styles.viewHideDiv}>
                <span className={styles.line}></span>
                <span
                onClick={toggleViewReplies}
                className={styles.viewReplies}
                >{showReply ? "Hide replies" : `View replies (${replies.length})`}</span>
              </div>
              }
        </div>
      </div>
      {showReply && <ReplyContainer
      comment = {comment}
      replies={replies}/> }
      {deleteModal[comment.id] && (
        <Modal id="modal" onClose={toggleDeleteModal(comment.id)}>
          <DeleteModal
            comment={comment}
            onClose={toggleDeleteModal(comment.id)}
          />
        </Modal>
      )}
    </>
  );
};

export default Comment;
