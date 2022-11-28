import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from "../../store/users";
import styles from "./UsersList.module.css";

function UsersList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => Object.values(state.users));

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getUsers());
      } catch (err) {}
    })();
  }, [dispatch]);

  return (
    <>
      <h3>Suggestions For You</h3>
      <ul>
        {users.slice(0, 5).map((user) => {
          return (
            <li key={user.id}>
              <img
                src={user.profile_picture}
                alt="profile"
                className={styles.profilePicture}
              />
              <Link to={`/users/${user.id}`}>{user.username}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default UsersList;