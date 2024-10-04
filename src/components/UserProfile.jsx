import Image from "next/image";

// UI component for user profile
export default function UserProfile({ user }) {
  return (
    <div className="box-center">
      <Image
        src={user.photoURL || "/hacker.png"}
        height={150}
        width={150}
        className="card-img-center"
        alt="User Profile Pic"
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || "Anonymous User"}</h1>
    </div>
  );
}
