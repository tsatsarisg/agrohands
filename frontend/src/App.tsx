import RootLayout from "./layouts/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Dashboard } from "./features/Dashboard/Dashboard";
import { Workers } from "./features/Workers/Workers";
import ErrorPage from "./layouts/components/Error/ErrorPage";
import { upsertWorker, getWorkerByID, getWorkers } from "./api/Worker";
import WorkerForm from "./features/Workers/WorkerForm/WorkerForm";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import Signup from "./features/Auth/Signup/Signup";
import Login from "./features/Auth/Login/Login";
import { login, signup } from "./api/Auth";
import { banAuthLoader, logout, tokenLoader } from "./utils/auth";
import JobsPage from "./features/Jobs/Jobs";
import { getJobs } from "./api/Jobs";
import ProfilePage from "./features/Profile/Profile";
import { getEmail } from "./api/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      { index: true, element: <Dashboard /> },
      {
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
      },
      {
        path: "jobs",
        id: "jobs-page",
        loader: getJobs,
        children: [{ element: <JobsPage />, index: true }],
      },
      {
        path: "profile",
        id: "profile-page",
        loader: getEmail,
        children: [{ element: <ProfilePage />, index: true }],
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
        action: signup,
        loader: banAuthLoader,
      },
      {
        path: "/login",
        element: <Login />,
        action: login,
        loader: banAuthLoader,
      },
      { path: "/logout", action: logout },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
