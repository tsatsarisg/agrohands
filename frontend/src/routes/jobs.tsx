import { getJobs } from "../api/Jobs";
import JobsPage from "../features/Jobs/Jobs";

const jobRoutes = {
  path: "jobs",
  id: "jobs-page",
  loader: getJobs,
  children: [{ element: <JobsPage />, index: true }],
};

export default jobRoutes;
