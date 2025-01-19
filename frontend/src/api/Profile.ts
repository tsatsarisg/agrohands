import fetchReadData, { fetchWriteData } from "./fetchData";

async function getEmail() {
  const url = `/users/email`;

  const data = await fetchReadData(url);
  return data;
}

type EmailData = {
  email?: string;
};

async function changeEmail(
  data: EmailData
): Promise<{ newEmail: string } | { error: string }> {
  const endpoint = "/users/email";
  const method = "POST";

  return fetchWriteData(endpoint, {
    method,
    body: JSON.stringify(data),
  });
}

export { changeEmail, getEmail };
