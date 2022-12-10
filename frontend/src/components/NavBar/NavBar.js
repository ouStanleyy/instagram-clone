import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import NavItem from "./NavItem";
import styles from "./NavBar.module.css";
import MoreItem from "./MoreItem";
import { logout } from "../../store/session";
import { getFollowers } from "../../store/follows";
import Search from "../Search/Search";
import Notification from "../Notification/Notification";

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [hideSearch, setHideSearch] = useState(false);
  const [inactiveFn, setInactiveFn] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [hideNotification, setHideNotification] = useState(false);
  const [inactiveNotif, setInactiveNotif] = useState(false);
  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const moreRef = useRef(null);
  const refSearchBar = useRef(null);
  const user = useSelector((state) => state.session.user);
  const followers = useSelector((state) =>
    Object.values(state.follows.followers)
  );
  const pendingFollowers = followers.filter(
    (follower) => follower?.is_pending == true
  );
  const hasNotification = pendingFollowers.length > 0;
  const links = [
    // { icon: "Logo", path: "/" },
    { icon: "Instagram", path: "/" },
    { icon: "Home", path: "/" },
    { icon: "Search", path: "/search" },
    { icon: "Explore", path: "/explore" },
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

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getFollowers(user?.id));
      } catch (err) {}
    })();
  }, [dispatch, user?.id]);

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
          setShowSearch(false);
          setHideSearch(false);
          setTimeout(() => setInactiveFn(false), 150);
        }, 300);
      } else {
        setShowNotification(false);
        setHideNotification(false);
        setInactiveNotif(false);
        setShowSearch(true);
        setTimeout(() => {
          setInactiveFn(false);
          refSearchBar?.current?.focus();
        }, 350);
      }
    }
  };

  const toggleNotification = () => {
    if (!inactiveNotif) {
      setInactiveNotif(true);
      if (showNotification) {
        setHideNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          setHideNotification(false);

          setTimeout(() => {
            setInactiveNotif(false);
          }, 150);
        }, 300);
      } else {
        setShowSearch(false);
        setHideSearch(false);
        setInactiveFn(false);
        setShowNotification(true);
        setTimeout(() => setInactiveNotif(false), 350);
      }
    }
  };

  useEffect(() => {
    if (searchRef.current) {
      const toggle = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target))
          toggleSearch();
      };

      document.addEventListener("click", toggle);
      return () => document.removeEventListener("click", toggle);
    }
  }, [searchRef.current, inactiveFn]);

  useEffect(() => {
    if (notifRef.current) {
      const toggle = (e) => {
        if (notifRef.current && !notifRef.current.contains(e.target))
          toggleNotification();
      };

      document.addEventListener("click", toggle);
      return () => document.removeEventListener("click", toggle);
    }
  }, [inactiveNotif, notifRef.current]);

  useEffect(() => {
    const toggle = (e) => {
      if (!moreRef.current.contains(e.target)) setShowMore(false);
    };

    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, [moreRef.current]);

  return (
    <>
      <ul
        className={`${styles.navBar} ${
          showSearch && !hideSearch && styles.miniNavBar
        }
          ${showNotification && !hideNotification && styles.miniNavBar}
        `}
      >
        <div>
          {user &&
            links.slice(0, links.length - 1).map(({ icon, path }, idx) =>
              icon === "Search" ? (
                <div key={idx} onClick={toggleSearch}>
                  <NavItem
                    type={icon}
                    showSearch={showSearch}
                    hideSearch={hideSearch}
                    hasNotification={hasNotification}
                    showNotification={showNotification}
                    hideNotification={hideNotification}
                  />
                </div>
              ) : icon === "Notifications" ? (
                <div key={idx} onClick={toggleNotification}>
                  <NavItem
                    type={icon}
                    showNotification={showNotification}
                    hideNotification={hideNotification}
                    hasNotification={hasNotification}
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
                    hasNotification={hasNotification}
                    showNotification={showNotification}
                    hideNotification={hideNotification}
                  />
                </NavLink>
              )
            )}
        </div>
        {user && (
          <div
            ref={moreRef}
            className={styles.moreLink}
            onClick={handleShowMore}
          >
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
            </div>
            <NavItem type="More" />
          </div>
        )}
        {!user && loggedInNav}
      </ul>
      {showSearch && (
        <Search
          searchRef={searchRef}
          hideSearch={hideSearch}
          onClose={toggleSearch}
          refSearchBar={refSearchBar}
        />
      )}
      {showNotification && (
        <Notification
          notifRef={notifRef}
          hideNotification={hideNotification}
          onClose={toggleNotification}
          pendingFollowers={pendingFollowers}
        />
      )}
    </>
  );
};

export default NavBar;
