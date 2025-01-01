import { LoaderFunctionArgs } from "react-router";
import fetchData from "./fetchData";

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

async function createJob(data: JobData) {
  const endpoint = "/jobs";
  const method = "POST";

  await fetchData(endpoint, {
    method,
    body: JSON.stringify(data),
  });
}

export { getJobs, createJob };
