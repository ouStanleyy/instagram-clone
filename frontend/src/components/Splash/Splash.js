import Iphone from "./Iphone";
import styles from "./Splash.module.css";
import Form from "../Form/Form";

const Splash = ({ user }) => {
  return user ? (
    <div>
      POST FEED TO GO HERE POST FEED TO GO HERE POST FEED TO GO HERE POST FEED
      TO GO HERE POST FEED TO GO HERE POST FEED TO GO HERE POST FEED TO GO HERE
    </div>
  ) : (
    <div className={styles.splashContainer}>
      <Iphone />
      <Form />
    </div>
  );
};

export default Splash;
