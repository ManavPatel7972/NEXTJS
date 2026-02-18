"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EditForm = ({ user }) => {
  const router = useRouter();
  
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(
      `https://68b58f80e5dc090291af7138.mockapi.io/api/img/poster/name/imdb/Student/${user.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          email,
          avatar,
        }),
      }
    );

    alert("User Updated Successfully");
    router.push(`/user/${user.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <input
        className="form-control mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input
        className="form-control mb-3"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />

      <input
        className="form-control mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        className="form-control mb-3"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        placeholder="Avatar URL"
      />

      <button className="btn btn-success">Update</button>
    </form>
  );
};

export default EditForm;
