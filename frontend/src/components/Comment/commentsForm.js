import { useDispatch, useSelector } from "react-redux";
import { loadAllComments } from "../../store/comments";
import { useEffect } from "react";
import Comment from "./comment";
import styles from "./Comment.module.css"

const CommentsForm = ({postId})=>{
    const dispatch = useDispatch();
    let comments = useSelector((state)=> Object.values(state.comments))
    const post = useSelector((state) => state.posts[postId]);



    useEffect(()=>{
        dispatch(loadAllComments(postId))
    },[dispatch])


    return (
        <>
            <div className={styles.cmContainer}>
                <div className={styles.cmHome}>
                <div className={styles.container}>
                        <div className={styles.profilePicture}>
                            <img src={post?.user?.profile_picture} alt={post?.user?.username}/>
                        </div>
                    <div className={styles.textContainer}>
                        <span className={styles.username}>{post?.user?.username}</span>
                        <span className={styles.comment}>{post?.caption}</span>
                    </div>
                </div>
                    {comments?.map((comment, i)=>{
                        return <Comment key={i} comment={comment}/>
                    })
                    }
                </div>
            </div>
        </>
    )

}

export default CommentsForm;