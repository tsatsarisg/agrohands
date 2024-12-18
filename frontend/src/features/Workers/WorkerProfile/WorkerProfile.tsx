import { Link, useRouteLoaderData, useSubmit } from "react-router";

const WorkerProfile = () => {
  const submit = useSubmit();
  const data = useRouteLoaderData("worker-profile");

  const deleteWorker = () => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "DELETE" });
    }
  };

  return (
    <div>
      PROFILE {data.name}
      <div>
        {" "}
        <Link to={"edit"}>Edit</Link>
      </div>
      <div onClick={deleteWorker}>Delete</div>
    </div>
  );
};

export default WorkerProfile;
