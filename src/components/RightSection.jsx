import styles from "../styles/RightSection.module.css";
import RightNav from "./RightNav";

export default function RightSection() {
  return (
    <section className={styles.right}>
      <RightNav />
    </section>
  );
}
