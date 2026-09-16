import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  RefreshCw,
  Edit3,
  Trash2,
  X,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Star,
  CalendarDays,
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { apiFetch } from "../../lib/api";

const LIMIT = 10;

const emptyJob = {
  title: "",
  department: "",
  location: "",
  employmentType: "Full Time",
  experience: "Fresher",
  salary: "",
  description: "",
  responsibilities: [],
  requirements: [],
  skills: [],
  openings: 1,
  applicationDeadline: "",
  status: "draft",
  isFeatured: false,
};

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const fetchJobs = async (requestedPage = page) => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch(
        `/jobs/admin/all?page=${requestedPage}&limit=${LIMIT}`
      );

      if (!response?.success) {
        throw new Error(response?.message || "Unable to fetch jobs.");
      }

      setJobs(Array.isArray(response.jobs) ? response.jobs : []);
      setTotal(response.total || 0);
      setPage(response.page || requestedPage);
      setTotalPages(Math.max(response.totalPages || 1, 1));
    } catch (err) {
      console.error("Manage jobs error:", err);

      if (err?.status === 401 || err?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return;
      }

      setError(err?.message || "Unable to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(1);
  }, []);

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => setSuccess(""), 3000);
    return () => clearTimeout(timer);
  }, [success]);

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        job.title?.toLowerCase().includes(query) ||
        job.department?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        job.employmentType?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, statusFilter]);

  const openCreateModal = () => {
    setEditingJob({ ...emptyJob });
    setShowModal(true);
    setError("");
  };

  const openEditModal = (job) => {
    setEditingJob({
      ...emptyJob,
      ...job,
      responsibilities: Array.isArray(job.responsibilities)
        ? job.responsibilities
        : [],
      requirements: Array.isArray(job.requirements)
        ? job.requirements
        : [],
      skills: Array.isArray(job.skills) ? job.skills : [],
      applicationDeadline: job.applicationDeadline
        ? formatDateTimeLocal(job.applicationDeadline)
        : "",
    });

    setShowModal(true);
    setError("");
  };

  const closeModal = () => {
    if (actionLoading) return;

    setShowModal(false);
    setEditingJob(null);
  };

  const handleSaveJob = async (event) => {
    event.preventDefault();

    if (!editingJob) return;

    const isEditing = Boolean(editingJob._id);

    try {
      setActionLoading(isEditing ? "update" : "create");
      setError("");
      setSuccess("");

      const payload = {
        title: editingJob.title,
        department: editingJob.department,
        location: editingJob.location,
        employmentType: editingJob.employmentType,
        experience: editingJob.experience,
        salary: editingJob.salary,
        description: editingJob.description,
        responsibilities: normalizeArray(editingJob.responsibilities),
        requirements: normalizeArray(editingJob.requirements),
        skills: normalizeArray(editingJob.skills),
        openings: Number(editingJob.openings),
        applicationDeadline: editingJob.applicationDeadline
          ? new Date(editingJob.applicationDeadline).toISOString()
          : null,
        status: editingJob.status,
        isFeatured: Boolean(editingJob.isFeatured),
      };

      const response = await apiFetch(
        isEditing
          ? `/jobs/admin/${editingJob._id}`
          : "/jobs/admin",
        {
          method: isEditing ? "PUT" : "POST",
          body: JSON.stringify(payload),
        }
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            `Unable to ${isEditing ? "update" : "create"} job.`
        );
      }

      setSuccess(
        response.message ||
          `Job ${isEditing ? "updated" : "created"} successfully.`
      );

      closeModal();
      await fetchJobs(page);
    } catch (err) {
      console.error("Save job error:", err);

      if (err?.status === 401 || err?.status === 403) {
        setError(
          err?.message || "You are not allowed to perform this action."
        );
      } else if (err?.status === 400 && err?.message) {
        setError(err.message);
      } else {
        setError(err?.message || "Unable to save job.");
      }
    } finally {
      setActionLoading("");
    }
  };

  const handleDelete = async (job) => {
    if (
      !window.confirm(
        `Delete "${job.title || "this job"}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setActionLoading(`delete-${job._id}`);
      setError("");
      setSuccess("");

      const response = await apiFetch(`/jobs/admin/${job._id}`, {
        method: "DELETE",
      });

      if (!response?.success) {
        throw new Error(response?.message || "Unable to delete job.");
      }

      setSuccess(response.message || "Job deleted successfully.");

      if (jobs.length === 1 && page > 1) {
        await fetchJobs(page - 1);
      } else {
        await fetchJobs(page);
      }
    } catch (err) {
      console.error("Delete job error:", err);
      setError(err?.message || "Unable to delete job.");
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

    fetchJobs(nextPage);
  };

  return (
    <div
      className="min-h-screen bg-[#f7fafa]"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-[#159a9c]">
              Administration
            </p>

            <h1 className="text-2xl font-semibold text-[#171b2b] sm:text-3xl">
              Manage Jobs
            </h1>

            <p className="mt-1 text-sm text-[#707686]">
              Create, update and manage career opportunities.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fetchJobs(page)}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dce8e8] bg-white px-4 py-2.5 text-sm font-medium text-[#171b2b] shadow-sm transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#159a9c] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#12888a]"
            >
              <Plus size={18} />
              Add Job
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
              onClick={() => setError("")}
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
              onClick={() => setSuccess("")}
              className="ml-auto"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={<BriefcaseBusiness size={20} />}
            label="Total Jobs"
            value={total}
          />

          <StatCard
            icon={<CheckCircle size={20} />}
            label="Open"
            value={jobs.filter((job) => job.status === "open").length}
          />

          <StatCard
            icon={<Star size={20} />}
            label="Featured"
            value={jobs.filter((job) => job.isFeatured).length}
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
                  setSearch(event.target.value)
                }
                placeholder="Search jobs by title, department or location..."
                className="w-full rounded-xl border border-[#dce8e8] bg-[#fbfdfd] py-2.5 pl-10 pr-4 text-sm text-[#171b2b] outline-none placeholder:text-[#9aa2af] focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-xl border border-[#dce8e8] bg-[#fbfdfd] px-4 py-2.5 text-sm text-[#171b2b] outline-none focus:border-[#159a9c]"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Jobs */}
        <div className="overflow-hidden rounded-2xl border border-[#e4eeee] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead>
                <tr className="border-b border-[#e8eeee] bg-[#fbfdfd]">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                    Job
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                    Location
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                    Type
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                    Openings
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                    Deadline
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
                ) : filteredJobs.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-5 py-14 text-center"
                    >
                      <BriefcaseBusiness
                        size={36}
                        className="mx-auto mb-3 text-[#b7c2c2]"
                      />

                      <p className="text-sm font-medium text-[#171b2b]">
                        No jobs found
                      </p>

                      <p className="mt-1 text-xs text-[#707686]">
                        Try another search or create a new job.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <JobRow
                      key={job._id}
                      job={job}
                      onEdit={() => openEditModal(job)}
                      onDelete={() => handleDelete(job)}
                      deleting={
                        actionLoading === `delete-${job._id}`
                      }
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
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
                  disabled={page <= 1 || loading}
                  onClick={() => goToPage(page - 1)}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#dce8e8] bg-white px-3 py-2 text-xs font-medium text-[#171b2b] hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={15} />
                  Previous
                </button>

                <button
                  type="button"
                  disabled={page >= totalPages || loading}
                  onClick={() => goToPage(page + 1)}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#dce8e8] bg-white px-3 py-2 text-xs font-medium text-[#171b2b] hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showModal && editingJob && (
        <JobModal
          job={editingJob}
          setJob={setEditingJob}
          onClose={closeModal}
          onSubmit={handleSaveJob}
          loading={Boolean(actionLoading)}
        />
      )}
    </div>
  );
};

/* =========================================================
   JOB ROW
========================================================= */

const JobRow = ({
  job,
  onEdit,
  onDelete,
  deleting,
}) => {
  return (
    <tr className="border-b border-[#edf2f2] last:border-b-0 hover:bg-[#fbfdfd]">
      <td className="px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f8f8] text-[#159a9c]">
            <BriefcaseBusiness size={18} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-[#171b2b]">
                {job.title || "Untitled Job"}
              </p>

              {job.isFeatured && (
                <Star
                  size={14}
                  className="fill-current text-[#159a9c]"
                />
              )}
            </div>

            <p className="mt-1 text-xs text-[#707686]">
              {job.department || "No department"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-1.5 text-sm text-[#171b2b]">
          <MapPin size={14} className="text-[#159a9c]" />
          {job.location || "—"}
        </span>
      </td>

      <td className="px-5 py-4">
        <p className="text-sm text-[#171b2b]">
          {job.employmentType || "—"}
        </p>

        <p className="mt-1 text-xs text-[#707686]">
          {job.experience || "—"}
        </p>
      </td>

      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-1.5 text-sm text-[#171b2b]">
          <Users size={14} className="text-[#159a9c]" />
          {job.openings ?? "—"}
        </span>
      </td>

      <td className="px-5 py-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-[#707686]">
          <CalendarDays size={14} />
          {job.applicationDeadline
            ? new Date(
                job.applicationDeadline
              ).toLocaleDateString()
            : "No deadline"}
        </span>
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={job.status} />
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-1.5">
          <ActionButton
            title="Edit job"
            onClick={onEdit}
          >
            <Edit3 size={16} />
          </ActionButton>

          <ActionButton
            title="Delete job"
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
   JOB MODAL
========================================================= */

const JobModal = ({
  job,
  setJob,
  onClose,
  onSubmit,
  loading,
}) => {
  const updateField = (field, value) => {
    setJob((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171b2b]/40 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <form
        onSubmit={onSubmit}
        className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#e8eeee] px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-[#171b2b]">
              {job._id ? "Edit Job" : "Create New Job"}
            </h2>

            <p className="mt-0.5 text-xs text-[#707686]">
              Enter the job details below.
            </p>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="rounded-lg p-2 text-[#707686] hover:bg-[#f5f7f7]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[72vh] overflow-y-auto p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField
              label="Job Title *"
              value={job.title}
              onChange={(value) =>
                updateField("title", value)
              }
              placeholder="e.g. Java Developer"
            />

            <InputField
              label="Department *"
              value={job.department}
              onChange={(value) =>
                updateField("department", value)
              }
              placeholder="e.g. Engineering"
            />

            <InputField
              label="Location *"
              value={job.location}
              onChange={(value) =>
                updateField("location", value)
              }
              placeholder="e.g. Pune"
            />

            <SelectField
              label="Employment Type *"
              value={job.employmentType}
              onChange={(value) =>
                updateField("employmentType", value)
              }
              options={[
                "Full Time",
                "Part Time",
                "Internship",
                "Contract",
                "Remote",
              ]}
            />

            <InputField
              label="Experience"
              value={job.experience}
              onChange={(value) =>
                updateField("experience", value)
              }
              placeholder="e.g. 0–2 Years / Fresher"
            />

            <InputField
              label="Salary"
              value={job.salary}
              onChange={(value) =>
                updateField("salary", value)
              }
              placeholder="e.g. ₹4–6 LPA"
            />

            <InputField
              label="Openings"
              type="number"
              min="1"
              value={job.openings}
              onChange={(value) =>
                updateField("openings", value)
              }
            />

            <InputField
              label="Application Deadline"
              type="datetime-local"
              value={job.applicationDeadline}
              onChange={(value) =>
                updateField(
                  "applicationDeadline",
                  value
                )
              }
            />

            <SelectField
              label="Status"
              value={job.status}
              onChange={(value) =>
                updateField("status", value)
              }
              options={[
                "open",
                "closed",
                "draft",
              ]}
            />

            <div className="flex items-end pb-1">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={Boolean(job.isFeatured)}
                  onChange={(event) =>
                    updateField(
                      "isFeatured",
                      event.target.checked
                    )
                  }
                  className="h-4 w-4 rounded border-[#cbd6d6] text-[#159a9c] focus:ring-[#159a9c]"
                />

                <span className="text-sm font-medium text-[#171b2b]">
                  Featured Job
                </span>
              </label>
            </div>

            <div className="md:col-span-2">
              <TextAreaField
                label="Description *"
                value={job.description}
                onChange={(value) =>
                  updateField("description", value)
                }
                placeholder="Write a detailed job description..."
                rows={5}
              />
            </div>

            <ArrayField
              label="Skills"
              values={job.skills}
              onChange={(values) =>
                updateField("skills", values)
              }
              placeholder="Java, Spring Boot, SQL"
            />

            <ArrayField
              label="Responsibilities"
              values={job.responsibilities}
              onChange={(values) =>
                updateField(
                  "responsibilities",
                  values
                )
              }
              placeholder="Build REST APIs, Write clean code"
            />

            <ArrayField
              label="Requirements"
              values={job.requirements}
              onChange={(values) =>
                updateField(
                  "requirements",
                  values
                )
              }
              placeholder="Bachelor's degree, Java knowledge"
            />
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
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#159a9c] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#12888a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : job._id
              ? "Update Job"
              : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

/* =========================================================
   ARRAY FIELD
========================================================= */

const ArrayField = ({
  label,
  values,
  onChange,
  placeholder,
}) => {
  const [input, setInput] = useState("");

  const addItem = () => {
    const value = input.trim();

    if (!value) return;

    if (
      values.some(
        (item) =>
          item.toLowerCase() === value.toLowerCase()
      )
    ) {
      setInput("");
      return;
    }

    onChange([...values, value]);
    setInput("");
  };

  const removeItem = (index) => {
    onChange(
      values.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addItem();
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[#171b2b]">
        {label}
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-w-0 flex-1 rounded-xl border border-[#dce8e8] px-3 py-2.5 text-sm text-[#171b2b] outline-none placeholder:text-[#9aa2af] focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
        />

        <button
          type="button"
          onClick={addItem}
          className="rounded-xl border border-[#159a9c] px-3 text-sm font-medium text-[#159a9c] hover:bg-[#eef8f8]"
        >
          Add
        </button>
      </div>

      {values.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {values.map((value, index) => (
            <span
              key={`${value}-${index}`}
              className="inline-flex items-center gap-1 rounded-full bg-[#eef8f8] px-3 py-1 text-xs font-medium text-[#159a9c]"
            >
              {value}

              <button
                type="button"
                onClick={() => removeItem(index)}
                className="ml-1 rounded-full hover:text-red-600"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/* =========================================================
   INPUT
========================================================= */

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[#171b2b]">
        {label}
      </label>

      <input
        type={type}
        min={min}
        value={value ?? ""}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#dce8e8] px-3 py-2.5 text-sm text-[#171b2b] outline-none placeholder:text-[#9aa2af] focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
      />
    </div>
  );
};

/* =========================================================
   SELECT
========================================================= */

const SelectField = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[#171b2b]">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-[#dce8e8] bg-white px-3 py-2.5 text-sm text-[#171b2b] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

/* =========================================================
   TEXTAREA
========================================================= */

const TextAreaField = ({
  label,
  value,
  onChange,
  placeholder,
  rows,
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[#171b2b]">
        {label}
      </label>

      <textarea
        value={value ?? ""}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none rounded-xl border border-[#dce8e8] px-3 py-2.5 text-sm leading-6 text-[#171b2b] outline-none placeholder:text-[#9aa2af] focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
      />
    </div>
  );
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-[#e4eeee] bg-white p-5 shadow-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f8f8] text-[#159a9c]">
        {icon}
      </div>

      <p className="text-sm text-[#707686]">
        {label}
      </p>

      <p className="mt-1 text-2xl font-semibold text-[#171b2b]">
        {value}
      </p>
    </div>
  );
};

/* =========================================================
   STATUS
========================================================= */

const StatusBadge = ({ status }) => {
  const classes =
    status === "open"
      ? "border-emerald-100 bg-emerald-50 text-emerald-700"
      : status === "closed"
      ? "border-red-100 bg-red-50 text-red-700"
      : "border-amber-100 bg-amber-50 text-amber-700";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${classes}`}
    >
      {status || "draft"}
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
   LOADING
========================================================= */

const LoadingRows = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((row) => (
        <tr
          key={row}
          className="border-b border-[#edf2f2]"
        >
          {[1, 2, 3, 4, 5, 6, 7].map((cell) => (
            <td
              key={cell}
              className="px-5 py-5"
            >
              <div className="h-4 animate-pulse rounded bg-[#edf2f2]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

/* =========================================================
   HELPERS
========================================================= */

const normalizeArray = (value) => {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item) =>
        typeof item === "string" &&
        item.trim()
    )
    .map((item) => item.trim());
};

const formatDateTimeLocal = (date) => {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  const offset = parsed.getTimezoneOffset();
  const localDate = new Date(
    parsed.getTime() - offset * 60000
  );

  return localDate
    .toISOString()
    .slice(0, 16);
};

export default ManageJobs;