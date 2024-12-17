import RootLayout from "./layouts/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Dashboard } from "./features/Dashboard/Dashboard";
import { Workers } from "./features/Workers/Workers";
import ErrorPage from "./layouts/components/Error/ErrorPage";
import WorkerProfile from "./features/Workers/WorkerProfile/WorkerProfile";
import { getWorkers } from "./api/Worker/Worker";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/workers", element: <Workers />, loader: getWorkers },
      { path: "/workers/:id", element: <WorkerProfile /> },
      { path: "/workers/:id/edit", element: <WorkerProfile /> },
      { path: "/workers/new", element: <WorkerProfile /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
