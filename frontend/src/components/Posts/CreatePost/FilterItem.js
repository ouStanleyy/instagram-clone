import styles from "./FilterItem.module.css";

const FilterItem = ({ filter, updateFilterType, filterType = "original" }) => {
  return (
    <label className={styles.filterItemContainer}>
      <input
        type="radio"
        name="filterType"
        value={filterType}
        onChange={updateFilterType}
        checked={filterType === filter}
      />
      <div className={`${styles.imageContainer} ${styles.filter}`}>
        <img
          className={`${styles[filterType]}`}
          src={
            "https://nationaltoday.com/wp-content/uploads/2022/05/45-Hot-Air-Balloon.jpg"
          }
          alt={"hot air balloon"}
        />
      </div>
      <span className={styles.filterName}>{filterType}</span>
    </label>
  );
};

export default FilterItem;
