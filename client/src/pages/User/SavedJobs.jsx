import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock3,
  MapPin,
  RefreshCw,
  Trash2,
  ArrowRight,
  AlertCircle,
  IndianRupee,
} from "lucide-react";
import { apiFetch } from "../../lib/api";

const SavedJobs = () => {
  const navigate = useNavigate();

  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --------------------------------------------------
  // AUTH ERROR
  // --------------------------------------------------
  const handleAuthError = useCallback(
    (err) => {
      if (err?.status === 401 || err?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });
        return true;
      }

      return false;
    },
    [navigate]
  );

  // --------------------------------------------------
  // FETCH SAVED JOBS
  // --------------------------------------------------
  const fetchSavedJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      const response = await apiFetch("/saved-jobs");

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to load saved jobs."
        );
      }

      const data = Array.isArray(response?.data)
        ? response.data
        : [];

      /*
        Backend response:

        [
          {
            _id: "savedJobId",
            user: "...",
            job: {
              _id: "actualJobId",
              title: "...",
              status: "open"
            }
          }
        ]
      */

      const normalizedJobs = data
        .map((savedItem) => {
          if (!savedItem?.job?._id) {
            return null;
          }

          return {
            ...savedItem.job,

            // Actual JobPosting ID
            jobId: String(savedItem.job._id),

            // SavedJob document ID
            savedJobId: savedItem._id
              ? String(savedItem._id)
              : "",
          };
        })
        .filter(Boolean);

      setSavedJobs(normalizedJobs);
    } catch (err) {
      console.error("Saved jobs error:", err);

      if (handleAuthError(err)) {
        return;
      }

      setError(
        err?.message || "Unable to load saved jobs."
      );
    } finally {
      setLoading(false);
    }
  }, [handleAuthError, navigate]);

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  // --------------------------------------------------
  // REMOVE SAVED JOB
  // --------------------------------------------------
  const handleRemoveSavedJob = async (jobId) => {
    if (!jobId) {
      setError("Unable to identify this job.");
      return;
    }

    try {
      setRemovingId(String(jobId));
      setError("");
      setSuccess("");

      /*
        Backend:
        DELETE /api/saved-jobs/:jobId
      */

      const response = await apiFetch(
        `/saved-jobs/${encodeURIComponent(jobId)}`,
        {
          method: "DELETE",
        }
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Failed to remove saved job."
        );
      }

      setSavedJobs((currentJobs) =>
        currentJobs.filter(
          (job) => String(job.jobId) !== String(jobId)
        )
      );

      setSuccess("Job removed from saved jobs.");

      window.setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      console.error("Remove saved job error:", err);

      if (handleAuthError(err)) {
        return;
      }

      setError(
        err?.message ||
          "Unable to remove this saved job."
      );
    } finally {
      setRemovingId("");
    }
  };

  // --------------------------------------------------
  // HELPERS
  // --------------------------------------------------
  const getJobTitle = (job) => {
    return job?.title || "Untitled Position";
  };

  const getCompany = (job) => {
    return (
      job?.company ||
      job?.companyName ||
      "Steps Infotech"
    );
  };

  const getLocation = (job) => {
    if (typeof job?.location === "string") {
      return job.location;
    }

    if (
      job?.location?.city &&
      job?.location?.state
    ) {
      return `${job.location.city}, ${job.location.state}`;
    }

    if (job?.location?.city) {
      return job.location.city;
    }

    return (
      job?.city ||
      "Location not specified"
    );
  };

  const getJobType = (job) => {
    return (
      job?.employmentType ||
      job?.jobType ||
      job?.type ||
      "Full Time"
    );
  };

  const getSalary = (job) => {
    if (typeof job?.salary === "string") {
      return job.salary;
    }

    if (
      typeof job?.salary === "number"
    ) {
      return `₹${job.salary.toLocaleString("en-IN")}`;
    }

    if (job?.salaryRange) {
      return job.salaryRange;
    }

    if (
      job?.minSalary != null &&
      job?.maxSalary != null
    ) {
      return `₹${Number(
        job.minSalary
      ).toLocaleString("en-IN")} - ₹${Number(
        job.maxSalary
      ).toLocaleString("en-IN")}`;
    }

    if (job?.minSalary != null) {
      return `₹${Number(
        job.minSalary
      ).toLocaleString("en-IN")}+`;
    }

    return "";
  };

  const getPostedDate = (job) => {
    if (!job?.createdAt) {
      return "";
    }

    const parsedDate = new Date(job.createdAt);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getDescription = (job) => {
    const description =
      job?.shortDescription ||
      job?.description ||
      job?.summary ||
      "";

    if (!description) {
      return "Explore this opportunity and view complete job details.";
    }

    return description.length > 150
      ? `${description.slice(0, 150)}...`
      : description;
  };

  // --------------------------------------------------
  // SKELETON
  // --------------------------------------------------
  const renderSkeletons = () => {
    return (
      <div className="grid grid-cols-1 gap-5">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex gap-4">
              <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />

              <div className="flex-1">
                <div className="h-5 w-2/3 rounded bg-gray-200" />

                <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
              </div>

              <div className="h-9 w-9 rounded-lg bg-gray-200" />
            </div>

            <div className="mt-5 h-4 w-full rounded bg-gray-200" />

            <div className="mt-2 h-4 w-4/5 rounded bg-gray-200" />

            <div className="mt-5 flex gap-3">
              <div className="h-9 w-24 rounded-lg bg-gray-200" />
              <div className="h-9 w-28 rounded-lg bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------
  if (loading) {
    return (
      <section className="space-y-6">
        <div>
          <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />

          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-200" />
        </div>

        {renderSkeletons()}
      </section>
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------
  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#159a9c]/10">
            <Bookmark
              size={22}
              className="text-[#159a9c]"
            />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-[#171b2b] sm:text-3xl">
              Saved Jobs
            </h1>

            <p className="mt-1 text-sm text-[#707686]">
              Jobs you have saved for later.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchSavedJobs}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-[#171b2b] shadow-sm transition hover:border-[#159a9c] hover:text-[#159a9c]"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div className="flex-1">
            <p className="font-medium">
              Something went wrong
            </p>

            <p className="mt-1">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={fetchSavedJobs}
            className="shrink-0 font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {success}
        </div>
      )}

      {/* COUNT */}
      {!error && (
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Bookmark
              size={17}
              className="text-[#159a9c]"
            />

            <span className="text-sm text-[#707686]">
              Saved opportunities
            </span>
          </div>

          <span className="rounded-full bg-[#159a9c]/10 px-3 py-1 text-sm font-semibold text-[#159a9c]">
            {savedJobs.length}
          </span>
        </div>
      )}

      {/* EMPTY */}
      {!error && savedJobs.length === 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#159a9c]/10">
            <Bookmark
              size={30}
              className="text-[#159a9c]"
            />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-[#171b2b]">
            No saved jobs yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#707686]">
            When you find a job that interests you,
            save it here so you can easily come back
            to it later.
          </p>

          <button
            type="button"
            onClick={() => navigate("/user/jobs")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#159a9c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#118789]"
          >
            Browse Jobs
            <ArrowRight size={17} />
          </button>
        </div>
      )}

      {/* SAVED JOBS */}
      {!error && savedJobs.length > 0 && (
        <div className="grid grid-cols-1 gap-5">
          {savedJobs.map((job, index) => {
            const jobId = job?.jobId;

            const salary = getSalary(job);
            const postedDate = getPostedDate(job);
            const jobType = getJobType(job);

            const isRemoving =
              String(removingId) === String(jobId);

            return (
              <article
                key={
                  jobId ||
                  job?.savedJobId ||
                  `saved-job-${index}`
                }
                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#159a9c]/30 hover:shadow-md sm:p-6"
              >
                {/* TOP */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#159a9c]/10">
                    <BriefcaseBusiness
                      size={22}
                      className="text-[#159a9c]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-lg font-semibold text-[#171b2b] sm:text-xl">
                      {getJobTitle(job)}
                    </h2>

                    <div className="mt-1 flex items-center gap-1.5 text-sm text-[#707686]">
                      <Building2 size={15} />

                      <span className="truncate">
                        {getCompany(job)}
                      </span>
                    </div>
                  </div>

                  {/* REMOVE */}
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveSavedJob(jobId)
                    }
                    disabled={
                      isRemoving || !jobId
                    }
                    title="Remove saved job"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isRemoving ? (
                      <RefreshCw
                        size={16}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>

                {/* META */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-[#707686]">
                    <MapPin size={14} />
                    {getLocation(job)}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#159a9c]/10 px-3 py-1.5 text-xs font-medium text-[#159a9c]">
                    <Clock3 size={14} />
                    {jobType}
                  </span>

                  {salary && (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-[#707686]">
                      <IndianRupee size={14} />
                      {salary}
                    </span>
                  )}

                  {postedDate && (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-[#707686]">
                      <CalendarDays size={14} />
                      {postedDate}
                    </span>
                  )}
                </div>

                {/* DESCRIPTION */}
                <p className="mt-5 text-sm leading-6 text-[#707686]">
                  {getDescription(job)}
                </p>

                {/* ACTIONS */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-[#9aa0ad]">
                    Saved for later
                  </p>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    {/* VIEW DETAILS */}
                    <button
                      type="button"
                      disabled={!jobId}
                      onClick={() => {
                        if (!jobId) {
                          setError(
                            "Unable to identify this job."
                          );
                          return;
                        }

                        navigate(
                          `/user/jobs/${encodeURIComponent(
                            jobId
                          )}`
                        );
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-[#171b2b] transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </button>

                    {/* APPLY */}
                    <button
                      type="button"
                      disabled={!jobId}
                      onClick={() => {
                        if (!jobId) {
                          setError(
                            "Unable to identify this job."
                          );
                          return;
                        }

                        navigate(
                          `/user/jobs/${encodeURIComponent(
                            jobId
                          )}/apply`
                        );
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#159a9c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#118789] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Apply Now
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SavedJobs;