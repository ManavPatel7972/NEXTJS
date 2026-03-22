"use client"

import { useState } from "react"

import { printData } from "./../server/actions/actions"
// import { addUser } from "../server/actions/adduser"

export default function ClientForm() {

  const [name, setName] = useState("")

  function handleSubmit(e: any) {
    e.preventDefault()

    console.log("Client received:", name)
  }

  return (
    <div>
      <h2>Client Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />

        <button type="submit">Submit Client</button>
      </form>

       <br/>

      <form action={printData}>
        <input
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <button type="submit">Submit server</button>
      </form>

        <br/>

      {/* <form action={addUser}>

        <input
          name="name"
          placeholder="Enter Name"
        />

        <input
          name="password"
          placeholder="Enter Password"
        />

        <button type="submit">
          Save User
        </button>

      </form> */}

    </div>
  )
}