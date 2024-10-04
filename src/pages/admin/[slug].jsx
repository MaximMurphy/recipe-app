import styles from "@/styles/Admin.module.css";
import AuthCheck from "@/components/AuthCheck";
import { auth } from "@/lib/firebase";
import {
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import ImageUploader from "@/components/ImageUploader";

import { useState } from "react";
import { useRouter } from "next/router";

import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const router = useRouter();
  const { slug } = router.query;

  // const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug);
  const postRef = doc(
    getFirestore(),
    "users",
    auth.currentUser.uid,
    "posts",
    slug
  );
  const [post] = useDocumentDataOnce(postRef);

  return (
    <main className={styles.container}>
      {post && (
        <section>
          <h1>{post.title}</h1>
          <p>ID: {post.slug}</p>

          <PostForm postRef={postRef} defaultValues={post} />
        </section>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { isValid, isDirty } = formState;
  const router = useRouter();

  const [downloadURL, setDownloadURL] = useState("");

  const handleImageUpload = (url) => {
    setDownloadURL(url);
  };

  const updatePost = async ({ dish, content, published, rating }) => {
    const postDoc = await getDoc(postRef);
    if (postDoc.exists()) {
      const existingImageLink = postDoc.data().imageLink;

      console.log(downloadURL);
      console.log(existingImageLink);

      if (downloadURL) {
        await updateDoc(postRef, {
          dish,
          content,
          published,
          rating,
          imageLink: downloadURL,
          updatedAt: serverTimestamp(),
        });
      } else if (existingImageLink) {
        await updateDoc(postRef, {
          dish,
          content,
          published,
          rating,
          imageLink: existingImageLink,
          updatedAt: serverTimestamp(),
        });
      } else {
        console.error("Download URL is null");
      }

      reset({ dish, content, published, rating });

      //toast.success("Post updated successfully!");
    } else {
      console.error("Post does not exist");
    }
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      <div className={styles.controls}>
        <input
          className={styles.shortEntry}
          name="dish"
          {...register("dish", {
            required: { value: true, message: "content is required" },
          })}
          placeholder="Enter the dish name:"
        ></input>

        <div className="uploadContainer">
          <ImageUploader onUpload={handleImageUpload} />
        </div>

        <textarea
          className={styles.bigEntry}
          name="content"
          {...register("content", {
            maxLength: { value: 20000, message: "content is too long" },
            minLength: { value: 10, message: "content is too short" },
            required: { value: true, message: "content is required" },
          })}
          placeholder="Write your review here!"
        ></textarea>

        {errors.content && (
          <p className="text-danger">{errors.content.message}</p>
        )}
        <label className={styles.ratingLabel}>Rating: </label>
        <input
          className={styles.ratingInput}
          type="number"
          name="rating"
          min="0"
          max="10"
          {...register("rating", {
            required: { value: true, message: "content is required" },
          })}
        ></input>
        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className="btn-green"
            disabled={!isDirty || !isValid}
            onClick={(e) => {
              setValue("published", true);
              router.push("/admin");
              toast.success("Post updated successfully!");
            }}
          >
            {defaultValues.published ? "Save Changes" : "Publish"}
          </button>
          <DeletePostButton postRef={postRef} />
        </div>
      </div>
    </form>
  );
}

function DeletePostButton({ postRef }) {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm("Are you sure you want to delete this review?");
    if (doIt) {
      await deleteDoc(postRef);
      router.push("/admin");
      toast("Deleted ", { icon: "🗑️" });
    }
  };

  return (
    <button className="btn-danger" onClick={deletePost}>
      Delete
    </button>
  );
}
