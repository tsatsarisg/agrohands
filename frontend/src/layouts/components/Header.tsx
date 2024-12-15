import { NavLink } from "react-router";
import classes from "./Header.module.css";

const Header = () => {
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
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/courts"}>Jobs</NavLink>
        </li>
        <li>
          <NavLink to={"/courts"}>Workers</NavLink>
        </li>
      </ul>
      <div className={classes.line}></div>
    </nav>
  );
};

export default Header;
