import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { apiFetch } from "../../lib/api";

const PAGE_LIMIT = 10;

const EMPTY_FORM = {
  name: "",
  slug: "",
  description: "",
  icon: "",
  image: "",
  category: "",
  status: "published",
  isFeatured: false,
  displayOrder: 0,
};

const ManageTechnologies = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [technologies, setTechnologies] = useState([]);
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
  const [selectedTechnology, setSelectedTechnology] =
    useState(null);

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

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch(
        `/technologies/admin/all?page=${page}&limit=${PAGE_LIMIT}`
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to load technologies."
        );
      }

      setTechnologies(response.technologies || []);

      setPagination(
        response.pagination || {
          page,
          limit: PAGE_LIMIT,
          total: response.technologies?.length || 0,
          totalPages: 1,
        }
      );
    } catch (err) {
      console.error("Technology fetch error:", err);

      if (redirectIfUnauthorized(err)) return;

      setError(
        err?.message || "Unable to load technologies."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, [page]);

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  const filteredTechnologies = useMemo(() => {
    const query = search.trim().toLowerCase();

    return technologies.filter((technology) => {
      const matchesSearch =
        !query ||
        technology.name?.toLowerCase().includes(query) ||
        technology.slug?.toLowerCase().includes(query) ||
        technology.category
          ?.toLowerCase()
          .includes(query) ||
        technology.description
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        technology.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [technologies, search, statusFilter]);

  const openCreateModal = () => {
    setForm(EMPTY_FORM);
    setSelectedTechnology(null);
    setModal("create");
    setError("");
  };

  const openEditModal = (technology) => {
    setSelectedTechnology(technology);

    setForm({
      name: technology.name || "",
      slug: technology.slug || "",
      description: technology.description || "",
      icon: technology.icon || "",
      image: technology.image || "",
      category: technology.category || "",
      status: technology.status || "published",
      isFeatured: Boolean(technology.isFeatured),
      displayOrder: technology.displayOrder ?? 0,
    });

    setModal("edit");
    setError("");
  };

  const openViewModal = async (technology) => {
    try {
      setError("");

      const response = await apiFetch(
        `/technologies/admin/${technology._id}`
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Failed to load technology details."
        );
      }

      setSelectedTechnology(response.technology);
      setModal("view");
    } catch (err) {
      console.error("Technology details error:", err);

      if (redirectIfUnauthorized(err)) return;

      setError(
        err?.message ||
          "Unable to load technology details."
      );
    }
  };

  const closeModal = () => {
    if (saving) return;

    setModal(null);
    setSelectedTechnology(null);
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
    const name = form.name.trim();
    const slug = form.slug.trim();
    const description = form.description.trim();
    const category = form.category.trim();

    if (name.length < 2) {
      return "Technology name must be at least 2 characters.";
    }

    if (name.length > 100) {
      return "Technology name cannot exceed 100 characters.";
    }

    if (description.length < 10) {
      return "Description must be at least 10 characters.";
    }

    if (description.length > 1000) {
      return "Description cannot exceed 1000 characters.";
    }

    if (category.length < 2) {
      return "Category must be at least 2 characters.";
    }

    if (category.length > 100) {
      return "Category cannot exceed 100 characters.";
    }

    if (slug && slug.length > 120) {
      return "Slug cannot exceed 120 characters.";
    }

    if (form.icon.trim().length > 500) {
      return "Icon cannot exceed 500 characters.";
    }

    if (form.image.trim().length > 500) {
      return "Image cannot exceed 500 characters.";
    }

    const displayOrder = Number(form.displayOrder);

    if (
      !Number.isFinite(displayOrder) ||
      displayOrder < 0
    ) {
      return "Display order must be a non-negative number.";
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
        name: form.name.trim(),
        slug: form.slug.trim(),
        description: form.description.trim(),
        icon: form.icon.trim(),
        image: form.image.trim(),
        category: form.category.trim(),
        status: form.status,
        isFeatured: Boolean(form.isFeatured),
        displayOrder: Number(form.displayOrder),
      };

      let response;

      if (
        modal === "edit" &&
        selectedTechnology?._id
      ) {
        response = await apiFetch(
          `/technologies/admin/${selectedTechnology._id}`,
          {
            method: "PUT",
            body: JSON.stringify(payload),
          }
        );
      } else {
        response = await apiFetch(
          "/technologies/admin",
          {
            method: "POST",
            body: JSON.stringify(payload),
          }
        );
      }

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Failed to save technology."
        );
      }

      setSuccess(
        modal === "edit"
          ? "Technology updated successfully."
          : "Technology created successfully."
      );

      closeModal();
      await fetchTechnologies();
    } catch (err) {
      console.error("Save technology error:", err);

      if (redirectIfUnauthorized(err)) return;

      setError(
        err?.message ||
          "Unable to save technology."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (technology) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${technology.name}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(technology._id);
      setError("");
      setSuccess("");

      const response = await apiFetch(
        `/technologies/admin/${technology._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Failed to delete technology."
        );
      }

      setSuccess(
        "Technology deleted successfully."
      );

      if (
        technologies.length === 1 &&
        page > 1
      ) {
        setPage((current) => current - 1);
      } else {
        await fetchTechnologies();
      }
    } catch (err) {
      console.error("Delete technology error:", err);

      if (redirectIfUnauthorized(err)) return;

      setError(
        err?.message ||
          "Unable to delete technology."
      );
    } finally {
      setDeletingId(null);
    }
  };

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

            {/* PAGE HEADER */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-[24px] font-semibold text-[#171b2b]">
                  Manage Technologies
                </h1>

                <p className="mt-1 text-[13px] text-[#707686]">
                  Manage technologies displayed across the website.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fetchTechnologies}
                  disabled={loading}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe5e8] bg-white px-4 text-[13px] font-medium text-[#171b2b] transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:opacity-60"
                >
                  <RefreshCw
                    size={16}
                    className={
                      loading
                        ? "animate-spin"
                        : ""
                    }
                  />
                  Refresh
                </button>

                <button
                  type="button"
                  onClick={openCreateModal}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#159a9c] px-4 text-[13px] font-medium text-white transition hover:bg-[#118789]"
                >
                  <Plus size={17} />
                  Add Technology
                </button>
              </div>
            </div>

            {/* ALERT */}
            {error && !modal && (
              <div className="mb-5 flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
                <span>{error}</span>

                <button
                  type="button"
                  onClick={() => setError("")}
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

            {/* FILTERS */}
            <div className="mb-5 rounded-xl border border-[#e7ecee] bg-white p-4 shadow-[0_4px_20px_rgba(23,27,43,0.03)]">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-[400px]">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa1ad]"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search technology..."
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] bg-white pl-10 pr-3 text-[13px] text-[#171b2b] outline-none focus:border-[#159a9c]"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="h-10 rounded-lg border border-[#dfe5e8] bg-white px-3 text-[13px] text-[#171b2b] outline-none focus:border-[#159a9c]"
                >
                  <option value="all">
                    All Status
                  </option>

                  <option value="published">
                    Published
                  </option>

                  <option value="draft">
                    Draft
                  </option>
                </select>
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-xl border border-[#e7ecee] bg-white shadow-[0_4px_20px_rgba(23,27,43,0.03)]">
              {loading ? (
                <div className="flex min-h-[300px] items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#159a9c] border-t-transparent" />

                    <p className="text-[13px] text-[#707686]">
                      Loading technologies...
                    </p>
                  </div>
                </div>
              ) : filteredTechnologies.length === 0 ? (
                <div className="flex min-h-[300px] items-center justify-center px-5 text-center">
                  <div>
                    <p className="text-[15px] font-medium text-[#171b2b]">
                      No technologies found
                    </p>

                    <p className="mt-1 text-[13px] text-[#707686]">
                      Try changing your filters or add a new technology.
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
                            Technology
                          </th>

                          <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#707686]">
                            Category
                          </th>

                          <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#707686]">
                            Status
                          </th>

                          <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#707686]">
                            Featured
                          </th>

                          <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#707686]">
                            Order
                          </th>

                          <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-[#707686]">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredTechnologies.map(
                          (technology) => (
                            <tr
                              key={technology._id}
                              className="border-b border-[#edf0f2] last:border-b-0 hover:bg-[#fbfdfd]"
                            >
                              {/* TECHNOLOGY */}
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  {technology.image ? (
                                    <img
                                      src={
                                        technology.image
                                      }
                                      alt={
                                        technology.name
                                      }
                                      className="h-11 w-11 rounded-lg border border-[#e5eaec] object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#e8f7f7] text-[14px] font-semibold text-[#159a9c]">
                                      {technology.name
                                        ?.charAt(0)
                                        ?.toUpperCase() ||
                                        "T"}
                                    </div>
                                  )}

                                  <div className="min-w-0">
                                    <p className="max-w-[250px] truncate text-[13px] font-semibold text-[#171b2b]">
                                      {
                                        technology.name
                                      }
                                    </p>

                                    <p className="mt-0.5 max-w-[250px] truncate text-[11px] text-[#707686]">
                                      /
                                      {
                                        technology.slug
                                      }
                                    </p>
                                  </div>
                                </div>
                              </td>

                              {/* CATEGORY */}
                              <td className="px-5 py-4 text-[13px] text-[#171b2b]">
                                {technology.category}
                              </td>

                              {/* STATUS */}
                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                                    technology.status ===
                                    "published"
                                      ? "bg-green-50 text-green-600"
                                      : "bg-amber-50 text-amber-600"
                                  }`}
                                >
                                  {
                                    technology.status
                                  }
                                </span>
                              </td>

                              {/* FEATURED */}
                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                                    technology.isFeatured
                                      ? "bg-[#e8f7f7] text-[#159a9c]"
                                      : "bg-gray-100 text-[#707686]"
                                  }`}
                                >
                                  {technology.isFeatured
                                    ? "Yes"
                                    : "No"}
                                </span>
                              </td>

                              {/* ORDER */}
                              <td className="px-5 py-4 text-[13px] text-[#171b2b]">
                                {
                                  technology.displayOrder
                                }
                              </td>

                              {/* ACTIONS */}
                              <td className="px-5 py-4">
                                <div className="flex justify-end gap-1">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openViewModal(
                                        technology
                                      )
                                    }
                                    className="rounded-lg p-2 text-[#707686] hover:bg-[#e8f7f7] hover:text-[#159a9c]"
                                    title="View"
                                  >
                                    <Eye size={16} />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      openEditModal(
                                        technology
                                      )
                                    }
                                    className="rounded-lg p-2 text-[#707686] hover:bg-[#e8f7f7] hover:text-[#159a9c]"
                                    title="Edit"
                                  >
                                    <Pencil size={16} />
                                  </button>

                                  <button
                                    type="button"
                                    disabled={
                                      deletingId ===
                                      technology._id
                                    }
                                    onClick={() =>
                                      handleDelete(
                                        technology
                                      )
                                    }
                                    className="rounded-lg p-2 text-[#707686] hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                                    title="Delete"
                                  >
                                    {deletingId ===
                                    technology._id ? (
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
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* PAGINATION */}
                  <div className="flex flex-col gap-3 border-t border-[#edf0f2] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[12px] text-[#707686]">
                      Page{" "}
                      <span className="font-medium text-[#171b2b]">
                        {pagination.page ||
                          page}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-[#171b2b]">
                        {pagination.totalPages ||
                          1}
                      </span>{" "}
                      ·{" "}
                      {pagination.total || 0}{" "}
                      total
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={page <= 1}
                        onClick={() =>
                          setPage((current) =>
                            Math.max(
                              1,
                              current - 1
                            )
                          )
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#dfe5e8] bg-white text-[#707686] hover:border-[#159a9c] hover:text-[#159a9c] disabled:opacity-40"
                      >
                        <ChevronLeft
                          size={16}
                        />
                      </button>

                      <span className="min-w-[70px] text-center text-[12px] text-[#707686]">
                        {page} /{" "}
                        {pagination.totalPages ||
                          1}
                      </span>

                      <button
                        type="button"
                        disabled={
                          page >=
                          (pagination.totalPages ||
                            1)
                        }
                        onClick={() =>
                          setPage((current) =>
                            Math.min(
                              pagination.totalPages ||
                                1,
                              current + 1
                            )
                          )
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#dfe5e8] bg-white text-[#707686] hover:border-[#159a9c] hover:text-[#159a9c] disabled:opacity-40"
                      >
                        <ChevronRight
                          size={16}
                        />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* CREATE / EDIT MODAL */}
      {(modal === "create" ||
        modal === "edit") && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[94vh] w-full max-w-[720px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf0f2] px-5 py-4">
              <div>
                <h2 className="text-[17px] font-semibold text-[#171b2b]">
                  {modal === "edit"
                    ? "Edit Technology"
                    : "Add Technology"}
                </h2>

                <p className="mt-0.5 text-[11px] text-[#707686]">
                  Manage technology information and visibility.
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
              className="max-h-[calc(94vh-75px)] overflow-y-auto px-5 py-5"
            >
              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-600">
                  {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">

                {/* NAME */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Technology Name *
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    maxLength={100}
                    placeholder="React"
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Category *
                  </label>

                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    maxLength={100}
                    placeholder="Frontend"
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                {/* SLUG */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Slug
                  </label>

                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    maxLength={120}
                    placeholder="react"
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />

                  <p className="mt-1 text-[10px] text-[#9aa1ad]">
                    Leave empty while creating to generate it from the technology name.
                  </p>
                </div>

                {/* DESCRIPTION */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Description *
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    maxLength={1000}
                    rows={5}
                    placeholder="Describe this technology..."
                    className="w-full resize-none rounded-lg border border-[#dfe5e8] px-3 py-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />

                  <div className="mt-1 text-right text-[10px] text-[#9aa1ad]">
                    {form.description.length}/1000
                  </div>
                </div>

                {/* ICON */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Icon URL / Path
                  </label>

                  <input
                    name="icon"
                    value={form.icon}
                    onChange={handleChange}
                    maxLength={500}
                    placeholder="/icons/react.svg"
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                {/* IMAGE */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Image URL / Path
                  </label>

                  <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    maxLength={500}
                    placeholder="https://..."
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                {/* STATUS */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] bg-white px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  >
                    <option value="published">
                      Published
                    </option>

                    <option value="draft">
                      Draft
                    </option>
                  </select>
                </div>

                {/* DISPLAY ORDER */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Display Order
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    name="displayOrder"
                    value={form.displayOrder}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                {/* FEATURED */}
                <div className="sm:col-span-2">
                  <label className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-[#dfe5e8] px-3">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={form.isFeatured}
                      onChange={handleChange}
                      className="h-4 w-4 accent-[#159a9c]"
                    />

                    <span className="text-[12px] font-medium text-[#171b2b]">
                      Featured technology
                    </span>
                  </label>
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-6 flex justify-end gap-2 border-t border-[#edf0f2] pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="h-10 rounded-lg border border-[#dfe5e8] px-4 text-[13px] font-medium text-[#707686] hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#159a9c] px-5 text-[13px] font-medium text-white hover:bg-[#118789] disabled:opacity-60"
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
                    ? "Update Technology"
                    : "Create Technology"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {modal === "view" &&
        selectedTechnology && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[92vh] w-full max-w-[700px] overflow-y-auto rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#edf0f2] px-5 py-4">
                <div>
                  <h2 className="text-[17px] font-semibold text-[#171b2b]">
                    Technology Details
                  </h2>

                  <p className="text-[11px] text-[#707686]">
                    Complete technology information.
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

                {/* HERO */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {selectedTechnology.image ? (
                    <img
                      src={
                        selectedTechnology.image
                      }
                      alt={
                        selectedTechnology.name
                      }
                      className="h-24 w-24 rounded-xl border border-[#e5eaec] object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[#e8f7f7] text-[28px] font-semibold text-[#159a9c]">
                      {selectedTechnology.name
                        ?.charAt(0)
                        ?.toUpperCase() || "T"}
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[21px] font-semibold text-[#171b2b]">
                        {
                          selectedTechnology.name
                        }
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          selectedTechnology.status ===
                          "published"
                            ? "bg-green-50 text-green-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {
                          selectedTechnology.status
                        }
                      </span>

                      {selectedTechnology.isFeatured && (
                        <span className="rounded-full bg-[#e8f7f7] px-2.5 py-1 text-[11px] font-medium text-[#159a9c]">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-[12px] text-[#707686]">
                      /{selectedTechnology.slug}
                    </p>
                  </div>
                </div>

                {/* META */}
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-[#edf0f2] p-3">
                    <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                      Category
                    </p>

                    <p className="mt-1 text-[12px] font-medium text-[#171b2b]">
                      {
                        selectedTechnology.category
                      }
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#edf0f2] p-3">
                    <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                      Display Order
                    </p>

                    <p className="mt-1 text-[12px] font-medium text-[#171b2b]">
                      {
                        selectedTechnology.displayOrder
                      }
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#edf0f2] p-3">
                    <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                      Slug
                    </p>

                    <p className="mt-1 truncate text-[12px] font-medium text-[#171b2b]">
                      {
                        selectedTechnology.slug
                      }
                    </p>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div>
                  <h4 className="mb-2 text-[13px] font-semibold text-[#171b2b]">
                    Description
                  </h4>

                  <div className="rounded-xl bg-[#f7fafa] p-4">
                    <p className="whitespace-pre-wrap text-[13px] leading-6 text-[#171b2b]">
                      {
                        selectedTechnology.description
                      }
                    </p>
                  </div>
                </div>

                {/* ICON */}
                {selectedTechnology.icon && (
                  <div>
                    <h4 className="mb-2 text-[13px] font-semibold text-[#171b2b]">
                      Icon
                    </h4>

                    <div className="flex items-center gap-3 rounded-lg border border-[#edf0f2] p-3">
                      <span className="text-[11px] text-[#707686]">
                        {selectedTechnology.icon}
                      </span>
                    </div>
                  </div>
                )}

                {/* IMAGE */}
                {selectedTechnology.image && (
                  <div>
                    <h4 className="mb-2 text-[13px] font-semibold text-[#171b2b]">
                      Image
                    </h4>

                    <img
                      src={
                        selectedTechnology.image
                      }
                      alt={
                        selectedTechnology.name
                      }
                      className="max-h-[280px] w-full rounded-xl object-contain bg-[#f7fafa]"
                    />
                  </div>
                )}

                {/* CREATED BY */}
                {selectedTechnology.createdBy && (
                  <div className="border-t border-[#edf0f2] pt-4">
                    <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                      Created By
                    </p>

                    <p className="mt-1 text-[12px] font-medium text-[#171b2b]">
                      {
                        selectedTechnology
                          .createdBy.fullName
                      }
                    </p>

                    {selectedTechnology.createdBy
                      .email && (
                      <p className="text-[11px] text-[#707686]">
                        {
                          selectedTechnology
                            .createdBy.email
                        }
                      </p>
                    )}
                  </div>
                )}

                {/* CLOSE */}
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

export default ManageTechnologies;