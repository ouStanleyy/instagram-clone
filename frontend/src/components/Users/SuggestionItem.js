import { ProfilePicture } from "../Elements";
import { Link } from "react-router-dom";
import styles from "./SuggestionItem.module.css";
import { useDispatch } from "react-redux";
import { FollowButton } from "../Follows";

const SuggestionItem = ({ user }) => {
  // const dispatch = useDispatch();
  // const [hasSuggestions, setHasSuggestions] = useState(false)

  // const handleFollow = (e) =>{
  //   e.preventDefault()
  //   dispatch(followUser(user?.id));
  // }

  return (
    <div className={styles.suggestionContainer}>
      <div className={styles.userInfo}>
        <ProfilePicture user={user} size={"medium"} />
        <Link to={`/users/${user.id}`}>
          <span className={styles.username}>{user?.username}</span>
        </Link>
      </div>
      <div>
        <FollowButton user={user} isSuggestion={true} />
      </div>
    </div>
  );
};

export default SuggestionItem;
