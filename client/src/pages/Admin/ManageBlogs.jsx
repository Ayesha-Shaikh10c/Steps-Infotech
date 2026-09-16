import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Star,
  Calendar,
  Tag,
  FileText,
  AlertCircle,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { apiFetch } from "../../lib/api";

const EMPTY_FORM = {
  title: "",
  excerpt: "",
  content: "",
  category: "",
  featuredImage: "",
  tags: [],
  status: "draft",
  publishedAt: "",
  isFeatured: false,
};

const STATUS_OPTIONS = ["all", "draft", "published"];

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

const toDateTimeLocal = (date) => {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "";

  const offset = parsed.getTimezoneOffset();
  const localDate = new Date(parsed.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
};

const getErrorMessage = (error, fallback) => {
  if (error?.status === 401 || error?.status === 403) {
    return "Your admin session is no longer valid.";
  }

  return error?.message || fallback;
};

const ManageBlogs = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [modal, setModal] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [tagInput, setTagInput] = useState("");

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleAuthError = (err) => {
    if (err?.status === 401 || err?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
      return true;
    }

    return false;
  };

  const fetchBlogs = async (requestedPage = page) => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      const response = await apiFetch(
        `/blogs/admin/all?page=${requestedPage}&limit=10`
      );

      if (!response?.success) {
        throw new Error(response?.message || "Failed to load blogs.");
      }

      setBlogs(Array.isArray(response.blogs) ? response.blogs : []);

      setPagination(
        response.pagination || {
          page: requestedPage,
          limit: 10,
          total: response.count || 0,
          totalPages: 1,
        }
      );
    } catch (err) {
      console.error("Manage blogs error:", err);

      if (handleAuthError(err)) return;

      setError(getErrorMessage(err, "Unable to load blogs."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesStatus =
        statusFilter === "all" || blog.status === statusFilter;

      if (!matchesStatus) return false;

      if (!query) return true;

      const searchableText = [
        blog.title,
        blog.excerpt,
        blog.category,
        ...(Array.isArray(blog.tags) ? blog.tags : []),
        blog.author?.fullName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [blogs, search, statusFilter]);

  const openCreateModal = () => {
    setSelectedBlog(null);
    setForm(EMPTY_FORM);
    setTagInput("");
    setError("");
    setSuccess("");
    setModal("create");
  };

  const openEditModal = (blog) => {
    setSelectedBlog(blog);

    setForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      category: blog.category || "",
      featuredImage: blog.featuredImage || "",
      tags: Array.isArray(blog.tags) ? blog.tags : [],
      status: blog.status || "draft",
      publishedAt: toDateTimeLocal(blog.publishedAt),
      isFeatured: Boolean(blog.isFeatured),
    });

    setTagInput("");
    setError("");
    setSuccess("");
    setModal("edit");
  };

  const openViewModal = async (blog) => {
    try {
      setError("");
      setSelectedBlog(blog);
      setModal("view");

      const response = await apiFetch(`/blogs/admin/${blog._id}`);

      if (response?.success && response.blog) {
        setSelectedBlog(response.blog);
      }
    } catch (err) {
      console.error("Get blog details error:", err);

      if (handleAuthError(err)) return;

      setError(getErrorMessage(err, "Unable to load blog details."));
    }
  };

  const closeModal = () => {
    if (saving) return;

    setModal(null);
    setSelectedBlog(null);
    setForm(EMPTY_FORM);
    setTagInput("");
  };

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const addTag = () => {
    const value = tagInput.trim().toLowerCase();

    if (!value) return;

    if (value.length > 50) {
      setError("Each tag can contain maximum 50 characters.");
      return;
    }

    if (form.tags.length >= 30) {
      setError("Maximum 30 tags are allowed.");
      return;
    }

    if (form.tags.includes(value)) {
      setTagInput("");
      return;
    }

    setForm((current) => ({
      ...current,
      tags: [...current.tags, value],
    }));

    setTagInput("");
    setError("");
  };

  const removeTag = (tagToRemove) => {
    setForm((current) => ({
      ...current,
      tags: current.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  };

  const validateForm = () => {
    if (!form.title.trim()) {
      return "Blog title is required.";
    }

    if (form.title.trim().length < 3) {
      return "Blog title must contain at least 3 characters.";
    }

    if (form.title.trim().length > 200) {
      return "Blog title cannot exceed 200 characters.";
    }

    if (!form.content.trim()) {
      return "Blog content is required.";
    }

    // Matches current backend create contract.
    if (form.content.trim().length > 500) {
      return "Blog content cannot exceed 500 characters.";
    }

    if (!form.category.trim()) {
      return "Category is required.";
    }

    if (form.category.trim().length > 100) {
      return "Category cannot exceed 100 characters.";
    }

    if (form.excerpt.trim().length > 500) {
      return "Excerpt cannot exceed 500 characters.";
    }

    if (form.featuredImage.trim().length > 1000) {
      return "Featured image URL/path cannot exceed 1000 characters.";
    }

    if (!["draft", "published"].includes(form.status)) {
      return "Invalid blog status.";
    }

    if (form.publishedAt) {
      const date = new Date(form.publishedAt);

      if (Number.isNaN(date.getTime())) {
        return "Please enter a valid published date.";
      }
    }

    return "";
  };

  const buildPayload = () => {
    const payload = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      category: form.category.trim(),
      featuredImage: form.featuredImage.trim(),
      tags: form.tags,
      status: form.status,
      isFeatured: Boolean(form.isFeatured),
    };

    if (form.publishedAt) {
      payload.publishedAt = new Date(form.publishedAt).toISOString();
    } else if (form.status === "draft") {
      payload.publishedAt = null;
    }

    return payload;
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

      const payload = buildPayload();

      let response;

      if (modal === "edit" && selectedBlog?._id) {
        response = await apiFetch(`/blogs/admin/${selectedBlog._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        response = await apiFetch("/blogs/admin", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      if (!response?.success) {
        throw new Error(response?.message || "Unable to save blog.");
      }

      const message =
        response.message ||
        (modal === "edit"
          ? "Blog updated successfully."
          : "Blog created successfully.");

      closeModal();
      setSuccess(message);

      await fetchBlogs(page);
    } catch (err) {
      console.error("Save blog error:", err);

      if (handleAuthError(err)) return;

      setError(getErrorMessage(err, "Unable to save blog."));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (blog) => {
    const confirmed = window.confirm(
      `Delete "${blog.title}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(blog._id);
      setError("");
      setSuccess("");

      const response = await apiFetch(`/blogs/admin/${blog._id}`, {
        method: "DELETE",
      });

      if (!response?.success) {
        throw new Error(response?.message || "Unable to delete blog.");
      }

      setSuccess(response.message || "Blog deleted successfully.");

      if (blogs.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        await fetchBlogs(page);
      }
    } catch (err) {
      console.error("Delete blog error:", err);

      if (handleAuthError(err)) return;

      setError(getErrorMessage(err, "Unable to delete blog."));
    } finally {
      setDeletingId(null);
    }
  };

  const handleRefresh = async () => {
    setSuccess("");
    setError("");
    await fetchBlogs(page);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const totalPages = Math.max(1, pagination.totalPages || 1);

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
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            {/* Page Heading */}
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-[24px] font-semibold text-[#171b2b]">
                  Manage Blogs
                </h1>

                <p className="mt-1 text-[13px] text-[#707686]">
                  Create, update and manage company blog posts.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={loading}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe6e6] bg-white px-4 text-[13px] font-medium text-[#171b2b] transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RefreshCw
                    size={15}
                    className={loading ? "animate-spin" : ""}
                  />
                  Refresh
                </button>

                <button
                  type="button"
                  onClick={openCreateModal}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#159a9c] px-4 text-[13px] font-medium text-white transition hover:bg-[#118587]"
                >
                  <Plus size={16} />
                  Add Blog
                </button>
              </div>
            </div>

            {/* Alerts */}
            {error && (
              <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
                <AlertCircle size={17} className="mt-0.5 shrink-0" />

                <div className="flex-1">{error}</div>

                <button
                  type="button"
                  onClick={() => setError("")}
                  className="shrink-0 text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {success && (
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-700">
                <span className="flex-1">{success}</span>

                <button
                  type="button"
                  onClick={() => setSuccess("")}
                  className="text-emerald-500 hover:text-emerald-700"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Filters */}
            <div className="mb-4 rounded-xl border border-[#e6eded] bg-white p-4 shadow-[0_2px_10px_rgba(23,27,43,0.03)]">
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative flex-1">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ba3ae]"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search title, category, tags..."
                    className="h-10 w-full rounded-lg border border-[#dfe6e6] bg-white pl-10 pr-3 text-[13px] text-[#171b2b] outline-none transition placeholder:text-[#a0a7b2] focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto">
                  {STATUS_OPTIONS.map((status) => {
                    const active = statusFilter === status;

                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleStatusFilter(status)}
                        className={`h-10 whitespace-nowrap rounded-lg px-4 text-[13px] font-medium capitalize transition ${
                          active
                            ? "bg-[#159a9c] text-white"
                            : "border border-[#dfe6e6] bg-white text-[#707686] hover:border-[#159a9c] hover:text-[#159a9c]"
                        }`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-[#e6eded] bg-white shadow-[0_2px_10px_rgba(23,27,43,0.03)]">
              <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full">
                  <thead>
                    <tr className="border-b border-[#edf1f1] bg-[#fbfcfc]">
                      <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#8a929d]">
                        Blog
                      </th>

                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#8a929d]">
                        Category
                      </th>

                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#8a929d]">
                        Status
                      </th>

                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#8a929d]">
                        Published
                      </th>

                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#8a929d]">
                        Author
                      </th>

                      <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-[#8a929d]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="px-5 py-14 text-center">
                          <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-[#159a9c]/20 border-t-[#159a9c]" />

                          <p className="mt-3 text-[13px] text-[#707686]">
                            Loading blogs...
                          </p>
                        </td>
                      </tr>
                    ) : filteredBlogs.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-5 py-14 text-center">
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eefafa] text-[#159a9c]">
                            <FileText size={21} />
                          </div>

                          <p className="mt-3 text-[14px] font-medium text-[#171b2b]">
                            No blogs found
                          </p>

                          <p className="mt-1 text-[12px] text-[#707686]">
                            Try changing your search or filter.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredBlogs.map((blog) => (
                        <tr
                          key={blog._id}
                          className="border-b border-[#edf1f1] last:border-0 hover:bg-[#fbfdfd]"
                        >
                          <td className="px-5 py-4">
                            <div className="flex min-w-[260px] items-center gap-3">
                              <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-[#eef2f2]">
                                {blog.featuredImage ? (
                                  <img
                                    src={blog.featuredImage}
                                    alt={blog.title || "Blog"}
                                    className="h-full w-full object-cover"
                                    onError={(event) => {
                                      event.currentTarget.style.display =
                                        "none";
                                    }}
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center text-[#9aa3ad]">
                                    <FileText size={18} />
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <p className="truncate text-[13px] font-semibold text-[#171b2b]">
                                    {blog.title}
                                  </p>

                                  {blog.isFeatured && (
                                    <Star
                                      size={13}
                                      fill="currentColor"
                                      className="shrink-0 text-[#159a9c]"
                                    />
                                  )}
                                </div>

                                <p className="mt-0.5 max-w-[360px] truncate text-[11px] text-[#8a929d]">
                                  {blog.excerpt || "No excerpt"}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <span className="rounded-md bg-[#f1f6f6] px-2.5 py-1 text-[11px] font-medium text-[#159a9c]">
                              {blog.category || "—"}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${
                                blog.status === "published"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {blog.status || "draft"}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1.5 text-[12px] text-[#707686]">
                              <Calendar size={14} />
                              {formatDate(blog.publishedAt)}
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <div className="max-w-[150px] truncate text-[12px] text-[#707686]">
                              {blog.author?.fullName || "Admin"}
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => openViewModal(blog)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e7e7] text-[#707686] transition hover:border-[#159a9c] hover:text-[#159a9c]"
                                title="View"
                              >
                                <Eye size={15} />
                              </button>

                              <button
                                type="button"
                                onClick={() => openEditModal(blog)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e7e7] text-[#707686] transition hover:border-[#159a9c] hover:text-[#159a9c]"
                                title="Edit"
                              >
                                <Edit3 size={15} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDelete(blog)}
                                disabled={deletingId === blog._id}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                title="Delete"
                              >
                                {deletingId === blog._id ? (
                                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-200 border-t-red-500" />
                                ) : (
                                  <Trash2 size={15} />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {!loading && (
                <div className="flex flex-col gap-3 border-t border-[#edf1f1] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[12px] text-[#707686]">
                    Showing page{" "}
                    <span className="font-medium text-[#171b2b]">
                      {pagination.page || page}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-[#171b2b]">
                      {totalPages}
                    </span>{" "}
                    · {pagination.total || 0} total blogs
                  </p>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => setPage((current) => current - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#dfe6e6] text-[#707686] transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <span className="min-w-[70px] text-center text-[12px] text-[#707686]">
                      {page} / {totalPages}
                    </span>

                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => setPage((current) => current + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#dfe6e6] text-[#707686] transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Create / Edit Modal */}
      {(modal === "create" || modal === "edit") && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171b2b]/45 p-4">
          <div className="flex max-h-[92vh] w-full max-w-[850px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf1f1] px-5 py-4">
              <div>
                <h2 className="text-[17px] font-semibold text-[#171b2b]">
                  {modal === "edit" ? "Edit Blog" : "Create Blog"}
                </h2>

                <p className="mt-0.5 text-[11px] text-[#8a929d]">
                  {modal === "edit"
                    ? "Update the selected blog post."
                    : "Add a new blog post to the website."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#707686] hover:bg-[#f4f7f7] hover:text-[#171b2b]"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto px-5 py-5"
            >
              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-[12px] text-red-700">
                  {error}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Title <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value={form.title}
                    maxLength={200}
                    onChange={(event) =>
                      updateField("title", event.target.value)
                    }
                    placeholder="Enter blog title"
                    className="h-10 w-full rounded-lg border border-[#dfe6e6] px-3 text-[13px] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                  />

                  <p className="mt-1 text-right text-[10px] text-[#9aa2ac]">
                    {form.title.length}/200
                  </p>
                </div>

                {/* Category */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Category <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value={form.category}
                    maxLength={100}
                    onChange={(event) =>
                      updateField("category", event.target.value)
                    }
                    placeholder="Technology"
                    className="h-10 w-full rounded-lg border border-[#dfe6e6] px-3 text-[13px] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateField("status", event.target.value)
                    }
                    className="h-10 w-full rounded-lg border border-[#dfe6e6] bg-white px-3 text-[13px] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                {/* Excerpt */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Excerpt
                  </label>

                  <textarea
                    value={form.excerpt}
                    maxLength={500}
                    rows={3}
                    onChange={(event) =>
                      updateField("excerpt", event.target.value)
                    }
                    placeholder="Short summary of the blog..."
                    className="w-full resize-none rounded-lg border border-[#dfe6e6] px-3 py-2.5 text-[13px] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                  />

                  <p className="mt-1 text-right text-[10px] text-[#9aa2ac]">
                    {form.excerpt.length}/500
                  </p>
                </div>

                {/* Content */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Content <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    value={form.content}
                    maxLength={500}
                    rows={8}
                    onChange={(event) =>
                      updateField("content", event.target.value)
                    }
                    placeholder="Write blog content..."
                    className="w-full resize-y rounded-lg border border-[#dfe6e6] px-3 py-2.5 text-[13px] leading-6 outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                  />

                  <p className="mt-1 text-right text-[10px] text-[#9aa2ac]">
                    {form.content.length}/500
                  </p>
                </div>

                {/* Featured Image */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Featured Image
                  </label>

                  <input
                    type="text"
                    value={form.featuredImage}
                    maxLength={1000}
                    onChange={(event) =>
                      updateField("featuredImage", event.target.value)
                    }
                    placeholder="Image URL or stored image path"
                    className="h-10 w-full rounded-lg border border-[#dfe6e6] px-3 text-[13px] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                  />
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Tags
                  </label>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ba3ae]"
                      />

                      <input
                        type="text"
                        value={tagInput}
                        onChange={(event) => setTagInput(event.target.value)}
                        onKeyDown={handleTagKeyDown}
                        maxLength={50}
                        placeholder="Type a tag and press Enter"
                        className="h-10 w-full rounded-lg border border-[#dfe6e6] pl-9 pr-3 text-[13px] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={addTag}
                      className="h-10 rounded-lg border border-[#dfe6e6] px-4 text-[12px] font-medium text-[#707686] hover:border-[#159a9c] hover:text-[#159a9c]"
                    >
                      Add
                    </button>
                  </div>

                  {form.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {form.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#eefafa] px-2.5 py-1 text-[11px] font-medium text-[#159a9c]"
                        >
                          #{tag}

                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-[#171b2b]"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Published Date */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Published Date
                  </label>

                  <input
                    type="datetime-local"
                    value={form.publishedAt}
                    onChange={(event) =>
                      updateField("publishedAt", event.target.value)
                    }
                    className="h-10 w-full rounded-lg border border-[#dfe6e6] bg-white px-3 text-[13px] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                  />
                </div>

                {/* Featured */}
                <div className="flex items-end">
                  <label className="flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg border border-[#dfe6e6] px-3">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(event) =>
                        updateField("isFeatured", event.target.checked)
                      }
                      className="h-4 w-4 accent-[#159a9c]"
                    />

                    <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#171b2b]">
                      <Star size={14} />
                      Featured Blog
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-[#edf1f1] pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="h-10 rounded-lg border border-[#dfe6e6] px-5 text-[12px] font-medium text-[#707686] hover:bg-[#f7fafa] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-10 min-w-[120px] items-center justify-center gap-2 rounded-lg bg-[#159a9c] px-5 text-[12px] font-medium text-white hover:bg-[#118587] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  )}

                  {saving
                    ? "Saving..."
                    : modal === "edit"
                    ? "Update Blog"
                    : "Create Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {modal === "view" && selectedBlog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171b2b]/45 p-4">
          <div className="flex max-h-[92vh] w-full max-w-[800px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf1f1] px-5 py-4">
              <div>
                <h2 className="text-[17px] font-semibold text-[#171b2b]">
                  Blog Details
                </h2>

                <p className="mt-0.5 text-[11px] text-[#8a929d]">
                  View complete blog information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#707686] hover:bg-[#f4f7f7] hover:text-[#171b2b]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-5">
              {selectedBlog.featuredImage && (
                <div className="mb-5 overflow-hidden rounded-xl bg-[#f1f4f4]">
                  <img
                    src={selectedBlog.featuredImage}
                    alt={selectedBlog.title || "Blog"}
                    className="max-h-[300px] w-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[#eefafa] px-2.5 py-1 text-[11px] font-medium text-[#159a9c]">
                  {selectedBlog.category || "Uncategorized"}
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${
                    selectedBlog.status === "published"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {selectedBlog.status}
                </span>

                {selectedBlog.isFeatured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#f0faf9] px-2.5 py-1 text-[11px] font-medium text-[#159a9c]">
                    <Star size={12} fill="currentColor" />
                    Featured
                  </span>
                )}
              </div>

              <h1 className="mt-4 text-[24px] font-semibold leading-tight text-[#171b2b]">
                {selectedBlog.title}
              </h1>

              {selectedBlog.excerpt && (
                <p className="mt-3 text-[13px] leading-6 text-[#707686]">
                  {selectedBlog.excerpt}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#8a929d]">
                <span>
                  Author:{" "}
                  <strong className="font-medium text-[#171b2b]">
                    {selectedBlog.author?.fullName || "Admin"}
                  </strong>
                </span>

                <span>
                  Published:{" "}
                  <strong className="font-medium text-[#171b2b]">
                    {formatDate(selectedBlog.publishedAt)}
                  </strong>
                </span>

                {selectedBlog.views !== undefined && (
                  <span>
                    Views:{" "}
                    <strong className="font-medium text-[#171b2b]">
                      {selectedBlog.views}
                    </strong>
                  </span>
                )}
              </div>

              {Array.isArray(selectedBlog.tags) &&
                selectedBlog.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedBlog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#f3f5f5] px-2.5 py-1 text-[10px] text-[#707686]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

              <div className="mt-6 border-t border-[#edf1f1] pt-5">
                <h3 className="mb-3 text-[13px] font-semibold text-[#171b2b]">
                  Content
                </h3>

                <div className="whitespace-pre-wrap text-[13px] leading-7 text-[#4f5663]">
                  {selectedBlog.content || "No content available."}
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-[#edf1f1] px-5 py-4">
              <button
                type="button"
                onClick={closeModal}
                className="h-9 rounded-lg bg-[#159a9c] px-5 text-[12px] font-medium text-white hover:bg-[#118587]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;