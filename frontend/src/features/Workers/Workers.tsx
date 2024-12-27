import { Link, useRouteLoaderData, useSubmit } from "react-router";
import { Worker } from "../../types";
import farmerIcon from "../../assets/images/farmerIcon.webp";
import classes from "./Workers.module.css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import WorkerProfile from "./WorkerProfile/WorkerProfile";

const Workers = () => {
  const submit = useSubmit();
  const { workers, personalWorker } = useRouteLoaderData<{
    workers: Worker[];
    personalWorker: Worker | null;
  }>("workers-page")!;

  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  const openProfile = (worker: Worker) => {
    setSelectedWorker(worker);
  };

  const closeProfile = () => {
    setSelectedWorker(null);
  };

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const workerFormButtonTitle = personalWorker
    ? "Edit my profile"
    : "New worker";

  const workerFormPath = personalWorker ? `${personalWorker.id}/edit` : "new";

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Adjust the delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    submit({ searchTerm: debouncedSearchTerm });
  }, [debouncedSearchTerm, submit]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <input
          aria-label="Search contacts"
          id="searchTerm"
          name="searchTerm"
          type="search"
          placeholder="Search workers..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="border bg-gray-300  rounded-lg px-4 py-2 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-900"
        />

        <Link to={workerFormPath}>
          <button className="ml-4 bg-emerald-900 text-white px-4 py-2 rounded-lg shadow hover:bg-emerald-950">
            {workerFormButtonTitle}
          </button>
        </Link>
      </div>

      <hr className="border-t border-gray-300 mb-6" />

      <ul className="space-y-4 ">
        {workers.map((worker) => (
          <WorkerRow
            worker={worker}
            openProfile={openProfile}
            key={worker.id}
          />
        ))}
      </ul>

      {selectedWorker &&
        createPortal(
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
            <div className="flex justify-center items-center min-h-screen">
              <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
                <WorkerProfile
                  worker={selectedWorker}
                  toggleProfileModal={closeProfile}
                />
              </div>
            </div>
          </div>,
          document.body // Render it in the body using portal
        )}
    </div>
  );
};

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

export { Workers };
