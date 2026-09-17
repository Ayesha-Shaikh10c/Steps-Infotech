import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  X,
  Star,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { apiFetch } from "../../lib/api";

const PAGE_LIMIT = 10;

const EMPTY_FORM = {
  clientName: "",
  designation: "",
  company: "",
  profileImage: "",
  rating: 5,
  message: "",
  status: "draft",
  isFeatured: false,
  displayOrder: 0,
};

const ManageTestimonials = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGE_LIMIT,
    total: 0,
    totalPages: 1,
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modal, setModal] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const redirectIfUnauthorized = (err) => {
    if (err?.status === 401 || err?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
      return true;
    }

    return false;
  };

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch(
        `/testimonials/admin/all?page=${page}&limit=${PAGE_LIMIT}`
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to load testimonials."
        );
      }

      setTestimonials(response.testimonials || []);

      setPagination(
        response.pagination || {
          page,
          limit: PAGE_LIMIT,
          total: response.count || 0,
          totalPages: 1,
        }
      );
    } catch (err) {
      console.error("Testimonials fetch error:", err);

      if (redirectIfUnauthorized(err)) return;

      setError(err?.message || "Unable to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [page]);

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  const filteredTestimonials = useMemo(() => {
    const query = search.trim().toLowerCase();

    return testimonials.filter((testimonial) => {
      const matchesSearch =
        !query ||
        testimonial.clientName?.toLowerCase().includes(query) ||
        testimonial.designation?.toLowerCase().includes(query) ||
        testimonial.company?.toLowerCase().includes(query) ||
        testimonial.message?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        testimonial.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [testimonials, search, statusFilter]);

  const openCreateModal = () => {
    setForm(EMPTY_FORM);
    setSelectedTestimonial(null);
    setModal("create");
    setError("");
  };

  const openEditModal = (testimonial) => {
    setSelectedTestimonial(testimonial);

    setForm({
      clientName: testimonial.clientName || "",
      designation: testimonial.designation || "",
      company: testimonial.company || "",
      profileImage: testimonial.profileImage || "",
      rating: testimonial.rating ?? 5,
      message: testimonial.message || "",
      status: testimonial.status || "draft",
      isFeatured: Boolean(testimonial.isFeatured),
      displayOrder: testimonial.displayOrder ?? 0,
    });

    setModal("edit");
    setError("");
  };

  const openViewModal = async (testimonial) => {
    try {
      setError("");

      const response = await apiFetch(
        `/testimonials/admin/${testimonial._id}`
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to load testimonial."
        );
      }

      setSelectedTestimonial(response.testimonial);
      setModal("view");
    } catch (err) {
      console.error("Testimonial details error:", err);

      if (redirectIfUnauthorized(err)) return;

      setError(err?.message || "Unable to load testimonial details.");
    }
  };

  const closeModal = () => {
    if (saving) return;

    setModal(null);
    setSelectedTestimonial(null);
    setForm(EMPTY_FORM);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!form.clientName.trim()) {
      return "Client name is required.";
    }

    if (form.clientName.trim().length > 100) {
      return "Client name cannot exceed 100 characters.";
    }

    if (!form.designation.trim()) {
      return "Designation is required.";
    }

    if (form.designation.trim().length > 100) {
      return "Designation cannot exceed 100 characters.";
    }

    if (!form.company.trim()) {
      return "Company is required.";
    }

    if (form.company.trim().length > 150) {
      return "Company cannot exceed 150 characters.";
    }

    if (!form.message.trim()) {
      return "Testimonial message is required.";
    }

    if (form.message.trim().length > 1000) {
      return "Message cannot exceed 1000 characters.";
    }

    const rating = Number(form.rating);

    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return "Rating must be between 1 and 5.";
    }

    const displayOrder = Number(form.displayOrder);

    if (
      !Number.isInteger(displayOrder) ||
      displayOrder < 0
    ) {
      return "Display order must be a non-negative integer.";
    }

    if (form.profileImage.trim().length > 500) {
      return "Profile image URL cannot exceed 500 characters.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        clientName: form.clientName.trim(),
        designation: form.designation.trim(),
        company: form.company.trim(),
        profileImage: form.profileImage.trim(),
        rating: Number(form.rating),
        message: form.message.trim(),
        status: form.status,
        isFeatured: Boolean(form.isFeatured),
        displayOrder: Number(form.displayOrder),
      };

      let response;

      if (modal === "edit" && selectedTestimonial?._id) {
        response = await apiFetch(
          `/testimonials/admin/${selectedTestimonial._id}`,
          {
            method: "PUT",
            body: JSON.stringify(payload),
          }
        );
      } else {
        response = await apiFetch("/testimonials/admin", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to save testimonial."
        );
      }

      setSuccess(
        modal === "edit"
          ? "Testimonial updated successfully."
          : "Testimonial created successfully."
      );

      closeModal();
      await fetchTestimonials();
    } catch (err) {
      console.error("Save testimonial error:", err);

      if (redirectIfUnauthorized(err)) return;

      setError(err?.message || "Unable to save testimonial.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (testimonial) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the testimonial from "${testimonial.clientName}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(testimonial._id);
      setError("");
      setSuccess("");

      const response = await apiFetch(
        `/testimonials/admin/${testimonial._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to delete testimonial."
        );
      }

      setSuccess("Testimonial deleted successfully.");

      if (
        testimonials.length === 1 &&
        page > 1
      ) {
        setPage((current) => current - 1);
      } else {
        await fetchTestimonials();
      }
    } catch (err) {
      console.error("Delete testimonial error:", err);

      if (redirectIfUnauthorized(err)) return;

      setError(err?.message || "Unable to delete testimonial.");
    } finally {
      setDeletingId(null);
    }
  };

  const renderStars = (rating = 0) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={15}
            className={
              star <= rating
                ? "fill-[#159a9c] text-[#159a9c]"
                : "text-[#d8dde4]"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-[#f7fafa]"
      style={{ fontFamily: "Poppins, sans-serif" }}
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

            {/* Page Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-[24px] font-semibold text-[#171b2b]">
                  Manage Testimonials
                </h1>

                <p className="mt-1 text-[13px] text-[#707686]">
                  Create, update and manage client testimonials.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fetchTestimonials}
                  disabled={loading}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe5e8] bg-white px-4 text-[13px] font-medium text-[#171b2b] transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RefreshCw
                    size={16}
                    className={loading ? "animate-spin" : ""}
                  />
                  Refresh
                </button>

                <button
                  type="button"
                  onClick={openCreateModal}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#159a9c] px-4 text-[13px] font-medium text-white transition hover:bg-[#118789]"
                >
                  <Plus size={17} />
                  Add Testimonial
                </button>
              </div>
            </div>

            {/* Alerts */}
            {error && !modal && (
              <div className="mb-5 flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
                <span>{error}</span>

                <button
                  type="button"
                  onClick={() => setError("")}
                  className="shrink-0"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {success && (
              <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-600">
                {success}
              </div>
            )}

            {/* Filters */}
            <div className="mb-5 rounded-xl border border-[#e7ecee] bg-white p-4 shadow-[0_4px_20px_rgba(23,27,43,0.03)]">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-[380px]">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa1ad]"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search testimonials..."
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] bg-white pl-10 pr-3 text-[13px] text-[#171b2b] outline-none transition focus:border-[#159a9c]"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="h-10 rounded-lg border border-[#dfe5e8] bg-white px-3 text-[13px] text-[#171b2b] outline-none focus:border-[#159a9c]"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-[#e7ecee] bg-white shadow-[0_4px_20px_rgba(23,27,43,0.03)]">
              {loading ? (
                <div className="flex min-h-[300px] items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#159a9c] border-t-transparent" />
                    <p className="text-[13px] text-[#707686]">
                      Loading testimonials...
                    </p>
                  </div>
                </div>
              ) : filteredTestimonials.length === 0 ? (
                <div className="flex min-h-[300px] items-center justify-center px-5 text-center">
                  <div>
                    <p className="text-[15px] font-medium text-[#171b2b]">
                      No testimonials found
                    </p>

                    <p className="mt-1 text-[13px] text-[#707686]">
                      Try changing your search/filter or add a new testimonial.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-[900px] w-full">
                      <thead>
                        <tr className="border-b border-[#edf0f2] bg-[#fafcfc]">
                          <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#707686]">
                            Client
                          </th>

                          <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#707686]">
                            Company
                          </th>

                          <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#707686]">
                            Rating
                          </th>

                          <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#707686]">
                            Status
                          </th>

                          <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#707686]">
                            Featured
                          </th>

                          <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-[#707686]">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredTestimonials.map((testimonial) => (
                          <tr
                            key={testimonial._id}
                            className="border-b border-[#edf0f2] last:border-b-0 hover:bg-[#fbfdfd]"
                          >
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                {testimonial.profileImage ? (
                                  <img
                                    src={testimonial.profileImage}
                                    alt={testimonial.clientName}
                                    className="h-10 w-10 rounded-full border border-[#e5eaec] object-cover"
                                    onError={(e) => {
                                      e.currentTarget.style.display =
                                        "none";
                                    }}
                                  />
                                ) : (
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f7f7] text-[13px] font-semibold text-[#159a9c]">
                                    {testimonial.clientName
                                      ?.charAt(0)
                                      ?.toUpperCase() || "C"}
                                  </div>
                                )}

                                <div className="min-w-0">
                                  <p className="truncate text-[13px] font-semibold text-[#171b2b]">
                                    {testimonial.clientName}
                                  </p>

                                  <p className="truncate text-[11px] text-[#707686]">
                                    {testimonial.designation}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-5 py-4 text-[13px] text-[#171b2b]">
                              {testimonial.company}
                            </td>

                            <td className="px-5 py-4">
                              {renderStars(testimonial.rating)}
                            </td>

                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                                  testimonial.status === "published"
                                    ? "bg-green-50 text-green-600"
                                    : "bg-amber-50 text-amber-600"
                                }`}
                              >
                                {testimonial.status}
                              </span>
                            </td>

                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                                  testimonial.isFeatured
                                    ? "bg-[#e8f7f7] text-[#159a9c]"
                                    : "bg-gray-100 text-[#707686]"
                                }`}
                              >
                                {testimonial.isFeatured
                                  ? "Yes"
                                  : "No"}
                              </span>
                            </td>

                            <td className="px-5 py-4">
                              <div className="flex justify-end gap-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    openViewModal(testimonial)
                                  }
                                  className="rounded-lg p-2 text-[#707686] transition hover:bg-[#e8f7f7] hover:text-[#159a9c]"
                                  title="View"
                                >
                                  <Eye size={16} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    openEditModal(testimonial)
                                  }
                                  className="rounded-lg p-2 text-[#707686] transition hover:bg-[#e8f7f7] hover:text-[#159a9c]"
                                  title="Edit"
                                >
                                  <Pencil size={16} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(testimonial)
                                  }
                                  disabled={
                                    deletingId === testimonial._id
                                  }
                                  className="rounded-lg p-2 text-[#707686] transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                                  title="Delete"
                                >
                                  {deletingId === testimonial._id ? (
                                    <RefreshCw
                                      size={16}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <Trash2 size={16} />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex flex-col gap-3 border-t border-[#edf0f2] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[12px] text-[#707686]">
                      Showing page{" "}
                      <span className="font-medium text-[#171b2b]">
                        {pagination.page || page}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-[#171b2b]">
                        {pagination.totalPages || 1}
                      </span>{" "}
                      · {pagination.total || 0} total
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={page <= 1}
                        onClick={() =>
                          setPage((current) =>
                            Math.max(1, current - 1)
                          )
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#dfe5e8] bg-white text-[#707686] transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      <span className="min-w-[70px] text-center text-[12px] text-[#707686]">
                        {page} / {pagination.totalPages || 1}
                      </span>

                      <button
                        type="button"
                        disabled={
                          page >= (pagination.totalPages || 1)
                        }
                        onClick={() =>
                          setPage((current) =>
                            Math.min(
                              pagination.totalPages || 1,
                              current + 1
                            )
                          )
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#dfe5e8] bg-white text-[#707686] transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Create / Edit Modal */}
      {(modal === "create" || modal === "edit") && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[92vh] w-full max-w-[720px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf0f2] px-5 py-4">
              <div>
                <h2 className="text-[17px] font-semibold text-[#171b2b]">
                  {modal === "edit"
                    ? "Edit Testimonial"
                    : "Add Testimonial"}
                </h2>

                <p className="mt-0.5 text-[11px] text-[#707686]">
                  Fill in the testimonial details below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-[#707686] hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="max-h-[calc(92vh-75px)] overflow-y-auto px-5 py-5"
            >
              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-600">
                  {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Client Name *
                  </label>

                  <input
                    name="clientName"
                    value={form.clientName}
                    onChange={handleChange}
                    maxLength={100}
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                    placeholder="Client name"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Designation *
                  </label>

                  <input
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    maxLength={100}
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                    placeholder="e.g. CEO"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Company *
                  </label>

                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    maxLength={150}
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Profile Image URL
                  </label>

                  <input
                    name="profileImage"
                    value={form.profileImage}
                    onChange={handleChange}
                    maxLength={500}
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Rating *
                  </label>

                  <select
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  >
                    <option value={1}>1 Star</option>
                    <option value={2}>2 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Display Order
                  </label>

                  <input
                    type="number"
                    name="displayOrder"
                    min="0"
                    step="1"
                    value={form.displayOrder}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                <div className="flex items-end">
                  <label className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-[#dfe5e8] px-3">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={form.isFeatured}
                      onChange={handleChange}
                      className="h-4 w-4 accent-[#159a9c]"
                    />

                    <span className="text-[12px] font-medium text-[#171b2b]">
                      Featured testimonial
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                  Message *
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  maxLength={1000}
                  rows={6}
                  className="w-full resize-none rounded-lg border border-[#dfe5e8] px-3 py-3 text-[13px] outline-none focus:border-[#159a9c]"
                  placeholder="Write the client testimonial..."
                />

                <div className="mt-1 text-right text-[10px] text-[#9aa1ad]">
                  {form.message.length}/1000
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2 border-t border-[#edf0f2] pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="h-10 rounded-lg border border-[#dfe5e8] px-4 text-[13px] font-medium text-[#707686] hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#159a9c] px-5 text-[13px] font-medium text-white hover:bg-[#118789] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <RefreshCw
                      size={15}
                      className="animate-spin"
                    />
                  )}

                  {saving
                    ? "Saving..."
                    : modal === "edit"
                    ? "Update Testimonial"
                    : "Create Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {modal === "view" && selectedTestimonial && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-[620px] overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf0f2] px-5 py-4">
              <div>
                <h2 className="text-[17px] font-semibold text-[#171b2b]">
                  Testimonial Details
                </h2>
                <p className="text-[11px] text-[#707686]">
                  View testimonial information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-[#707686] hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex items-center gap-4">
                {selectedTestimonial.profileImage ? (
                  <img
                    src={selectedTestimonial.profileImage}
                    alt={selectedTestimonial.clientName}
                    className="h-16 w-16 rounded-full border border-[#e5eaec] object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f7f7] text-xl font-semibold text-[#159a9c]">
                    {selectedTestimonial.clientName
                      ?.charAt(0)
                      ?.toUpperCase() || "C"}
                  </div>
                )}

                <div>
                  <h3 className="text-[17px] font-semibold text-[#171b2b]">
                    {selectedTestimonial.clientName}
                  </h3>

                  <p className="text-[12px] text-[#707686]">
                    {selectedTestimonial.designation}
                  </p>

                  <p className="text-[12px] text-[#707686]">
                    {selectedTestimonial.company}
                  </p>

                  <div className="mt-1">
                    {renderStars(selectedTestimonial.rating)}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-[#f7fafa] p-4">
                <p className="whitespace-pre-wrap text-[13px] leading-6 text-[#171b2b]">
                  “{selectedTestimonial.message}”
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-[#edf0f2] p-3">
                  <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                    Status
                  </p>

                  <p className="mt-1 text-[12px] font-medium text-[#171b2b]">
                    {selectedTestimonial.status}
                  </p>
                </div>

                <div className="rounded-lg border border-[#edf0f2] p-3">
                  <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                    Featured
                  </p>

                  <p className="mt-1 text-[12px] font-medium text-[#171b2b]">
                    {selectedTestimonial.isFeatured
                      ? "Yes"
                      : "No"}
                  </p>
                </div>

                <div className="rounded-lg border border-[#edf0f2] p-3">
                  <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                    Display Order
                  </p>

                  <p className="mt-1 text-[12px] font-medium text-[#171b2b]">
                    {selectedTestimonial.displayOrder ?? 0}
                  </p>
                </div>
              </div>

              {selectedTestimonial.createdBy && (
                <div className="border-t border-[#edf0f2] pt-4">
                  <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                    Created By
                  </p>

                  <p className="mt-1 text-[12px] text-[#171b2b]">
                    {selectedTestimonial.createdBy.fullName ||
                      "Admin"}
                  </p>

                  {selectedTestimonial.createdBy.email && (
                    <p className="text-[11px] text-[#707686]">
                      {selectedTestimonial.createdBy.email}
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-end border-t border-[#edf0f2] pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-10 rounded-lg border border-[#dfe5e8] px-5 text-[13px] font-medium text-[#707686] hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTestimonials;