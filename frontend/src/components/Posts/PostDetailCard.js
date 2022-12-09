import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../store/posts";
import { useParams } from "react-router-dom";
import MediaCarousel from "./MediaCarousel";
import PostHeader from "./PostHeader";
import { getlikeUsers } from "../../store/likeUsers";
import styles from "./PostDetailCard.module.css";
import { InputContainer, CmContainer, LikeBar } from "../Comment";

const PostDetailCard = (props) => {
  const dispatch = useDispatch();
  const [commentIdState, setCommentIdState] = useState(0)
  const [value, setValue] = useState("")
  const cmInputRef = useRef(null);
  const { postId } = useParams();
  const post = useSelector(
    (state) => state.posts[props.postId ? props.postId : postId]
  );

  const handleInputFocus = () => {
    cmInputRef.current.focus();
  };

  useEffect(() => {
    (async () => {
      await dispatch(getPostById(props.postId ? props.postId : postId));
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await dispatch(getlikeUsers());
    })();
  }, [dispatch]);


  return (
    <div className={styles.cardContainer}>
      <MediaCarousel medias={post?.media} />
      <div className={styles.info}>
        <PostHeader user={post?.user} />
        <CmContainer post={post} cmInputRef={cmInputRef} setCommentIdState={setCommentIdState} value={value} setValue={setValue}/>
        <div className={styles.likes}>
          <LikeBar
            post={post}
            onInputClick={handleInputFocus}
            showDate={true}
          />
        </div>
        <InputContainer post={post} cmInputRef={cmInputRef} commentIdState={commentIdState} setCommentIdState={setCommentIdState} setValue={setValue} />
      </div>
    </div>
  );
};

export default PostDetailCard;
