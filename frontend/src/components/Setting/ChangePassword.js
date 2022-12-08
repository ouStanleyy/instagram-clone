import { useDispatch, useSelector } from "react-redux";
import { ProfilePicture } from "../Elements";
import styles from "./EditProfile.module.css";
import stylesPassword from "./ChangePassword.module.css";
import { useState, useEffect } from "react";
import SuccessPopup from "./SuccessPopup";
import { editProfile } from "../../store/session";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const updateOldPassword = (e) => setOldPassword(e.target.value);
  const updateNewPassword = (e) => setNewPassword(e.target.value);
  const updateConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const enableSubmit = (e) => setDisableSubmit(false);

  useEffect(() => {
    if (oldPassword.length && newPassword.length && confirmPassword.length) {
      setDisableButton(false);
    }
  }, [oldPassword, newPassword, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      const data = {
        oldPassword,
        newPassword,
      };
    }
  };

  return (
    <>
      <form className={stylesPassword.changePasswordForm}>
        <div
          className={`${styles.fieldContainer} ${stylesPassword.profileContainer}`}
        >
          <div className={`${styles.labelContainer}`}>
            <ProfilePicture user={user} size={"small"} />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="profilePicture" className={stylesPassword.username}>
              {user?.username}
            </label>
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.labelContainer}>
            <label htmlFor="oldPassword">Old password</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              id="oldPassword"
              type="password"
              value={oldPassword}
              maxLength={15}
              onChange={updateOldPassword}
            />
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.labelContainer}>
            <label htmlFor="newPassword">New password</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              maxLength={15}
              onChange={updateNewPassword}
            />
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.labelContainer}>
            <label htmlFor="confirmPassword">Confirm new password</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              maxLength={15}
              onChange={updateConfirmPassword}
            />
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.labelContainer}></div>
          <button
            disabled={disableButton}
            className={`${stylesPassword.changePasswordButton} ${
              disableButton && stylesPassword.disabledButton
            }`}
          >
            Change password
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
