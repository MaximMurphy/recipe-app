import styles from "../styles/RightSection.module.css";
import CreateNewPost from "./CreateNewPost";
import AuthCheck from "./AuthCheck";

export default function RightNav() {
  return (
    <div className={styles.list}>
      <p className={styles.title}>Where did you eat today?</p>
      <AuthCheck>
        <CreateNewPost />
      </AuthCheck>
    </div>
  );
}
