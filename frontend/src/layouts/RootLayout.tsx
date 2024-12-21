import MainNavigation from "./components/MainNavigation/MainNavigation";
import { Outlet } from "react-router";
import classes from "./RootLayout.module.css";

const RootLayout = () => {
  return (
    <div className={classes.rootLayout}>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
