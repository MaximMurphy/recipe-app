import styles from "../styles/FeedSelector.module.css";

export default function FeedSelector() {
  return (
    <section className={styles.feed}>
      <p className={styles.title}>Feed</p>
      <div className={styles.selection}>
        <p>All</p>
        <p>Mine</p>
        <p>Liked</p>
      </div>
    </section>
  );
}
