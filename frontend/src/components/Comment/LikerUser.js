import { useEffect, useRef, useState } from "react";
import { ProfilePicture } from "../Elements";
import { UserPopUp } from "../Users";
import { Link } from "react-router-dom";
import FollowButton from "../Follows/FollowButton";
import styles from "../Follows/FollowUser.module.css";

const LikerUser = ({ user, onClose, currUser }) => {
  const isCurrUser = currUser?.id === user?.id;
  const [userPopUp, setUserPopUp] = useState(false);
  const [overPopUp, setOverPopUp] = useState(false);
  const [overUser, setOverUser] = useState(false);
  const [overProfilePic, setOverProfilePic] = useState(false);
  const [top, setTop] = useState("");
  const [left, setLeft] = useState("");
  const usernameRef = useRef(null);
  const profilePicRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        overUser || overPopUp || overProfilePic
          ? setUserPopUp(true)
          : setUserPopUp(false),
      400
    );

    return () => clearTimeout(timeout);
  }, [overUser, overPopUp, overProfilePic]);

  useEffect(() => {
    if (userPopUp) {
      if (overUser) {
        setTop(usernameRef.current.getBoundingClientRect().top + 20);
        setLeft(usernameRef.current.getBoundingClientRect().left);
      } else if (overProfilePic) {
        setTop(profilePicRef.current.getBoundingClientRect().top + 48);
        setLeft(profilePicRef.current.getBoundingClientRect().left);
      }
    }
  }, [userPopUp, overUser, overProfilePic]);

  return (
    <>
      <div className={styles.userContainer}>
        <div
          onMouseEnter={() => setOverProfilePic(true)}
          onMouseLeave={() => setOverProfilePic(false)}
          ref={profilePicRef}
          className={styles.profilePicture}
        >
          <ProfilePicture user={user} size={"medium"} onClose={onClose} />
        </div>
        <div className={styles.userDetails}>
          <p
            onMouseEnter={() => setOverUser(true)}
            onMouseLeave={() => setOverUser(false)}
            onClick={onClose}
            ref={usernameRef}
            className={styles.username}
          >
            <Link to={`/users/${user?.id}`}>{user?.username}</Link>
          </p>
          <p className={styles.fullName}>{user?.full_name}</p>
        </div>
        {!isCurrUser && <FollowButton user={user} />}
      </div>
      {userPopUp && (
        <div
          onMouseEnter={() => setOverPopUp(true)}
          onMouseLeave={() => setOverPopUp(false)}
          style={{ top, left }}
          className={styles.userPopUp}
        >
          <UserPopUp userId={user.id} onClose={onClose} />
        </div>
      )}
    </>
  );
};

export default LikerUser;
