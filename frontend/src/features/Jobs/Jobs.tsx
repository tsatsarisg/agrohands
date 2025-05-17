import React, { useState } from "react";
import classes from "./Jobs.module.css";
import CreateJobForm from "./CreateJobForm/CreateJobForm";
import Modal from "../../components/Modal/Modal";
import PaginationControls from "../../components/PaginationControls/PaginationControls";
import { getJobs } from "../../api/Jobs";
import { useQuery } from "@tanstack/react-query";
import JobCard from "./JobCard/JobCard";

const DEFAULT_PAGE = 1;
const JOBS_PER_PAGE = 8;

const PaginatedJobsPage: React.FC = () => {
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [isPersonal, setIsPersonal] = useState(false);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

  const { data, refetch } = useQuery({
    queryKey: ["jobs", currentPage, isPersonal],
    queryFn: () => getJobs(currentPage, isPersonal),
  });

  if (!data) return <div>Not found</div>;

  const totalPages = Math.ceil(data.total / JOBS_PER_PAGE);
  const newestJobs = data.jobs.slice(0, 2);
  const otherJobs = data.jobs.slice(2);

  const openCreateJobModal = () => setIsCreateJobOpen(true);
  const closeCreateJobModal = () => setIsCreateJobOpen(false);

  const goToPage = (page: string) => {
    setCurrentPage(parseInt(page));
  };

  const openListJobModal = async () => {
    setIsPersonal((prev) => !prev);
    await refetch();
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <button
          onClick={openCreateJobModal}
          className="bg-emerald-900 text-white px-4 py-2 rounded-lg hover:bg-emerald-950 transition"
        >
          Create Job
        </button>
        <button
          onClick={openListJobModal}
          className=" border-solid border ml-2 border-emerald-900 text-emerald-900 px-4 py-2 rounded-lg  transition"
        >
          {isPersonal ? "List all jobs" : "List my jobs"}
        </button>
      </div>
      <div className={classes.newestJobs}>
        {newestJobs.map((job) => (
          <JobCard job={job} isLatest isTrashIconVisible={isPersonal} />
        ))}
      </div>
      <div className={classes.otherJobs}>
        {otherJobs.map((job) => (
          <JobCard job={job} isTrashIconVisible={isPersonal} />
        ))}
      </div>

      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={goToPage}
      />

      {isCreateJobOpen && (
        <Modal onClose={closeCreateJobModal}>
          <CreateJobForm onClose={closeCreateJobModal} />
        </Modal>
      )}
    </div>
  );
};

export default PaginatedJobsPage;
