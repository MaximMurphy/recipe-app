import styles from "../styles/LeftSection.module.css";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function LeftNav() {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  const signOutNow = () => {
    toast("See ya!", {
      icon: "👋",
    });
    auth.signOut();
    router.push("/");
  };

  return (
    <div className={styles.list}>
      <Link href="/" className={styles.item}>
        <Icon icon="carbon:home" className={styles.icon} />
        <p>Food Feed</p>
      </Link>

      {/* Hide when not logged in */}

      {!username ? (
        <Link href="/enter" className={styles.item}>
          <Icon icon="carbon:login" className={styles.icon} />
          <p>Log In</p>
        </Link>
      ) : (
        <>
          <Link href="/admin" className={styles.item}>
            <Icon icon="carbon:edit" className={styles.icon} />
            <p>Edit Reviews</p>
          </Link>
          <Link href={`/${username}`} className={styles.item}>
            <Icon icon="carbon:user" className={styles.icon} />
            <p>User Profile</p>
          </Link>
          <button onClick={signOutNow} className={styles.item}>
            <Icon icon="carbon:logout" className={styles.icon} />
            <p className={styles.signout}>Sign Out</p>
          </button>
        </>
      )}
    </div>
  );
}
