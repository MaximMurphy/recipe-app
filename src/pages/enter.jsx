import { auth, googleAuthProvider } from "@/lib/firebase";
import { doc, writeBatch, getDoc, getFirestore } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { UserContext } from "@/lib/context";
import { useRouter } from "next/router";
import Image from "next/image";

import { useCallback, useContext, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main className="enter">
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  const router = useRouter();
  const { username } = useContext(UserContext);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      const userDoc = await getDoc(
        doc(getFirestore(), "users", auth.currentUser.uid)
      );
      const username = userDoc.data().username;
      if (username) {
        router.push("/");
      } else {
        router.push("/enter");
      }
    } catch (error) {
      console.error(error);
    }

    toast("Howdy!", {
      icon: "🤠",
    });
  };

  return (
    <div className="sign-in-button">
      <div className="emoji-background">
        <p>
          🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🥑 🥦 🥬 🥒 🌶️ 🫑
          🌽 🥕 🫒 🧄 🧅 🥔 🍠 🥐 🥯 🍞 🥖 🥨 🧀 🥞 🧇 🥓 🥩 🌭 🍔 🍟 🍕 🌮 🍣
          🍩 🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🥑 🥦 🥬 🥒 🌶️
          🫑 🌽 🥕 🫒 🧄 🧅 🥔 🍠 🥐 🥯 🍞 🥖 🥨 🧀 🥞 🧇 🥓 🥩 🌭 🍔 🍟 🍕 🌮
          🍣 🍩
        </p>
      </div>
      <button className="btn-google" onClick={signInWithGoogle}>
        <Image src={"/google.png"} width={30} height={30} alt="google" />
        Sign in with Google
      </button>
    </div>
  );
}

// Sign out button
function SignOutButton() {
  const router = useRouter();
  const signOutNow = () => {
    toast("See ya!", {
      icon: "👋",
    });
    auth.signOut();
    router.push("/");
  };

  return <button onClick={signOutNow}>Sign Out</button>;
}

// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = doc(getFirestore(), "users", user.uid);
    const usernameDoc = doc(getFirestore(), "usernames", formValue);

    // Commit both docs together as a batch write.
    const batch = writeBatch(getFirestore());
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(getFirestore(), "usernames", username);
        const snap = await getDoc(ref);
        console.log("Firestore read executed!", snap.exists());
        setIsValid(!snap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="myname"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button type="submit" className="btn-select" disabled={!isValid}>
            Choose
          </button>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
