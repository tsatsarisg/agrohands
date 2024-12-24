import { NavLink, Form, useRouteLoaderData } from "react-router";
import { AiFillHome } from "react-icons/ai";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const token = useRouteLoaderData("root"); // Fetch token from route loader

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <div>
          <h1>
            <NavLink to="/" className={classes.logo}>
              AgroHands
            </NavLink>
          </h1>
        </div>

        <ul className={classes.navList}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${classes.navLink} ${isActive ? classes.navLinkActive : ""}`
              }
            >
              <AiFillHome className="w-5 h-5" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `${classes.navLink} ${isActive ? classes.navLinkActive : ""}`
              }
            >
              Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/workers"
              className={({ isActive }) =>
                `${classes.navLink} ${isActive ? classes.navLinkActive : ""}`
              }
            >
              Workers
            </NavLink>
          </li>
        </ul>

        <div className={classes.authContainer}>
          {token ? (
            <Form action="logout" method="post">
              <button className={classes.logoutButton}>Logout</button>
            </Form>
          ) : (
            <>
              <NavLink to="/login" className={classes.loginLink}>
                Login
              </NavLink>
              <NavLink to="/signup" className={classes.signupButton}>
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
