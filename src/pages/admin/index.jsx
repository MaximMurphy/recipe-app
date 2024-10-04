import AuthCheck from "@/components/AuthCheck";
import PostFeed from "@/components/PostFeed";
import CreateNewPost from "@/components/CreateNewPost";
import { auth } from "@/lib/firebase";
import { query, collection, orderBy, getFirestore } from "firebase/firestore";

import { useCollection } from "react-firebase-hooks/firestore";

export default function AdminPostsPage(props) {
  return (
    <main>
      <AuthCheck>
        <h1>Manage your reviews</h1>
        <PostList />
      </AuthCheck>
    </main>
  );
}

function PostList() {
  const ref = collection(
    getFirestore(),
    "users",
    auth.currentUser.uid,
    "posts"
  );
  const postQuery = query(ref, orderBy("createdAt", "desc"));

  const [querySnapshot] = useCollection(postQuery);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <PostFeed posts={posts} feedSelection="all" admin />
    </>
  );
}
