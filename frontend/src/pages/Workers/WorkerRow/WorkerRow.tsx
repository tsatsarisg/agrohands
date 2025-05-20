import { Worker } from "../../../types";
import farmerIcon from "../../../assets/images/farmerIcon.webp";
import classes from "./WorkerRow.module.css";

const WorkerRow: React.FC<{
  worker: Worker;
  openProfile: (worker: Worker) => void;
}> = ({ worker, openProfile }) => {
  const { firstName, title, lastName, location } = worker;
  return (
    <li className={classes.workerRow}>
      <div className={classes.workerRowLayout}>
        <img
          className={classes.workerIcon}
          src={farmerIcon}
          alt="Farm Landscape"
        />

        <div>
          <h2 className={classes.workerTitle}>
            {firstName} {lastName}
          </h2>
          <p className={classes.workerSubtitle}>
            {title}, {location}
          </p>
        </div>
      </div>
      <button
        className={classes.viewButton}
        onClick={() => openProfile(worker)}
      >
        View Profile
      </button>
    </li>
  );
};

export default WorkerRow;
