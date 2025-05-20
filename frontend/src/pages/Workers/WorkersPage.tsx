import { Link } from "react-router";
import { Worker } from "../../types";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import PaginationControls from "../../components/PaginationControls/PaginationControls";
import WorkerProfile from "../../features/Workers/WorkerProfile/WorkerProfile";
import { useWorkers } from "./hooks";
import { DebouncedInput } from "../../components/DebouncedInput/DebouncedInput";
import WorkerRow from "./WorkerRow/WorkerRow";
const DEFAULT_PAGE = 1;

const WorkersPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const { data, isLoading, error } = useWorkers(searchTerm, currentPage);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  if (isLoading) return <div>Loading workers...</div>;
  if (error || !data) return <div>Error loading workers.</div>;

  const { paginatedData, personalWorker } = data;
  const workerFormButtonTitle = personalWorker
    ? "Edit my profile"
    : "New worker";
  const total = paginatedData?.total || 1;
  const workers = paginatedData?.workers || [];
  const workerFormPath = personalWorker ? `${personalWorker.id}/edit` : "new";
  const totalPages = Math.ceil(total / 7);

  const openProfile = (worker: Worker) => {
    setSelectedWorker(worker);
  };

  const closeProfile = () => {
    setSelectedWorker(null);
  };

  const goToPage = (page: string) => {
    setCurrentPage(parseInt(page));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <DebouncedInput
          value={searchTerm}
          onDebouncedChange={(val) => {
            setSearchTerm(val);
            setCurrentPage(1);
          }}
          placeholder="Search workers..."
          className="border bg-gray-300 rounded-lg px-4 py-2 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-900"
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

export { WorkersPage };
