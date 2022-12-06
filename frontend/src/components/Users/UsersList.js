import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../store/users";
import styles from "./UsersList.module.css";
import { ProfilePicture } from "../Elements";
import SuggestionItem from "./SuggestionItem";
import { getRandomSuggestion } from "../Utill";

function UsersList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
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
          {getRandomSuggestion(user, users)?.map((user) => {
            return <SuggestionItem user={user} key={user.id} />;
          })}
        </ul>
      </div>
    )
  );
}

export default UsersList;
