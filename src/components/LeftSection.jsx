import styles from "../styles/LeftSection.module.css";
import Link from "next/link";

export default function LeftSection() {
  return (
    <section className={styles.left}>
      <p>Left Section</p>
      <div className={styles.footer}>
        <Link
          href="https://www.maximmurphy.com"
          target="_blank"
          rel="noreferrer"
        >
          Developed by Maxim Murphy.
        </Link>
        <p>Review Your Food © 2024. All rights reserved.</p>
      </div>
    </section>
  );
}