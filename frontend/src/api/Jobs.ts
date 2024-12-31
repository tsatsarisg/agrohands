import { LoaderFunctionArgs } from "react-router";
import fetchData from "./fetchData";
// import fetchData from "./fetchData";

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

export { getJobs };
