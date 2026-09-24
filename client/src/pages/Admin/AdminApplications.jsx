import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaEye,
  FaTrash,
  FaFileDownload,
  FaUser,
  FaBriefcase,
  FaCalendarAlt,
  FaSyncAlt,
  FaTimes,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaUserTie,
} from "react-icons/fa";
import { apiFetch } from "../../lib/api";

const PRIMARY = "#159a9c";
const DARK = "#171b2b";
const MUTED = "#707686";

const STATUS_OPTIONS = [
  "pending",
  "shortlisted",
  "interview",
  "selected",
  "rejected",
];

const getStatusClasses = (status) => {
  switch (status) {
    case "selected":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "shortlisted":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "interview":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "rejected":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
};

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getInitials = (name = "") => {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("") || "U"
  );
};

const getApplicantName = (application) => {
  return (
    application?.applicant?.fullName ||
    application?.user?.fullName ||
    application?.fullName ||
    "Unknown Applicant"
  );
};

const getApplicantEmail = (application) => {
  return (
    application?.applicant?.email ||
    application?.user?.email ||
    application?.email ||
    "—"
  );
};

const getJobTitle = (application) => {
  return (
    application?.job?.title ||
    application?.jobTitle ||
    application?.position ||
    "Job Not Available"
  );
};

const getResumeUrl = (resume) => {
  if (!resume) return "";

  if (resume.startsWith("http")) {
    return resume;
  }

  const baseUrl =
    import.meta.env.VITE_API_URL?.replace("/api", "") ||
    "http://localhost:5000";

  return `${baseUrl}${resume.startsWith("/") ? "" : "/"}${resume}`;
};

const ApplicationDetailsModal = ({ application, onClose, onStatusChange }) => {
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState(application?.status || "pending");

  if (!application) return null;

  const applicantName = getApplicantName(application);
  const applicantEmail = getApplicantEmail(application);
  const jobTitle = getJobTitle(application);

  const applicant = application.applicant || application.user || {};
  const job = application.job || {};

  const resume =
    application.resume ||
    application.resumeUrl ||
    application.resumePath ||
    "";

  const handleStatusChange = async (newStatus) => {
    if (newStatus === status) return;

    try {
      setUpdating(true);

      await apiFetch(`/applications/admin/${application._id}`, {
        method: "PUT",
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      setStatus(newStatus);
      onStatusChange(application._id, newStatus);
    } catch (error) {
      alert(error.message || "Unable to update application status.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-4"
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: PRIMARY }}
            >
              Application Details
            </p>

            <h2
              className="mt-1 text-xl font-semibold"
              style={{ color: DARK }}
            >
              {applicantName}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-5 p-5">
          {/* Applicant */}
          <section className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: PRIMARY }}
              >
                {getInitials(applicantName)}
              </div>

              <div>
                <h3 className="font-semibold" style={{ color: DARK }}>
                  {applicantName}
                </h3>

                <p className="text-sm" style={{ color: MUTED }}>
                  {applicantEmail}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <InfoItem
                label="Phone"
                value={applicant.phone || application.phone || "—"}
              />

              <InfoItem
                label="Location"
                value={
                  applicant.city ||
                  application.city ||
                  applicant.address ||
                  "—"
                }
              />

              <InfoItem
                label="Applied On"
                value={formatDate(application.createdAt)}
              />

              <InfoItem
                label="Application ID"
                value={application._id}
              />
            </div>
          </section>

          {/* Job */}
          <section className="rounded-xl border border-gray-100 p-4">
            <div className="mb-4 flex items-center gap-2">
              <FaBriefcase style={{ color: PRIMARY }} />

              <h3 className="font-semibold" style={{ color: DARK }}>
                Job Information
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <InfoItem label="Position" value={jobTitle} />

              <InfoItem
                label="Department"
                value={job.department || application.department || "—"}
              />

              <InfoItem
                label="Location"
                value={job.location || application.location || "—"}
              />

              <InfoItem
                label="Employment Type"
                value={job.employmentType || "—"}
              />
            </div>
          </section>

          {/* Status */}
          <section className="rounded-xl border border-gray-100 p-4">
            <div className="mb-3 flex items-center gap-2">
              <FaUserTie style={{ color: PRIMARY }} />

              <h3 className="font-semibold" style={{ color: DARK }}>
                Application Status
              </h3>
            </div>

            <select
              value={status}
              disabled={updating}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#159a9c]"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>

            {updating && (
              <p className="mt-2 text-xs" style={{ color: MUTED }}>
                Updating status...
              </p>
            )}
          </section>

          {/* Resume */}
          {resume && (
            <section className="rounded-xl border border-gray-100 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold" style={{ color: DARK }}>
                    Resume
                  </h3>

                  <p className="mt-1 text-sm" style={{ color: MUTED }}>
                    Applicant's submitted resume
                  </p>
                </div>

                <a
                  href={getResumeUrl(resume)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                  style={{ backgroundColor: PRIMARY }}
                >
                  <FaFileDownload />
                  View Resume
                </a>
              </div>
            </section>
          )}

          {/* Cover Letter */}
          {(application.coverLetter || application.message) && (
            <section className="rounded-xl border border-gray-100 p-4">
              <h3 className="mb-3 font-semibold" style={{ color: DARK }}>
                Cover Letter / Message
              </h3>

              <p
                className="whitespace-pre-wrap text-sm leading-6"
                style={{ color: MUTED }}
              >
                {application.coverLetter || application.message}
              </p>
            </section>
          )}
        </div>

        <div className="flex justify-end border-t bg-gray-50 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium transition hover:bg-gray-100"
            style={{ color: DARK }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p
        className="mt-1 break-words text-sm font-medium"
        style={{ color: DARK }}
      >
        {value || "—"}
      </p>
    </div>
  );
};

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  const [selectedApplication, setSelectedApplication] = useState(null);

  const fetchApplications = async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError("");

      const data = await apiFetch(
        `/applications/admin/all?page=${page}&limit=10`
      );

      const list =
        data.applications ||
        data.data ||
        data.results ||
        [];

      setApplications(Array.isArray(list) ? list : []);

      setPagination({
        page: data.pagination?.page || page,
        pages: data.pagination?.pages || 1,
        total:
          data.pagination?.total ??
          data.total ??
          list.length,
      });
    } catch (err) {
      setError(err.message || "Unable to load applications.");
      setApplications([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchApplications(true);
  }, [page]);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((application) => {
      const applicantName = getApplicantName(application).toLowerCase();
      const applicantEmail = getApplicantEmail(application).toLowerCase();
      const jobTitle = getJobTitle(application).toLowerCase();

      const matchesSearch =
        !query ||
        applicantName.includes(query) ||
        applicantEmail.includes(query) ||
        jobTitle.includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  const counts = useMemo(() => {
    return {
      total: pagination.total,
      pending: applications.filter(
        (item) => item.status === "pending"
      ).length,
      shortlisted: applications.filter(
        (item) => item.status === "shortlisted"
      ).length,
      interview: applications.filter(
        (item) => item.status === "interview"
      ).length,
      selected: applications.filter(
        (item) => item.status === "selected"
      ).length,
      rejected: applications.filter(
        (item) => item.status === "rejected"
      ).length,
    };
  }, [applications, pagination.total]);

  const handleDelete = async (application) => {
    const applicantName = getApplicantName(application);

    const confirmed = window.confirm(
      `Delete application from ${applicantName}? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await apiFetch(`/applications/admin/${application._id}`, {
        method: "DELETE",
      });

      setApplications((prev) =>
        prev.filter((item) => item._id !== application._id)
      );

      if (selectedApplication?._id === application._id) {
        setSelectedApplication(null);
      }
    } catch (err) {
      alert(err.message || "Unable to delete application.");
    }
  };

  const handleStatusUpdate = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((application) =>
        application._id === id
          ? { ...application, status: newStatus }
          : application
      )
    );

    setSelectedApplication((prev) =>
      prev?._id === id
        ? { ...prev, status: newStatus }
        : prev
    );
  };

  const stats = [
    {
      label: "Total",
      value: counts.total,
      icon: <FaBriefcase />,
    },
    {
      label: "Pending",
      value: counts.pending,
      icon: <FaClock />,
    },
    {
      label: "Shortlisted",
      value: counts.shortlisted,
      icon: <FaCheck />,
    },
    {
      label: "Interview",
      value: counts.interview,
      icon: <FaCalendarAlt />,
    },
    {
      label: "Selected",
      value: counts.selected,
      icon: <FaUserTie />,
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#f7f9fa] px-4 py-5 sm:px-6 lg:px-8"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="mx-auto max-w-[1000px]">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              className="text-sm font-medium"
              style={{ color: PRIMARY }}
            >
              Admin Panel
            </p>

            <h1
              className="mt-1 text-2xl font-semibold sm:text-3xl"
              style={{ color: DARK }}
            >
              Applications
            </h1>

            <p
              className="mt-1 text-sm"
              style={{ color: MUTED }}
            >
              Review and manage job applications.
            </p>
          </div>

          <button
            onClick={() => fetchApplications(false)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ color: DARK }}
          >
            <FaSyncAlt className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${PRIMARY}15`,
                    color: PRIMARY,
                  }}
                >
                  {stat.icon}
                </div>

                <span
                  className="text-xl font-semibold"
                  style={{ color: DARK }}
                >
                  {stat.value}
                </span>
              </div>

              <p
                className="mt-3 text-xs font-medium"
                style={{ color: MUTED }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-5 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <FaSearch
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: MUTED }}
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search applicant, email or job..."
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#159a9c]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#159a9c]"
            >
              <option value="all">All Status</option>

              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-gray-100 bg-white">
            <div className="text-center">
              <FaSyncAlt
                className="mx-auto animate-spin text-xl"
                style={{ color: PRIMARY }}
              />

              <p
                className="mt-3 text-sm"
                style={{ color: MUTED }}
              >
                Loading applications...
              </p>
            </div>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-white px-5 py-16 text-center shadow-sm">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                backgroundColor: `${PRIMARY}15`,
                color: PRIMARY,
              }}
            >
              <FaBriefcase />
            </div>

            <h3
              className="mt-4 font-semibold"
              style={{ color: DARK }}
            >
              No applications found
            </h3>

            <p
              className="mt-1 text-sm"
              style={{ color: MUTED }}
            >
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Job</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead align="right">Actions</TableHead>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredApplications.map((application) => {
                      const applicantName =
                        getApplicantName(application);

                      return (
                        <tr
                          key={application._id}
                          className="border-b last:border-b-0 hover:bg-gray-50/70"
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                                style={{
                                  backgroundColor: PRIMARY,
                                }}
                              >
                                {getInitials(applicantName)}
                              </div>

                              <div className="min-w-0">
                                <p
                                  className="truncate text-sm font-semibold"
                                  style={{ color: DARK }}
                                >
                                  {applicantName}
                                </p>

                                <p
                                  className="max-w-[200px] truncate text-xs"
                                  style={{ color: MUTED }}
                                >
                                  {getApplicantEmail(application)}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <p
                              className="max-w-[180px] truncate text-sm font-medium"
                              style={{ color: DARK }}
                            >
                              {getJobTitle(application)}
                            </p>

                            <p
                              className="mt-1 text-xs"
                              style={{ color: MUTED }}
                            >
                              {application.job?.department || "—"}
                            </p>
                          </td>

                          <td
                            className="px-4 py-4 text-sm"
                            style={{ color: MUTED }}
                          >
                            {formatDate(application.createdAt)}
                          </td>

                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${getStatusClasses(
                                application.status
                              )}`}
                            >
                              {application.status || "pending"}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex justify-end gap-2">
                              <ActionButton
                                title="View application"
                                onClick={() =>
                                  setSelectedApplication(application)
                                }
                              >
                                <FaEye />
                              </ActionButton>

                              <ActionButton
                                title="Delete application"
                                danger
                                onClick={() =>
                                  handleDelete(application)
                                }
                              >
                                <FaTrash />
                              </ActionButton>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-3 md:hidden">
              {filteredApplications.map((application) => {
                const applicantName =
                  getApplicantName(application);

                return (
                  <div
                    key={application._id}
                    className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: PRIMARY }}
                      >
                        {getInitials(applicantName)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3
                          className="truncate font-semibold"
                          style={{ color: DARK }}
                        >
                          {applicantName}
                        </h3>

                        <p
                          className="truncate text-xs"
                          style={{ color: MUTED }}
                        >
                          {getApplicantEmail(application)}
                        </p>

                        <p
                          className="mt-2 text-sm font-medium"
                          style={{ color: DARK }}
                        >
                          {getJobTitle(application)}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-medium capitalize ${getStatusClasses(
                          application.status
                        )}`}
                      >
                        {application.status || "pending"}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t pt-3">
                      <div
                        className="flex items-center gap-2 text-xs"
                        style={{ color: MUTED }}
                      >
                        <FaCalendarAlt />
                        {formatDate(application.createdAt)}
                      </div>

                      <div className="flex gap-2">
                        <ActionButton
                          title="View application"
                          onClick={() =>
                            setSelectedApplication(application)
                          }
                        >
                          <FaEye />
                        </ActionButton>

                        <ActionButton
                          title="Delete application"
                          danger
                          onClick={() =>
                            handleDelete(application)
                          }
                        >
                          <FaTrash />
                        </ActionButton>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-5 flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
                <p
                  className="text-xs sm:text-sm"
                  style={{ color: MUTED }}
                >
                  Page {pagination.page} of {pagination.pages}
                </p>

                <div className="flex gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() =>
                      setPage((prev) => Math.max(1, prev - 1))
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border bg-white transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    disabled={page >= pagination.pages}
                    onClick={() =>
                      setPage((prev) =>
                        Math.min(pagination.pages, prev + 1)
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border bg-white transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onStatusChange={handleStatusUpdate}
        />
      )}
    </div>
  );
};

const TableHead = ({ children, align = "left" }) => {
  return (
    <th
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
};

const ActionButton = ({
  children,
  onClick,
  title,
  danger = false,
}) => {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
        danger
          ? "border-red-100 bg-red-50 text-red-500 hover:bg-red-100"
          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
};

export default AdminApplications;