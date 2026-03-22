"use client"
import { useState } from "react";

export default function Counter() {
  const [count,setCount] = useState<number>(0)

  return (
    <div className="container">
      <div className="card">
        <h1>Client Component</h1>
        <p className="label">Current Count</p>
        <p className="count">{count}</p>
        <button className="btn" onClick={()=> setCount(count+1)}>Increment</button>
      </div>
    </div>
  )
}