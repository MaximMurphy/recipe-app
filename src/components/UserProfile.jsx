import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

// UI component for user profile
export default function UserProfile({ user }) {
  const router = useRouter();

  const signOutNow = () => {
    toast("See ya!", {
      icon: "👋",
    });
    signOut(auth);
    router.push("/enter");
  };

  return (
    <div className="box-center">
      <img src={user.photoURL || "/hacker.png"} className="card-img-center" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || "Anonymous User"}</h1>
      <button className="profileButton" onClick={signOutNow}>
        Sign Out
      </button>
    </div>
  );
}
