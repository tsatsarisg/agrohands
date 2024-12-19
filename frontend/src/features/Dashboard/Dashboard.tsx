import farmLandscape from "../../assets/images/dashboard.webp";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div>
      <img
        className={classes.dashboardPicture}
        src={farmLandscape}
        alt="Farm Landscape"
      />
    </div>
  );
};

export { Dashboard };
