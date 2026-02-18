"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchById } from "./[id]/page";


const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();


  const fetchUser = async () => {
    const res = await fetch(
      "https://68b58f80e5dc090291af7138.mockapi.io/api/img/poster/name/imdb/Student",
    );
    const data = await res.json();
    console.log("User Data = ", data);

    if (data) {
      setUser(data);
    }
  };

  const handleClick = async (id) => {
    const data = await fetchById(id);
    console.log("Data BY ID ===>", data);
    router.push(`/user/${id}`)
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <h1 className="text-dark text-center mt-4 mb-4">User page</h1>

      <ul className="">
        {user.map((u) => {
          return (
            <li key={u.id} className="list-unstyled mt-3 mb-5">
              <div>
                <p className="">
                  <span className="fw-bold">Name</span> : {u.name}
                </p>
                <p className="">
                  <span className="fw-bold">UserName</span> : {u.username}
                </p>
                <p className="">
                  <span className="fw-bold">Email</span> : {u.email}
                </p>
                <p className="">
                  <span className="fw-bold">Avatar</span> :{" "}
                  <img src={u.avatar} width={50} height={50} />
                </p>
                <button
                  className="btn-sm btn-primary"
                  onClick={() => {
                    handleClick(u.id);
                  }}
                >
                  View More
                </button>
              </div>
              <hr />
            </li>
          );
        })}
      </ul>
      
    </>
  );
};

export default page;
