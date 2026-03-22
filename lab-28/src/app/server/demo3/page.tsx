import { printData } from "../actions/actions"

export default function Page() {
  return (
    <form action={printData}>
      <input name="name" />
      <button>Submit</button>
    </form>
  )
}