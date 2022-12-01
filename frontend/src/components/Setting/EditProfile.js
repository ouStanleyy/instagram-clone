import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./EditProfile.module.css";

const EditProfile = () => {
  const user = useSelector((state) => state.session.user);
  const [profilePicture, setProfilePicture] = useState(user?.profile_picture);
  const [fullName, setFullName] = useState(user?.full_name);
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.bio);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);
  const [gender, setGender] = useState(user?.gender);

  return (
    <form className={styles.editProfileForm}>
      <div className={styles.fieldContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="name">Change profile photo</label>
        </div>
        <div className={styles.inputContainer}>
          <input type="text" />
        </div>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="name">Name</label>
        </div>
        <div className={styles.inputContainer}>
          <input type="text" />
          <span>
            Help people discover your account by using the name you're known by:
            either your full name, nickname, or business name.
          </span>
        </div>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="name">Username</label>
        </div>
        <div className={styles.inputContainer}>
          <input type="text" />
        </div>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="name">Bio</label>
        </div>
        <div className={styles.inputContainer}>
          <textarea maxLength={150} rows={3} />
        </div>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="name">Email</label>
        </div>
        <div className={styles.inputContainer}>
          <input type="text" />
        </div>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="name">Phone number</label>
        </div>
        <div className={styles.inputContainer}>
          <input type="text" />
        </div>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="name">Gender</label>
        </div>
        <div className={styles.inputContainer}>
          <input type="text" />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditProfile;
