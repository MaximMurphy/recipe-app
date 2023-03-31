import Link from "next/link";
import Image from "next/image";

type Props = {};

// Top Navbar
export const Navbar: React.FC<Props> = () => {
  const user = null;
  const username = null;

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">FEED</button>
          </Link>
        </li>
        {/* user is signed in AND has a username */}
        {username && (
          <>
            <li className="push-left">
              <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <Image src={user?.photoURL} alt="Profile Pic" />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed in OR has not created a username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
