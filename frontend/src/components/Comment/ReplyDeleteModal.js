import { useDispatch } from "react-redux"
import styles from "./DeleteModal.module.css"
import { deleteReplyThunk } from "../../store/replies"

const ReplyDeleteModal = ({reply, onClose} )=>{
    const dispatch = useDispatch()

    const handleDelete = (e)=>{
        e.preventDefault()

        dispatch(deleteReplyThunk(reply?.id))
        onClose()
    }

    return (
        <>
            <div className={styles.box}>
                <div
                onClick={handleDelete}
                className={styles.deleteBox}>
                <span
                className={styles.deleteLabel}
                >Delete</span>
                </div>
                <div
                onClick={onClose}
                className={styles.cancelBox}>
                <span
                className={styles.cancelLabel}
                >Cancel</span>
                </div>
            </div>
        </>
    )
}

export default ReplyDeleteModal;