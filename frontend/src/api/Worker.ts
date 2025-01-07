import { LoaderFunctionArgs, redirect } from "react-router";
import fetchData from "./fetchData";

async function getWorkers({ request }: LoaderFunctionArgs) {
  const clientURL = new URL(request.url);
  const searchTerm = clientURL.searchParams.get("searchTerm") || "";
  const page = clientURL.searchParams.get("page") || 1;
  let url = `/workers?page=${page}`;

  if (searchTerm) {
    url += `&searchTerm=${searchTerm}`;
  }

  const paginatedData = await fetchData(url);
  const personalWorker = await fetchData(`/workers/personal`);

  return { paginatedData, personalWorker };
}

async function getWorkerByID({ params }: LoaderFunctionArgs) {
  const { id } = params;

  return fetchData(`/workers/${id}`);
}

async function upsertWorker({ request, params }: LoaderFunctionArgs) {
  const { id } = params;
  const { method } = request;
  const endpoint = method === "POST" ? "/workers" : `/workers/${id}`;
  const data = await request.formData();

  const title = data.get("worker-title")?.toString();
  const firstName = data.get("first-name")?.toString();
  const lastName = data.get("last-name")?.toString();
  const location = data.get("location")?.toString();
  const description = data.get("description")?.toString();
  const skills = data.getAll("skills");

  const eventData = {
    title,
    firstName,
    lastName,
    location,
    skills,
    description,
  };

  await fetchData(endpoint, {
    method,
    body: JSON.stringify(eventData),
  });

  return redirect("/workers");
}

async function deleteWorker(id: string) {
  console.log("test");

  await fetchData(`/workers/${id}`, {
    method: "DELETE",
  });

  return redirect("/workers");
}

export { getWorkers, getWorkerByID, upsertWorker, deleteWorker };
