import { printData } from "./../server/actions/actions"

export default function ServerForm() {
  return (
    <div>
      <h2>Server Form</h2>
      <form action={printData}>
        <input name="name" placeholder="Enter name"/>
        <button type="submit">Submit Server</button>
      </form>
    </div>
  )
}