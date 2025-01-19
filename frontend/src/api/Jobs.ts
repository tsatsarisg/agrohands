import { LoaderFunctionArgs } from "react-router";
import fetchReadData, { fetchWriteData } from "./fetchData";
import { Job } from "../types";

async function getJobs({ request }: LoaderFunctionArgs) {
  const clientURL = new URL(request.url);
  const page = clientURL.searchParams.get("page") || "";
  let url = `/jobs`;
  if (page) {
    url = `/jobs?page=${page}`;
  }

  const data = await fetchReadData(url);
  return data;
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
