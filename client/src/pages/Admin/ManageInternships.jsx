import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { apiFetch } from "../../lib/api";

const INITIAL_FORM = {
  title: "",
  department: "",
  location: "",
  internshipType: "Full Time",
  duration: "",
  stipend: "Unpaid",
  description: "",
  responsibilities: [],
  requirements: [],
  skills: [],
  openings: 1,
  applicationDeadline: "",
  status: "draft",
  isFeatured: false,
};

const INTERNSHIP_TYPES = [
  "Full Time",
  "Part Time",
  "Remote",
  "Hybrid",
];

const STATUSES = ["draft", "open", "closed"];

const ManageInternships = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState(null);

  const [form, setForm] = useState(INITIAL_FORM);

  const [responsibilityInput, setResponsibilityInput] = useState("");
  const [requirementInput, setRequirementInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUnauthorized = (err) => {
    if (err?.status === 401 || err?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return true;
    }

    return false;
  };

  const fetchInternships = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch(
        `/internships/admin/all?page=${page}&limit=10`
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to fetch internships."
        );
      }

      setInternships(response.data || []);

      setPagination(
        response.pagination || {
          page,
          limit: 10,
          total: 0,
          totalPages: 1,
        }
      );
    } catch (err) {
      console.error("Manage internships error:", err);

      if (handleUnauthorized(err)) return;

      setError(
        err?.message || "Unable to load internship data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  const filteredInternships = internships.filter((internship) => {
    const searchValue = search.trim().toLowerCase();

    const matchesSearch =
      !searchValue ||
      internship.title?.toLowerCase().includes(searchValue) ||
      internship.department?.toLowerCase().includes(searchValue) ||
      internship.location?.toLowerCase().includes(searchValue) ||
      internship.internshipType?.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "all" ||
      internship.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openCreateModal = () => {
    setEditingInternship(null);
    setForm(INITIAL_FORM);
    setResponsibilityInput("");
    setRequirementInput("");
    setSkillInput("");
    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const openEditModal = (internship) => {
    setEditingInternship(internship);

    setForm({
      title: internship.title || "",
      department: internship.department || "",
      location: internship.location || "",
      internshipType:
        internship.internshipType || "Full Time",
      duration: internship.duration || "",
      stipend: internship.stipend || "Unpaid",
      description: internship.description || "",
      responsibilities:
        internship.responsibilities || [],
      requirements:
        internship.requirements || [],
      skills: internship.skills || [],
      openings: internship.openings || 1,
      applicationDeadline: internship.applicationDeadline
        ? formatDateTimeLocal(internship.applicationDeadline)
        : "",
      status: internship.status || "draft",
      isFeatured: Boolean(internship.isFeatured),
    });

    setResponsibilityInput("");
    setRequirementInput("");
    setSkillInput("");
    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingInternship(null);
    setForm(INITIAL_FORM);
    setResponsibilityInput("");
    setRequirementInput("");
    setSkillInput("");
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addArrayItem = (field, value, setter) => {
    const cleanValue = value.trim();

    if (!cleanValue) return;

    if (form[field].includes(cleanValue)) {
      setter("");
      return;
    }

    setForm((previous) => ({
      ...previous,
      [field]: [...previous[field], cleanValue],
    }));

    setter("");
  };

  const removeArrayItem = (field, index) => {
    setForm((previous) => ({
      ...previous,
      [field]: previous[field].filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }));
  };

  const handleArrayKeyDown = (
    event,
    field,
    value,
    setter
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addArrayItem(field, value, setter);
    }
  };

  const validateForm = () => {
    if (!form.title.trim()) {
      return "Title is required.";
    }

    if (!form.department.trim()) {
      return "Department is required.";
    }

    if (!form.location.trim()) {
      return "Location is required.";
    }

    if (!form.duration.trim()) {
      return "Duration is required.";
    }

    if (!form.description.trim()) {
      return "Description is required.";
    }

    if (!form.applicationDeadline) {
      return "Application deadline is required.";
    }

    const openings = Number(form.openings);

    if (
      !Number.isInteger(openings) ||
      openings < 1 ||
      openings > 10000
    ) {
      return "Openings must be a whole number between 1 and 10000.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        title: form.title.trim(),
        department: form.department.trim(),
        location: form.location.trim(),
        internshipType: form.internshipType,
        duration: form.duration.trim(),
        stipend: form.stipend.trim(),
        description: form.description.trim(),
        responsibilities: form.responsibilities,
        requirements: form.requirements,
        skills: form.skills,
        openings: Number(form.openings),
        applicationDeadline: new Date(
          form.applicationDeadline
        ).toISOString(),
        status: form.status,
        isFeatured: Boolean(form.isFeatured),
      };

      let response;

      if (editingInternship?._id) {
        response = await apiFetch(
          `/internships/admin/${editingInternship._id}`,
          {
            method: "PUT",
            body: JSON.stringify(payload),
          }
        );
      } else {
        response = await apiFetch("/internships/admin", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Unable to save internship."
        );
      }

      setSuccess(
        editingInternship
          ? "Internship updated successfully."
          : "Internship created successfully."
      );

      setModalOpen(false);
      setEditingInternship(null);
      setForm(INITIAL_FORM);

      await fetchInternships();
    } catch (err) {
      console.error("Save internship error:", err);

      if (handleUnauthorized(err)) return;

      setError(
        err?.message || "Unable to save internship."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (internship) => {
    const confirmed = window.confirm(
      `Delete "${internship.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(internship._id);
      setError("");
      setSuccess("");

      const response = await apiFetch(
        `/internships/admin/${internship._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Unable to delete internship."
        );
      }

      setSuccess("Internship deleted successfully.");

      if (
        internships.length === 1 &&
        page > 1
      ) {
        setPage((previous) => previous - 1);
      } else {
        await fetchInternships();
      }
    } catch (err) {
      console.error("Delete internship error:", err);

      if (handleUnauthorized(err)) return;

      setError(
        err?.message || "Unable to delete internship."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusClasses = (status) => {
    if (status === "open") {
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }

    if (status === "closed") {
      return "bg-red-50 text-red-700 border-red-100";
    }

    return "bg-amber-50 text-amber-700 border-amber-100";
  };

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTimeLocal = (date) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    const offset = parsedDate.getTimezoneOffset();
    const localDate = new Date(
      parsedDate.getTime() - offset * 60000
    );

    return localDate
      .toISOString()
      .slice(0, 16);
  };

  const renderArrayInput = (
    label,
    field,
    value,
    setter,
    placeholder
  ) => (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#171b2b]">
        {label}
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(event) =>
            setter(event.target.value)
          }
          onKeyDown={(event) =>
            handleArrayKeyDown(
              event,
              field,
              value,
              setter
            )
          }
          placeholder={placeholder}
          className="min-w-0 flex-1 rounded-xl border border-[#e3e8eb] bg-white px-4 py-3 text-sm text-[#171b2b] outline-none transition focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
        />

        <button
          type="button"
          onClick={() =>
            addArrayItem(field, value, setter)
          }
          className="rounded-xl bg-[#159a9c] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#128587]"
        >
          Add
        </button>
      </div>

      {form[field].length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {form[field].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#eefafa] px-3 py-1.5 text-xs font-medium text-[#159a9c]"
            >
              {item}

              <button
                type="button"
                onClick={() =>
                  removeArrayItem(field, index)
                }
                className="font-bold text-[#159a9c] hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className="min-h-screen bg-[#f7fafa]"
      style={{
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-[260px]">
        <AdminHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            {/* Page Heading */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#171b2b]">
                  Manage Internships
                </h1>

                <p className="mt-1 text-sm text-[#707686]">
                  Create, update and manage internship
                  opportunities.
                </p>
              </div>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#159a9c] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#128587]"
              >
                <span className="text-lg leading-none">
                  +
                </span>
                Add Internship
              </button>
            </div>

            {/* Messages */}
            {error && (
              <div className="mb-4 flex items-start justify-between gap-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                <span>{error}</span>

                <button
                  type="button"
                  onClick={() => setError("")}
                  className="font-bold"
                >
                  ×
                </button>
              </div>
            )}

            {success && (
              <div className="mb-4 flex items-start justify-between gap-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                <span>{success}</span>

                <button
                  type="button"
                  onClick={() => setSuccess("")}
                  className="font-bold"
                >
                  ×
                </button>
              </div>
            )}

            {/* Filters */}
            <div className="mb-5 rounded-2xl border border-[#e7eded] bg-white p-4 shadow-sm">
              <div className="grid gap-3 md:grid-cols-[1fr_200px]">
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search by title, department or location..."
                    className="w-full rounded-xl border border-[#e3e8eb] bg-[#fbfdfd] px-4 py-3 pl-10 text-sm text-[#171b2b] outline-none transition focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                  />

                  <svg
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a929e]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                    />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="rounded-xl border border-[#e3e8eb] bg-[#fbfdfd] px-4 py-3 text-sm text-[#171b2b] outline-none focus:border-[#159a9c]"
                >
                  <option value="all">
                    All Statuses
                  </option>

                  {STATUSES.map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status.charAt(0).toUpperCase() +
                        status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-[#e7eded] bg-white shadow-sm">
              {loading ? (
                <div className="flex min-h-[300px] items-center justify-center">
                  <div className="text-sm font-medium text-[#707686]">
                    Loading internships...
                  </div>
                </div>
              ) : filteredInternships.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#eefafa] text-xl text-[#159a9c]">
                    +
                  </div>

                  <h3 className="text-base font-semibold text-[#171b2b]">
                    No internships found
                  </h3>

                  <p className="mt-1 max-w-md text-sm text-[#707686]">
                    {search || statusFilter !== "all"
                      ? "Try changing your search or filter."
                      : "Create your first internship opportunity to get started."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-[1000px] w-full">
                      <thead className="border-b border-[#e7eded] bg-[#fbfdfd]">
                        <tr>
                          <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                            Internship
                          </th>

                          <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                            Department
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

                      <tbody className="divide-y divide-[#eef1f2]">
                        {filteredInternships.map(
                          (internship) => (
                            <tr
                              key={internship._id}
                              className="transition hover:bg-[#fbfdfd]"
                            >
                              <td className="px-5 py-4">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="max-w-[240px] truncate text-sm font-semibold text-[#171b2b]">
                                      {internship.title}
                                    </p>

                                    {internship.isFeatured && (
                                      <span className="rounded-full bg-[#eefafa] px-2 py-0.5 text-[10px] font-semibold text-[#159a9c]">
                                        Featured
                                      </span>
                                    )}
                                  </div>

                                  <p className="mt-1 text-xs text-[#707686]">
                                    {internship.location ||
                                      "—"}
                                  </p>
                                </div>
                              </td>

                              <td className="px-5 py-4 text-sm text-[#4f5663]">
                                {internship.department ||
                                  "—"}
                              </td>

                              <td className="px-5 py-4 text-sm text-[#4f5663]">
                                {internship.internshipType ||
                                  "—"}
                              </td>

                              <td className="px-5 py-4 text-sm font-medium text-[#171b2b]">
                                {internship.openings ||
                                  "—"}
                              </td>

                              <td className="px-5 py-4 text-sm text-[#4f5663]">
                                {formatDate(
                                  internship.applicationDeadline
                                )}
                              </td>

                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                                    internship.status
                                  )}`}
                                >
                                  {internship.status}
                                </span>
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openEditModal(
                                        internship
                                      )
                                    }
                                    className="rounded-lg border border-[#dce3e5] px-3 py-2 text-xs font-semibold text-[#171b2b] transition hover:border-[#159a9c] hover:text-[#159a9c]"
                                  >
                                    Edit
                                  </button>

                                  <button
                                    type="button"
                                    disabled={
                                      deletingId ===
                                      internship._id
                                    }
                                    onClick={() =>
                                      handleDelete(
                                        internship
                                      )
                                    }
                                    className="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    {deletingId ===
                                    internship._id
                                      ? "Deleting..."
                                      : "Delete"}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex flex-col gap-3 border-t border-[#e7eded] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-[#707686]">
                      Page{" "}
                      <span className="font-semibold text-[#171b2b]">
                        {pagination.page || page}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-[#171b2b]">
                        {pagination.totalPages || 1}
                      </span>
                      {" • "}
                      {pagination.total || 0} internships
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={
                          page <= 1 || loading
                        }
                        onClick={() =>
                          setPage(
                            (previous) =>
                              Math.max(
                                previous - 1,
                                1
                              )
                          )
                        }
                        className="rounded-lg border border-[#dce3e5] px-4 py-2 text-sm font-semibold text-[#171b2b] transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        disabled={
                          page >=
                            (pagination.totalPages ||
                              1) ||
                          loading
                        }
                        onClick={() =>
                          setPage(
                            (previous) =>
                              previous + 1
                          )
                        }
                        className="rounded-lg bg-[#159a9c] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#128587] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171b2b]/50 p-4">
          <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#e7eded] px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-[#171b2b]">
                  {editingInternship
                    ? "Edit Internship"
                    : "Add Internship"}
                </h2>

                <p className="mt-0.5 text-xs text-[#707686]">
                  Fill in the internship details below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4f7f7] text-lg text-[#707686] transition hover:bg-[#eefafa] hover:text-[#159a9c] disabled:opacity-50"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto"
            >
              <div className="space-y-6 p-5 sm:p-6">
                {/* Basic Details */}
                <section>
                  <h3 className="mb-4 text-sm font-bold text-[#171b2b]">
                    Basic Details
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#171b2b]">
                        Title *
                      </label>

                      <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        maxLength={200}
                        placeholder="e.g. Frontend Development Intern"
                        className="w-full rounded-xl border border-[#e3e8eb] px-4 py-3 text-sm text-[#171b2b] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#171b2b]">
                        Department *
                      </label>

                      <input
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        maxLength={150}
                        placeholder="e.g. Technology"
                        className="w-full rounded-xl border border-[#e3e8eb] px-4 py-3 text-sm text-[#171b2b] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#171b2b]">
                        Location *
                      </label>

                      <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        maxLength={150}
                        placeholder="e.g. Pune / Remote"
                        className="w-full rounded-xl border border-[#e3e8eb] px-4 py-3 text-sm text-[#171b2b] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#171b2b]">
                        Internship Type
                      </label>

                      <select
                        name="internshipType"
                        value={form.internshipType}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-[#e3e8eb] px-4 py-3 text-sm text-[#171b2b] outline-none focus:border-[#159a9c]"
                      >
                        {INTERNSHIP_TYPES.map(
                          (type) => (
                            <option
                              key={type}
                              value={type}
                            >
                              {type}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#171b2b]">
                        Duration *
                      </label>

                      <input
                        name="duration"
                        value={form.duration}
                        onChange={handleChange}
                        maxLength={100}
                        placeholder="e.g. 3 Months"
                        className="w-full rounded-xl border border-[#e3e8eb] px-4 py-3 text-sm text-[#171b2b] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#171b2b]">
                        Stipend
                      </label>

                      <input
                        name="stipend"
                        value={form.stipend}
                        onChange={handleChange}
                        maxLength={100}
                        placeholder="e.g. ₹10,000 / month"
                        className="w-full rounded-xl border border-[#e3e8eb] px-4 py-3 text-sm text-[#171b2b] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#171b2b]">
                        Openings *
                      </label>

                      <input
                        type="number"
                        name="openings"
                        value={form.openings}
                        onChange={handleChange}
                        min="1"
                        max="10000"
                        className="w-full rounded-xl border border-[#e3e8eb] px-4 py-3 text-sm text-[#171b2b] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#171b2b]">
                        Application Deadline *
                      </label>

                      <input
                        type="datetime-local"
                        name="applicationDeadline"
                        value={
                          form.applicationDeadline
                        }
                        onChange={handleChange}
                        className="w-full rounded-xl border border-[#e3e8eb] px-4 py-3 text-sm text-[#171b2b] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                      />
                    </div>
                  </div>
                </section>

                {/* Status */}
                <section>
                  <h3 className="mb-4 text-sm font-bold text-[#171b2b]">
                    Publishing
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#171b2b]">
                        Status
                      </label>

                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-[#e3e8eb] px-4 py-3 text-sm text-[#171b2b] outline-none focus:border-[#159a9c]"
                      >
                        {STATUSES.map(
                          (status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status
                                .charAt(0)
                                .toUpperCase() +
                                status.slice(1)}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e3e8eb] px-4 py-3">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={form.isFeatured}
                        onChange={handleChange}
                        className="h-4 w-4 accent-[#159a9c]"
                      />

                      <div>
                        <p className="text-sm font-semibold text-[#171b2b]">
                          Featured Internship
                        </p>

                        <p className="text-xs text-[#707686]">
                          Highlight this internship on
                          the public page.
                        </p>
                      </div>
                    </label>
                  </div>
                </section>

                {/* Description */}
                <section>
                  <label className="mb-2 block text-sm font-semibold text-[#171b2b]">
                    Description *
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    maxLength={10000}
                    placeholder="Write a detailed internship description..."
                    className="w-full resize-none rounded-xl border border-[#e3e8eb] px-4 py-3 text-sm text-[#171b2b] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                  />

                  <p className="mt-1 text-right text-xs text-[#8a929e]">
                    {form.description.length}/10000
                  </p>
                </section>

                {/* Arrays */}
                <section className="space-y-5">
                  {renderArrayInput(
                    "Responsibilities",
                    "responsibilities",
                    responsibilityInput,
                    setResponsibilityInput,
                    "Add a responsibility and press Enter"
                  )}

                  {renderArrayInput(
                    "Requirements",
                    "requirements",
                    requirementInput,
                    setRequirementInput,
                    "Add a requirement and press Enter"
                  )}

                  {renderArrayInput(
                    "Skills",
                    "skills",
                    skillInput,
                    setSkillInput,
                    "Add a skill and press Enter"
                  )}
                </section>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#e7eded] bg-[#fbfdfd] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-[#dce3e5] px-5 py-3 text-sm font-semibold text-[#171b2b] transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#159a9c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#128587] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingInternship
                    ? "Update Internship"
                    : "Create Internship"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageInternships;