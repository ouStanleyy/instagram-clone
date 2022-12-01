import { useDispatch, useSelector } from "react-redux";
import { loadAllComments } from "../../store/comments";
import { useEffect } from "react";
import Comment from "./Comment";
import styles from "./Comment.module.css";
import { ProfilePicture } from "../Elements";

const CmContainer = ({ post }) => {
  const dispatch = useDispatch();
  let comments = useSelector((state) => Object.values(state.comments));
  // let comments = useSelector((state) => state.posts[post?.id]?.comments);

  useEffect(() => {
    (async () => {
      await dispatch(loadAllComments(post?.id));
    })();
  }, [dispatch, post?.id]);

  return (
    <>
      <div className={styles.cmContainer}>
        <div className={styles.cmHome}>
          <div className={styles.container}>
            <div className={styles.profilePicture}>
              {/* <img
                src={post?.user?.profile_picture}
                alt={post?.user?.username}
              /> */}
              <ProfilePicture user={post?.user} size={"medium"} />
            </div>
            <div className={styles.textContainer}>
              <span className={styles.username}>{post?.user?.username}</span>
              <span className={styles.comment}>{post?.caption}</span>
            </div>
          </div>
          {comments?.map((comment, i) => {
            return <Comment key={i} comment={comment} />;
          })}
        </div>
      </div>
    </>
  );
};

export default CmContainer;
