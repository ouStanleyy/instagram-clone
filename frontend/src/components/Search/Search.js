import { useState } from "react";
import styles from "./Search.module.css";

const Search = ({ hideSearch }) => {
  const [searchVal, setSearchVal] = useState("");

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
      <div className={styles.searchResults}></div>
    </div>
  );
};

export default Search;
