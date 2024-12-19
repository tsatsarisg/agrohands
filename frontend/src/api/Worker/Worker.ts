import { LoaderFunctionArgs, redirect } from "react-router";

const domain = "http://localhost:8080/api";

async function getWorkers() {
  return fetch(`${domain}/workers`);
}

async function getWorkerByID({ params }: LoaderFunctionArgs) {
  const { id } = params;

  return fetch(`${domain}/workers/${id}`);
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
    },
    method: "POST",
    body: JSON.stringify(eventData),
  });

  return redirect("/workers?reload=true");
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
    },
    method: "PUT",
    body: JSON.stringify(eventData),
  });
}

async function deleteWorker({ params }: LoaderFunctionArgs) {
  const { id } = params;

  const response = await fetch(`${domain}/workers/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json", // Adjust if you're sending additional data
    },
  });

  return redirect("/workers");
}

export { getWorkers, getWorkerByID, createNewWorker, deleteWorker, editWorker };
