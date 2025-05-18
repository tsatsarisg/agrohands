import { signup, login } from "../api/Auth";
import Login from "../features/Auth/Login/Login";
import Signup from "../features/Auth/Signup/Signup";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import ErrorPage from "../layouts/components/Error/ErrorPage";
import { banAuthLoader, logout } from "../utils/auth";

const authRoutes = {
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
      // loader: banAuthLoader,
    },
    { path: "/logout", action: logout },
  ],
};

export default authRoutes;
