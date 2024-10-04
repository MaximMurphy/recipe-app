import styles from "@/styles/Post.module.css";
import Link from "next/link";
import Image from "next/image";
import HeartButton from "@/components/HeartButton";
import AuthCheck from "@/components/AuthCheck";

// UI component for main post content
export default function PostContent({ post, postRef }) {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  const rating = post.rating;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.info}>
          <Link href={`/${post.username}`} className={styles.usernameContainer}>
            <p className={styles.username}> {"@" + post.username}</p>
          </Link>
          <div className={styles.titleContainer}>
            <h2 className={styles.text}>{post.title}</h2>
            <h3 className={styles.text}>{post.dish}</h3>
            <p className={styles.text}>{post.content}</p>
          </div>
          <p className={styles.rating}>{rating}/10</p>
        </div>

        <div className={styles.imageContainer}>
          <Image
            alt={post.title}
            src={post.imageLink}
            width={200}
            height={200}
            priority
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <p className={styles.date}>{createdAt.toDateString()}</p>
        <div className={styles.heart}>
          <AuthCheck
            fallback={
              <Link href="/enter">
                <button>Sign Up to Like</button>
              </Link>
            }
          >
            <div className={styles.heartContainer}>
              <HeartButton postRef={postRef} />
              <p className={styles.heart}>{post.heartCount || 0} </p>
            </div>
          </AuthCheck>
        </div>
      </div>
    </div>
  );
}
