import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUsers } from "../../store/users";
import { ProfilePicture } from "../Elements";
import styles from "./Search.module.css";
import SearchUser from "./SearchUser";

const Search = ({ hideSearch }) => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) =>
    Object.values(state.users.searchResults)
  );
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    (async () => {
      try {
        await dispatch(searchUsers(searchVal));
      } catch (err) {}
      // setLoaded(true);
    })();
  }, [dispatch, searchVal]);

  return (
    <div
      className={`${styles.searchContainer} ${hideSearch && styles.hideSearch}`}
    >
      <div className={styles.searchHeader}>
        <h2>Search</h2>
        <input
          type="text"
          placeholder="Search"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.searchResults}>
        {searchResults.map((result) => (
          <SearchUser user={result} />
        ))}
      </div>
    </div>
  );
};

export default Search;
