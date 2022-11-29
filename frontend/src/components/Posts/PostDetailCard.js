import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../store/posts";
import { useParams } from "react-router-dom";
import MediaCarousel from "./MediaCarousel";
import PostHeader from "./PostHeader";
import styles from "./PostDetailCard.module.css";
import { getUserById } from "../../store/users";
import { InputContainer, CommentsForm } from "../Comment";
import { loadAllComments } from "../../store/comments";


const PostDetailCard = (props) => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector(
    (state) => state.posts[props.postId ? props.postId : postId]
  );
  console.log(props.postId);
  useEffect(() => {
    (async () => {
      await dispatch(getPostById(props.postId ? props.postId : postId));
    })();
  }, []);


  return (
    <div className={styles.cardContainer}>
      <MediaCarousel medias={post?.media} />
      <div className={styles.info}>
        <PostHeader user={post?.user} />
        {/* <div className={styles.comments}>
          {post?.comments.map((comment) => {
            return <li key={comment.id}>{comment.comment}</li>;
          })}
        </div> */}
        <CommentsForm postId ={postId}/>
        <div>
          {/* <div>like, comment, share icons</div>
          <div>Liked by {post?.likes.length} people</div>
          <div>Add a comment..</div> */}
          <InputContainer postId ={postId}/>
        </div>
      </div>
    </div>
  );
};

export default PostDetailCard;
