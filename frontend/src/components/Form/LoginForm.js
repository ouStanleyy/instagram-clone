import { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const updateCredential = (e) => setCredential(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const toggleShowPassword = (e) => setShowPassword((prev) => !prev);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.formContainer}>
      <div className={styles.inputContainer}>
        <label htmlFor="credential">Phone Number, username, or email</label>
        <input
          id="credential"
          name="credential"
          type="text"
          value={credential}
          onChange={updateCredential}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={updatePassword}
        />
        <span className={styles.showPassword} onClick={toggleShowPassword}>
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>
      <button className={styles.loginButton} type="submit">
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
