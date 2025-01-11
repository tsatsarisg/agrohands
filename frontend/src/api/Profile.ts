import fetchData from "./fetchData";

async function getEmail() {
  const url = `/users/email`;

  const data = await fetchData(url);
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

  return fetchData(endpoint, {
    method,
    body: JSON.stringify(data),
  });
}

export { changeEmail, getEmail };
