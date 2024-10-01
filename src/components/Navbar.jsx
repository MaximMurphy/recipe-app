import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import Image from "next/image";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import styles from "../styles/Navbar.module.css";

export default function Navbar(props) {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOutNow = () => {
    toast("See ya!", {
      icon: "👋",
    });
    signOut(auth);
    router.push("/enter");
  };

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <button className="btn-logo">Home Feed</button>
      </Link>
      <div>
        {!username && (
          <Link href="/enter">
            <button className="btn-base">Log in</button>
          </Link>
        )}

        {username && (
          <div className={styles.loggedIn}>
            <Link href={`/${username}`}>
              <Image
                src={user?.photoURL}
                alt="User profile picture"
                width={50}
                height={50}
                className={styles.profilePic}
              />
            </Link>
            <div className={styles.desktopOnly}>
              <Link href="/admin">
                <button className="btn-base">Write Review</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
