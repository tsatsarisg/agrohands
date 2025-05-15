import JobsPage from "../features/Jobs/Jobs";

const jobRoutes = {
  path: "jobs",
  id: "jobs-page",
  children: [{ element: <JobsPage />, index: true }],
};

export default jobRoutes;
