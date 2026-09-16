import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  Eye,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  User,
  BriefcaseBusiness,
  CalendarDays,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Clock3,
  Users,
} from "lucide-react";
import { apiFetch } from "../../lib/api";

const LIMIT = 10;

const STATUS_OPTIONS = [
  "pending",
  "shortlisted",
  "interview",
  "rejected",
  "hired",
];

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const fetchApplications = async (requestedPage = page) => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch(
        `/applications/admin/all?page=${requestedPage}&limit=${LIMIT}`
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Unable to load applications."
        );
      }

      setApplications(
        Array.isArray(response.applications)
          ? response.applications
          : []
      );

      setTotal(response.total || 0);
      setPage(response.page || requestedPage);
      setTotalPages(
        Math.max(response.totalPages || 1, 1)
      );
    } catch (err) {
      console.error(
        "Manage applications error:",
        err
      );

      if (
        err?.status === 401 ||
        err?.status === 403
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
      }

      setError(
        err?.message ||
          "Unable to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(1);
  }, []);

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(
      () => setSuccess(""),
      3000
    );

    return () => clearTimeout(timer);
  }, [success]);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((application) => {
      const applicant = application.applicant;
      const job = application.job;

      const matchesSearch =
        !query ||
        applicant?.fullName
          ?.toLowerCase()
          .includes(query) ||
        applicant?.email
          ?.toLowerCase()
          .includes(query) ||
        job?.title
          ?.toLowerCase()
          .includes(query) ||
        job?.department
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        application.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    applications,
    search,
    statusFilter,
  ]);

  const handleView = async (application) => {
    try {
      setActionLoading(
        `view-${application._id}`
      );
      setError("");

      const response = await apiFetch(
        `/applications/admin/${application._id}`
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Unable to load application."
        );
      }

      setSelectedApplication(
        response.application
      );
    } catch (err) {
      console.error(
        "Get application error:",
        err
      );

      setError(
        err?.message ||
          "Unable to load application details."
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleStatusUpdate = async (
    applicationId,
    status,
    adminNotes,
    interviewDate
  ) => {
    try {
      setActionLoading(
        `status-${applicationId}`
      );
      setError("");
      setSuccess("");

      const payload = {
        status,
        adminNotes,
        interviewDate: interviewDate
          ? new Date(
              interviewDate
            ).toISOString()
          : null,
      };

      const response = await apiFetch(
        `/applications/admin/${applicationId}/status`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
        }
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Unable to update application."
        );
      }

      setSuccess(
        response.message ||
          "Application updated successfully."
      );

      const updatedApplication =
        response.application;

      setApplications((previous) =>
        previous.map((item) =>
          item._id === applicationId
            ? {
                ...item,
                ...updatedApplication,
              }
            : item
        )
      );

      if (
        selectedApplication?._id ===
        applicationId
      ) {
        const detailResponse =
          await apiFetch(
            `/applications/admin/${applicationId}`
          );

        if (detailResponse?.success) {
          setSelectedApplication(
            detailResponse.application
          );
        }
      }
    } catch (err) {
      console.error(
        "Update application status error:",
        err
      );

      setError(
        err?.message ||
          "Unable to update application."
      );
    } finally {
      setActionLoading("");
    }
  };

  const handleDelete = async (application) => {
    const applicantName =
      application.applicant?.fullName ||
      application.fullName ||
      "this applicant";

    if (
      !window.confirm(
        `Delete the application of ${applicantName}? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setActionLoading(
        `delete-${application._id}`
      );
      setError("");
      setSuccess("");

      const response = await apiFetch(
        `/applications/admin/${application._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Unable to delete application."
        );
      }

      setSuccess(
        response.message ||
          "Application deleted successfully."
      );

      if (
        selectedApplication?._id ===
        application._id
      ) {
        setSelectedApplication(null);
      }

      if (
        applications.length === 1 &&
        page > 1
      ) {
        await fetchApplications(page - 1);
      } else {
        await fetchApplications(page);
      }
    } catch (err) {
      console.error(
        "Delete application error:",
        err
      );

      setError(
        err?.message ||
          "Unable to delete application."
      );
    } finally {
      setActionLoading("");
    }
  };

  const goToPage = (nextPage) => {
    if (
      nextPage < 1 ||
      nextPage > totalPages ||
      loading
    ) {
      return;
    }

    fetchApplications(nextPage);
  };

  const closeDetails = () => {
    if (actionLoading) return;

    setSelectedApplication(null);
  };

  return (
    <div
      className="min-h-screen bg-[#f7fafa]"
      style={{
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-medium text-[#159a9c]">
                Administration
              </p>

              <h1 className="text-2xl font-semibold text-[#171b2b] sm:text-3xl">
                Manage Applications
              </h1>

              <p className="mt-1 text-sm text-[#707686]">
                Review applicants and manage
                application status.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                fetchApplications(page)
              }
              disabled={loading}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-[#dce8e8] bg-white px-4 py-2.5 text-sm font-medium text-[#171b2b] shadow-sm transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertTriangle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="ml-auto"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{success}</span>

            <button
              type="button"
              onClick={() =>
                setSuccess("")
              }
              className="ml-auto"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <ApplicationStat
            icon={<Users size={20} />}
            label="Total"
            value={total}
          />

          <ApplicationStat
            icon={<Clock3 size={20} />}
            label="Pending"
            value={
              applications.filter(
                (item) =>
                  item.status === "pending"
              ).length
            }
          />

          <ApplicationStat
            icon={<CheckCircle size={20} />}
            label="Shortlisted"
            value={
              applications.filter(
                (item) =>
                  item.status ===
                  "shortlisted"
              ).length
            }
          />

          <ApplicationStat
            icon={<CalendarDays size={20} />}
            label="Interview"
            value={
              applications.filter(
                (item) =>
                  item.status ===
                  "interview"
              ).length
            }
          />
        </div>

        {/* Filters */}
        <div className="mb-5 rounded-2xl border border-[#e4eeee] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa2af]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search applicant, email or job..."
                className="w-full rounded-xl border border-[#dce8e8] bg-[#fbfdfd] py-2.5 pl-10 pr-4 text-sm text-[#171b2b] outline-none placeholder:text-[#9aa2af] focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
              className="rounded-xl border border-[#dce8e8] bg-[#fbfdfd] px-4 py-2.5 text-sm text-[#171b2b] outline-none focus:border-[#159a9c]"
            >
              <option value="all">
                All Status
              </option>

              {STATUS_OPTIONS.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {capitalize(status)}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Applications Table */}
        <div className="overflow-hidden rounded-2xl border border-[#e4eeee] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-[#e8eeee] bg-[#fbfdfd]">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                    Applicant
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                    Job
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                    Applied
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#707686]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <LoadingRows />
                ) : filteredApplications.length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-5 py-14 text-center"
                    >
                      <FileText
                        size={36}
                        className="mx-auto mb-3 text-[#b7c2c2]"
                      />

                      <p className="text-sm font-medium text-[#171b2b]">
                        No applications found
                      </p>

                      <p className="mt-1 text-xs text-[#707686]">
                        Try another search or
                        status filter.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map(
                    (application) => (
                      <ApplicationRow
                        key={
                          application._id
                        }
                        application={
                          application
                        }
                        onView={() =>
                          handleView(
                            application
                          )
                        }
                        onDelete={() =>
                          handleDelete(
                            application
                          )
                        }
                        viewing={
                          actionLoading ===
                          `view-${application._id}`
                        }
                        deleting={
                          actionLoading ===
                          `delete-${application._id}`
                        }
                      />
                    )
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading &&
            totalPages > 1 && (
              <div className="flex flex-col gap-3 border-t border-[#e8eeee] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-[#707686]">
                  Page{" "}
                  <span className="font-medium text-[#171b2b]">
                    {page}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-[#171b2b]">
                    {totalPages}
                  </span>
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={
                      page <= 1 ||
                      loading
                    }
                    onClick={() =>
                      goToPage(
                        page - 1
                      )
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-[#dce8e8] bg-white px-3 py-2 text-xs font-medium text-[#171b2b] hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft
                      size={15}
                    />
                    Previous
                  </button>

                  <button
                    type="button"
                    disabled={
                      page >=
                        totalPages ||
                      loading
                    }
                    onClick={() =>
                      goToPage(
                        page + 1
                      )
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-[#dce8e8] bg-white px-3 py-2 text-xs font-medium text-[#171b2b] hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight
                      size={15}
                    />
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedApplication && (
        <ApplicationDetailsModal
          application={
            selectedApplication
          }
          onClose={closeDetails}
          onStatusUpdate={
            handleStatusUpdate
          }
          loading={Boolean(actionLoading)}
        />
      )}
    </div>
  );
};

/* =========================================================
   APPLICATION ROW
========================================================= */

const ApplicationRow = ({
  application,
  onView,
  onDelete,
  viewing,
  deleting,
}) => {
  const applicant =
    application.applicant || {};

  const job =
    application.job || {};

  return (
    <tr className="border-b border-[#edf2f2] last:border-b-0 hover:bg-[#fbfdfd]">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <Avatar
            name={
              applicant.fullName ||
              application.fullName
            }
            image={
              applicant.profileImage
            }
          />

          <div>
            <p className="text-sm font-semibold text-[#171b2b]">
              {applicant.fullName ||
                application.fullName ||
                "Unknown Applicant"}
            </p>

            <p className="mt-1 text-xs text-[#707686]">
              {applicant.email ||
                application.email ||
                "No email"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <p className="text-sm font-medium text-[#171b2b]">
          {job.title ||
            "Deleted / unavailable job"}
        </p>

        <p className="mt-1 text-xs text-[#707686]">
          {job.department ||
            "No department"}
        </p>
      </td>

      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-[#707686]">
          <CalendarDays size={14} />

          {application.appliedAt
            ? new Date(
                application.appliedAt
              ).toLocaleDateString()
            : application.createdAt
            ? new Date(
                application.createdAt
              ).toLocaleDateString()
            : "—"}
        </span>
      </td>

      <td className="px-5 py-4">
        <StatusBadge
          status={application.status}
        />
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-1.5">
          <ActionButton
            title="View application"
            onClick={onView}
            disabled={viewing}
          >
            {viewing ? (
              <RefreshCw
                size={16}
                className="animate-spin"
              />
            ) : (
              <Eye size={16} />
            )}
          </ActionButton>

          <ActionButton
            title="Delete application"
            onClick={onDelete}
            disabled={deleting}
            className="text-red-600 hover:bg-red-50"
          >
            {deleting ? (
              <RefreshCw
                size={16}
                className="animate-spin"
              />
            ) : (
              <Trash2 size={16} />
            )}
          </ActionButton>
        </div>
      </td>
    </tr>
  );
};

/* =========================================================
   APPLICATION DETAILS MODAL
========================================================= */

const ApplicationDetailsModal = ({
  application,
  onClose,
  onStatusUpdate,
  loading,
}) => {
  const applicant =
    application.applicant || {};

  const job =
    application.job || {};

  const [status, setStatus] =
    useState(
      application.status || "pending"
    );

  const [adminNotes, setAdminNotes] =
    useState(
      application.adminNotes || ""
    );

  const [interviewDate, setInterviewDate] =
    useState(
      application.interviewDate
        ? formatDateTimeLocal(
            application.interviewDate
          )
        : ""
    );

  const submitStatus = async () => {
    await onStatusUpdate(
      application._id,
      status,
      adminNotes,
      interviewDate
    );
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171b2b]/40 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (
          event.target ===
            event.currentTarget &&
          !loading
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e8eeee] px-5 py-4">
          <div>
            <p className="text-xs font-medium text-[#159a9c]">
              Application Details
            </p>

            <h2 className="mt-0.5 text-lg font-semibold text-[#171b2b]">
              {applicant.fullName ||
                application.fullName ||
                "Applicant"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-[#707686] hover:bg-[#f5f7f7]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-5">
          {/* Applicant + Job */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoCard
              icon={<User size={18} />}
              title="Applicant"
            >
              <div className="flex items-center gap-3">
                <Avatar
                  name={
                    applicant.fullName ||
                    application.fullName
                  }
                  image={
                    applicant.profileImage
                  }
                />

                <div>
                  <p className="text-sm font-semibold text-[#171b2b]">
                    {applicant.fullName ||
                      application.fullName ||
                      "—"}
                  </p>

                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[#707686]">
                    <Mail size={13} />
                    {applicant.email ||
                      application.email ||
                      "—"}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <DetailLine
                  icon={<Phone size={14} />}
                  label="Phone"
                  value={
                    applicant.phone ||
                    application.phone ||
                    "—"
                  }
                />

                <DetailLine
                  icon={<MapPin size={14} />}
                  label="Location"
                  value="Applicant profile"
                />
              </div>
            </InfoCard>

            <InfoCard
              icon={
                <BriefcaseBusiness
                  size={18}
                />
              }
              title="Job"
            >
              <p className="text-sm font-semibold text-[#171b2b]">
                {job.title || "—"}
              </p>

              <div className="mt-3 space-y-2">
                <DetailLine
                  label="Department"
                  value={
                    job.department || "—"
                  }
                />

                <DetailLine
                  label="Location"
                  value={
                    job.location || "—"
                  }
                />

                <DetailLine
                  label="Employment"
                  value={
                    job.employmentType ||
                    "—"
                  }
                />
              </div>
            </InfoCard>
          </div>

          {/* Resume */}
          <div className="mt-4 rounded-2xl border border-[#e4eeee] bg-[#fbfdfd] p-4">
            <div className="mb-3 flex items-center gap-2">
              <FileText
                size={18}
                className="text-[#159a9c]"
              />

              <h3 className="text-sm font-semibold text-[#171b2b]">
                Resume
              </h3>
            </div>

            {applicant.resume ||
            application.resume ? (
              <a
                href={
                  applicant.resume ||
                  application.resume
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#159a9c] px-4 py-2 text-xs font-medium text-white hover:bg-[#12888a]"
              >
                <FileText size={15} />
                View Resume
              </a>
            ) : (
              <p className="text-xs text-[#707686]">
                Resume not available.
              </p>
            )}
          </div>

          {/* Skills */}
          {Array.isArray(
            applicant.skills
          ) &&
            applicant.skills.length > 0 && (
              <div className="mt-4 rounded-2xl border border-[#e4eeee] bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold text-[#171b2b]">
                  Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {applicant.skills.map(
                    (skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-full bg-[#eef8f8] px-3 py-1 text-xs font-medium text-[#159a9c]"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Application Content */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <ContentCard
              title="Experience"
              value={
                application.experience ||
                "Fresher"
              }
            />

            <ContentCard
              title="Applied On"
              value={
                application.appliedAt
                  ? new Date(
                      application.appliedAt
                    ).toLocaleString()
                  : application.createdAt
                  ? new Date(
                      application.createdAt
                    ).toLocaleString()
                  : "—"
              }
            />
          </div>

          <div className="mt-4 rounded-2xl border border-[#e4eeee] bg-white p-4">
            <h3 className="mb-2 text-sm font-semibold text-[#171b2b]">
              Cover Letter
            </h3>

            <p className="whitespace-pre-wrap text-sm leading-6 text-[#707686]">
              {application.coverLetter ||
                "No cover letter provided."}
            </p>
          </div>

          {/* Status Management */}
          <div className="mt-4 rounded-2xl border border-[#dce8e8] bg-[#fbfdfd] p-4">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-[#171b2b]">
                Application Management
              </h3>

              <p className="mt-1 text-xs text-[#707686]">
                Update status, interview date and
                internal admin notes.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#171b2b]">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-[#dce8e8] bg-white px-3 py-2.5 text-sm text-[#171b2b] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                >
                  {STATUS_OPTIONS.map(
                    (option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {capitalize(
                          option
                        )}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#171b2b]">
                  Interview Date
                </label>

                <input
                  type="datetime-local"
                  value={interviewDate}
                  onChange={(event) =>
                    setInterviewDate(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-[#dce8e8] bg-white px-3 py-2.5 text-sm text-[#171b2b] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-[#171b2b]">
                  Admin Notes
                </label>

                <textarea
                  value={adminNotes}
                  maxLength={5000}
                  onChange={(event) =>
                    setAdminNotes(
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder="Add internal notes about this applicant..."
                  className="w-full resize-none rounded-xl border border-[#dce8e8] bg-white px-3 py-2.5 text-sm leading-6 text-[#171b2b] outline-none placeholder:text-[#9aa2af] focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                />

                <p className="mt-1 text-right text-[11px] text-[#9aa2af]">
                  {adminNotes.length}/5000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-[#e8eeee] px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-[#dce8e8] bg-white px-4 py-2.5 text-sm font-medium text-[#707686] hover:border-[#159a9c] hover:text-[#159a9c]"
          >
            Close
          </button>

          <button
            type="button"
            onClick={submitStatus}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#159a9c] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#12888a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && (
              <RefreshCw
                size={15}
                className="animate-spin"
              />
            )}

            {loading
              ? "Updating..."
              : "Update Application"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   INFO CARD
========================================================= */

const InfoCard = ({
  icon,
  title,
  children,
}) => {
  return (
    <div className="rounded-2xl border border-[#e4eeee] bg-white p-4">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f8f8] text-[#159a9c]">
          {icon}
        </div>

        <h3 className="text-sm font-semibold text-[#171b2b]">
          {title}
        </h3>
      </div>

      {children}
    </div>
  );
};

/* =========================================================
   CONTENT CARD
========================================================= */

const ContentCard = ({
  title,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-[#e4eeee] bg-white p-4">
      <p className="mb-1 text-xs font-medium text-[#707686]">
        {title}
      </p>

      <p className="text-sm font-medium text-[#171b2b]">
        {value}
      </p>
    </div>
  );
};

/* =========================================================
   DETAIL LINE
========================================================= */

const DetailLine = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center gap-2">
      {icon && (
        <span className="text-[#159a9c]">
          {icon}
        </span>
      )}

      <span className="text-xs text-[#707686]">
        {label}:
      </span>

      <span className="text-xs font-medium text-[#171b2b]">
        {value}
      </span>
    </div>
  );
};

/* =========================================================
   STAT
========================================================= */

const ApplicationStat = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-[#e4eeee] bg-white p-4 shadow-sm">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f8f8] text-[#159a9c]">
        {icon}
      </div>

      <p className="text-xs text-[#707686]">
        {label}
      </p>

      <p className="mt-1 text-xl font-semibold text-[#171b2b]">
        {value}
      </p>
    </div>
  );
};

/* =========================================================
   AVATAR
========================================================= */

const Avatar = ({
  name,
  image,
}) => {
  const initials = getInitials(name);

  if (image) {
    return (
      <img
        src={image}
        alt={name || "Applicant"}
        className="h-10 w-10 rounded-xl object-cover"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f8f8] text-xs font-semibold text-[#159a9c]">
      {initials}
    </div>
  );
};

/* =========================================================
   STATUS BADGE
========================================================= */

const StatusBadge = ({
  status,
}) => {
  const normalized =
    status || "pending";

  let classes =
    "border-amber-100 bg-amber-50 text-amber-700";

  if (
    normalized === "shortlisted"
  ) {
    classes =
      "border-blue-100 bg-blue-50 text-blue-700";
  }

  if (
    normalized === "interview"
  ) {
    classes =
      "border-purple-100 bg-purple-50 text-purple-700";
  }

  if (
    normalized === "rejected"
  ) {
    classes =
      "border-red-100 bg-red-50 text-red-700";
  }

  if (
    normalized === "hired"
  ) {
    classes =
      "border-emerald-100 bg-emerald-50 text-emerald-700";
  }

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${classes}`}
    >
      {capitalize(normalized)}
    </span>
  );
};

/* =========================================================
   ACTION BUTTON
========================================================= */

const ActionButton = ({
  children,
  title,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-8 w-8 items-center justify-center rounded-lg text-[#707686] transition hover:bg-[#eef8f8] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
};

/* =========================================================
   LOADING ROWS
========================================================= */

const LoadingRows = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map(
        (row) => (
          <tr
            key={row}
            className="border-b border-[#edf2f2]"
          >
            {[1, 2, 3, 4, 5].map(
              (cell) => (
                <td
                  key={cell}
                  className="px-5 py-5"
                >
                  <div className="h-4 animate-pulse rounded bg-[#edf2f2]" />
                </td>
              )
            )}
          </tr>
        )
      )}
    </>
  );
};

/* =========================================================
   HELPERS
========================================================= */

const capitalize = (value) => {
  if (!value) return "";

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
};

const getInitials = (name) => {
  if (!name) return "U";

  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

const formatDateTimeLocal = (
  date
) => {
  const parsed = new Date(date);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return "";
  }

  const offset =
    parsed.getTimezoneOffset();

  const localDate = new Date(
    parsed.getTime() -
      offset * 60000
  );

  return localDate
    .toISOString()
    .slice(0, 16);
};

export default ManageApplications;