import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import styles from "./SignUpForm.module.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const updateEmail = (e) => setEmail(e.target.value);
  const updateUsername = (e) => setUsername(e.target.value);
  const updateFullName = (e) => setFullName(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateRepeatPassword = (e) => setRepeatPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, fullName));
      if (data) {
        setErrors(data);
      }
    }
  };

  return (
    <form onSubmit={handleSignup} className={styles.formContainer}>
      <div className={styles.signupMessage}>
        Sign up to see photos and videos from your friends.
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="fullname">Full Name</label>
        <input
          id="fullname"
          name="fullname"
          type="text"
          value={fullName}
          onChange={updateFullName}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={updateUsername}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={updatePassword}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          id="repeatPassword"
          name="repeatPassword"
          type="password"
          value={repeatPassword}
          onChange={updateRepeatPassword}
        />
      </div>
      <button className={styles.submitButton} type="submit">
        Sign up
      </button>
    </form>
  );
};

export default SignUpForm;
