import farmerIcon from "../../../assets/images/farmerIcon.webp";
import styles from "./WorkerProfile.module.css";
import { FiArrowLeft } from "react-icons/fi"; // Importing an arrow icon from react-icons
import { Worker } from "../../../types";

interface WorkerProfileProps {
  worker: Worker;
  toggleProfileModal: () => void;
}

const WorkerProfile: React.FC<WorkerProfileProps> = ({
  worker,
  toggleProfileModal,
}) => {
  const { firstName, title, lastName, location, skills, description } = worker;

  return (
    <div className="relative p-6">
      <div className="absolute -top-1 left-0">
        <button onClick={toggleProfileModal} className={styles.backBtn}>
          <FiArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className=" mt-5 flex items-center space-x-6">
        <img
          src={farmerIcon}
          alt="Profile Image"
          className={styles.profileImage}
        />
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            {firstName} {lastName}
          </h1>
          <p className={styles.subheading}>{title}</p>
          <p className={styles.location}>{location}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className={styles.heading}>About</h3>
        <p className={styles.aboutText}>{description}</p>
      </div>

      <div className="mt-8">
        <h3 className={styles.heading}>Skills</h3>
        <ul className="mt-4 flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <li key={index} className={styles.skillTag}>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default WorkerProfile;
