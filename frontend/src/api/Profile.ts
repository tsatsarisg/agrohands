import fetchReadData, { fetchWriteData } from "./fetchData";

async function getUser() {
  const url = `/users`;

  return await fetchReadData(url);
}

type EmailData = {
  email?: string;
};

async function changeEmail(data: EmailData): Promise<{ error?: string }> {
  const endpoint = "/users/email";
  const method = "PATCH";

  return fetchWriteData(endpoint, {
    method,
    body: JSON.stringify(data),
  });
}

type PasswordData = {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
};

async function changePassword(data: PasswordData): Promise<{ error?: string }> {
  const endpoint = "/changePassword";
  const method = "PATCH";

  return fetchWriteData(endpoint, {
    method,
    body: JSON.stringify(data),
  });
}

export { changeEmail, getUser, changePassword };
