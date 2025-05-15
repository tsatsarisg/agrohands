import fetchReadData, { fetchWriteData } from "./fetchData";
import { Job } from "../types";

type JobResponse = {
  jobs: Job[];
  total: number;
};

function getJobs(page: number, isPersonal: boolean) {
  let url = `/jobs?page=${page}`;
  if(isPersonal) url+= "&type=personal"

  return fetchReadData<JobResponse>(url);
}

type JobData = {
  title?: string;
  company?: string;
  description?: string;
  location?: string;
};

async function createJob(data: JobData): Promise<Job | { error: string }> {
  const endpoint = "/jobs";
  const method = "POST";

  return fetchWriteData(endpoint, {
    method,
    body: JSON.stringify(data),
  });
}

export { getJobs, createJob };
