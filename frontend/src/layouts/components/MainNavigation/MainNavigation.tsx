import { NavLink } from "react-router";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <nav className={classes.headerNavigation}>
      <ul className={classes.headerNavigation_list}>
        <li className={classes.headerNavigation_name}>
          <NavLink to={"/"}>AgroHands</NavLink>
        </li>
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? classes.headerNavigation_active : undefined
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/jobs"}
            className={({ isActive }) =>
              isActive ? classes.headerNavigation_active : undefined
            }
          >
            Jobs
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/workers"}
            className={({ isActive }) =>
              isActive ? classes.headerNavigation_active : undefined
            }
          >
            Workers
          </NavLink>
        </li>
      </ul>
      <div className={classes.line}></div>
    </nav>
  );
};

export default MainNavigation;
