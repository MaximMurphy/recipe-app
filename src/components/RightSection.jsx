import styles from "../styles/RightSection.module.css";

export default function RightSection() {
  return (
    <section className={styles.right}>
      <p>Right Section</p>
      <div className={styles.footer}>
        <p>Review Your Food © 2024. All rights reserved.</p>
      </div>
    </section>
  );
}
