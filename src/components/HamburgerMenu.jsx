import styles from "../styles/HamburgerMenu.module.css";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import { Icon } from "@iconify-icon/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.menu}>
      <button className={styles.button} onClick={handleToggle}>
        {isOpen ? (
          <span className={styles.icon}>
            <Icon
              icon="line-md:menu-to-close-transition"
              width="25"
              height="25"
            />
          </span>
        ) : (
          <span className={styles.icon}>
            <Icon icon="material-symbols:menu" width="25px" height="25px" />
          </span>
        )}
      </button>
      {isOpen && (
        <div className={styles.items}>
          <LeftNav />
          <RightNav />
        </div>
      )}
    </div>
  );
}
