import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  Search,
  SlidersHorizontal,
  Clock3,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { apiFetch } from "../../lib/api";

const UserJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedLoading, setSavedLoading] = useState({});
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");

  const getJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch("/jobs");

      if (!response?.success) {
        throw new Error(response?.message || "Failed to load jobs");
      }

      const jobData = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.jobs)
        ? response.jobs
        : [];

      setJobs(jobData);
    } catch (err) {
      console.error("User jobs error:", err);

      if (err?.status === 401 || err?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
        return;
      }

      setError(err?.message || "Unable to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const getSavedJobs = async () => {
    try {
      const response = await apiFetch("/saved-jobs");

      if (!response?.success) return;

      const data = Array.isArray(response.data) ? response.data : [];

      const ids = data
        .map((item) => item?.job?._id || item?.jobId || item?._id)
        .filter(Boolean)
        .map(String);

      setSavedJobIds(ids);
    } catch (err) {
      if (err?.status === 401 || err?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      }
    }
  };

  useEffect(() => {
    getJobs();
    getSavedJobs();
  }, []);

  const jobTypes = useMemo(() => {
    const types = jobs
      .map((job) => job?.jobType || job?.type)
      .filter(Boolean);

    return ["all", ...new Set(types)];
  }, [jobs]);

  const locations = useMemo(() => {
    const values = jobs
      .map((job) => job?.location)
      .filter(Boolean);

    return ["all", ...new Set(values)];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const title = String(job?.title || "").toLowerCase();
      const company = String(job?.company || "").toLowerCase();
      const description = String(job?.description || "").toLowerCase();

      const matchesSearch =
        !searchValue ||
        title.includes(searchValue) ||
        company.includes(searchValue) ||
        description.includes(searchValue);

      const currentType = job?.jobType || job?.type || "";
      const matchesType =
        jobType === "all" || currentType === jobType;

      const currentLocation = job?.location || "";
      const matchesLocation =
        location === "all" || currentLocation === location;

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [jobs, search, jobType, location]);

  const isSaved = (jobId) => savedJobIds.includes(String(jobId));

  const toggleSaveJob = async (jobId) => {
    if (!jobId) return;

    const id = String(jobId);

    try {
      setSavedLoading((prev) => ({ ...prev, [id]: true }));

      if (isSaved(id)) {
        const response = await apiFetch(`/saved-jobs/${id}`, {
          method: "DELETE",
        });

        if (!response?.success) {
          throw new Error(response?.message || "Unable to remove saved job");
        }

        setSavedJobIds((prev) => prev.filter((item) => item !== id));
      } else {
        const response = await apiFetch("/saved-jobs", {
          method: "POST",
          body: JSON.stringify({ jobId: id }),
        });

        if (!response?.success) {
          throw new Error(response?.message || "Unable to save job");
        }

        setSavedJobIds((prev) =>
          prev.includes(id) ? prev : [...prev, id]
        );
      }
    } catch (err) {
      console.error("Save job error:", err);

      if (err?.status === 401 || err?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
        return;
      }

      setError(err?.message || "Unable to update saved job.");
    } finally {
      setSavedLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const formatDate = (date) => {
    if (!date) return "Recently posted";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "Recently posted";
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getJobTypeLabel = (job) => {
    return job?.jobType || job?.type || "Full Time";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <p className="text-sm font-medium text-[#159a9c]">
          Career Opportunities
        </p>

        <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold text-[#171b2b] sm:text-3xl">
              Find Your Next Job
            </h1>

            <p className="mt-1 text-sm text-[#707686]">
              Explore available opportunities and apply for the role that
              matches your skills.
            </p>
          </div>

          <button
            type="button"
            onClick={getJobs}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#171b2b] shadow-sm transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-[#159a9c]" />
          <h2 className="font-semibold text-[#171b2b]">
            Search & Filters
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* Search */}
          <div className="relative md:col-span-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-[#171b2b] outline-none transition placeholder:text-gray-400 focus:border-[#159a9c] focus:bg-white focus:ring-2 focus:ring-[#159a9c]/10"
            />
          </div>

          {/* Job Type */}
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-[#171b2b] outline-none transition focus:border-[#159a9c] focus:bg-white focus:ring-2 focus:ring-[#159a9c]/10"
          >
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type === "all" ? "All Job Types" : type}
              </option>
            ))}
          </select>

          {/* Location */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-[#171b2b] outline-none transition focus:border-[#159a9c] focus:bg-white focus:ring-2 focus:ring-[#159a9c]/10"
          >
            {locations.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All Locations" : item}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 text-xs text-[#707686]">
          Showing{" "}
          <span className="font-semibold text-[#171b2b]">
            {filteredJobs.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-[#171b2b]">
            {jobs.length}
          </span>{" "}
          jobs
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex flex-col gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-red-600">{error}</p>

          <button
            type="button"
            onClick={getJobs}
            className="w-fit rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="h-5 w-2/3 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
              <div className="mt-6 h-4 w-full rounded bg-gray-200" />
              <div className="mt-2 h-4 w-5/6 rounded bg-gray-200" />
              <div className="mt-6 h-10 w-full rounded bg-gray-200" />
            </div>
          ))}
        </div>
      )}

      {/* Jobs */}
      {!loading && filteredJobs.length > 0 && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filteredJobs.map((job) => {
            const jobId = job?._id;
            const saved = isSaved(jobId);

            return (
              <article
                key={jobId}
                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#159a9c]/30 hover:shadow-md sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#159a9c]/10 text-[#159a9c]">
                      <BriefcaseBusiness size={22} />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-bold text-[#171b2b]">
                        {job?.title || "Untitled Position"}
                      </h2>

                      <p className="mt-1 truncate text-sm font-medium text-[#159a9c]">
                        {job?.company || "Steps Infotech"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSaveJob(jobId)}
                    disabled={savedLoading[String(jobId)]}
                    aria-label={saved ? "Remove saved job" : "Save job"}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition ${
                      saved
                        ? "border-[#159a9c]/20 bg-[#159a9c]/10 text-[#159a9c]"
                        : "border-gray-200 bg-white text-[#707686] hover:border-[#159a9c]/30 hover:text-[#159a9c]"
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    <Bookmark
                      size={18}
                      fill={saved ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#159a9c]/10 px-3 py-1.5 text-xs font-semibold text-[#159a9c]">
                    <BriefcaseBusiness size={13} />
                    {getJobTypeLabel(job)}
                  </span>

                  {job?.location && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-[#707686]">
                      <MapPin size={13} />
                      {job.location}
                    </span>
                  )}
                </div>

                <p className="mt-5 line-clamp-3 text-sm leading-6 text-[#707686]">
                  {job?.description ||
                    "Explore this opportunity and discover whether the role matches your experience and career goals."}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-100 pt-4 text-xs text-[#707686]">
                  {job?.createdAt && (
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={14} />
                      Posted {formatDate(job.createdAt)}
                    </span>
                  )}

                  {job?.experience && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={14} />
                      {job.experience}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`/user/jobs/${jobId}`)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#159a9c] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#128587]"
                >
                  View Job Details
                  <ArrowRight size={17} />
                </button>
              </article>
            );
          })}
        </div>
      )}

      {/* Empty */}
      {!loading && filteredJobs.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#159a9c]/10 text-[#159a9c]">
            <BriefcaseBusiness size={25} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-[#171b2b]">
            No jobs found
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#707686]">
            Try changing your search or filters. New opportunities may also
            become available soon.
          </p>

          {(search || jobType !== "all" || location !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setJobType("all");
                setLocation("all");
              }}
              className="mt-5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#171b2b] transition hover:border-[#159a9c] hover:text-[#159a9c]"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserJobs;