import { createJob } from "../../../api/Jobs";

interface FormState {
  errors: string[];
  enteredValues: {
    title?: FormDataEntryValue;
    company?: FormDataEntryValue;
    description?: FormDataEntryValue;
    location?: FormDataEntryValue;
  };
  isSubmitted: boolean;
}

async function jobAction(_prevFormState: FormState, formData: FormData) {
  const errors = [];

  const title = formData.get("title")?.toString();
  const company = formData.get("company")?.toString();
  const description = formData.get("description")?.toString();
  const location = formData.get("location")?.toString();

  if (title?.length === 0) {
    errors.push("First name must not be empty!");
  }

  const eventData = {
    title,
    company,
    description,
    location,
  };

  const response = await createJob(eventData);

  if (typeof response === "string") {
    errors.push(response);
  }

  return {
    errors,
    enteredValues: {
      title,
      company,
      description,
      location,
    },
    isSubmitted: true,
  };
}

export { jobAction };
