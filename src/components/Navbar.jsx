import styles from "../styles/Navbar.module.css";
import HamburgerMenu from "./HamburgerMenu";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import { useState } from "react";

export default function Navbar(props) {
  const { user, username } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.leftSide}>
        <HamburgerMenu />
        <p className={styles.breadEmoji}>🍞</p>
        <Link href="/" className={styles.logo}>
          <h1>review your food</h1>
        </Link>
      </div>
      <div className={styles.center}></div>

      <div className={styles.rightSide}>
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
                width={30}
                height={30}
                className={styles.profilePic}
              />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
