import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { apiFetch } from "../../lib/api";

const MyApplications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // ==================================================
  // AUTH ERROR
  // ==================================================
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

  // ==================================================
  // FETCH MY APPLICATIONS
  // Backend:
  // GET /api/applications/my
  //
  // Response:
  // {
  //   success: true,
  //   count: 1,
  //   total: 1,
  //   applications: [...]
  // }
  // ==================================================
  const fetchApplications = async ({
    isRefresh = false,
  } = {}) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await apiFetch(
        "/applications/my"
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Unable to load your applications."
        );
      }

      /*
        IMPORTANT:

        Backend returns:

        response.applications

        NOT:

        response.data
      */

      const applicationList = Array.isArray(
        response?.applications
      )
        ? response.applications
        : [];

      setApplications(applicationList);
    } catch (err) {
      console.error(
        "My applications error:",
        err
      );

      if (handleAuthError(err)) {
        return;
      }

      setError(
        err?.message ||
          "Unable to load your applications."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ==================================================
  // INITIAL LOAD
  // ==================================================
  useEffect(() => {
    fetchApplications();
  }, []);

  // ==================================================
  // DATE FORMAT
  // ==================================================
  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date not available";
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

  // ==================================================
  // STATUS CONFIG
  // ==================================================
  const getStatusConfig = (status) => {
    const normalizedStatus =
      String(status || "pending").toLowerCase();

    switch (normalizedStatus) {
      case "selected":
        return {
          label: "Selected",
          className:
            "bg-green-50 text-green-600 border-green-100",
          icon: (
            <CheckCircle2 size={14} />
          ),
        };

      case "shortlisted":
        return {
          label: "Shortlisted",
          className:
            "bg-blue-50 text-blue-600 border-blue-100",
          icon: (
            <CheckCircle2 size={14} />
          ),
        };

      case "reviewing":
      case "under_review":
        return {
          label: "Under Review",
          className:
            "bg-purple-50 text-purple-600 border-purple-100",
          icon: (
            <Clock3 size={14} />
          ),
        };

      case "rejected":
        return {
          label: "Rejected",
          className:
            "bg-red-50 text-red-600 border-red-100",
          icon: (
            <XCircle size={14} />
          ),
        };

      case "withdrawn":
        return {
          label: "Withdrawn",
          className:
            "bg-gray-100 text-gray-600 border-gray-200",
          icon: (
            <XCircle size={14} />
          ),
        };

      case "pending":
      default:
        return {
          label: "Pending",
          className:
            "bg-amber-50 text-amber-600 border-amber-100",
          icon: (
            <Clock3 size={14} />
          ),
        };
    }
  };

  // ==================================================
  // VIEW APPLICATION
  // ==================================================
  const handleViewDetails = (applicationId) => {
    if (!applicationId) {
      return;
    }

    navigate(
      `/user/applications/${applicationId}`
    );
  };

  // ==================================================
  // LOADING UI
  // ==================================================
  if (loading) {
    return (
      <div className="space-y-5">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 animate-pulse rounded-2xl bg-gray-200" />

            <div className="space-y-2">
              <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-64 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          <div className="h-11 w-28 animate-pulse rounded-xl bg-gray-200" />
        </div>

        {/* Count Skeleton */}
        <div className="h-14 animate-pulse rounded-2xl bg-white shadow-sm" />

        {/* Application Skeletons */}
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-xl bg-gray-200" />

                <div className="flex-1 space-y-3">
                  <div className="h-5 w-1/2 rounded bg-gray-200" />
                  <div className="h-4 w-1/3 rounded bg-gray-200" />

                  <div className="flex gap-3">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==================================================
  // MAIN UI
  // ==================================================
  return (
    <div className="space-y-5">
      {/* ==================================================
          HEADER
      ================================================== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#159a9c]/10 text-[#159a9c]">
            <FileText size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#171b2b] sm:text-3xl">
              My Applications
            </h1>

            <p className="mt-1 text-sm text-[#707686]">
              Track the jobs you have applied for.
            </p>
          </div>
        </div>

        {/* Refresh */}
        <button
          type="button"
          onClick={() =>
            fetchApplications({
              isRefresh: true,
            })
          }
          disabled={refreshing}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-[#171b2b] shadow-sm transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={
              refreshing
                ? "animate-spin"
                : ""
            }
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      {/* ==================================================
          ERROR
      ================================================== */}
      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* ==================================================
          TOTAL APPLICATIONS
      ================================================== */}
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#159a9c]/10 text-[#159a9c]">
            <FileText size={18} />
          </div>

          <span className="text-sm font-medium text-[#707686]">
            Total applications
          </span>
        </div>

        <span className="inline-flex min-w-9 items-center justify-center rounded-full bg-[#159a9c]/10 px-3 py-1.5 text-sm font-bold text-[#159a9c]">
          {applications.length}
        </span>
      </div>

      {/* ==================================================
          EMPTY STATE
      ================================================== */}
      {applications.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white px-5 py-14 text-center shadow-sm sm:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#159a9c]/10 text-[#159a9c]">
            <BriefcaseBusiness size={27} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#171b2b]">
            No applications yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#707686]">
            You haven't applied for any jobs yet.
            Browse available opportunities and
            submit your first application.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/user/jobs")
            }
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#159a9c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#128587]"
          >
            Browse Jobs
            <ArrowRightIcon />
          </button>
        </div>
      ) : (
        /* ==================================================
           APPLICATION LIST
        ================================================== */
        <div className="space-y-4">
          {applications.map((application) => {
            const status =
              getStatusConfig(
                application?.status
              );

            const applicationId =
              application?._id;

            const job =
              application?.job;

            const jobTitle =
              job?.title ||
              application?.jobTitle ||
              "Job Application";

            const location =
              job?.location ||
              "Location not specified";

            const employmentType =
              job?.employmentType ||
              job?.jobType ||
              "Full Time";

            const appliedDate =
              application?.appliedAt ||
              application?.createdAt;

            return (
              <article
                key={applicationId}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-[#159a9c]/20 hover:shadow-md sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* LEFT */}
                  <div className="flex min-w-0 gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#159a9c]/10 text-[#159a9c]">
                      <BriefcaseBusiness
                        size={21}
                      />
                    </div>

                    <div className="min-w-0">
                      <h2 className="break-words text-base font-bold text-[#171b2b] sm:text-lg">
                        {jobTitle}
                      </h2>

                      <p className="mt-1 text-sm font-medium text-[#159a9c]">
                        Steps-Infotech
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#707686]">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} />
                          {location}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <BriefcaseBusiness
                            size={14}
                          />
                          {employmentType}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays
                            size={14}
                          />
                          Applied{" "}
                          {formatDate(
                            appliedDate
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}
                    >
                      {status.icon}
                      {status.label}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleViewDetails(
                          applicationId
                        )
                      }
                      disabled={!applicationId}
                      className="rounded-xl bg-[#159a9c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#128587] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ==================================================
// ARROW ICON
// ==================================================
const ArrowRightIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export default MyApplications;