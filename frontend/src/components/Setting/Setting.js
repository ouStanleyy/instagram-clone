import { useSelector, useDispatch } from "react-redux";
import styles from "./Setting.module.css";
import { NavLink, Route, Switch } from "react-router-dom";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import { Footer } from "../Feed";

const Setting = () => {
  return (
    <>
      <div className={styles.settingContainer}>
        <div className={styles.settingNav}>
          <NavLink
            to="/account/edit"
            exact={true}
            activeClassName={styles.activeLink}
          >
            Edit profile
          </NavLink>
          <NavLink
            to="/account/password"
            exact={true}
            activeClassName={styles.activeLink}
          >
            Change password
          </NavLink>
        </div>
        <div className={styles.settingOption}>
          <Switch>
            <Route path="/account/edit">
              <EditProfile />
            </Route>
            <Route path="/account/password">
              <ChangePassword />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Setting;
