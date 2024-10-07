import PostFeed from "@/components/PostFeed";
import FeedSelector from "@/components/FeedSelector";
import { useState } from "react";
import { postToJSON } from "@/lib/firebase";
import {
  Timestamp,
  query,
  where,
  orderBy,
  limit,
  collectionGroup,
  getDocs,
  getFirestore,
  startAfter,
} from "firebase/firestore";

export async function getServerSideProps(context) {
  const ref = collectionGroup(getFirestore(), "posts");
  const postsQuery = query(
    ref,
    where("published", "==", true),
    orderBy("createdAt", "desc")
  );

  const postsSnapshot = await getDocs(postsQuery);
  const posts = postsSnapshot.docs.map((doc) => postToJSON(doc));

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [feedSelection, setFeedSelection] = useState("all");
  const [sortOption, setSortOption] = useState(null);

  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption);
  };

  return (
    <main>
      <FeedSelector
        onFeedSelectionChange={(selection) => setFeedSelection(selection)}
        feedSelection={feedSelection}
        onSortChange={handleSortChange}
      />
      <PostFeed
        posts={props.posts}
        feedSelection={feedSelection}
        sortOption={sortOption}
        admin={undefined}
      />
    </main>
  );
}
