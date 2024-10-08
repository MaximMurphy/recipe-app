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
    router.push("/");
    setTimeout(() => {
      auth.signOut();
    }, 1000); // wait 100ms before signing out
  };

  return (
    <div className={styles.list}>
      <Link
        href="/"
        className={`${styles.item} ${
          router.pathname === "/" ? styles.active : ""
        }`}
      >
        <Icon icon="carbon:home" className={styles.icon} />
        <p>Food Feed</p>
      </Link>

      {/* Hide when not logged in */}

      {!username ? (
        <Link
          href="/enter"
          className={`${styles.item} ${
            router.pathname === "/enter" ? styles.active : ""
          }`}
        >
          <Icon icon="carbon:login" className={styles.icon} />
          <p>Log In</p>
        </Link>
      ) : (
        <>
          <Link
            href="/admin"
            className={`${styles.item} ${
              router.pathname === "/admin" ? styles.active : ""
            }`}
          >
            <Icon icon="carbon:edit" className={styles.icon} />
            <p>Edit Reviews</p>
          </Link>
          <Link
            href={`/${username}`}
            className={`${styles.item} ${
              router.pathname === `/[username]` ? styles.active : ""
            }`}
          >
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
