import styles from "../styles/Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <section className={styles.footer}>
      <Link href="https://www.maximmurphy.com" target="_blank" rel="noreferrer">
        Developed by Maxim Murphy.
      </Link>
      <p>Review Your Food © 2024. All rights reserved.</p>
    </section>
  );
}
