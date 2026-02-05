export default async function BlogId({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <div>My blog: {id}</div>
}