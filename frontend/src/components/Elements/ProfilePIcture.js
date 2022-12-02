import styles from "./ProfilePicture.module.css";
import { Link } from "react-router-dom";

// size : "small", "medium", "large", "xlarge"
const ProfilePicture = ({
  user,
  size = "large",
  onClose,
  hasStory = false,
}) => {
  let style;

  switch (size) {
    case "small":
      style = styles.profileSmall;
      break;
    case "medium":
      style = styles.profileMedium;
      break;
    case "large":
      style = styles.profileLarge;
      break;
    default:
      style = styles.profileXLarge;
  }

  return (
    <Link to={`/users/${user?.id}`}>
      <div onClick={onClose} className={`${style} ${hasStory && styles.story}`}>
        <img
          src={
            user?.profile_picture ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png?20220226140232"
          }
          alt="profile"
        />
      </div>
    </Link>
  );
};

export default ProfilePicture;
