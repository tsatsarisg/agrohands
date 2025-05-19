import { signup } from "../api/Auth";
import Login from "../features/Auth/Login/Login";
import Signup from "../features/Auth/Signup/Signup";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import ErrorPage from "../layouts/components/Error/ErrorPage";
import { logout, onlyGuestLoader } from "../utils/auth";

const authRoutes = {
  path: "/",
  element: <AuthLayout />,
  errorElement: <ErrorPage />,
  loader: onlyGuestLoader,
  children: [
    {
      path: "/signup",
      element: <Signup />,
      action: signup,
    },
    {
      path: "/login",
      element: <Login />,
    },
    { path: "/logout", action: logout },
  ],
};

export default authRoutes;
