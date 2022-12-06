import { useDispatch } from "react-redux"
import styles from "./DeleteModal.module.css"
import { deleteCommentThunk } from "../../store/comments"

const DeleteModal = ({comment, onClose} )=>{
    const dispatch = useDispatch()

    const handleDelete = (e)=>{
        e.preventDefault()

        dispatch(deleteCommentThunk(comment?.id))
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

export default DeleteModal;