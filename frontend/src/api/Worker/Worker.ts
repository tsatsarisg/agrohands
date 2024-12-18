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
  const data = await request.formData();
  const eventData = {
    name: data.get("name"),
  };

  fetch(`${domain}/workers`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(eventData),
  });

  return redirect("/workers");
}

async function deleteWorker({ params, request }: LoaderFunctionArgs) {
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

export { getWorkers, getWorkerByID, createNewWorker, deleteWorker };
