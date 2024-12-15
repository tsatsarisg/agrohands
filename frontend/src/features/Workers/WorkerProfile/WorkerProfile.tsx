import { useParams } from "react-router";

const WorkerProfile = () => {
  const params = useParams();
  const { id } = params;
  return <div>PROFILE {id}</div>;
};

export default WorkerProfile;
