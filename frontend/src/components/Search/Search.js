import styles from "./Search.module.css";

const Search = ({ hideSearch }) => {
  return (
    <div
      className={`${styles.searchContainer} ${hideSearch && styles.hideSearch}`}
    ></div>
  );
};

export default Search;
