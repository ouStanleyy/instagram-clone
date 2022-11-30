import { useDispatch, useSelector } from "react-redux";
import { loadAllComments } from "../../store/comment";
import { useEffect } from "react";
import Comment from "./comment";
import styles from "./Comment.module.css";

const CommentsForm = () => {
  const dispatch = useDispatch();
  const comments = Object.values(useSelector((state) => state.comment));
  let post_id = 1;

  useEffect(() => {
    dispatch(loadAllComments(post_id));
  }, [dispatch]);

  return (
    <div className={styles.cmContainer}>
      <div className={styles.cmHome}>
        {comments?.map((comment, i) => {
          return <Comment key={i} comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default CommentsForm;
