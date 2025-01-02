import classes from "./PaginationControls.module.css";
import { SubmitFunction } from "react-router";

interface PaginationControlsProps {
  totalPages: number;
  submit: SubmitFunction;
  currentPage: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCurrentPage: any;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  totalPages,
  submit,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <div className={classes.paginationControls}>
      <button
        onClick={() =>
          setCurrentPage((prev: number) => {
            const page = Math.max(prev - 1, 1);
            submit({ page });
            return page;
          })
        }
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
        onClick={() =>
          setCurrentPage((prev: number) => {
            const page = Math.min(prev + 1, totalPages);
            submit({ page });
            return page;
          })
        }
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
