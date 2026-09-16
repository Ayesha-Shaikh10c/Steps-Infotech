import React, { useEffect, useMemo, useState } from "react";
import {
  FaBriefcase,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaStar,
  FaRegStar,
  FaTimes,
  FaSpinner,
  FaSyncAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { apiFetch } from "../../lib/api";

const PRIMARY = "#159a9c";
const DARK = "#171b2b";
const MUTED = "#707686";

const emptyForm = {
  title: "",
  department: "",
  location: "",
  employmentType: "Full Time",
  experience: "",
  salary: "",
  openings: 1,
  deadline: "",
  description: "",
  requirements: "",
  responsibilities: "",
  skills: "",
  status: "draft",
  featured: false,
};

const statusStyles = {
  open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  closed: "bg-red-50 text-red-700 border-red-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const JobForm = ({
  form,
  setForm,
  onSubmit,
  onClose,
  saving,
  editing,
}) => {
  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 font-[Poppins,sans-serif]">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-[#171b2b]">
              {editing ? "Edit Job" : "Create New Job"}
            </h2>

            <p className="mt-0.5 text-xs text-[#707686]">
              {editing
                ? "Update job posting details."
                : "Add a new opening to your careers page."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-[#171b2b]">
                Job Title *
              </label>

              <input
                required
                value={form.title}
                onChange={(e) =>
                  updateField("title", e.target.value)
                }
                placeholder="e.g. MERN Stack Developer"
                className="admin-input"
              />
            </div>

            {/* Department */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#171b2b]">
                Department *
              </label>

              <input
                required
                value={form.department}
                onChange={(e) =>
                  updateField("department", e.target.value)
                }
                placeholder="e.g. Development"
                className="admin-input"
              />
            </div>

            {/* Location */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#171b2b]">
                Location *
              </label>

              <input
                required
                value={form.location}
                onChange={(e) =>
                  updateField("location", e.target.value)
                }
                placeholder="e.g. Nanded, Maharashtra"
                className="admin-input"
              />
            </div>

            {/* Employment */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#171b2b]">
                Employment Type *
              </label>

              <select
                required
                value={form.employmentType}
                onChange={(e) =>
                  updateField(
                    "employmentType",
                    e.target.value
                  )
                }
                className="admin-input"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#171b2b]">
                Experience *
              </label>

              <input
                required
                value={form.experience}
                onChange={(e) =>
                  updateField("experience", e.target.value)
                }
                placeholder="e.g. 1-2 Years"
                className="admin-input"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#171b2b]">
                Salary
              </label>

              <input
                value={form.salary}
                onChange={(e) =>
                  updateField("salary", e.target.value)
                }
                placeholder="e.g. ₹4–6 LPA"
                className="admin-input"
              />
            </div>

            {/* Openings */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#171b2b]">
                Openings *
              </label>

              <input
                required
                type="number"
                min="1"
                value={form.openings}
                onChange={(e) =>
                  updateField(
                    "openings",
                    Number(e.target.value)
                  )
                }
                className="admin-input"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#171b2b]">
                Application Deadline
              </label>

              <input
                type="date"
                value={form.deadline}
                onChange={(e) =>
                  updateField("deadline", e.target.value)
                }
                className="admin-input"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#171b2b]">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  updateField("status", e.target.value)
                }
                className="admin-input"
              >
                <option value="draft">Draft</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Featured */}
            <div className="flex items-end">
              <label className="flex h-[46px] w-full cursor-pointer items-center gap-3 rounded-xl border border-gray-200 px-4">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    updateField(
                      "featured",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 accent-[#159a9c]"
                />

                <span className="text-sm font-medium text-[#171b2b]">
                  Featured Job
                </span>
              </label>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-[#171b2b]">
                Description *
              </label>

              <textarea
                required
                rows="4"
                value={form.description}
                onChange={(e) =>
                  updateField(
                    "description",
                    e.target.value
                  )
                }
                placeholder="Describe the role..."
                className="admin-input resize-none"
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#171b2b]">
                Requirements
              </label>

              <textarea
                rows="5"
                value={form.requirements}
                onChange={(e) =>
                  updateField(
                    "requirements",
                    e.target.value
                  )
                }
                placeholder="One requirement per line"
                className="admin-input resize-none"
              />
            </div>

            {/* Responsibilities */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#171b2b]">
                Responsibilities
              </label>

              <textarea
                rows="5"
                value={form.responsibilities}
                onChange={(e) =>
                  updateField(
                    "responsibilities",
                    e.target.value
                  )
                }
                placeholder="One responsibility per line"
                className="admin-input resize-none"
              />
            </div>

            {/* Skills */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-[#171b2b]">
                Skills
              </label>

              <input
                value={form.skills}
                onChange={(e) =>
                  updateField("skills", e.target.value)
                }
                placeholder="React, Node.js, MongoDB, Express"
                className="admin-input"
              />

              <p className="mt-1 text-xs text-[#707686]">
                Separate skills using commas.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-[#171b2b] transition hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundColor: PRIMARY }}
            >
              {saving && (
                <FaSpinner className="animate-spin" />
              )}

              {editing ? "Update Job" : "Create Job"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .admin-input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #f9fafb;
          padding: 11px 14px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
        }

        .admin-input:focus {
          border-color: #159a9c;
          background: white;
          box-shadow: 0 0 0 3px rgba(21, 154, 156, 0.10);
        }
      `}</style>
    </div>
  );
};

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState("");

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchJobs = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch(
        `/jobs/admin/all?page=${page}&limit=10`
      );

      setJobs(response.data || []);

      setPagination(
        response.pagination || {
          page,
          limit: 10,
          total: response.data?.length || 0,
          totalPages: 1,
        }
      );
    } catch (err) {
      setError(err.message || "Unable to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(1);
  }, []);

  const filteredJobs = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesStatus =
        statusFilter === "all" ||
        job.status === statusFilter;

      const matchesSearch =
        !searchValue ||
        job.title?.toLowerCase().includes(searchValue) ||
        job.department
          ?.toLowerCase()
          .includes(searchValue) ||
        job.location
          ?.toLowerCase()
          .includes(searchValue);

      return matchesStatus && matchesSearch;
    });
  }, [jobs, search, statusFilter]);

  const openCreateModal = () => {
    setEditingJob(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);

    setForm({
      title: job.title || "",
      department: job.department || "",
      location: job.location || "",
      employmentType:
        job.employmentType || "Full Time",
      experience: job.experience || "",
      salary: job.salary || "",
      openings: job.openings || 1,
      deadline: job.deadline
        ? new Date(job.deadline)
            .toISOString()
            .split("T")[0]
        : "",
      description: job.description || "",
      requirements: Array.isArray(job.requirements)
        ? job.requirements.join("\n")
        : job.requirements || "",
      responsibilities: Array.isArray(
        job.responsibilities
      )
        ? job.responsibilities.join("\n")
        : job.responsibilities || "",
      skills: Array.isArray(job.skills)
        ? job.skills.join(", ")
        : job.skills || "",
      status: job.status || "draft",
      featured: Boolean(job.featured),
    });

    setError("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingJob(null);
    setForm(emptyForm);
  };

  const prepareArray = (value) => {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const prepareSkills = (value) => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        title: form.title.trim(),
        department: form.department.trim(),
        location: form.location.trim(),
        employmentType: form.employmentType,
        experience: form.experience.trim(),
        salary: form.salary.trim(),
        openings: Number(form.openings),
        deadline: form.deadline || undefined,
        description: form.description.trim(),
        requirements: prepareArray(form.requirements),
        responsibilities: prepareArray(
          form.responsibilities
        ),
        skills: prepareSkills(form.skills),
        status: form.status,
        featured: form.featured,
      };

      if (editingJob?._id) {
        await apiFetch(`/jobs/admin/${editingJob._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch("/jobs/admin", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      closeModal();
      await fetchJobs(pagination.page);
    } catch (err) {
      setError(
        err.message ||
          `Unable to ${
            editingJob ? "update" : "create"
          } job.`
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteJob = async (job) => {
    if (!job?._id) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${job.title}"?`
    );

    if (!confirmed) return;

    try {
      setActionLoading(`delete-${job._id}`);
      setError("");

      await apiFetch(`/jobs/admin/${job._id}`, {
        method: "DELETE",
      });

      const shouldGoBack =
        jobs.length === 1 && pagination.page > 1;

      await fetchJobs(
        shouldGoBack
          ? pagination.page - 1
          : pagination.page
      );
    } catch (err) {
      setError(err.message || "Unable to delete job.");
    } finally {
      setActionLoading("");
    }
  };

  const toggleFeatured = async (job) => {
    if (!job?._id) return;

    try {
      setActionLoading(`featured-${job._id}`);
      setError("");

      await apiFetch(`/jobs/admin/${job._id}`, {
        method: "PUT",
        body: JSON.stringify({
          featured: !job.featured,
        }),
      });

      await fetchJobs(pagination.page);
    } catch (err) {
      setError(
        err.message || "Unable to update featured status."
      );
    } finally {
      setActionLoading("");
    }
  };

  const totalJobs = pagination.total || jobs.length;

  const openJobs = jobs.filter(
    (job) => job.status === "open"
  ).length;

  const draftJobs = jobs.filter(
    (job) => job.status === "draft"
  ).length;

  const closedJobs = jobs.filter(
    (job) => job.status === "closed"
  ).length;

  const statCards = [
    {
      title: "Total Jobs",
      value: totalJobs,
      icon: FaBriefcase,
      bg: "bg-teal-50",
      color: "text-teal-600",
    },
    {
      title: "Open",
      value: openJobs,
      icon: FaBriefcase,
      bg: "bg-emerald-50",
      color: "text-emerald-600",
    },
    {
      title: "Draft",
      value: draftJobs,
      icon: FaEdit,
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
    {
      title: "Closed",
      value: closedJobs,
      icon: FaTimes,
      bg: "bg-red-50",
      color: "text-red-600",
    },
  ];

  return (
    <div
      className="min-h-full bg-[#f7f9fa] font-[Poppins,sans-serif]"
      style={{ color: DARK }}
    >
      <div className="mx-auto w-full max-w-[1100px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p
              className="mb-1 text-sm font-medium"
              style={{ color: PRIMARY }}
            >
              Admin Control
            </p>

            <h1 className="text-2xl font-semibold sm:text-3xl">
              Jobs Management
            </h1>

            <p
              className="mt-1 text-sm"
              style={{ color: MUTED }}
            >
              Create, update and manage your job openings.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fetchJobs(pagination.page)}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:opacity-60"
            >
              <FaSyncAlt
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}
            >
              <FaPlus />
              Add Job
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-xs font-medium sm:text-sm"
                      style={{ color: MUTED }}
                    >
                      {card.title}
                    </p>

                    <p className="mt-1 text-xl font-semibold sm:text-2xl">
                      {card.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bg}`}
                  >
                    <Icon className={card.color} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search */}
        <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <FaSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-sm"
                style={{ color: MUTED }}
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, department or location..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#159a9c] focus:bg-white focus:ring-2 focus:ring-[#159a9c]/10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#159a9c] focus:bg-white"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="draft">Draft</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="font-medium hover:underline"
            >
              Close
            </button>
          </div>
        )}

        {/* Jobs */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="text-base font-semibold sm:text-lg">
              Job Openings
            </h2>

            <p
              className="mt-0.5 text-xs sm:text-sm"
              style={{ color: MUTED }}
            >
              Manage all jobs published by your company.
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <FaSpinner
                  className="animate-spin text-2xl"
                  style={{ color: PRIMARY }}
                />

                <p className="text-sm" style={{ color: MUTED }}>
                  Loading jobs...
                </p>
              </div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <FaBriefcase className="text-xl text-gray-400" />
              </div>

              <h3 className="font-semibold">
                No jobs found
              </h3>

              <p
                className="mt-1 max-w-sm text-sm"
                style={{ color: MUTED }}
              >
                Try changing your search or create a new
                job opening.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                      <th className="px-5 py-3 font-medium">
                        Job
                      </th>

                      <th className="px-5 py-3 font-medium">
                        Location
                      </th>

                      <th className="px-5 py-3 font-medium">
                        Type
                      </th>

                      <th className="px-5 py-3 font-medium">
                        Deadline
                      </th>

                      <th className="px-5 py-3 font-medium">
                        Status
                      </th>

                      <th className="px-5 py-3 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredJobs.map((job) => (
                      <tr
                        key={job._id}
                        className="transition hover:bg-gray-50/70"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-start gap-3">
                            <div
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                              style={{
                                backgroundColor: `${PRIMARY}12`,
                                color: PRIMARY,
                              }}
                            >
                              <FaBriefcase />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="max-w-[230px] truncate text-sm font-semibold">
                                  {job.title}
                                </p>

                                {job.featured && (
                                  <FaStar
                                    className="shrink-0 text-xs"
                                    style={{
                                      color: "#f59e0b",
                                    }}
                                  />
                                )}
                              </div>

                              <p
                                className="mt-0.5 text-xs"
                                style={{ color: MUTED }}
                              >
                                {job.department || "—"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-sm">
                            <FaMapMarkerAlt
                              className="text-xs"
                              style={{ color: PRIMARY }}
                            />

                            <span>
                              {job.location || "—"}
                            </span>
                          </div>
                        </td>

                        <td
                          className="px-5 py-4 text-sm"
                          style={{ color: MUTED }}
                        >
                          {job.employmentType || "—"}
                        </td>

                        <td className="px-5 py-4">
                          <div
                            className="flex items-center gap-1.5 text-sm"
                            style={{ color: MUTED }}
                          >
                            <FaCalendarAlt className="text-xs" />
                            {formatDate(job.deadline)}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
                              statusStyles[job.status] ||
                              "bg-gray-50 text-gray-600 border-gray-200"
                            }`}
                          >
                            {job.status || "Unknown"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              title={
                                job.featured
                                  ? "Remove featured"
                                  : "Make featured"
                              }
                              disabled={
                                actionLoading ===
                                `featured-${job._id}`
                              }
                              onClick={() =>
                                toggleFeatured(job)
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-amber-500 transition hover:bg-amber-50 disabled:opacity-50"
                            >
                              {actionLoading ===
                              `featured-${job._id}` ? (
                                <FaSpinner className="animate-spin text-xs" />
                              ) : job.featured ? (
                                <FaStar className="text-xs" />
                              ) : (
                                <FaRegStar className="text-xs" />
                              )}
                            </button>

                            <button
                              type="button"
                              title="Edit"
                              onClick={() =>
                                openEditModal(job)
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#159a9c] transition hover:bg-teal-50"
                            >
                              <FaEdit className="text-xs" />
                            </button>

                            <button
                              type="button"
                              title="Delete"
                              disabled={
                                actionLoading ===
                                `delete-${job._id}`
                              }
                              onClick={() =>
                                deleteJob(job)
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                            >
                              {actionLoading ===
                              `delete-${job._id}` ? (
                                <FaSpinner className="animate-spin text-xs" />
                              ) : (
                                <FaTrash className="text-xs" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="divide-y divide-gray-100 md:hidden">
                {filteredJobs.map((job) => (
                  <div key={job._id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${PRIMARY}12`,
                          color: PRIMARY,
                        }}
                      >
                        <FaBriefcase />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold">
                            {job.title}
                          </h3>

                          {job.featured && (
                            <FaStar
                              className="text-xs"
                              style={{ color: "#f59e0b" }}
                            />
                          )}
                        </div>

                        <p
                          className="mt-1 text-xs"
                          style={{ color: MUTED }}
                        >
                          {job.department || "—"}
                        </p>

                        <div
                          className="mt-2 flex flex-wrap gap-3 text-xs"
                          style={{ color: MUTED }}
                        >
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt
                              style={{ color: PRIMARY }}
                            />
                            {job.location || "—"}
                          </span>

                          <span className="flex items-center gap-1">
                            <FaCalendarAlt />
                            {formatDate(job.deadline)}
                          </span>
                        </div>

                        <div className="mt-3">
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
                              statusStyles[job.status] ||
                              "bg-gray-50 text-gray-600 border-gray-200"
                            }`}
                          >
                            {job.status || "Unknown"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2 border-t border-gray-100 pt-3">
                      <button
                        type="button"
                        onClick={() =>
                          toggleFeatured(job)
                        }
                        disabled={
                          actionLoading ===
                          `featured-${job._id}`
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700 disabled:opacity-50"
                      >
                        {actionLoading ===
                        `featured-${job._id}` ? (
                          <FaSpinner className="animate-spin" />
                        ) : job.featured ? (
                          <FaStar />
                        ) : (
                          <FaRegStar />
                        )}

                        {job.featured
                          ? "Featured"
                          : "Feature"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(job)
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-teal-50 px-3 py-2 text-xs font-medium text-teal-700"
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteJob(job)}
                        disabled={
                          actionLoading ===
                          `delete-${job._id}`
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700 disabled:opacity-50"
                      >
                        {actionLoading ===
                        `delete-${job._id}` ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaTrash />
                        )}

                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {!loading && pagination.totalPages > 1 && (
            <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p
                className="text-xs sm:text-sm"
                style={{ color: MUTED }}
              >
                Page {pagination.page} of{" "}
                {pagination.totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={
                    pagination.page <= 1 || loading
                  }
                  onClick={() =>
                    fetchJobs(pagination.page - 1)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaChevronLeft />
                </button>

                <button
                  type="button"
                  disabled={
                    pagination.page >=
                      pagination.totalPages || loading
                  }
                  onClick={() =>
                    fetchJobs(pagination.page + 1)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <JobForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onClose={closeModal}
          saving={saving}
          editing={Boolean(editingJob)}
        />
      )}
    </div>
  );
};

export default AdminJobs;