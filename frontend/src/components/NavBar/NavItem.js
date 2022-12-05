import { icons } from "./icons";
import { useSelector } from "react-redux";
import styles from "./NavItem.module.css";
import ProfilePicture from "../Elements/ProfilePIcture";

const NavItem = ({ type, showSearch, hideSearch }) => {
  const user = useSelector((state) => state.session.user);
  const isLogo = type === "Logo" || type === "Instagram";
  const style = isLogo ? styles.logo : styles.navItem;

  const profilePicture = (
    <>
      <div className={styles.profilePicture}>
        <ProfilePicture user={user} size={"xsmall"} />
        {/* <img src={user?.profile_picture} alt={`${user?.full_name} profile`} /> */}
      </div>
      <span>Profile</span>
    </>
  );

  const iconButton = (
    <>
      {isLogo && <div className={styles.instagramLogo}>{icons["Logo"]}</div>}
      <div className={`${styles.svgContainer} ${isLogo && styles.hideSvg}`}>
        {icons[type]}
      </div>
      <span>{isLogo ? "" : type}</span>
    </>
  );

  return (
    <div
      className={`${style} ${showSearch && !hideSearch && styles.hideNavItem} ${
        type === "Search" && styles.searchBorder
      }`}
    >
      {type === "Profile" ? profilePicture : iconButton}
    </div>
  );
};

export default NavItem;
