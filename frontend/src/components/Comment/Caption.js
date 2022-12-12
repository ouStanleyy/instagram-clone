import styles from "./Comment.module.css";
import { ProfilePicture } from "../Elements";

const Caption = ({post})=>{
    return (
        <div className={styles.container}>
            <div >
                <ProfilePicture user={post?.user} size={"small"} />
            </div>
            <div className={styles.captionContainer}>
                <span className={styles.username}>{post?.user?.username}</span>
                <span className={styles.comment}>{post?.caption}</span>
            </div>
        </div>
    )
}

export default Caption;