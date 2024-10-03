import Link from "next/link";
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

  return (
    <div className="card">
      <Link legacyBehavior href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>

      <Link legacyBehavior href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>
      <h3>{post.dish}</h3>
      <break></break>

      <footer>
        <span>Rating: {rating}/10 </span>
        <span className="push-left">😋 {post.heartCount || 0} </span>
      </footer>

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
