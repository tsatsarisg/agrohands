import classes from "./CreateJobForm.module.css";
import LocationInput from "../../../components/LocationInput/LocationInput";
import { useMutation } from "@tanstack/react-query";
import { createJob } from "../../../api/Jobs";
import { queryClient } from "../../../api/fetchData";

interface CreateJobFormProps {
  onClose: () => void;
}

const CreateJobForm: React.FC<CreateJobFormProps> = ({ onClose }) => {
  const { mutate } = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    mutate(validateJobForm(form));
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <h2 className={classes.title}>Create a New Job</h2>

      <div className={classes.control}>
        <label htmlFor="title">Job Title</label>
        <input type="text" id="title" name="title" required />
      </div>

      <div className={classes.control}>
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" required />
      </div>

      <div className={classes.control}>
        <label htmlFor="location">Location</label>
        <LocationInput />
      </div>

      <div className={classes.control}>
        <label htmlFor="description">Job Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
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
        <button className="bg-emerald-900 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Submit
        </button>
      </div>
    </form>
  );
};

const validateJobForm = (form: HTMLFormElement) => {
  const formData = new FormData(form);

  const title = formData.get("title")?.toString();
  const company = formData.get("company")?.toString();
  const description = formData.get("description")?.toString();
  const location = formData.get("location")?.toString();

  return {
    title,
    company,
    description,
    location,
  };
};

export default CreateJobForm;
