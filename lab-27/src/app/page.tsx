"use client";
import React, { useEffect, useState } from "react";

function Homepage() {
  const [students, setStudents] = useState([]);

  const fetchStu = async () => {
    const res = await fetch("/api/get-students");

    if (!res) {
      console.log("Not Found");
    }
    const data = await res.json();

    setStudents(data);
  };

  useEffect(() => {
    fetchStu();
  }, []);
  return (
    <>
      <h1>Home Page</h1>
      <ul>
        {students.map((stu) => {
          return (
            <li key={stu.id}>
              <p>name: {stu.name}</p>
              <p>age: {stu.age}</p>
              <p>Grade: {stu.grade}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Homepage;
