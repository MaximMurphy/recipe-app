import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/lib/context";

type Props = {};

// Top Navbars
export const Navbar: React.FC<Props> = () => {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">FOOD</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className="push-left">
              <Link href="/admin">
                <button className="btn-base">Post</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
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
};
