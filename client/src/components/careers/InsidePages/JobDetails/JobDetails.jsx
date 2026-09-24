import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Users,
  IndianRupee,
  Building2,
  RefreshCw,
} from "lucide-react";

import { getJobById } from "../../../../pages/careers/careersApi";

function JobDetails({ jobId, onBack }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     LOAD JOB DETAILS
  ========================================================= */

  const fetchJob = async () => {
    try {
      setLoading(true);
      setError("");

      if (!jobId) {
        throw new Error("Job ID is missing.");
      }

      const data = await getJobById(jobId);

      if (!data) {
        throw new Error("The requested job could not be found.");
      }

      setJob(data);
    } catch (err) {
      console.error("Careers job details error:", err);

      setJob(null);
      setError(
        err?.message ||
          "Unable to load job details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  /* =========================================================
     APPLY
     
     Not logged in  → Register
     Logged in      → Job Application
  ========================================================= */

  const handleApply = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigateToRegister();
      return;
    }

    window.location.href = `/user/jobs/${jobId}/apply`;
  };

  const navigateToRegister = () => {
    window.location.href = "/register";
  };

  /* =========================================================
     FORMAT HELPERS
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return "Not specified";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "Not specified";
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatEmploymentType = (value) => {
    if (!value) return "Not specified";

    return value
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatSalary = (salary) => {
    if (!salary) return "Not specified";

    if (typeof salary === "string") {
      return salary;
    }

    if (typeof salary === "number") {
      return `₹${salary.toLocaleString("en-IN")}`;
    }

    if (typeof salary === "object") {
      const min = salary?.min;
      const max = salary?.max;

      if (min && max) {
        return `₹${Number(min).toLocaleString(
          "en-IN"
        )} - ₹${Number(max).toLocaleString("en-IN")}`;
      }

      if (min) {
        return `From ₹${Number(min).toLocaleString(
          "en-IN"
        )}`;
      }

      if (max) {
        return `Up to ₹${Number(max).toLocaleString(
          "en-IN"
        )}`;
      }
    }

    return "Not specified";
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <section className="w-full bg-white px-4 py-8 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-[1100px]">
          <button
            type="button"
            onClick={onBack}
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              border-0
              bg-transparent
              p-0
              text-sm
              font-semibold
              text-[#707686]
              transition
              hover:text-[#159a9c]
              cursor-pointer
            "
          >
            <ArrowLeft size={17} />
            Back to Careers
          </button>

          <div className="animate-pulse space-y-5">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="h-6 w-40 rounded bg-gray-200" />

              <div className="mt-4 h-9 w-2/3 rounded bg-gray-200" />

              <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="h-9 w-28 rounded-full bg-gray-200" />
                <div className="h-9 w-32 rounded-full bg-gray-200" />
                <div className="h-9 w-32 rounded-full bg-gray-200" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="h-72 rounded-2xl bg-gray-200 lg:col-span-2" />
              <div className="h-72 rounded-2xl bg-gray-200" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !job) {
    return (
      <section className="w-full bg-white px-4 py-8 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-[1100px]">
          <button
            type="button"
            onClick={onBack}
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              border-0
              bg-transparent
              p-0
              text-sm
              font-semibold
              text-[#707686]
              transition
              hover:text-[#159a9c]
              cursor-pointer
            "
          >
            <ArrowLeft size={17} />
            Back to Careers
          </button>

          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <BriefcaseBusiness size={25} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-[#171b2b]">
              Unable to Load Job
            </h2>

            <p className="mt-2 text-sm text-[#707686]">
              {error ||
                "The requested job could not be found."}
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={fetchJob}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#159a9c]
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#128587]
                  cursor-pointer
                "
              >
                <RefreshCw size={16} />
                Try Again
              </button>

              <button
                type="button"
                onClick={onBack}
                className="
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-[#171b2b]
                  transition
                  hover:border-[#159a9c]
                  hover:text-[#159a9c]
                  cursor-pointer
                "
              >
                Back to Careers
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const skills = Array.isArray(job.skills)
    ? job.skills.filter(Boolean)
    : [];

  const requirements = Array.isArray(job.requirements)
    ? job.requirements.filter(Boolean)
    : [];

  const responsibilities = Array.isArray(
    job.responsibilities
  )
    ? job.responsibilities.filter(Boolean)
    : [];

  /* =========================================================
     MAIN
  ========================================================= */

  return (
    <section className="w-full bg-white px-4 py-8 sm:px-6 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-[1100px]">
        {/* BACK */}

        <button
          type="button"
          onClick={onBack}
          className="
            mb-5
            inline-flex
            items-center
            gap-2
            border-0
            bg-transparent
            p-0
            text-sm
            font-semibold
            text-[#707686]
            transition
            hover:text-[#159a9c]
            cursor-pointer
          "
        >
          <ArrowLeft size={17} />
          Back to Careers
        </button>

        {/* =====================================================
            JOB HEADER
        ===================================================== */}

        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="p-5 sm:p-7 md:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
              <div className="flex min-w-0 gap-4">
                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#159a9c]/10
                    text-[#159a9c]
                  "
                >
                  <BriefcaseBusiness size={27} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#159a9c]">
                    Career Opportunity
                  </p>

                  <h1
                    className="
                      mt-1
                      break-words
                      text-2xl
                      font-extrabold
                      text-[#171b2b]
                      sm:text-3xl
                    "
                  >
                    {job.title || "Untitled Position"}
                  </h1>

                  {job.department && (
                    <p className="mt-2 text-sm font-medium text-[#707686]">
                      {job.department}
                    </p>
                  )}
                </div>
              </div>

              {/* APPLY */}

              <button
                type="button"
                onClick={handleApply}
                className="
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#159a9c]
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  transition
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#128587]
                  hover:shadow-[0_8px_18px_rgba(21,154,156,0.22)]
                  cursor-pointer
                "
              >
                Apply Now
                <ArrowRight size={17} />
              </button>
            </div>

            {/* =================================================
                META
            ================================================= */}

            <div className="mt-7 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#159a9c]/10 px-3 py-2 text-xs font-semibold text-[#159a9c]">
                <BriefcaseBusiness size={14} />
                {formatEmploymentType(
                  job.employmentType
                )}
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

              {job.applicationDeadline && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-2 text-xs font-medium text-[#707686]">
                  <CalendarDays size={14} />
                  Apply by {formatDate(
                    job.applicationDeadline
                  )}
                </span>
              )}
            </div>
          </div>

        </section>

        {/* =====================================================
            DESCRIPTION + SUMMARY
        ===================================================== */}

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* DESCRIPTION */}

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
            <h2 className="text-lg font-bold text-[#171b2b]">
              Job Description
            </h2>

            <div className="mt-5 whitespace-pre-line text-sm leading-7 text-[#707686]">
              {job.description ||
                "No detailed job description has been provided for this position."}
            </div>
          </section>

          {/* SUMMARY */}

          <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-[#171b2b]">
              Job Summary
            </h2>

            <div className="mt-5 space-y-4">
              <SummaryItem
                icon={<Building2 size={18} />}
                label="Department"
                value={
                  job.department || "Not specified"
                }
              />

              <SummaryItem
                icon={<BriefcaseBusiness size={18} />}
                label="Employment"
                value={formatEmploymentType(
                  job.employmentType
                )}
              />

              <SummaryItem
                icon={<MapPin size={18} />}
                label="Location"
                value={job.location || "Not specified"}
              />

              <SummaryItem
                icon={<Clock3 size={18} />}
                label="Experience"
                value={
                  job.experience || "Not specified"
                }
              />

              <SummaryItem
                icon={<IndianRupee size={18} />}
                label="Salary"
                value={formatSalary(job.salary)}
              />

              {job.openings !== undefined &&
                job.openings !== null && (
                  <SummaryItem
                    icon={<Users size={18} />}
                    label="Openings"
                    value={String(job.openings)}
                  />
                )}
            </div>
          </aside>
        </div>

        {/* =====================================================
            RESPONSIBILITIES
        ===================================================== */}

        {responsibilities.length > 0 && (
          <section className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-[#171b2b]">
              Responsibilities
            </h2>

            <InfoList items={responsibilities} />
          </section>
        )}

        {/* =====================================================
            REQUIREMENTS + SKILLS
        ===================================================== */}

        {(requirements.length > 0 || skills.length > 0) && (
          <section className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
              {requirements.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-[#171b2b]">
                    Requirements
                  </h2>

                  <InfoList items={requirements} />
                </div>
              )}

              {skills.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-[#171b2b]">
                    Skills
                  </h2>

                  <InfoList items={skills} />
                </div>
              )}
            </div>
          </section>
        )}

      </div>
    </section>
  );
}

/* =========================================================
   SUMMARY ITEM
========================================================= */

function SummaryItem({ icon, label, value }) {
  return (
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
}

/* =========================================================
   INFO LIST
========================================================= */

function InfoList({ items }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="
            flex
            items-start
            gap-2.5
            text-sm
            leading-6
            text-[#707686]
          "
        >
          <CheckCircle2
            size={17}
            className="mt-1 shrink-0 text-[#159a9c]"
          />

          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default JobDetails;