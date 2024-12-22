import { Outlet, Link, useLocation } from "react-router";
import styles from "./AuthLayout.module.css";

const AuthLayout = () => {
  const location = useLocation();

  const isLoginPage = location.pathname.endsWith("/login");
  const isSignupPage = location.pathname.endsWith("/signup");
  return (
    <div className={styles.pageContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.authHeader}>
          {isLoginPage ? "Log In" : "Sign Up"}
        </h1>
        <Outlet />

        {isLoginPage && (
          <p className={styles.toggleText}>
            Don’t have an account?{" "}
            <Link to="/signup" className={styles.toggleLink}>
              Sign Up
            </Link>
          </p>
        )}
        {isSignupPage && (
          <p className={styles.toggleText}>
            Already have an account?{" "}
            <Link to="/login" className={styles.toggleLink}>
              Log In
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
