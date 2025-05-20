import { getWorkerByID, upsertWorker } from "../api/Worker";
import WorkerForm from "../features/Workers/WorkerForm/WorkerForm";
import { WorkersPage } from "../pages/Workers/WorkersPage";

const workerRoutes = {
  path: "workers",
  id: "workers-page",
  children: [
    { element: <WorkersPage />, index: true },
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
