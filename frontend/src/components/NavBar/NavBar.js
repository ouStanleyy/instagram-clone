import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import NavItem from "./NavItem";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const links = [
    // { icon: "Logo", path: "/" },
    { icon: "Instagram", path: "/" },
    { icon: "Home", path: "/" },
    { icon: "Search", path: "/search" },
    { icon: "Explore", path: "/users" },
    { icon: "Messages", path: "/messages" },
    { icon: "Notifications", path: "/notifications" },
    { icon: "Create", path: "/create" },
    { icon: "Profile", path: "/profile" },
    { icon: "More", path: "#" },
  ];

  const loggedInNav = (
    <>
      <li>
        <NavLink to="/login" exact={true} activeClassName={styles.active}>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/sign-up" exact={true} activeClassName={styles.active}>
          Sign Up
        </NavLink>
      </li>
    </>
  );

  return (
    <ul className={styles.navBar}>
      <div>
        {user &&
          links.slice(0, links.length - 1).map(({ icon, path }, idx) => (
            <NavLink
              key={idx}
              to={path}
              exact={true}
              className={styles.navLink}
              activeClassName={styles.active}
            >
              <NavItem type={icon} />
            </NavLink>
          ))}
      </div>
      {user && (
        <div className={styles.moreLink}>
          <LogoutButton />
          <NavItem type="More" />
        </div>
      )}
      {!user && loggedInNav}
    </ul>
  );
};

export default NavBar;
