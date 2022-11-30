import { useSelector, useDispatch } from "react-redux";
import styles from "./Setting.module.css";
import { Route, Switch } from "react-router-dom";

const Setting = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <div className={styles.settingContainer}>
      <div className={styles.settingNav}></div>
      <div className={styles.settingOption}></div>
    </div>
  );
};

export default Setting;
