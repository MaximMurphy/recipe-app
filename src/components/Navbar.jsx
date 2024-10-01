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
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">FOOD</button>
          </Link>
        </li>

        {username && (
          <>
            <li className="push-left">
              <Link href="/admin">
                <button className="btn-base">Write Review</button>
              </Link>
            </li>
            <li>
              <button className="profileButton" onClick={signOutNow}>
                Sign Out
              </button>
            </li>
            <li>
              <Link href={`/${username}`}>
                <Image
                  src={user?.photoURL}
                  alt="User profile picture"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </Link>
            </li>
          </>
        )}

        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-base">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
