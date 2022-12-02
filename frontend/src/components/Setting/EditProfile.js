import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./EditProfile.module.css";
import { ProfilePicture } from "../Elements";

const EditProfile = () => {
  const user = useSelector((state) => state.session.user);
  const [profilePicture, setProfilePicture] = useState(user?.profile_picture);
  const [fullName, setFullName] = useState(user?.full_name);
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.bio);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);
  const [gender, setGender] = useState(user?.gender);

  const updateProfilePicture = (e) => setProfilePicture(e.target.value);
  const updateFullName = (e) => setFullName(e.target.value);
  const updateUsername = (e) => setUsername(e.target.value);
  const updateBio = (e) => setBio(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const updateGender = (e) => setGender(e.target.value);
  const deactivateProfile = (e) => {
    // dispatch delete profile
  };

  return (
    <form className={styles.editProfileForm}>
      <div className={styles.fieldContainer}>
        <div className={styles.labelContainer}>
          <ProfilePicture user={user} size={"medium"} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="name">Change profile photo</label>
          <input
            type="text"
            value={profilePicture}
            onChange={updateProfilePicture}
          />
        </div>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="name">Name</label>
        </div>
        <div className={styles.inputContainer}>
          <input type="text" value={fullName} onChange={updateFullName} />
          <div>
            Help people discover your account by using the name you're known by:
            either your full name, nickname, or business name.
          </div>
        </div>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="name">Username</label>
        </div>
        <div className={styles.inputContainer}>
          <input type="text" value={username} onChange={updateUsername} />
        </div>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="name">Bio</label>
        </div>
        <div className={styles.inputContainer}>
          <textarea value={bio} onChange={updateBio} maxLength={150} rows={3} />
          <div className={styles.personalInfoHeader}>Personal information </div>
          <div>
            Provide your personal information, even if the account is used for a
            business, a pet or something else. This won't be a part of your
            public profile.
          </div>
        </div>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="name">Email</label>
        </div>
        <div className={styles.inputContainer}>
          <input type="text" value={email} onChange={updateEmail} />
        </div>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="name">Phone number</label>
        </div>
        <div className={styles.inputContainer}>
          <input type="text" value={phoneNumber} onChange={updatePhoneNumber} />
        </div>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="name">Gender</label>
        </div>
        <div className={styles.inputContainer}>
          <input type="text" value={gender} onChange={updateGender} />
        </div>
      </div>
      <div className={styles.fieldContainer}>
        <div className={styles.labelContainer}></div>
        <div className={styles.buttonContainer}>
          <button className={styles.submitButton} type="submit">
            Submit
          </button>
          <button
            className={styles.deactivateButton}
            onClick={deactivateProfile}
          >
            Deactivate my account
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
