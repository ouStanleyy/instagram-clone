import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./EditProfile.module.css";
import { ProfilePicture } from "../Elements";
import { editProfile, deleteProfile } from "../../store/session";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { normalizeErrors } from "../Utill";

const EditProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [profilePicture, setProfilePicture] = useState(user?.profile_picture);
  const [fullName, setFullName] = useState(user?.full_name);
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.bio);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number);
  const [gender, setGender] = useState(user?.gender);
  const [showModal, setShowModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const updateProfilePicture = (e) => setProfilePicture(e.target.value);
  const updateFullName = (e) => setFullName(e.target.value);
  const updateUsername = (e) => setUsername(e.target.value);
  const updateBio = (e) => setBio(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const updateGender = (e) => {
    console.log("CLICKED", e);
    setGender(e.target.value);
  };

  const deactivateProfile = async () => {
    await dispatch(deleteProfile());
    history.push("/");
  };

  const toggleModal = (e) => {
    e.preventDefault();
    setShowModal((prev) => !prev);
  };

  const toggleGenderModal = (e) => {
    e.preventDefault();
    setShowGenderModal((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      profilePicture,
      fullName,
      username,
      bio,
      email,
      phoneNumber,
      gender,
    };

    const res = await dispatch(editProfile(data));

    if (res) {
      const errors = normalizeErrors(res);
      setErrors(errors);
    } else {
      setErrors({});
    }
    console.log(errors);
  };

  const deactivateModal = (
    <div className={styles.deactivateModalContainer}>
      <button className={styles.deleteButton} onClick={deactivateProfile}>
        Delete Profile
      </button>
      <button className={styles.cancelButton} onClick={toggleModal}>
        Cancel
      </button>
    </div>
  );

  const genderModal = (
    <div className={styles.genderModalContainer}>
      <h3>Gender</h3>
      <div className={styles.genderOptions}>
        <label htmlFor="gender">
          <input
            id="gender"
            type="radio"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={updateGender}
          />
          Male
        </label>
        <label htmlFor="gender">
          <input
            id="gender"
            type="radio"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={updateGender}
          />
          Female
        </label>
        <label htmlFor="gender">
          <input
            id="gender"
            type="radio"
            name="gender"
            value="Prefer not to say"
            checked={gender === "Prefer not to say"}
            onChange={updateGender}
          />
          Prefer not to say
        </label>
        <button className={styles.doneButton} onClick={toggleGenderModal}>
          Done
        </button>
      </div>
    </div>
  );

  return (
    <>
      <form className={styles.editProfileForm} onSubmit={handleSubmit}>
        <div className={styles.fieldContainer}>
          <div className={styles.labelContainer}>
            <ProfilePicture user={user} size={"medium"} />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="profilePicture">Change profile photo</label>
            <input
              id="profilePicture"
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
            <input
              id="name"
              type="text"
              value={fullName}
              maxLength={30}
              onChange={updateFullName}
            />
            <div>
              Help people discover your account by using the name you're known
              by: either your full name, nickname, or business name.
            </div>
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.labelContainer}>
            <label htmlFor="username">Username</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              id="username"
              type="text"
              value={username}
              maxLength={30}
              onChange={updateUsername}
            />
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.labelContainer}>
            <label htmlFor="bio">Bio</label>
          </div>
          <div className={styles.inputContainer}>
            <textarea
              id="bio"
              value={bio}
              onChange={updateBio}
              maxLength={150}
              rows={3}
            />
            <div className={styles.personalInfoHeader}>
              Personal information{" "}
            </div>
            <div>
              Provide your personal information, even if the account is used for
              a business, a pet or something else. This won't be a part of your
              public profile.
            </div>
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.labelContainer}>
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              id="email"
              type="text"
              value={email}
              onChange={updateEmail}
            />
            {errors?.email && (
              <span
                className={`material-symbols-outlined ${styles.icon} ${
                  styles.error
                } ${!hasSubmitted && styles.hasNotSubmitted}`}
              >
                cancel
                <span className={styles.errorMessage}>{errors.email}</span>
              </span>
            )}
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.labelContainer}>
            <label htmlFor="phoneNumber">Phone number</label>
          </div>
          <div className={styles.inputContainer}>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              maxLength={10}
              onChange={updatePhoneNumber}
            />
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.labelContainer}>
            <label htmlFor="gender">Gender</label>
          </div>
          <div
            className={`${styles.inputContainer}`}
            onClick={toggleGenderModal}
          >
            <input id="gender" type="text" value={gender} disabled />
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.labelContainer}></div>
          <div className={styles.buttonContainer}>
            <button className={styles.submitButton} type="submit">
              Submit
            </button>
            <button className={styles.deactivateButton} onClick={toggleModal}>
              Deactivate my account
            </button>
          </div>
        </div>
      </form>
      {showModal && <Modal onClose={toggleModal}>{deactivateModal}</Modal>}
      {showGenderModal && (
        <Modal onClose={toggleGenderModal}>{genderModal}</Modal>
      )}
    </>
  );
};

export default EditProfile;
