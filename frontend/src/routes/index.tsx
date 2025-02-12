import { createBrowserRouter } from "react-router";
import { Dashboard } from "../features/Dashboard/Dashboard";
import ErrorPage from "../layouts/components/Error/ErrorPage";
import RootLayout from "../layouts/RootLayout";
import { tokenLoader } from "../utils/auth";
import authRoutes from "./auth";
import workerRoutes from "./workers";
import jobRoutes from "./jobs";
import profileRoutes from "./profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      { index: true, element: <Dashboard /> },
      workerRoutes,
      jobRoutes,
      profileRoutes,
    ],
  },
  authRoutes,
]);

export default router;
