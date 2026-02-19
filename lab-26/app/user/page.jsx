"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [user, setUser] = useState([]);

  const router = useRouter();

  const fetchUser = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    console.log("User Data = ", data);

    if (data) {
      setUser(data.data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <h1 className="text-dark text-center mt-4 mb-4">User page</h1>

      <ul className="">
        {user.map((u) => {
          return (
            <li key={u.UserId} className="list-unstyled mt-3 mb-5">
              <div>
                <p className="">
                  <span className="fw-bold">Id</span> : {u.UserId}
                </p>

                <p className="">
                  <span className="fw-bold">Name</span> : {u.UserName}
                </p>
                <p className="">
                  <span className="fw-bold">Password</span> : {u.Password}
                </p>
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
