import { LoaderFunctionArgs, redirect } from "react-router";
import { domain, getAuthorizationHeader } from ".";

async function getWorkers({ request }: LoaderFunctionArgs) {
  const clientURL = new URL(request.url);
  const searchTerm = clientURL.searchParams.get("searchTerm") || "";

  let url = `${domain}/workers`;
  if (searchTerm) {
    url = `${domain}/workers?searchTerm=${searchTerm}`;
  }
  return fetch(url, {
    headers: {
      ...getAuthorizationHeader(),
    },
  });
}

async function getWorkerByID({ params }: LoaderFunctionArgs) {
  const { id } = params;

  return fetch(`${domain}/workers/${id}`, {
    headers: {
      ...getAuthorizationHeader(),
    },
  });
}

async function createNewWorker({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("worker-title")?.toString();
  const firstName = formData.get("first-name")?.toString();
  const lastName = formData.get("last-name")?.toString();
  const location = formData.get("location")?.toString();
  const skills = formData.getAll("skills");

  const eventData = {
    title,
    firstName,
    lastName,
    location,
    skills,
  };

  await fetch(`${domain}/workers`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
    },
    method: "POST",
    body: JSON.stringify(eventData),
  });

  return redirect("/workers");
}

async function editWorker({ request, params }: LoaderFunctionArgs) {
  const { id } = params;
  const formData = await request.formData();
  const title = formData.get("worker-title")?.toString();
  const firstName = formData.get("first-name")?.toString();
  const lastName = formData.get("last-name")?.toString();
  const location = formData.get("location")?.toString();
  const skills = formData.getAll("skills");

  const eventData = {
    title,
    firstName,
    lastName,
    location,
    skills,
  };

  await fetch(`${domain}/workers/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthorizationHeader(),
    },
    method: "PUT",
    body: JSON.stringify(eventData),
  });
}

export { getWorkers, getWorkerByID, createNewWorker, editWorker };
