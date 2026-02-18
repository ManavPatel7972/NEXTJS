import Button from "@/components/Button";

const Page = async ({ params }) => {
  const { id } = await params;

  const data = await fetchById(id);

  return (
    <>
      <h1 className="text-dark text-center mt-4 mb-4">User ID = {id} page</h1>

      <ul className="mt-5">
        <li className="list-unstyled mt-3 mb-5">
          <div>
            <p>
              <b>Name</b> : {data.name}
            </p>
            <p>
              <b>UserName</b> : {data.username}
            </p>
            <p>
              <b>Email</b> : {data.email}
            </p>
            <p>
              <b>Avatar</b> :
              <img src={data.avatar} width={50} height={50} />
            </p>

            <Button id={data.id} />
          </div>
        </li>
      </ul>
    </>
  );
};

export const fetchById = async (id) => {
  const res = await fetch(
    `https://68b58f80e5dc090291af7138.mockapi.io/api/img/poster/name/imdb/Student/${id}`,
  );
  const data = await res.json();
  console.log("User Data = ", data);
  return data;
};

export default Page;
