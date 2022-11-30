import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../store/posts";
import { useParams } from "react-router-dom";
import MediaCarousel from "./MediaCarousel";
import PostHeader from "./PostHeader";
import styles from "./PostDetailCard.module.css";
import { getUserById } from "../../store/users";
import Comment from "../Comment/Comment";
import CommentItem from "./CommentItem";
// import LikeBar from "./LikeBar";
import { InputContainer, CmContainer, LikeBar } from "../Comment";

const PostDetailCard = (props) => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector(
    (state) => state.posts[props.postId ? props.postId : postId]
  );

  useEffect(() => {
    (async () => {
      await dispatch(getPostById(props.postId ? props.postId : postId));
    })();
  }, [dispatch]);

  return (
    <div className={styles.cardContainer}>
      <MediaCarousel medias={post?.media} />
      <div className={styles.info}>
        <PostHeader user={post?.user} />
        <CmContainer post={post} />
        <LikeBar />
        <InputContainer post={post} />
      </div>
    </div>
  );
};

export default PostDetailCard;
