import { LoaderFunctionArgs } from "react-router";
import fetchData from "./fetchData";
// import fetchData from "./fetchData";

async function getJobs({ request }: LoaderFunctionArgs) {
  const clientURL = new URL(request.url);
  const searchTerm = clientURL.searchParams.get("searchTerm") || "";
  let url = `/jobs`;
  if (searchTerm) {
    url = `/jobs?searchTerm=${searchTerm}`;
  }

  const jobs = await fetchData(url);
  return jobs;
}

export { getJobs };
