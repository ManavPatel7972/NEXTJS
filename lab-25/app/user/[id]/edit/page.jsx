import EditForm from "./EditForm";

const EditPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `https://68b58f80e5dc090291af7138.mockapi.io/api/img/poster/name/imdb/Student/${id}`,
  );

  const user = await res.json();

  console.log("User EDIT ===", user);

  return (
    <>
      <h2 className="text-center mt-4">Edit User</h2>
      <EditForm user={user} />
    </>
  );
};

export default EditPage;
