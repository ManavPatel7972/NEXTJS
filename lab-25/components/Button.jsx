"use client";

import { useRouter } from "next/navigation";

const Button = ({ id }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(
      `https://68b58f80e5dc090291af7138.mockapi.io/api/img/poster/name/imdb/Student/${id}`,
      {
        method: "DELETE",
      },
    );

    alert("User deleted");
    router.push("/user");
  };

  const handleEdit = () => {
    router.push(`/user/${id}/edit`);
  };

  return (
    <>
      <button onClick={handleDelete} className="btn btn-danger ms-2 me-3 mt-3">
        Delete
      </button>

      <button onClick={handleEdit} className="btn btn-primary mt-3">
        Edit
      </button>
    </>
  );
};

export default Button;
