import { useSelector } from "react-redux"
import { ProfilePicture } from "../Elements"
import styles from "./Reply.module.css"
import ReplyDeleteModal from "./ReplyDeleteModal"
import { Modal } from "../../context/Modal"

const Reply = ({reply,comment, replyDeleteModal, toggleReplyDeleteModal})=>{
    const user = useSelector((state)=> state.likeUsers[reply?.user_id])
    const currUser = useSelector((state) => state.session.user);
    const post_owner_id = useSelector((state) => state.posts[comment?.post_id]?.user_id);
    const is_owner = currUser.id === post_owner_id || currUser.id === reply?.user_id;

    return(
        <div
        className={styles.replyDiv}
        >
            <ProfilePicture user={user} size={"small"} />
            <div className={styles.replyCon}>
                <p
                className={styles.username}
                >{user.username}</p>
                <div
                className={styles.replyText}
                >{reply.reply}
                {is_owner && (
                    <div className={styles.buttonDiv}>
                        <button
                            onClick={toggleReplyDeleteModal(reply?.id)}
                            className={styles.moreButton}
                        >
                            <svg
                            aria-label="More options"
                            className="_ab6-"
                            color="#262626"
                            fill="#262626"
                            height="20"
                            role="img"
                            viewBox="0 0 24 24"
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
            </div>
             {replyDeleteModal[reply.id] && (
                <Modal id="modal" onClose={toggleReplyDeleteModal(reply.id)}>
                <ReplyDeleteModal
                    reply={reply}
                    onClose={toggleReplyDeleteModal(reply.id)}
                />
                </Modal>
            )}
        </div>
    )

}

export default Reply;