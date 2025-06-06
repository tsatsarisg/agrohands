import { signup } from "../api/Auth";
import Login from "../features/Auth/Login/Login";
import Signup from "../features/Auth/Signup/Signup";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import ErrorPage from "../layouts/components/Error/ErrorPage";
import { logoutAction, onlyGuestLoader } from "../utils/auth";

const authRoutes = {
  path: "/",
  element: <AuthLayout />,
  errorElement: <ErrorPage />,
  // loader: onlyGuestLoader,
  children: [
    {
      path: "/signup",
      element: <Signup />,
      action: signup,
      loader: onlyGuestLoader,
    },
    {
      path: "/login",
      element: <Login />,
      loader: onlyGuestLoader,
    },
    { path: "/logout", action: logoutAction },
  ],
};

export default authRoutes;
