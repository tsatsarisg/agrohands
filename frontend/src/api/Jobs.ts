import { LoaderFunctionArgs, redirect } from "react-router";
// import fetchData from "./fetchData";

async function getJobs({ request }: LoaderFunctionArgs) {
  //   const clientURL = new URL(request.url);
  //   const searchTerm = clientURL.searchParams.get("searchTerm") || "";
  //   let url = `/jobs`;
  //   if (searchTerm) {
  //     url = `/jobs?searchTerm=${searchTerm}`;
  //   }

  //   const workers = await fetchData(url);
  //   const personalWorker = await fetchData(`/workers/personal`);

  return [
    {
      id: "1",
      title: "Software Engineer",
      company: "TechCorp",
      location: "San Francisco, CA",
      description: "Develop and maintain web applications.",
      datePosted: "2024-12-28",
    },
    {
      id: "2",
      title: "Software Engineer",
      company: "TechCorp",
      location: "San Francisco, CA",
      description: "Develop and maintain web applications.",
      datePosted: "2024-12-28",
    },
  ];
}

export { getJobs };
