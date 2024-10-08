import styles from "@/styles/Post.module.css";
import { Icon } from "@iconify-icon/react";
import { auth } from "@/lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { increment, writeBatch, doc, getFirestore } from "firebase/firestore";

// Allows user to heart or like a post
export default function Heart({ postRef }) {
  // Listen to heart document for currently logged in user
  const heartRef = auth.currentUser
    ? doc(getFirestore(), postRef.path, "hearts", auth.currentUser.uid)
    : null;
  const [heartDoc] = useDocument(heartRef);

  // Create a user-to-post relationship
  const addHeart = async () => {
    const uid = auth.currentUser.uid;
    const batch = writeBatch(getFirestore());

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  // Remove a user-to-post relationship
  const removeHeart = async () => {
    const batch = writeBatch(getFirestore());

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  return heartDoc?.exists() ? (
    <button onClick={removeHeart} className="heading">
      <Icon icon="line-md:heart-filled" />
    </button>
  ) : (
    <button onClick={addHeart} className="heading">
      <Icon icon="line-md:heart" />
    </button>
  );
}
