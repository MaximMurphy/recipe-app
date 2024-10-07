import styles from "../styles/PostFeed.module.css";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PostFeed({ posts, feedSelection, sortOption, admin }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsEnd, setPostsEnd] = useState(false);
  const [prevSortOption, setPrevSortOption] = useState(sortOption);

  useEffect(() => {
    let filtered = posts;

    if (feedSelection === "popular") {
      filtered = filtered.filter((post) => post.heartCount >= 2);
    } else if (feedSelection === "all") {
      filtered = posts;
    }

    if (prevSortOption && prevSortOption !== sortOption) {
      filtered = posts;
    }

    switch (sortOption) {
      case "newestToOldest":
        filtered = filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "oldestToNewest":
        filtered = filtered.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "highestToLowest":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "lowestToHighest":
        filtered = filtered.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    setPrevSortOption(sortOption);
    setFilteredPosts(filtered);
  }, [feedSelection, sortOption, posts, prevSortOption]);

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
      {filteredPosts.slice(0, (currentPage + 1) * LIMIT).map((post) => {
        if (!post.createdAt) return <div>Loading...</div>;
        return <PostItem post={post} key={post.slug} admin={admin} />;
      })}

      {!postsEnd && (
        <button onClick={getMorePosts} className={styles.loadButton}>
          Load more
        </button>
      )}

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
          <Link
            href={`/${post.username}/${post.slug}`}
            className={styles.titleContainer}
          >
            <h2 className={styles.title}>{post.title}</h2>
            <h3 className={styles.dish}>{post.dish}</h3>
          </Link>
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
        <div className={styles.heartContainer}>
          <Icon icon="mdi:heart" className={styles.heartIcon} />
          <p>{post.heartCount || 0} </p>
        </div>
      </div>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <div className={styles.editOptions}>
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
        </div>
      )}
    </div>
  );
}
