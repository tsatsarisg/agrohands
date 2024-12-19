interface FormState {
  errors: string[];
  enteredValues: {
    title?: FormDataEntryValue;
    firstName?: FormDataEntryValue;
    lastName?: FormDataEntryValue;
    location?: FormDataEntryValue;
    skills?: FormDataEntryValue[]; // Assuming skills are stored as an array of strings
  };
}

function signupAction(_prevFormState: FormState, formData: FormData) {
  const errors = [];
  const title = formData.get("worker-title")?.toString();
  const firstName = formData.get("first-name")?.toString();
  const lastName = formData.get("last-name")?.toString();
  const location = formData.get("location")?.toString();
  const skills = formData.getAll("skills");

  if (firstName?.length === 0) {
    errors.push("First name must not be empty!");
  }

  return {
    errors,
    enteredValues: {
      title,
      firstName,
      lastName,
      location,
      skills,
    },
  };
}

export { signupAction };
