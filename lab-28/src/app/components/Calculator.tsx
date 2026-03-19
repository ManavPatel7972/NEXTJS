"use client"
import { useState } from "react";

export default function Calculator() {
  const [n1,setn1] = useState<String>("")
  const [n2,setn2] = useState<String>("")
  const [res,setres] = useState<number>()

  const add = () => {
    setres(Number(n1) + Number(n2))
  }

  const sub = () => {
    setres(Number(n1) - Number(n2))
  }

  const mul = () => {
    setres(Number(n1) * Number(n2))
  }

  const div = () => {
    setres(Number(n1) / Number(n2))
  }

  return (
    <div>
      <h1>Basic Calculator</h1>
      <input type="number" placeholder="Enter first number" value={Number(n1)} onChange={(e)=>{setn1(e.target.value)}}/>
      <input type="number" placeholder="Enter second number" value={Number(n2)} onChange={(e)=>{setn2(e.target.value)}}/>
      <br/>
      <button onClick={add}>Add</button>
      <button onClick={sub}>Sub</button>
      <button onClick={mul}>Mul</button>
      <button onClick={div}>Div</button>

      <h3>Ans: {res}</h3>
    </div>
  )
}