import { useSelector } from "react-redux"
import { ProfilePicture } from "../Elements"
import styles from "./Reply.module.css"

const Reply = ({reply})=>{
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
        </div>
    )

}

export default Reply;