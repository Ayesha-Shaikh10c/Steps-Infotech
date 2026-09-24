import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  MapPin,
  RefreshCw,
  UserRound,
  XCircle,
} from "lucide-react";
import { apiFetch } from "../../lib/api";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    icon: Clock3,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  reviewing: {
    label: "Under Review",
    icon: Clock3,
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  shortlisted: {
    label: "Shortlisted",
    icon: CheckCircle2,
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },
  selected: {
    label: "Selected",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-red-50 text-red-700 border-red-200",
  },
  withdrawn: {
    label: "Withdrawn",
    icon: XCircle,
    className: "bg-slate-50 text-slate-600 border-slate-200",
  },
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getApplicationData = (response) => {
  if (!response) return null;

  if (response.data?.application) return response.data.application;
  if (response.data?.applicationDetails) return response.data.applicationDetails;
  if (response.application) return response.application;
  if (response.data?._id) return response.data;

  return null;
};

const ApplicationDetails = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchApplication = async (isRefresh = false) => {
    if (!applicationId) {
      setError("Application ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await apiFetch(`/applications/my/${applicationId}`);

      if (!response?.success && !response?.data) {
        throw new Error(
          response?.message || "Failed to load application details."
        );
      }

      const applicationData = getApplicationData(response);

      if (!applicationData) {
        throw new Error("Application details were not found.");
      }

      setApplication(applicationData);
    } catch (err) {
      console.error("Application details error:", err);

      if (err?.status === 401 || err?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
        return;
      }

      setError(
        err?.message || "Unable to load application details."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [applicationId]);

  const status = useMemo(() => {
    const normalizedStatus = String(
      application?.status || "pending"
    ).toLowerCase();

    return (
      STATUS_CONFIG[normalizedStatus] || {
        label:
          normalizedStatus.charAt(0).toUpperCase() +
          normalizedStatus.slice(1),
        icon: Clock3,
        className:
          "bg-slate-50 text-slate-600 border-slate-200",
      }
    );
  }, [application]);

  const StatusIcon = status.icon;

  const job = application?.job || {};
  const applicant = application?.user || application?.applicant || {};

  const jobId =
    typeof job === "string"
      ? job
      : job?._id || job?.id || application?.jobId;

  const resume =
    application?.resume ||
    application?.resumeUrl ||
    applicant?.resume;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-[#707686]">
          <Loader2 className="h-5 w-5 animate-spin text-[#159a9c]" />
          <span>Loading application details...</span>
        </div>
      </div>
    );
  }

  if (error && !application) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <XCircle className="h-7 w-7 text-red-500" />
          </div>

          <h2 className="text-lg font-semibold text-[#171b2b]">
            Unable to load application
          </h2>

          <p className="mt-2 max-w-md text-sm text-[#707686]">
            {error}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => fetchApplication()}
              className="inline-flex items-center gap-2 rounded-xl bg-[#159a9c] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#128688]"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>

            <button
              type="button"
              onClick={() => navigate("/user/applications")}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-[#171b2b] transition hover:bg-slate-50"
            >
              Back to Applications
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!application) {
    return null;
  }

  return (
    <div className="space-y-5">
      {/* Top Navigation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => navigate("/user/applications")}
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[#707686] transition hover:text-[#159a9c]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </button>

        <button
          type="button"
          onClick={() => fetchApplication(true)}
          disabled={refreshing}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#171b2b] shadow-sm transition hover:border-[#159a9c]/30 hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${
              refreshing ? "animate-spin" : ""
            }`}
          />
          Refresh
        </button>
      </div>

      {/* Header Card */}
      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-gradient-to-r from-[#159a9c]/10 to-transparent p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#159a9c] text-white shadow-sm">
                <BriefcaseBusiness className="h-7 w-7" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#159a9c]">
                  Job Application
                </p>

                <h1 className="mt-1 text-xl font-bold text-[#171b2b] sm:text-2xl">
                  {job?.title || "Job Application"}
                </h1>

                {job?.company && (
                  <p className="mt-1 flex items-center gap-2 text-sm text-[#707686]">
                    <Building2 className="h-4 w-4" />
                    {job.company}
                  </p>
                )}
              </div>
            </div>

            <div
              className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${status.className}`}
            >
              <StatusIcon className="h-4 w-4" />
              {status.label}
            </div>
          </div>
        </div>

        {/* Application Meta */}
        <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <div className="p-5">
            <p className="text-xs font-medium text-[#707686]">
              Applied On
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#171b2b]">
              <CalendarDays className="h-4 w-4 text-[#159a9c]" />
              {formatDate(
                application.createdAt ||
                  application.appliedAt ||
                  application.applicationDate
              )}
            </div>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium text-[#707686]">
              Location
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#171b2b]">
              <MapPin className="h-4 w-4 text-[#159a9c]" />
              {job?.location || "Not specified"}
            </div>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium text-[#707686]">
              Job Type
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#171b2b]">
              <BriefcaseBusiness className="h-4 w-4 text-[#159a9c]" />
              {job?.jobType || "Not specified"}
            </div>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium text-[#707686]">
              Applicant
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#171b2b]">
              <UserRound className="h-4 w-4 text-[#159a9c]" />
              {application.fullName ||
                applicant.fullName ||
                "You"}
            </div>
          </div>
        </div>
      </section>

      {/* Error after refresh */}
      {error && application && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => fetchApplication(true)}
            className="shrink-0 font-semibold hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-5 lg:col-span-2">
          {/* Cover Letter */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#159a9c]/10">
                <FileText className="h-5 w-5 text-[#159a9c]" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-[#171b2b]">
                  Cover Letter
                </h2>
                <p className="text-xs text-[#707686]">
                  Your submitted application message
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-slate-100 bg-[#f9fbfb] p-4 sm:p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-[#4f5868]">
                {application.coverLetter ||
                  "No cover letter was provided with this application."}
              </p>
            </div>
          </section>

          {/* Job Summary */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#159a9c]/10">
                <BriefcaseBusiness className="h-5 w-5 text-[#159a9c]" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-[#171b2b]">
                  Job Information
                </h2>
                <p className="text-xs text-[#707686]">
                  Position you applied for
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-5">
              {job?.description && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-[#171b2b]">
                    Description
                  </h3>
                  <p className="whitespace-pre-wrap text-sm leading-7 text-[#707686]">
                    {job.description}
                  </p>
                </div>
              )}

              {job?.requirements &&
                (Array.isArray(job.requirements) ? (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-[#171b2b]">
                      Requirements
                    </h3>

                    <ul className="space-y-2">
                      {job.requirements.map((item, index) => (
                        <li
                          key={index}
                          className="flex gap-2 text-sm text-[#707686]"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#159a9c]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-[#171b2b]">
                      Requirements
                    </h3>
                    <p className="whitespace-pre-wrap text-sm leading-7 text-[#707686]">
                      {job.requirements}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Application Status */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-[#171b2b]">
              Application Status
            </h2>

            <div className="mt-4 rounded-xl border border-slate-100 bg-[#f9fbfb] p-4">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${status.className}`}
              >
                <StatusIcon className="h-4 w-4" />
                {status.label}
              </div>

              <p className="mt-3 text-sm leading-6 text-[#707686]">
                {String(application.status || "pending").toLowerCase() ===
                "selected"
                  ? "Congratulations! Your application has been selected."
                  : String(
                      application.status || "pending"
                    ).toLowerCase() === "rejected"
                  ? "This application was not selected for the position."
                  : "Your application is currently being processed by the hiring team."}
              </p>
            </div>
          </section>

          {/* Resume */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-[#171b2b]">
              Submitted Resume
            </h2>

            {resume ? (
              <a
                href={
                  String(resume).startsWith("http")
                    ? resume
                    : `http://localhost:5000${resume}`
                }
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-[#159a9c]/30 hover:bg-[#159a9c]/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                  <FileText className="h-5 w-5 text-red-500" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#171b2b]">
                    Resume
                  </p>
                  <p className="text-xs text-[#707686]">
                    Open submitted document
                  </p>
                </div>
              </a>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-slate-200 p-4 text-sm text-[#707686]">
                No resume was attached to this application.
              </div>
            )}
          </section>

          {/* Actions */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-[#171b2b]">
              Quick Actions
            </h2>

            <div className="mt-4 space-y-2">
              {jobId && (
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/user/jobs/${jobId}`)
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#159a9c] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#128688]"
                >
                  <BriefcaseBusiness className="h-4 w-4" />
                  View Job
                </button>
              )}

              <button
                type="button"
                onClick={() => navigate("/user/applications")}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-[#171b2b] transition hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                All Applications
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default ApplicationDetails;