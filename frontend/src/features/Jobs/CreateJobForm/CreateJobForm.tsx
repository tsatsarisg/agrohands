import { useActionState } from "react";
import classes from "./CreateJobForm.module.css";
import { jobAction } from "./util";
import { useFormStatus } from "react-dom";

interface CreateJobFormProps {
  onClose: () => void;
}

const CreateJobForm: React.FC<CreateJobFormProps> = ({ onClose }) => {
  const { pending } = useFormStatus();
  const [formState, formAction] = useActionState(jobAction, {
    errors: [],
    enteredValues: {
      title: undefined,
      company: undefined,
      description: undefined,
      location: undefined,
    },
  });

  return (
    <form action={formAction} className={classes.form}>
      <h2 className={classes.title}>Create a New Job</h2>

      <div className={classes.control}>
        <label htmlFor="title">Job Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={formState.enteredValues.title}
          required
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          defaultValue={formState.enteredValues.company}
          required
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={formState.enteredValues.location}
          required
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="description">Job Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={formState.enteredValues.description}
          required
        ></textarea>
      </div>

      <div className={classes.actions}>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
        >
          Cancel
        </button>
        <button
          disabled={pending}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateJobForm;
