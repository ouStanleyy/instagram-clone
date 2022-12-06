import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../store/users";
import styles from "./UsersList.module.css";
import { ProfilePicture } from "../Elements";
import SuggestionItem from "./SuggestionItem";
import { getFollowing } from "../../store/session";

function UsersList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => Object.values(state.users));
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        await dispatch(getUsers());
        setLoaded(true);
      } catch (err) {}
    })();
  }, [dispatch]);

  return (
    loaded && (
      <div className={styles.suggestionContainer}>
        <h3 className={styles.suggestionHeader}>Suggestions For You</h3>
        <ul className={styles.suggestions}>
          {users.slice(0, 5).map((user) => {
            return <SuggestionItem user={user} key={user.id} />;
          })}
        </ul>
      </div>
    )
  );
}

export default UsersList;
