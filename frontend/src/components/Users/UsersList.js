import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/users";
import styles from "./UsersList.module.css";
import SuggestionItem from "./SuggestionItem";
import { getRandomSuggestion } from "../Utill";
import { getFollowing } from "../../store/session";

function UsersList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.users));
  const following = useSelector((state) =>
    Object.values(state.session.following)
  );

  const [loaded, setLoaded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getUsers());
        await dispatch(getFollowing());
        setLoaded(true);
      } catch (err) {}
    })();
  }, [dispatch]);

  useEffect(() => {
    setSuggestions(getRandomSuggestion(user, users, following));
  }, [loaded]);

  return (
    loaded && (
      <div className={styles.suggestionContainer}>
        <h3 className={styles.suggestionHeader}>Suggestions For You</h3>
        <ul className={styles.suggestions}>
          {suggestions?.map((user) => {
            return <SuggestionItem user={user} key={user.id} />;
          })}
        </ul>
      </div>
    )
  );
}

export default UsersList;
