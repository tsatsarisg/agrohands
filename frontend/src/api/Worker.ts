import { LoaderFunctionArgs, redirect } from "react-router";
import fetchData from "./fetchData";

async function getWorkers({ request }: LoaderFunctionArgs) {
  const clientURL = new URL(request.url);
  const searchTerm = clientURL.searchParams.get("searchTerm") || "";

  let url = `/workers`;
  if (searchTerm) {
    url = `/workers?searchTerm=${searchTerm}`;
  }

  const workers = await fetchData(url);
  const personalWorker = await fetchData(`/workers/personal`);

  return { workers, personalWorker };
}

async function getWorkerByID({ params }: LoaderFunctionArgs) {
  const { id } = params;

  return fetchData(`/workers/${id}`);
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

  await fetchData(`/workers`, {
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

  await fetchData(`/workers/${id}`, {
    method: "PUT",
    body: JSON.stringify(eventData),
  });
}

export { getWorkers, getWorkerByID, createNewWorker, editWorker };
