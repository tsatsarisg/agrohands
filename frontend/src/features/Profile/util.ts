import { changeEmail, changePassword } from "../../api/Profile";

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

interface PasswordFormState {
  errors: string[];
  enteredValues: {
    currentPassword?: FormDataEntryValue;
    newPassword?: FormDataEntryValue;
    confirmNewPassword?: FormDataEntryValue;
  };
  isSubmitted: boolean;
}

async function passwordAction(
  _prevFormState: PasswordFormState,
  formData: FormData
) {
  const errors = [];

  const currentPassword = formData.get("current-password")?.toString();
  const newPassword = formData.get("new-password")?.toString();
  const confirmNewPassword = formData.get("confirm-password")?.toString();

  const eventData = {
    currentPassword,
    newPassword,
    confirmNewPassword,
  };

  const response = await changePassword(eventData);

  if (response?.error) {
    errors.push(response?.error);
  }

  return {
    errors,
    enteredValues: {
      currentPassword,
      newPassword,
      confirmNewPassword,
    },
    isSubmitted: true,
  };
}

export { emailAction, passwordAction };
