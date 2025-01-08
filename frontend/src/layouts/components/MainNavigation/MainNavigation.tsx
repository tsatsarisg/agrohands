import { NavLink, Form, useRouteLoaderData } from "react-router";
import { AiFillHome } from "react-icons/ai";
import classes from "./MainNavigation.module.css";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const MainNavigation = () => {
  const token = useRouteLoaderData("root");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

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

        {token ? (
          <div className={classes.settingsMenu}>
            <button className={classes.settingsButton} onClick={toggleDropdown}>
              <FaUserCircle size={24} />
            </button>
            {isDropdownOpen && (
              <div
                className={classes.dropdownMenu}
                onMouseLeave={closeDropdown}
              >
                <NavLink
                  to="/profile"
                  className={classes.dropdownItem}
                  onClick={closeDropdown}
                >
                  Profile
                </NavLink>
                <Form action="logout" method="POST">
                  <button className={classes.dropdownItem}>Logout</button>
                </Form>
              </div>
            )}
          </div>
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
      </nav>
    </header>
  );
};

export default MainNavigation;

// import React, { useState } from "react";
// import { NavLink, Form, useRouteLoaderData } from "react-router-dom";
// import classes from "./MainNavigation.module.css";

// const MainNavigation = () => {
//   const token = useRouteLoaderData("root");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const closeDropdown = () => {
//     setIsDropdownOpen(false);
//   };

//   return (
//     <nav className={classes.headerNavigation}>
//       <ul className={classes.headerNavigation_list}>
//         <li className={classes.headerNavigation_name}>
//           <NavLink to="/">AgroHands</NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive ? classes.headerNavigation_active : undefined
//             }
//             end
//           >
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/jobs"
//             className={({ isActive }) =>
//               isActive ? classes.headerNavigation_active : undefined
//             }
//           >
//             Jobs
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/workers"
//             className={({ isActive }) =>
//               isActive ? classes.headerNavigation_active : undefined
//             }
//           >
//             Workers
//           </NavLink>
//         </li>

//         {token ? (
//           <li className={classes.settingsMenu}>
//             <button className={classes.settingsButton} onClick={toggleDropdown}>
//               <FaUserCircle size={24} />
//             </button>
//             {isDropdownOpen && (
//               <div
//                 className={classes.dropdownMenu}
//                 onMouseLeave={closeDropdown}
//               >
//                 <NavLink
//                   to="/profile"
//                   className={classes.dropdownItem}
//                   onClick={closeDropdown}
//                 >
//                   Profile
//                 </NavLink>
//                 <Form action="logout" method="POST">
//                   <button
//                     type="submit"
//                     className={classes.dropdownItem}
//                     onClick={closeDropdown}
//                   >
//                     Logout
//                   </button>
//                 </Form>
//               </div>
//             )}
//           </li>
//         ) : (
//           <li>
//             <NavLink
//               to="/login"
//               className={({ isActive }) =>
//                 isActive ? classes.headerNavigation_active : undefined
//               }
//             >
//               Login
//             </NavLink>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default MainNavigation;
