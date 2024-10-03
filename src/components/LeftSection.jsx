import styles from "../styles/LeftSection.module.css";
import LeftNav from "./LeftNav";

export default function LeftSection() {
  return (
    <section className={styles.left}>
      <LeftNav />
    </section>
  );
}
