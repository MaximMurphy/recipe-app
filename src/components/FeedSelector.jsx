import styles from "../styles/FeedSelector.module.css";

export default function FeedSelector({ onFeedSelectionChange, feedSelection }) {
  return (
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
  );
}
