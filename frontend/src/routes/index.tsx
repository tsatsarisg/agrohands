import { createBrowserRouter } from "react-router";
import ErrorPage from "../layouts/components/Error/ErrorPage";
import RootLayout from "../layouts/RootLayout";
import { authLoader } from "../utils/auth";
import authRoutes from "./auth";
import workerRoutes from "./workers";
import jobRoutes from "./jobs";
import profileRoutes from "./profile";
import { Dashboard } from "../pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />,
    loader: authLoader,
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
