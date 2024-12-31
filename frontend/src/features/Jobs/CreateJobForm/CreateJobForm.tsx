import React, { useState } from "react";
import classes from "./CreateJobForm.module.css";

interface CreateJobFormProps {
  onClose: () => void;
}

const CreateJobForm: React.FC<CreateJobFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Job Created:", formData);
    onClose(); // Close the modal after submission
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <h2 className={classes.title}>Create a New Job</h2>

      <div className={classes.control}>
        <label htmlFor="title">Job Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className={classes.control}>
        <label htmlFor="description">Job Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
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
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateJobForm;
