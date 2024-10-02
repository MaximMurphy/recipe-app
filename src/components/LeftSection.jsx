import styles from "../styles/LeftSection.module.css";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";

export default function LeftSection() {
  return (
    <section className={styles.left}>
      <div className={styles.list}>
        <Link href="/" className={styles.item}>
          <Icon icon="carbon:home" className={styles.icon} />
          <p>Food Feed</p>
        </Link>
        <Link href="/admin" className={styles.item}>
          <Icon icon="carbon:edit" className={styles.icon} />
          <p>Edit Reviews</p>
        </Link>
      </div>
    </section>
  );
}
