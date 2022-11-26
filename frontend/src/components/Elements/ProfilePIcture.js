import styles from "./ProfilePicture.module.css";
import { Link } from "react-router-dom";

const ProfilePicture = ({ user, size = "large" }) => {
  let style;

  switch (size) {
    case "small":
      style = styles.profileSmall;
      break;
    case "medium":
      style = styles.profileMedium;
      break;
    default:
      style = styles.profileLarge;
  }

  return (
    <Link to={`/users/${user?.id}`}>
      <div className={style}>
        <img src={user?.profile_picture} alt="profile" />
      </div>
    </Link>
  );
};

export default ProfilePicture;
