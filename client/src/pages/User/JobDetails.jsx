import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { apiFetch } from "../../lib/api";

const JobDetails = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [saved, setSaved] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // Authentication Error Handler
  // --------------------------------------------------
  const handleAuthError = (err) => {
    if (err?.status === 401 || err?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login", {
        replace: true,
      });

      return true;
    }

    return false;
  };

  // --------------------------------------------------
  // Fetch Job Details
  // --------------------------------------------------
  const fetchJob = async () => {
    try {
      setLoading(true);
      setError("");

      if (!jobId) {
        throw new Error("Job ID is missing.");
      }

      const response = await apiFetch(`/jobs/${jobId}`);

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to load job details."
        );
      }

      const jobData = response?.data || response?.job || null;

      if (!jobData) {
        throw new Error("Job details were not found.");
      }

      setJob(jobData);
    } catch (err) {
      console.error("Job details error:", err);

      if (handleAuthError(err)) {
        return;
      }

      setError(
        err?.message || "Unable to load job details."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Check Saved Job Status
  // Backend:
  // GET /api/saved-jobs/:jobId/check
  // --------------------------------------------------
  const checkSavedStatus = async () => {
    try {
      if (!jobId) {
        return;
      }

      const response = await apiFetch(
        `/saved-jobs/${jobId}/check`
      );

      if (!response?.success) {
        return;
      }

      setSaved(Boolean(response?.saved));
    } catch (err) {
      console.error("Check saved job error:", err);

      if (handleAuthError(err)) {
        return;
      }

      // Saved status failure should not block
      // the complete job details page.
    }
  };

  // --------------------------------------------------
  // Initial Load
  // --------------------------------------------------
  useEffect(() => {
    if (!jobId) {
      setError("Job ID is missing.");
      setLoading(false);
      return;
    }

    fetchJob();
    checkSavedStatus();
  }, [jobId]);

  // --------------------------------------------------
  // Save / Unsave Job
  // Backend:
  // POST   /api/saved-jobs/:jobId
  // DELETE /api/saved-jobs/:jobId
  // --------------------------------------------------
  const toggleSave = async () => {
    if (!jobId || saveLoading) {
      return;
    }

    try {
      setSaveLoading(true);
      setError("");

      if (saved) {
        // Remove saved job
        const response = await apiFetch(
          `/saved-jobs/${jobId}`,
          {
            method: "DELETE",
          }
        );

        if (!response?.success) {
          throw new Error(
            response?.message ||
              "Unable to remove saved job."
          );
        }

        setSaved(false);
      } else {
        // Save job
        const response = await apiFetch(
          `/saved-jobs/${jobId}`,
          {
            method: "POST",
          }
        );

        if (!response?.success) {
          throw new Error(
            response?.message ||
              "Unable to save job."
          );
        }

        setSaved(true);
      }
    } catch (err) {
      console.error(
        "Toggle saved job error:",
        err
      );

      if (handleAuthError(err)) {
        return;
      }

      setError(
        err?.message ||
          "Unable to update saved job."
      );
    } finally {
      setSaveLoading(false);
    }
  };

  // --------------------------------------------------
  // Format Date
  // --------------------------------------------------
  const formatDate = (date) => {
    if (!date) {
      return "Recently posted";
    }

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

  // --------------------------------------------------
  // Job Type
  // --------------------------------------------------
  const jobType =
    job?.jobType ||
    job?.type ||
    job?.employmentType ||
    "Full Time";

  // --------------------------------------------------
  // Loading UI
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="space-y-5">
        {/* Back Button Skeleton */}
        <div className="h-10 w-32 animate-pulse rounded-xl bg-gray-200" />

        {/* Main Skeleton */}
        <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="p-5 sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
              <div className="flex gap-4">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-gray-200" />

                <div className="space-y-3">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                  <div className="h-8 w-64 rounded bg-gray-200 sm:w-96" />
                  <div className="h-4 w-32 rounded bg-gray-200" />
                </div>
              </div>

              <div className="h-11 w-28 rounded-xl bg-gray-200" />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="h-9 w-28 rounded-full bg-gray-200" />
              <div className="h-9 w-32 rounded-full bg-gray-200" />
              <div className="h-9 w-32 rounded-full bg-gray-200" />
            </div>
          </div>

          <div className="border-t border-gray-100 p-5 sm:p-7">
            <div className="space-y-3">
              <div className="h-5 w-64 rounded bg-gray-200" />
              <div className="h-4 w-80 rounded bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
            <div className="h-6 w-40 rounded bg-gray-200" />

            <div className="mt-6 space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
              <div className="h-4 w-4/6 rounded bg-gray-200" />
            </div>
          </div>

          <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="h-6 w-32 rounded bg-gray-200" />

            <div className="mt-6 space-y-5">
              <div className="h-10 rounded bg-gray-200" />
              <div className="h-10 rounded bg-gray-200" />
              <div className="h-10 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Error / Job Not Found UI
  // --------------------------------------------------
  if (error || !job) {
    return (
      <div className="space-y-5">
        <button
          type="button"
          onClick={() => navigate("/user/jobs")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#707686] transition hover:text-[#159a9c]"
        >
          <ArrowLeft size={17} />
          Back to Jobs
        </button>

        <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <BriefcaseBusiness size={25} />
          </div>

          <h2 className="mt-4 text-xl font-bold text-[#171b2b]">
            Unable to Load Job
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#707686]">
            {error ||
              "The requested job could not be found or is no longer available."}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={fetchJob}
              className="inline-flex items-center gap-2 rounded-xl bg-[#159a9c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#128587]"
            >
              <RefreshCw size={16} />
              Try Again
            </button>

            <button
              type="button"
              onClick={() => navigate("/user/jobs")}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#171b2b] transition hover:border-[#159a9c] hover:text-[#159a9c]"
            >
              Browse Jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Main UI
  // --------------------------------------------------
  return (
    <div className="space-y-5">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/user/jobs")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#707686] transition hover:text-[#159a9c]"
      >
        <ArrowLeft size={17} />
        Back to Jobs
      </button>

      {/* Error message for save/unsave */}
      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* Main Job Header */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-5 lg:flex-row">
            {/* Job Title */}
            <div className="flex min-w-0 gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#159a9c]/10 text-[#159a9c]">
                <BriefcaseBusiness size={26} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-[#159a9c]">
                  Career Opportunity
                </p>

                <h1 className="mt-1 break-words text-2xl font-bold text-[#171b2b] sm:text-3xl">
                  {job.title || "Untitled Position"}
                </h1>

                <p className="mt-1 text-sm font-medium text-[#707686]">
                  {job.company || "Steps Infotech"}
                </p>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="button"
              onClick={toggleSave}
              disabled={saveLoading}
              aria-label={
                saved ? "Remove saved job" : "Save job"
              }
              className={`inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition ${
                saved
                  ? "border-[#159a9c]/20 bg-[#159a9c]/10 text-[#159a9c]"
                  : "border-gray-200 bg-white text-[#171b2b] hover:border-[#159a9c] hover:text-[#159a9c]"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {saveLoading ? (
                <RefreshCw
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <Bookmark
                  size={18}
                  fill={
                    saved
                      ? "currentColor"
                      : "none"
                  }
                />
              )}

              {saveLoading
                ? saved
                  ? "Removing..."
                  : "Saving..."
                : saved
                ? "Saved"
                : "Save Job"}
            </button>
          </div>

          {/* Meta */}
          <div className="mt-7 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#159a9c]/10 px-3 py-2 text-xs font-semibold text-[#159a9c]">
              <BriefcaseBusiness size={14} />
              {jobType}
            </span>

            {job.location && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-2 text-xs font-medium text-[#707686]">
                <MapPin size={14} />
                {job.location}
              </span>
            )}

            {job.experience && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-2 text-xs font-medium text-[#707686]">
                <Clock3 size={14} />
                {job.experience}
              </span>
            )}

            {job.createdAt && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-2 text-xs font-medium text-[#707686]">
                <CalendarDays size={14} />
                Posted {formatDate(job.createdAt)}
              </span>
            )}
          </div>
        </div>

        {/* Apply CTA */}
        <div className="border-t border-gray-100 bg-[#f9fbfb] p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-bold text-[#171b2b]">
                Interested in this opportunity?
              </h2>

              <p className="mt-1 text-sm text-[#707686]">
                Submit your application and take the
                next step in your career.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/user/jobs/${jobId}/apply`
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#159a9c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#128587]"
            >
              Apply Now
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* Job Content */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Description */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-[#171b2b]">
            Job Description
          </h2>

          <div className="mt-5 whitespace-pre-line text-sm leading-7 text-[#707686]">
            {job.description ||
              "No detailed job description has been provided for this position."}
          </div>
        </section>

        {/* Job Summary */}
        <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-[#171b2b]">
            Job Summary
          </h2>

          <div className="mt-5 space-y-4">
            <SummaryItem
              icon={
                <BriefcaseBusiness size={18} />
              }
              label="Job Type"
              value={jobType}
            />

            <SummaryItem
              icon={<MapPin size={18} />}
              label="Location"
              value={
                job.location || "Not specified"
              }
            />

            <SummaryItem
              icon={<Clock3 size={18} />}
              label="Experience"
              value={
                job.experience || "Not specified"
              }
            />

            <SummaryItem
              icon={
                <CalendarDays size={18} />
              }
              label="Posted"
              value={formatDate(job.createdAt)}
            />

            {job.applicationDeadline && (
              <SummaryItem
                icon={
                  <CalendarDays size={18} />
                }
                label="Application Deadline"
                value={formatDate(
                  job.applicationDeadline
                )}
              />
            )}

            {job.openings !== undefined &&
              job.openings !== null && (
                <SummaryItem
                  icon={
                    <BriefcaseBusiness
                      size={18}
                    />
                  }
                  label="Openings"
                  value={String(job.openings)}
                />
              )}
          </div>
        </aside>
      </div>

      {/* Requirements / Responsibilities / Skills */}
      {(job.requirements?.length > 0 ||
        job.skills?.length > 0 ||
        job.responsibilities?.length > 0) && (
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-[#171b2b]">
            Role Information
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-7 md:grid-cols-2">
            {Array.isArray(job.requirements) &&
              job.requirements.length > 0 && (
                <InfoList
                  title="Requirements"
                  items={job.requirements}
                />
              )}

            {Array.isArray(
              job.responsibilities
            ) &&
              job.responsibilities.length > 0 && (
                <InfoList
                  title="Responsibilities"
                  items={job.responsibilities}
                />
              )}

            {Array.isArray(job.skills) &&
              job.skills.length > 0 && (
                <InfoList
                  title="Skills"
                  items={job.skills}
                />
              )}
          </div>
        </section>
      )}
    </div>
  );
};

// --------------------------------------------------
// Summary Item
// --------------------------------------------------
const SummaryItem = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-start gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#159a9c]/10 text-[#159a9c]">
      {icon}
    </div>

    <div className="min-w-0">
      <p className="text-xs font-medium text-[#707686]">
        {label}
      </p>

      <p className="mt-0.5 break-words text-sm font-semibold text-[#171b2b]">
        {value}
      </p>
    </div>
  </div>
);

// --------------------------------------------------
// Info List
// --------------------------------------------------
const InfoList = ({
  title,
  items,
}) => (
  <div>
    <h3 className="font-semibold text-[#171b2b]">
      {title}
    </h3>

    <ul className="mt-3 space-y-2.5">
      {items.map((item, index) => (
        <li
          key={`${title}-${index}`}
          className="flex items-start gap-2 text-sm leading-6 text-[#707686]"
        >
          <CheckCircle2
            size={17}
            className="mt-1 shrink-0 text-[#159a9c]"
          />

          <span>
            {typeof item === "string"
              ? item
              : item?.name ||
                item?.title ||
                String(item)}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default JobDetails;