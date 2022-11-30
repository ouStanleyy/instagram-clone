import { useSelector, useDispatch } from "react-redux";
import styles from "./Setting.module.css";
import { NavLink, Route, Switch } from "react-router-dom";

const Setting = () => {
  const user = useSelector((state) => state.session.user);

  return (
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
          <Route path="/account/edit">Editing</Route>
        </Switch>
      </div>
    </div>
  );
};

export default Setting;
