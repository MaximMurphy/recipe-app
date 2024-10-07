import styles from "../styles/FeedSelector.module.css";

export default function FeedSelector({
  onFeedSelectionChange,
  feedSelection,
  onSortChange,
}) {
  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    onSortChange(selectedOption);
  };

  return (
    <div className={styles.container}>
      <section className={styles.feed}>
        <p className={styles.title}>Feed</p>
        <div className={styles.selection}>
          <button
            onClick={() => onFeedSelectionChange("all")}
            className={`${styles.button} ${
              feedSelection === "all" ? styles.active : ""
            }`}
          >
            All Posts
          </button>
          <button
            onClick={() => onFeedSelectionChange("popular")}
            className={`${styles.button} ${
              feedSelection === "popular" ? styles.active : ""
            }`}
          >
            Popular
          </button>
        </div>
      </section>
      <section>
        <select
          title="Sort By"
          onChange={handleSortChange}
          className={styles.select}
        >
          <option value="title" name disabled>
            Sort By
          </option>
          <optgroup label="Date">
            <option value="newestToOldest" className={styles.option}>
              Newest to Oldest
            </option>
            <option value="oldestToNewest" className={styles.option}>
              Oldest to Newest
            </option>
          </optgroup>
          <optgroup label="Rating">
            <option value="highestToLowest" className={styles.option}>
              Highest to Lowest
            </option>
            <option value="lowestToHighest" className={styles.option}>
              Lowest to Highest
            </option>
          </optgroup>
        </select>
      </section>
    </div>
  );
}
