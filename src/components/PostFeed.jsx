import styles from "../styles/PostFeed.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PostFeed({ posts, feedSelection, admin }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsEnd, setPostsEnd] = useState(false);

  useEffect(() => {
    let filtered = posts;

    if (feedSelection === "popular") {
      filtered = filtered
        .filter((post) => post.heartCount >= 1)
        .sort((a, b) => b.heartCount - a.heartCount);
    }

    setFilteredPosts(filtered);
  }, [feedSelection, posts]);

  const LIMIT = 10;

  const getMorePosts = () => {
    const startIndex = currentPage * LIMIT;
    const endIndex = startIndex + LIMIT;
    const newPosts = filteredPosts.slice(startIndex, endIndex);

    setCurrentPage(currentPage + 1);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };
  if (!filteredPosts) return <div>Loading...</div>;

  return (
    <div>
      {filteredPosts.slice(0, (currentPage + 1) * LIMIT).map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))}

      {!postsEnd && <button onClick={getMorePosts}>Load more</button>}

      {postsEnd && "That's all!"}
    </div>
  );
}

function PostItem({ post, admin = false }) {
  const rating = post.rating;

  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.info}>
          <Link href={`/${post.username}`} className={styles.usernameContainer}>
            <p className={styles.username}> {"@" + post.username}</p>
          </Link>
          <div className={styles.titleContainer}>
            <Link href={`/${post.username}/${post.slug}`}>
              <h2 className={styles.text}>{post.title}</h2>
            </Link>
            <h3 className={styles.text}>{post.dish}</h3>
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
        <p className={styles.heart}>😋 {post.heartCount || 0} </p>
      </div>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>

          {post.published ? (
            <p className="text-success">Live</p>
          ) : (
            <p className="text-danger">Unpublished</p>
          )}
        </>
      )}
    </div>
  );
}
