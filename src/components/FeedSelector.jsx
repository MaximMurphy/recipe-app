import styles from "../styles/FeedSelector.module.css";

export default function FeedSelector({ onFeedSelectionChange }) {
  return (
    <section className={styles.feed}>
      <p className={styles.title}>Feed</p>
      <div className={styles.selection}>
        <button onClick={() => onFeedSelectionChange("allPosts")}>
          All Posts
        </button>
        <button onClick={() => onFeedSelectionChange("popular")}>
          Popular
        </button>
      </div>
    </section>
  );
}
