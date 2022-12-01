import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../store/posts";
import { useParams } from "react-router-dom";
import MediaCarousel from "./MediaCarousel";
import PostHeader from "./PostHeader";
import styles from "./PostDetailCard.module.css";
import { InputContainer, CmContainer, LikeBar } from "../Comment";

const PostDetailCard = (props) => {
  const dispatch = useDispatch();
  const cmInputRef = useRef(null)
  const { postId } = useParams();
  const post = useSelector(
    (state) => state.posts[props.postId ? props.postId : postId]
  );

  const handleInputFocus = ()=>{
    cmInputRef.current.focus()
  }

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
        <LikeBar post={post} onInputClick={handleInputFocus}/>
        <InputContainer post={post} cmInputRef={cmInputRef}/>
      </div>
    </div>
  );
};

export default PostDetailCard;
