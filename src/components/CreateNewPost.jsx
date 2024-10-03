import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "@/lib/context";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { auth } from "@/lib/firebase";
import kebabCase from "lodash.kebabcase";
import styles from "@/styles/Admin.module.css";

export default function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = doc(getFirestore(), "users", uid, "posts", slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      rating: 0,
      published: false,
      dish: "",
      imageLink: "",
      content: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await setDoc(ref, data);
    setTitle("");

    toast.success("Post created! 🔥");

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Restaurant Name"
        className={styles.input}
      />
      <p>
        <strong></strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Review
      </button>
    </form>
  );
}
