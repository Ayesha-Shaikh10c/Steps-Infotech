import apiFetch from "../../lib/api";

export const getOpenJobs = async () => {
  const data = await apiFetch("/jobs");

  return {
    jobs: Array.isArray(data?.jobs) ? data.jobs : [],
    count: data?.count || 0,
    total: data?.total || 0,
  };
};


export const getJobById = async (jobId) => {
  if (!jobId) {
    throw new Error("Job ID is required.");
  }

  const data = await apiFetch(`/jobs/${jobId}`);

  return data?.job || null;
};