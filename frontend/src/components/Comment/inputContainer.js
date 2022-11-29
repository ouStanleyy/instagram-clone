import { useSelector, useDispatch} from "react-redux";
import { useState } from "react";
import { createComment} from "../../store/comment"
import styles from "./Comment.module.css"
import { icons } from "../NavBar/icons";
import styleSvg from "../NavBar/NavItem.module.css"
import EmojiWindow from "./EmojiWindow";
import CommentsForm from "./commentsForm";

const InputContainer = () =>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    let post_id = 1
    const {id} = user
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])
    const [emojiWindow, setEmojiWindow] = useState(true)


    const handleSubmit =  (e)=>{
        e.preventDefault()

        const payload = {comment, user_id:id }
        dispatch(createComment(payload, post_id))
        setComment("")
    }

    return (

        <form className={styles.form} onSubmit={handleSubmit}>


            <div className={styles.likesDiv}>
                <div id={styles.likeButton}>{icons["Notifications"]}</div>
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.emojiInput}>
                    <img
                    className={styles.emojiIcon}
                    aria-expanded={emojiWindow ? "true" : "false"}
                    onClick={()=> setEmojiWindow((prev)=> !prev)}
                    src="https://cdn2.iconfinder.com/data/icons/instagram-outline/19/15-512.png" />
                    <EmojiWindow emojiWindow={emojiWindow} />
                </div>
                <input
                className={styles.commentInput}
                placeholder="Add a comment..."
                value={comment}
                onChange={e=> setComment(e.target.value)}
                />
                <button
                className={styles.postComment}
                type='submit'
                >
                Post
                </button>
            </div>
        </form>

    )
}

export default InputContainer;