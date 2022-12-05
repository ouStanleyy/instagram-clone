import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useState } from "react";
import NavItem from "./NavItem";
import styles from "./NavBar.module.css";
import MoreItem from "./MoreItem";
import { logout } from "../../store/session";
import Search from "../Search/Search";

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [hideSearch, setHideSearch] = useState(false);
  const [inactiveFn, setInactiveFn] = useState(false);
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
    { icon: "Profile", path: `/users/${user.id}` },
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

  const handleShowMore = (e) => setShowMore((prev) => !prev);
  const handleLogout = async (e) => {
    await dispatch(logout());
    history.push("/");
  };

  const toggleSearch = () => {
    if (!inactiveFn) {
      setInactiveFn(true);
      if (showSearch) {
        setHideSearch(true);
        setTimeout(() => {
          setShowSearch((state) => !state);
          setHideSearch(false);
          setTimeout(() => setInactiveFn(false), 150);
        }, 300);
      } else {
        setShowSearch((state) => !state);
        setTimeout(() => setInactiveFn(false), 350);
      }
    }
  };

  return (
    <>
      <ul
        className={`${styles.navBar} ${
          showSearch && !hideSearch && styles.miniNavBar
        }`}
      >
        <div>
          {user &&
            links.slice(0, links.length - 1).map(({ icon, path }, idx) =>
              icon === "Search" ? (
                <div
                  key={idx}
                  // className={showSearch && styles.activeSearch}
                  onClick={toggleSearch}
                >
                  <NavItem
                    type={icon}
                    showSearch={showSearch}
                    hideSearch={hideSearch}
                  />
                </div>
              ) : (
                <NavLink
                  key={idx}
                  to={path}
                  exact={true}
                  className={styles.navLink}
                  activeClassName={styles.active}
                >
                  <NavItem
                    type={icon}
                    showSearch={showSearch}
                    hideSearch={hideSearch}
                  />
                </NavLink>
              )
            )}
        </div>
        {user && (
          <div className={styles.moreLink} onClick={handleShowMore}>
            <div
              className={showMore ? styles.moreDropDown : styles.hideDropDown}
              id="menu-dropdown"
            >
              <NavLink
                to="/account/edit"
                exact={true}
                className={styles.navLink}
              >
                <MoreItem type="Settings" />
              </NavLink>
              <NavLink to="/saved" exact={true} className={styles.navLink}>
                <MoreItem type="Saved" />
              </NavLink>
              <NavLink to="/report" exact={true} className={styles.navLink}>
                <MoreItem type="Report a problem" />
              </NavLink>
              <NavLink to="#" exact={true} className={styles.navLink}>
                <MoreItem type="Switch accounts" />
              </NavLink>
              <NavLink to="#" exact={true} className={styles.navLink}>
                <MoreItem type="Log Out" onClick={handleLogout} />
              </NavLink>
              {/* <LogoutButton style={styles.navLink} /> */}
            </div>
            <NavItem type="More" />
          </div>
        )}
        {!user && loggedInNav}
      </ul>
      {showSearch && <Search hideSearch={hideSearch} onClose={toggleSearch} />}
    </>
  );
};

export default NavBar;
