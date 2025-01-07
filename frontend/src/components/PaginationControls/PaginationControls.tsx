import classes from "./PaginationControls.module.css";

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: string) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <div className={classes.paginationControls}>
      <button
        onClick={() => {
          const newPage = Math.max(currentPage - 1, 1);
          setCurrentPage(String(newPage));
        }}
        disabled={currentPage === 1}
        className={`${classes.paginationButton} ${
          currentPage === 1
            ? classes.paginationButtonDisabled
            : classes.paginationButtonEnabled
        }`}
      >
        Previous
      </button>
      <span className={classes.paginationInfo}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => {
          const page = Math.min(currentPage + 1, totalPages);
          setCurrentPage(String(page));
        }}
        disabled={currentPage === totalPages}
        className={`${classes.paginationButton} ${
          currentPage === totalPages
            ? classes.paginationButtonDisabled
            : classes.paginationButtonEnabled
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
