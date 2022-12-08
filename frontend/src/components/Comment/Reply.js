import styles from "./Reply.module.css"

const Reply = ({reply})=>{
    console.log(reply)
    return(
        <p
        className={styles.reply}
        >
            {reply.reply}
        </p>
    )

}

export default Reply;