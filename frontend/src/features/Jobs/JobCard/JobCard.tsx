import { Job } from "../../../types";
import classes from "./JobCard.module.css";
import { FaTrash } from "react-icons/fa";

interface JobCardProps {
  job: Job;
  isLatest?: boolean;
  isTrashIconVisible?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  isLatest,
  isTrashIconVisible,
}) => {
  return (
    <div key={job.id} className={classes.jobCard}>
      {isTrashIconVisible && (
        <button
          className={classes.jobDeleteButton}
          aria-label="Delete Job"
          onClick={() => console.log("Delete job", job.id)} // replace with actual handler
        >
          <FaTrash size={16} />
        </button>
      )}
      <h2
        className={`${classes.jobCardTitle} ${
          isLatest ? "font-semibold" : "font-medium"
        }`}
      >
        {job.title}
      </h2>
      <p className={classes.jobCardCompany}>
        {job.company} - {job.location}
      </p>
      <p className={classes.jobCardDescription}>{job.description}</p>
      <p className={classes.jobCardDate}>
        Posted on: {new Date(job.datePosted).toLocaleDateString()}
      </p>
    </div>
  );
};

export default JobCard;
