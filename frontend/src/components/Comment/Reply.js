import { useSelector } from "react-redux"
import { ProfilePicture } from "../Elements"
import styles from "./Reply.module.css"
import ReplyDeleteModal from "./ReplyDeleteModal"

const Reply = ({reply, replyDeleteModal, toggleReplyDeleteModal})=>{
    const user = useSelector((state)=> state.likeUsers[reply?.user_id])
    console.log(user)

    return(
        <div
        className={styles.replyDiv}
        >
             <ProfilePicture user={user} size={"small"} />
             <div className={styles.replyText}>
                <p
                className={styles.username}
                >{user.username}</p>
                <p>{reply.reply}</p>
             </div>
             {deleteModal[reply.id] && (
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