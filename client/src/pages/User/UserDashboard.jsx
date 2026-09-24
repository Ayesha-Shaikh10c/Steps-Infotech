import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Bookmark,
  FileText,
  CheckCircle2,
  Clock3,
  XCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { apiFetch } from "../../lib/api";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [availableJobs, setAvailableJobs] = useState(0);
  const [savedJobs, setSavedJobs] = useState(0);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // AUTH ERROR HANDLER
  // =========================================================

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

  // =========================================================
  // GET USER FROM STORAGE
  // =========================================================

  const loadStoredUser = () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return null;
      }

      const parsedUser = JSON.parse(storedUser);

      if (!parsedUser || typeof parsedUser !== "object") {
        return null;
      }

      return parsedUser;
    } catch (err) {
      console.error("User storage error:", err);
      return null;
    }
  };

  // =========================================================
  // NORMALIZE JOB RESPONSE
  // =========================================================

  const extractJobs = (response) => {
    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (Array.isArray(response?.jobs)) {
      return response.jobs;
    }

    if (Array.isArray(response?.data?.jobs)) {
      return response.data.jobs;
    }

    return [];
  };

  // =========================================================
  // NORMALIZE SAVED JOB RESPONSE
  // =========================================================

  const extractSavedJobs = (response) => {
    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (Array.isArray(response?.savedJobs)) {
      return response.savedJobs;
    }

    return [];
  };

  // =========================================================
  // NORMALIZE APPLICATION RESPONSE
  // =========================================================

  const extractApplications = (response) => {
    if (Array.isArray(response?.applications)) {
      return response.applications;
    }

    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (Array.isArray(response?.data?.applications)) {
      return response.data.applications;
    }

    return [];
  };

  // =========================================================
  // FETCH DASHBOARD DATA
  // =========================================================

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", {
          replace: true,
        });

        return;
      }

      const storedUser = loadStoredUser();

      setUser(storedUser);

      // -------------------------------------------------------
      // Fetch all live user dashboard data
      // -------------------------------------------------------

      const [
        jobsResponse,
        savedJobsResponse,
        applicationsResponse,
      ] = await Promise.all([
        apiFetch("/jobs"),
        apiFetch("/saved-jobs"),
        apiFetch("/applications/my"),
      ]);

      // -------------------------------------------------------
      // Validate responses
      // -------------------------------------------------------

      if (!jobsResponse?.success) {
        throw new Error(
          jobsResponse?.message ||
            "Unable to load available jobs."
        );
      }

      if (!savedJobsResponse?.success) {
        throw new Error(
          savedJobsResponse?.message ||
            "Unable to load saved jobs."
        );
      }

      if (!applicationsResponse?.success) {
        throw new Error(
          applicationsResponse?.message ||
            "Unable to load applications."
        );
      }

      // -------------------------------------------------------
      // Extract data
      // -------------------------------------------------------

      const jobs = extractJobs(jobsResponse);

      const saved = extractSavedJobs(
        savedJobsResponse
      );

      const applicationList =
        extractApplications(
          applicationsResponse
        );

      // -------------------------------------------------------
      // Available Jobs
      // -------------------------------------------------------

      const openJobs = jobs.filter((job) => {
        return (
          !job?.status ||
          String(job.status).toLowerCase() ===
            "open"
        );
      });

      setAvailableJobs(openJobs.length);

      // -------------------------------------------------------
      // Saved Jobs
      // -------------------------------------------------------

      setSavedJobs(saved.length);

      // -------------------------------------------------------
      // Applications
      // -------------------------------------------------------

      setApplications(applicationList);
    } catch (err) {
      console.error(
        "User dashboard error:",
        err
      );

      if (handleAuthError(err)) {
        return;
      }

      setError(
        err?.message ||
          "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchDashboard();
  }, []);

  // =========================================================
  // SELECTED APPLICATIONS
  // =========================================================

  const selectedApplications =
    applications.filter((application) => {
      const status = String(
        application?.status || ""
      ).toLowerCase();

      return (
        status === "selected" ||
        status === "accepted" ||
        status === "approved"
      );
    }).length;

  // =========================================================
  // DASHBOARD STATS
  // =========================================================

  const stats = [
    {
      label: "Available Jobs",
      value: availableJobs,
      icon: BriefcaseBusiness,
      description: "Open opportunities",
    },
    {
      label: "Saved Jobs",
      value: savedJobs,
      icon: Bookmark,
      description: "Jobs you saved",
    },
    {
      label: "Applications",
      value: applications.length,
      icon: FileText,
      description: "Total applications",
    },
    {
      label: "Selected",
      value: selectedApplications,
      icon: CheckCircle2,
      description: "Selected applications",
    },
  ];

  // =========================================================
  // STATUS CONFIG
  // =========================================================

  const getStatusConfig = (status) => {
    const normalizedStatus = String(
      status || "pending"
    ).toLowerCase();

    if (
      normalizedStatus === "selected" ||
      normalizedStatus === "accepted" ||
      normalizedStatus === "approved"
    ) {
      return {
        label: "Selected",
        className:
          "bg-emerald-50 text-emerald-600",
        icon: CheckCircle2,
      };
    }

    if (
      normalizedStatus === "rejected" ||
      normalizedStatus === "declined"
    ) {
      return {
        label: "Rejected",
        className:
          "bg-red-50 text-red-500",
        icon: XCircle,
      };
    }

    if (
      normalizedStatus === "reviewing" ||
      normalizedStatus === "under_review"
    ) {
      return {
        label: "Under Review",
        className:
          "bg-blue-50 text-blue-600",
        icon: Clock3,
      };
    }

    if (
      normalizedStatus === "shortlisted"
    ) {
      return {
        label: "Shortlisted",
        className:
          "bg-purple-50 text-purple-600",
        icon: CheckCircle2,
      };
    }

    if (
      normalizedStatus === "withdrawn"
    ) {
      return {
        label: "Withdrawn",
        className:
          "bg-gray-100 text-gray-600",
        icon: XCircle,
      };
    }

    return {
      label: "Pending",
      className:
        "bg-amber-50 text-amber-600",
      icon: Clock3,
    };
  };

  // =========================================================
  // RECENT APPLICATIONS
  // =========================================================

  const recentApplications =
    [...applications]
      .sort((a, b) => {
        const dateA = new Date(
          a?.appliedAt ||
            a?.createdAt ||
            0
        ).getTime();

        const dateB = new Date(
          b?.appliedAt ||
            b?.createdAt ||
            0
        ).getTime();

        return dateB - dateA;
      })
      .slice(0, 5);

  // =========================================================
  // WELCOME NAME
  // =========================================================

  const userName =
    user?.fullName ||
    "User";

  // =========================================================
  // LOADING SCREEN
  // =========================================================

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Welcome Skeleton */}

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="animate-pulse">
            <div className="h-4 w-28 rounded bg-gray-200" />

            <div className="mt-3 h-7 w-48 rounded bg-gray-200" />

            <div className="mt-3 h-4 w-full max-w-xl rounded bg-gray-100" />

            <div className="mt-2 h-4 w-3/4 max-w-xl rounded bg-gray-100" />
          </div>
        </section>

        {/* Stats Skeleton */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="animate-pulse">
                <div className="h-11 w-11 rounded-xl bg-gray-200" />

                <div className="mt-4 h-7 w-16 rounded bg-gray-200" />

                <div className="mt-2 h-4 w-28 rounded bg-gray-100" />

                <div className="mt-2 h-3 w-32 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </section>

        {/* Applications Skeleton */}

        <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5 sm:p-6">
            <div className="animate-pulse">
              <div className="h-5 w-40 rounded bg-gray-200" />
              <div className="mt-2 h-3 w-52 rounded bg-gray-100" />
            </div>
          </div>

          <div className="space-y-4 p-5 sm:p-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-xl border border-gray-100 p-4"
              >
                <div className="h-4 w-44 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-28 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="space-y-6">
      {/* =====================================================
          WELCOME
      ===================================================== */}

      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm font-medium text-[#159a9c]">
              Welcome back 👋
            </p>

            <h2 className="text-xl font-bold text-[#171b2b] sm:text-2xl">
              {userName}
            </h2>

            <p className="mt-1 max-w-xl text-sm leading-6 text-[#707686]">
              Track your applications, manage saved
              jobs and discover new career
              opportunities.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/user/jobs")
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#159a9c] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#12888a]"
          >
            Browse Jobs
            <ArrowRight size={17} />
          </button>
        </div>
      </section>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchDashboard}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-red-600 shadow-sm"
            >
              <RefreshCw size={15} />
              Retry
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9f7f7] text-[#159a9c]">
                  <Icon size={21} />
                </div>

                <span className="rounded-full bg-[#f5f7f8] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#707686]">
                  Live
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-2xl font-bold text-[#171b2b]">
                  {stat.value}
                </h3>

                <p className="mt-1 text-sm font-semibold text-[#404653]">
                  {stat.label}
                </p>

                <p className="mt-1 text-xs text-[#707686]">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* =====================================================
          RECENT APPLICATIONS
      ===================================================== */}

      <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h3 className="text-base font-bold text-[#171b2b] sm:text-lg">
              Recent Applications
            </h3>

            <p className="mt-1 text-xs text-[#707686] sm:text-sm">
              Your latest job applications
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/user/applications")
            }
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#159a9c] hover:underline"
          >
            View All
            <ArrowRight size={15} />
          </button>
        </div>

        {recentApplications.length === 0 ? (
          <div className="px-5 py-12 text-center sm:px-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e9f7f7] text-[#159a9c]">
              <FileText size={24} />
            </div>

            <h4 className="mt-4 text-sm font-semibold text-[#171b2b]">
              No applications yet
            </h4>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#707686]">
              You haven't applied for any jobs
              yet. Explore available
              opportunities and submit your
              first application.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/user/jobs")
              }
              className="mt-5 rounded-xl bg-[#159a9c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#12888a]"
            >
              Find Jobs
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentApplications.map(
              (application) => {
                const status =
                  getStatusConfig(
                    application?.status
                  );

                const StatusIcon =
                  status.icon;

                const applicationId =
                  application?._id ||
                  application?.id;

                const jobTitle =
                  application?.job?.title ||
                  application?.jobTitle ||
                  "Job Application";

                const company =
                  application?.job?.company ||
                  application?.company ||
                  "Steps-Infotech";

                return (
                  <div
                    key={
                      applicationId ||
                      `${jobTitle}-${application?.createdAt}`
                    }
                    className="flex flex-col gap-4 p-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                  >
                    {/* Application Info */}

                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9f7f7] text-[#159a9c]">
                        <BriefcaseBusiness
                          size={18}
                        />
                      </div>

                      <div className="min-w-0">
                        <h4 className="truncate text-sm font-semibold text-[#171b2b]">
                          {jobTitle}
                        </h4>

                        <p className="mt-1 text-xs text-[#707686]">
                          {company}
                        </p>
                      </div>
                    </div>

                    {/* Status + Details */}

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}
                      >
                        <StatusIcon size={14} />

                        {status.label}
                      </span>

                      {applicationId && (
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/user/applications/${applicationId}`
                            )
                          }
                          className="text-xs font-semibold text-[#159a9c] hover:underline"
                        >
                          Details
                        </button>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() =>
            navigate("/user/saved-jobs")
          }
          className="group rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:border-[#159a9c]/30 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9f7f7] text-[#159a9c]">
              <Bookmark size={20} />
            </div>

            <ArrowRight
              size={18}
              className="text-[#707686] transition group-hover:translate-x-1 group-hover:text-[#159a9c]"
            />
          </div>

          <h3 className="mt-4 text-sm font-bold text-[#171b2b]">
            Saved Jobs
          </h3>

          <p className="mt-1 text-xs text-[#707686]">
            View the jobs you have saved.
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/user/profile")
          }
          className="group rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:border-[#159a9c]/30 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9f7f7] text-[#159a9c]">
              <FileText size={20} />
            </div>

            <ArrowRight
              size={18}
              className="text-[#707686] transition group-hover:translate-x-1 group-hover:text-[#159a9c]"
            />
          </div>

          <h3 className="mt-4 text-sm font-bold text-[#171b2b]">
            Complete Your Profile
          </h3>

          <p className="mt-1 text-xs text-[#707686]">
            Keep your information updated for
            better opportunities.
          </p>
        </button>
      </section>
    </div>
  );
};

export default UserDashboard;