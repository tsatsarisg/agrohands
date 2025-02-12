import { getWorkers, getWorkerByID, upsertWorker } from "../api/Worker";
import WorkerForm from "../features/Workers/WorkerForm/WorkerForm";
import { Workers } from "../features/Workers/Workers";

const workerRoutes = {
  path: "workers",
  id: "workers-page",
  loader: getWorkers,
  children: [
    { element: <Workers />, index: true },

    {
      path: ":id/edit",
      loader: getWorkerByID,
      id: "worker-profile",
      element: <WorkerForm />,
      action: upsertWorker,
    },
    {
      path: "new",
      element: <WorkerForm />,
      action: upsertWorker,
    },
  ],
};

export default workerRoutes;
