import styles from "./NoComments.module.css";

const NoComments = ()=>{
    return (
        <div className={styles.container}>
            <div
            className={styles.noCommentsDiv}>
                <span
                className={styles.noCommentsLabel}
                >No comments yet.</span>
            </div>
            <div>
                <span
                className={styles.startConLabel}
                >Start the conversation.</span>
            </div>
        </div>
    )
}
export default NoComments;