import MainNavigation from "./components/MainNavigation/MainNavigation";
import { Outlet, useNavigation } from "react-router";
import classes from "./RootLayout.module.css";

const RootLayout = () => {
  const navigation = useNavigation();
  return (
    <div className={classes.rootLayout}>
      <MainNavigation />
      <main>
        {navigation.state === "loading" && <p>Loading...</p>}
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
