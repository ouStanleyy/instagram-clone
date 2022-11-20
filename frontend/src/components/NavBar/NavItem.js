import { icons } from "./icons";
import { useSelector } from "react-redux";
import styles from "./NavItem.module.css";

const NavItem = ({ type }) => {
  const user = useSelector((state) => state.session.user);
  const isLogo = type === "Logo" || type === "Instagram";
  const classLogo = isLogo ? styles.logo : styles.navItem;

  const profilePicture = (
    <>
      <div className={styles.profilePicture}>
        <img src={user?.profile_picture} />
      </div>
      <span>Profile</span>
    </>
  );

  const iconButton = (
    <>
      <div className={styles.svgContainer}>{icons[type]}</div>
      <span>{isLogo ? "" : type}</span>
    </>
  );

  return (
    // <div className={styles.navItem + " " + classLogo}>
    <div className={classLogo}>
      {type === "Profile" ? profilePicture : iconButton}
    </div>
  );
};

export default NavItem;
