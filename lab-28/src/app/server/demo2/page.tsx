export default function Page() {

  async function printData(formData:FormData) {
    "use server"

    const name = formData.get("name")
    const email = formData.get("email")

    console.log(name, email)
  }

  return (
    <form action={printData}>
      <input name="name" placeholder="Enter name"/>
      <input name="email" placeholder="Enter email"/>
      <button>Submit</button>
    </form>
  )
}