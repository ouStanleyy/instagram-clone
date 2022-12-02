import MediaCarousel from "./MediaCarousel";
import PostHeader from "./PostHeader";
import styles from "./PostFeedCard.module.css";
import { InputContainer, LikeBar } from "../Comment";
import PostPreview from "./PostPreview";

const PostFeedCard = ({ post }) => {
  return (
    <div className={styles.cardContainer}>
      <PostHeader user={post?.user} createdAt={post?.created_at} />
      <MediaCarousel medias={post?.media} />
      <div className={styles.postInfo}>
        <LikeBar post={post} />
        <PostPreview post={post} />
      </div>
      <InputContainer post={post} />
    </div>
  );
};

export default PostFeedCard;
