export default function Page() {
  async function submitForm(formData:FormData) {
    "use server"

    console.log(formData.get("name"))
  }

  return (
  <form action={submitForm}>
    <input type="text" name="name"/>
    <button type="submit">Submit</button>
  </form>
  )
}