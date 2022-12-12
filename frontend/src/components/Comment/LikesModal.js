
import { useSelector } from "react-redux";
import LikerUser from "./LikerUser";
import styles from "../Follows/Follows.module.css";

const LikesModal = ({ likes, onClose, currUser }) => {
  const users = useSelector((state) => Object.values(state.users));
  // const currUser = useSelector(state => state.session.user)
  const userIds = likes.map((like) => like.user_id);
  const likeUsers = users.filter((user) => userIds.includes(user.id));

  return (
    <>
      <div className={styles.followsContainer}>
        <h3 className={styles.title}>Likes</h3>
        <div className={styles.listContainer}>
          {likeUsers.map((user) => {
            return (
              <LikerUser
                key={user?.id}
                user={user}
                currUser={currUser}
                onClose={onClose}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LikesModal;
