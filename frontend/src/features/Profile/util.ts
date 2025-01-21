import { changeEmail } from "../../api/Profile";

interface EmailFormState {
  errors: string[];
  enteredValues: {
    newEmail?: FormDataEntryValue;
  };
  isSubmitted: boolean;
}

async function emailAction(_prevFormState: EmailFormState, formData: FormData) {
  const errors = [];

  const email = formData.get("new-email")?.toString();

  if (email?.length === 0) {
    errors.push("Email must not be empty!");
  }

  const eventData = {
    email,
  };

  const response = await changeEmail(eventData);

  if (response?.error) {
    errors.push(response?.error);
  }

  return {
    errors,
    enteredValues: {
      newEmail: email,
    },
    isSubmitted: true,
  };
}

export { emailAction };
