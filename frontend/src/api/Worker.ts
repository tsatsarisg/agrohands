import { LoaderFunctionArgs } from "react-router";
import fetchReadData, { deleteResource, fetchWriteData } from "./fetchData";
import { Worker } from "../types";

const ENDPOINT = "/workers";

interface WorkerResponse {
  workers: Worker[];
  total: number;
}

async function getWorkers(searchTerm: string, page = 1) {
  const params = new URLSearchParams({ searchTerm, page: String(page) });
  let endpoint = `/workers?${params.toString()}`;

  const paginatedData = await fetchReadData<WorkerResponse>(endpoint);
  const personalWorker = await fetchReadData<Worker>(`/workers/personal`);

  return { paginatedData, personalWorker };
}

async function getWorkerByID({ params }: LoaderFunctionArgs) {
  const { id } = params;

  return fetchReadData(`/workers/${id}`);
}

interface UpsertWorkerData {
  id?: string;
  data: {
    title?: string;
    firstName?: string;
    lastName?: string;
    location?: string;
    skills?: string[];
    description?: string;
  };
}

async function upsertWorker({ id, data }: UpsertWorkerData) {
  const method = id ? "PUT" : "POST";
  const endpoint = id ? `${ENDPOINT}/${id}` : ENDPOINT;

  return fetchWriteData(endpoint, {
    method,
    body: JSON.stringify(data),
  });
}

async function deleteWorker(id: string) {
  return deleteResource(`${ENDPOINT}/${id}`, {});
}

export { getWorkers, getWorkerByID, upsertWorker, deleteWorker };
