import { Link, useRouteLoaderData, useSearchParams } from "react-router";
import { Worker } from "../../types";
import farmerIcon from "../../assets/images/farmerIcon.webp";
import classes from "./Workers.module.css";
import { useEffect, useState } from "react";
import WorkerProfile from "./WorkerProfile/WorkerProfile";
import Modal from "../../components/Modal/Modal";
import PaginationControls from "../../components/PaginationControls/PaginationControls";

const Workers = () => {
  const { paginatedData, personalWorker } = useRouteLoaderData<{
    paginatedData: { workers: Worker[]; total: number };
    personalWorker: Worker | null;
  }>("workers-page")!;

  const workerFormButtonTitle = personalWorker
    ? "Edit my profile"
    : "New worker";

  const workerFormPath = personalWorker ? `${personalWorker.id}/edit` : "new";
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const totalPages = Math.ceil(paginatedData.total / 7);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  const openProfile = (worker: Worker) => {
    setSelectedWorker(worker);
  };

  const closeProfile = () => {
    setSelectedWorker(null);
  };

  const goToPage = (page: string) => {
    setSearchParams({ searchTerm: searchTerm, page });
    setCurrentPage(parseInt(page));
  };

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    setSearchParams({
      searchTerm: debouncedSearchTerm,
      page: String(currentPage),
    });
  }, [debouncedSearchTerm, setSearchParams]);

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
        {paginatedData.workers.map((worker) => (
          <WorkerRow
            worker={worker}
            openProfile={openProfile}
            key={worker.id}
          />
        ))}
      </ul>

      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={goToPage}
      />

      {selectedWorker && (
        <Modal onClose={closeProfile}>
          <WorkerProfile
            worker={selectedWorker}
            toggleProfileModal={closeProfile}
          />
        </Modal>
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
