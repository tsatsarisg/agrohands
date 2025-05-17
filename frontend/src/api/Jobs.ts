import fetchReadData, { deleteResource, fetchWriteData } from "./fetchData";
import { Job } from "../types";

const ENDPOINT = "/jobs";

type JobResponse = {
  jobs: Job[];
  total: number;
};

function getJobs(page: number, isPersonal: boolean) {
  let url = `${ENDPOINT}?page=${page}`;
  if (isPersonal) url += "&type=personal";

  return fetchReadData<JobResponse>(url);
}

type JobData = {
  title?: string;
  company?: string;
  description?: string;
  location?: string;
};

async function createJob(data: JobData): Promise<Job | { error: string }> {
  const method = "POST";

  return fetchWriteData(ENDPOINT, {
    method,
    body: JSON.stringify(data),
  });
}

function deleteJob(id: string) {
  return deleteResource(`${ENDPOINT}/${id}`, {
    method: "DELETE",
  });
}

export { getJobs, createJob, deleteJob };
