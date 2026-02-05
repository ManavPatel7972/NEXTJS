export default async function BlogId({
  params,
}: {
  params: Promise<{ pageno: number }>
}) {
  const { pageno } = await params

  const limit = 10  
  const skip = ((pageno - 1) * limit) + 1;
  const end = skip + 9

  return <div>
    <h1> pageno - {pageno}</h1>
    <h1> limit - {limit}</h1>
    <h1> range == {skip} - {end}</h1>
  </div>
}