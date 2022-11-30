import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../store/posts";
import { useParams } from "react-router-dom";
import MediaCarousel from "./MediaCarousel";
import PostHeader from "./PostHeader";
import styles from "./PostDetailCard.module.css";
import { getUserById } from "../../store/users";
import { InputContainer, CmContainer, LikeBar} from "../Comment";



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

        <div>
          {/* <div>like, comment, share icons</div>
          <div>Liked by {post?.likes.length} people</div>
          <div>Add a comment..</div> */}
          <CmContainer postId={props.postId}/>
          <LikeBar />
          <InputContainer postId ={props.postId}/>
        </div>
      </div>
    </div>
  );
};

export default PostDetailCard;
