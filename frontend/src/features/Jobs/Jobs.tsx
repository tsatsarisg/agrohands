import React from "react";
import { useRouteLoaderData } from "react-router";

interface Job {
  id: string;
  title: string;
  employerName: string;
  userID: string;
  location: string;
  description: string;
  datePosted: string;
}

const JobsPage: React.FC = () => {
  const jobs = useRouteLoaderData<Job[]>("jobs-page"); // Assume jobs are fetched and passed as loader data.

  if (!jobs || jobs.length === 0) {
    return <p>No jobs available at the moment.</p>;
  }

  const newestJob = jobs[0];
  const otherJobs = jobs; // Show the next 3 jobs.

  return (
    <div className="container mx-auto px-4 py-6">
      {/* <h1 className="text-2xl font-bold text-gray-800 mb-6">Available Jobs</h1> */}

      <div className="space-y-6">
        {/* Newest Job */}
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h2 className="text-xl font-semibold text-gray-700">
            {newestJob.title}
          </h2>
          <p className="text-gray-500 text-sm mb-2">
            {newestJob.company} - {newestJob.location}
          </p>
          <p className="text-gray-600">{newestJob.description}</p>
          <p className="text-gray-400 text-xs mt-2">
            Posted on: {new Date(newestJob.datePosted).toLocaleDateString()}
          </p>
        </div>

        {/* Other Jobs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-lg p-4 border"
            >
              <h3 className="text-lg font-medium text-gray-700">{job.title}</h3>
              <p className="text-gray-500 text-sm">
                {job.company} - {job.location}
              </p>
              <p className="text-gray-600 text-sm mt-2">{job.description}</p>
              <p className="text-gray-400 text-xs mt-4">
                Posted on: {new Date(job.datePosted).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
