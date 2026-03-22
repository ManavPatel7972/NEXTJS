"use server"
export async function printData(formData: FormData) {
  const name = formData.get("name")
  console.log("Server received:", name)
} 