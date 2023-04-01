import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function UserProfilePage({}) {
  function makeToast() {
    toast("howdy!", {
      icon: "🤠",
    });
  }

  const router = useRouter();

  const signOutNow = () => {
    signOut(auth);
    router.push("/enter");
    router.reload();
  };

  return (
    <main>
      <h1>Profile</h1>
      <button onClick={makeToast}>Press Me!</button>
      <button onClick={signOutNow}>Sign Out</button>
    </main>
  );
}
