import { LoaderFunctionArgs } from "react-router";
import fetchData from "./fetchData";
import { Job } from "../types";

async function getJobs({ request }: LoaderFunctionArgs) {
  const clientURL = new URL(request.url);
  const page = clientURL.searchParams.get("page") || "";
  let url = `/jobs`;
  if (page) {
    url = `/jobs?page=${page}`;
  }

  const data = await fetchData(url);
  return data;
}

type JobData = {
  title?: string;
  company?: string;
  description?: string;
  location?: string;
};

async function createJob(data: JobData): Job | string {
  const endpoint = "/jobs";
  const method = "POST";

  return await fetchData(endpoint, {
    method,
    body: JSON.stringify(data),
  });
}

export { getJobs, createJob };
