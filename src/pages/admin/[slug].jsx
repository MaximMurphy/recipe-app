import styles from "@/styles/Admin.module.css";
import AuthCheck from "@/components/AuthCheck";
import { auth } from "@/lib/firebase";
import {
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import ImageUploader from "@/components/ImageUploader";

import { useState } from "react";
import { useRouter } from "next/router";

import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const [preview, setPreview] = useState(false);

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

  const goToLiveView = () => {
    toast("Great Post!", {
      icon: "👍",
    });
    router.push(`/${post.username}/${post.slug}`);
  };

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>
              {preview ? "Edit" : "Preview"}
            </button>

            <button className="btn-blue" onClick={goToLiveView}>
              Live view
            </button>

            <DeletePostButton postRef={postRef} />
          </aside>
        </>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { isValid, isDirty } = formState;
  const [downloadURL, setDownloadURL] = useState(null);

  const router = useRouter();

  const handleImageUpload = (url) => {
    setDownloadURL(url);
  };

  const updatePost = async ({ dish, content, published, rating }) => {
    await updateDoc(postRef, {
      dish,
      content,
      published,
      rating,
      imageLink: downloadURL,
      updatedAt: serverTimestamp(),
    });

    reset({ dish, content, published, rating });

    //toast.success("Post updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>
        <input
          className="shortEntry"
          name="dish"
          {...register("dish", {
            required: { value: true, message: "content is required" },
          })}
          placeholder="[enter dish name]"
        ></input>

        <div className="uploadContainer">
          <ImageUploader onUpload={handleImageUpload} />
        </div>

        <textarea
          className="bigEntry"
          name="content"
          {...register("content", {
            maxLength: { value: 20000, message: "content is too long" },
            minLength: { value: 10, message: "content is too short" },
            required: { value: true, message: "content is required" },
          })}
          placeholder="[paste image link here]"
        ></textarea>

        {errors.content && (
          <p className="text-danger">{errors.content.message}</p>
        )}
        <label className="rating">Rating: </label>
        <input
          type="number"
          name="rating"
          min="0"
          max="10"
          {...register("rating", {
            required: { value: true, message: "content is required" },
          })}
        ></input>

        <fieldset>
          <input
            className={styles.checkbox}
            name="published"
            type="checkbox"
            {...register("published")}
          />
          <label>Published</label>
        </fieldset>

        <button
          type="submit"
          className="btn-green"
          disabled={!isDirty || !isValid}
          onClick={() => {
            router.push("/admin");
            toast.success("Post updated successfully!");
          }}
        >
          Save Changes
        </button>
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
