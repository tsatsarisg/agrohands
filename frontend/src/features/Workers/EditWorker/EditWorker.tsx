import { useRouteLoaderData } from "react-router";

const EditWorkerProfile = () => {
  const data = useRouteLoaderData("worker-profile");

  return (
    <div>
      PROFILE {data.name}
      Edit
    </div>
  );
};

export default EditWorkerProfile;
