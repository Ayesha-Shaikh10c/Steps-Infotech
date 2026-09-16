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
  Code2,
  Image as ImageIcon,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { apiFetch } from "../../lib/api";

const PAGE_LIMIT = 10;

const EMPTY_FORM = {
  title: "",
  shortDescription: "",
  description: "",
  featuredImage: "",
  gallery: [],
  category: "",
  technologies: [],
  client: "",
  projectUrl: "",
  githubUrl: "",
  completionDate: "",
  status: "draft",
  isFeatured: false,
  displayOrder: 0,
};

const ManagePortfolio = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [portfolios, setPortfolios] = useState([]);
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
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);

  const [galleryInput, setGalleryInput] = useState("");
  const [technologyInput, setTechnologyInput] = useState("");

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

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch(
        `/portfolio/admin/all?page=${page}&limit=${PAGE_LIMIT}`
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to load portfolios."
        );
      }

      setPortfolios(response.portfolios || []);

      setPagination(
        response.pagination || {
          page,
          limit: PAGE_LIMIT,
          total: response.portfolios?.length || 0,
          totalPages: 1,
        }
      );
    } catch (err) {
      console.error("Portfolio fetch error:", err);

      if (redirectIfUnauthorized(err)) return;

      setError(err?.message || "Unable to load portfolios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, [page]);

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  const filteredPortfolios = useMemo(() => {
    const query = search.trim().toLowerCase();

    return portfolios.filter((portfolio) => {
      const matchesSearch =
        !query ||
        portfolio.title?.toLowerCase().includes(query) ||
        portfolio.category?.toLowerCase().includes(query) ||
        portfolio.client?.toLowerCase().includes(query) ||
        portfolio.shortDescription
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        portfolio.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [portfolios, search, statusFilter]);

  const formatDateForInput = (date) => {
    if (!date) return "";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "";
    }

    return parsed.toISOString().slice(0, 10);
  };

  const openCreateModal = () => {
    setForm(EMPTY_FORM);
    setGalleryInput("");
    setTechnologyInput("");
    setSelectedPortfolio(null);
    setModal("create");
    setError("");
  };

  const openEditModal = (portfolio) => {
    setSelectedPortfolio(portfolio);

    setForm({
      title: portfolio.title || "",
      shortDescription: portfolio.shortDescription || "",
      description: portfolio.description || "",
      featuredImage: portfolio.featuredImage || "",
      gallery: Array.isArray(portfolio.gallery)
        ? portfolio.gallery
        : [],
      category: portfolio.category || "",
      technologies: Array.isArray(portfolio.technologies)
        ? portfolio.technologies
        : [],
      client: portfolio.client || "",
      projectUrl: portfolio.projectUrl || "",
      githubUrl: portfolio.githubUrl || "",
      completionDate: formatDateForInput(
        portfolio.completionDate
      ),
      status: portfolio.status || "draft",
      isFeatured: Boolean(portfolio.isFeatured),
      displayOrder: portfolio.displayOrder ?? 0,
    });

    setGalleryInput("");
    setTechnologyInput("");
    setModal("edit");
    setError("");
  };

  const openViewModal = async (portfolio) => {
    try {
      setError("");

      const response = await apiFetch(
        `/portfolio/admin/${portfolio._id}`
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to load portfolio."
        );
      }

      setSelectedPortfolio(response.portfolio);
      setModal("view");
    } catch (err) {
      console.error("Portfolio details error:", err);

      if (redirectIfUnauthorized(err)) return;

      setError(
        err?.message || "Unable to load portfolio details."
      );
    }
  };

  const closeModal = () => {
    if (saving) return;

    setModal(null);
    setSelectedPortfolio(null);
    setForm(EMPTY_FORM);
    setGalleryInput("");
    setTechnologyInput("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addGalleryItem = () => {
    const value = galleryInput.trim();

    if (!value) return;

    if (form.gallery.includes(value)) {
      setGalleryInput("");
      return;
    }

    setForm((current) => ({
      ...current,
      gallery: [...current.gallery, value],
    }));

    setGalleryInput("");
  };

  const removeGalleryItem = (index) => {
    setForm((current) => ({
      ...current,
      gallery: current.gallery.filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }));
  };

  const addTechnology = () => {
    const value = technologyInput.trim();

    if (!value) return;

    if (form.technologies.includes(value)) {
      setTechnologyInput("");
      return;
    }

    setForm((current) => ({
      ...current,
      technologies: [...current.technologies, value],
    }));

    setTechnologyInput("");
  };

  const removeTechnology = (index) => {
    setForm((current) => ({
      ...current,
      technologies: current.technologies.filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }));
  };

  const validateForm = () => {
    if (form.title.trim().length < 2) {
      return "Title must be at least 2 characters.";
    }

    if (form.title.trim().length > 150) {
      return "Title cannot exceed 150 characters.";
    }

    if (form.shortDescription.trim().length < 10) {
      return "Short description must be at least 10 characters.";
    }

    if (form.shortDescription.trim().length > 300) {
      return "Short description cannot exceed 300 characters.";
    }

    if (form.description.trim().length < 20) {
      return "Description must be at least 20 characters.";
    }

    if (form.description.trim().length > 3000) {
      return "Description cannot exceed 3000 characters.";
    }

    if (form.category.trim().length < 2) {
      return "Category must be at least 2 characters.";
    }

    if (form.category.trim().length > 100) {
      return "Category cannot exceed 100 characters.";
    }

    if (form.featuredImage.trim().length > 500) {
      return "Featured image cannot exceed 500 characters.";
    }

    if (form.client.trim().length > 150) {
      return "Client name cannot exceed 150 characters.";
    }

    if (form.projectUrl.trim().length > 500) {
      return "Project URL cannot exceed 500 characters.";
    }

    if (form.githubUrl.trim().length > 500) {
      return "GitHub URL cannot exceed 500 characters.";
    }

    if (form.gallery.length > 100) {
      return "Gallery cannot contain more than 100 images.";
    }

    if (form.technologies.length > 100) {
      return "Too many technologies added.";
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
        title: form.title.trim(),
        shortDescription: form.shortDescription.trim(),
        description: form.description.trim(),
        featuredImage: form.featuredImage.trim(),
        gallery: form.gallery,
        category: form.category.trim(),
        technologies: form.technologies,
        client: form.client.trim(),
        projectUrl: form.projectUrl.trim(),
        githubUrl: form.githubUrl.trim(),
        completionDate: form.completionDate || null,
        status: form.status,
        isFeatured: Boolean(form.isFeatured),
        displayOrder: Number(form.displayOrder),
      };

      let response;

      if (
        modal === "edit" &&
        selectedPortfolio?._id
      ) {
        response = await apiFetch(
          `/portfolio/admin/${selectedPortfolio._id}`,
          {
            method: "PUT",
            body: JSON.stringify(payload),
          }
        );
      } else {
        response = await apiFetch("/portfolio/admin", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to save portfolio."
        );
      }

      setSuccess(
        modal === "edit"
          ? "Portfolio updated successfully."
          : "Portfolio created successfully."
      );

      closeModal();
      await fetchPortfolios();
    } catch (err) {
      console.error("Save portfolio error:", err);

      if (redirectIfUnauthorized(err)) return;

      setError(
        err?.message || "Unable to save portfolio."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (portfolio) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${portfolio.title}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(portfolio._id);
      setError("");
      setSuccess("");

      const response = await apiFetch(
        `/portfolio/admin/${portfolio._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to delete portfolio."
        );
      }

      setSuccess("Portfolio deleted successfully.");

      if (
        portfolios.length === 1 &&
        page > 1
      ) {
        setPage((current) => current - 1);
      } else {
        await fetchPortfolios();
      }
    } catch (err) {
      console.error("Delete portfolio error:", err);

      if (redirectIfUnauthorized(err)) return;

      setError(
        err?.message || "Unable to delete portfolio."
      );
    } finally {
      setDeletingId(null);
    }
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

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-[24px] font-semibold text-[#171b2b]">
                  Manage Portfolio
                </h1>

                <p className="mt-1 text-[13px] text-[#707686]">
                  Create, update and manage company projects.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fetchPortfolios}
                  disabled={loading}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe5e8] bg-white px-4 text-[13px] font-medium text-[#171b2b] transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:opacity-60"
                >
                  <RefreshCw
                    size={16}
                    className={
                      loading ? "animate-spin" : ""
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
                  Add Portfolio
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
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search portfolio..."
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
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">
                    Published
                  </option>
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
                      Loading portfolios...
                    </p>
                  </div>
                </div>
              ) : filteredPortfolios.length === 0 ? (
                <div className="flex min-h-[300px] items-center justify-center px-5 text-center">
                  <div>
                    <p className="text-[15px] font-medium text-[#171b2b]">
                      No portfolios found
                    </p>

                    <p className="mt-1 text-[13px] text-[#707686]">
                      Try changing your filters or add a new portfolio.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-[950px] w-full">
                      <thead>
                        <tr className="border-b border-[#edf0f2] bg-[#fafcfc]">
                          <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#707686]">
                            Project
                          </th>

                          <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#707686]">
                            Category
                          </th>

                          <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#707686]">
                            Client
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
                        {filteredPortfolios.map(
                          (portfolio) => (
                            <tr
                              key={portfolio._id}
                              className="border-b border-[#edf0f2] last:border-b-0 hover:bg-[#fbfdfd]"
                            >
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  {portfolio.featuredImage ? (
                                    <img
                                      src={
                                        portfolio.featuredImage
                                      }
                                      alt={portfolio.title}
                                      className="h-12 w-16 rounded-lg border border-[#e5eaec] object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-[#e8f7f7] text-[#159a9c]">
                                      <ImageIcon size={20} />
                                    </div>
                                  )}

                                  <div className="min-w-0">
                                    <p className="max-w-[260px] truncate text-[13px] font-semibold text-[#171b2b]">
                                      {portfolio.title}
                                    </p>

                                    <p className="mt-0.5 max-w-[260px] truncate text-[11px] text-[#707686]">
                                      {
                                        portfolio.shortDescription
                                      }
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-5 py-4 text-[13px] text-[#171b2b]">
                                {portfolio.category}
                              </td>

                              <td className="px-5 py-4 text-[13px] text-[#171b2b]">
                                {portfolio.client || "—"}
                              </td>

                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                                    portfolio.status ===
                                    "published"
                                      ? "bg-green-50 text-green-600"
                                      : "bg-amber-50 text-amber-600"
                                  }`}
                                >
                                  {portfolio.status}
                                </span>
                              </td>

                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                                    portfolio.isFeatured
                                      ? "bg-[#e8f7f7] text-[#159a9c]"
                                      : "bg-gray-100 text-[#707686]"
                                  }`}
                                >
                                  {portfolio.isFeatured
                                    ? "Yes"
                                    : "No"}
                                </span>
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex justify-end gap-1">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openViewModal(
                                        portfolio
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
                                        portfolio
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
                                      portfolio._id
                                    }
                                    onClick={() =>
                                      handleDelete(
                                        portfolio
                                      )
                                    }
                                    className="rounded-lg p-2 text-[#707686] hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                                    title="Delete"
                                  >
                                    {deletingId ===
                                    portfolio._id ? (
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

                  {/* Pagination */}
                  <div className="flex flex-col gap-3 border-t border-[#edf0f2] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[12px] text-[#707686]">
                      Page{" "}
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
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#dfe5e8] bg-white text-[#707686] hover:border-[#159a9c] hover:text-[#159a9c] disabled:opacity-40"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      <span className="min-w-[70px] text-center text-[12px] text-[#707686]">
                        {page} /{" "}
                        {pagination.totalPages || 1}
                      </span>

                      <button
                        type="button"
                        disabled={
                          page >=
                          (pagination.totalPages || 1)
                        }
                        onClick={() =>
                          setPage((current) =>
                            Math.min(
                              pagination.totalPages || 1,
                              current + 1
                            )
                          )
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#dfe5e8] bg-white text-[#707686] hover:border-[#159a9c] hover:text-[#159a9c] disabled:opacity-40"
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

      {/* CREATE / EDIT MODAL */}
      {(modal === "create" || modal === "edit") && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[94vh] w-full max-w-[820px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf0f2] px-5 py-4">
              <div>
                <h2 className="text-[17px] font-semibold text-[#171b2b]">
                  {modal === "edit"
                    ? "Edit Portfolio"
                    : "Add Portfolio"}
                </h2>

                <p className="mt-0.5 text-[11px] text-[#707686]">
                  Add project information and portfolio details.
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

                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Project Title *
                  </label>

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    maxLength={150}
                    placeholder="e.g. E-Commerce Website"
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                {/* Short Description */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Short Description *
                  </label>

                  <input
                    name="shortDescription"
                    value={form.shortDescription}
                    onChange={handleChange}
                    maxLength={300}
                    placeholder="Short project summary"
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Description *
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    maxLength={3000}
                    rows={6}
                    placeholder="Detailed project description"
                    className="w-full resize-none rounded-lg border border-[#dfe5e8] px-3 py-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />

                  <div className="mt-1 text-right text-[10px] text-[#9aa1ad]">
                    {form.description.length}/3000
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Category *
                  </label>

                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    maxLength={100}
                    placeholder="Web Development"
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                {/* Client */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Client
                  </label>

                  <input
                    name="client"
                    value={form.client}
                    onChange={handleChange}
                    maxLength={150}
                    placeholder="Client name"
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                {/* Featured Image */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Featured Image URL
                  </label>

                  <input
                    name="featuredImage"
                    value={form.featuredImage}
                    onChange={handleChange}
                    maxLength={500}
                    placeholder="https://..."
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                {/* Gallery */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Gallery Images
                  </label>

                  <div className="flex gap-2">
                    <input
                      value={galleryInput}
                      onChange={(e) =>
                        setGalleryInput(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addGalleryItem();
                        }
                      }}
                      placeholder="Image URL"
                      className="h-10 flex-1 rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                    />

                    <button
                      type="button"
                      onClick={addGalleryItem}
                      className="h-10 rounded-lg bg-[#e8f7f7] px-4 text-[12px] font-medium text-[#159a9c] hover:bg-[#d9f2f2]"
                    >
                      Add
                    </button>
                  </div>

                  {form.gallery.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {form.gallery.map(
                        (image, index) => (
                          <div
                            key={`${image}-${index}`}
                            className="flex items-center gap-2 rounded-lg border border-[#edf0f2] bg-[#fafcfc] p-2"
                          >
                            <img
                              src={image}
                              alt={`Gallery ${index + 1}`}
                              className="h-10 w-14 rounded object-cover"
                            />

                            <p className="min-w-0 flex-1 truncate text-[11px] text-[#707686]">
                              {image}
                            </p>

                            <button
                              type="button"
                              onClick={() =>
                                removeGalleryItem(index)
                              }
                              className="rounded p-1.5 text-[#707686] hover:bg-red-50 hover:text-red-500"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Technologies */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Technologies
                  </label>

                  <div className="flex gap-2">
                    <input
                      value={technologyInput}
                      onChange={(e) =>
                        setTechnologyInput(
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTechnology();
                        }
                      }}
                      placeholder="React, Node.js, MongoDB..."
                      className="h-10 flex-1 rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                    />

                    <button
                      type="button"
                      onClick={addTechnology}
                      className="h-10 rounded-lg bg-[#e8f7f7] px-4 text-[12px] font-medium text-[#159a9c] hover:bg-[#d9f2f2]"
                    >
                      Add
                    </button>
                  </div>

                  {form.technologies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {form.technologies.map(
                        (technology, index) => (
                          <span
                            key={`${technology}-${index}`}
                            className="inline-flex items-center gap-1 rounded-full bg-[#e8f7f7] px-3 py-1 text-[11px] font-medium text-[#159a9c]"
                          >
                            {technology}

                            <button
                              type="button"
                              onClick={() =>
                                removeTechnology(index)
                              }
                              className="hover:text-red-500"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Project URL */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Project URL
                  </label>

                  <input
                    name="projectUrl"
                    value={form.projectUrl}
                    onChange={handleChange}
                    maxLength={500}
                    placeholder="https://..."
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                {/* Github URL */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    GitHub URL
                  </label>

                  <input
                    name="githubUrl"
                    value={form.githubUrl}
                    onChange={handleChange}
                    maxLength={500}
                    placeholder="https://github.com/..."
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                {/* Completion Date */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Completion Date
                  </label>

                  <input
                    type="date"
                    name="completionDate"
                    value={form.completionDate}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                {/* Status */}
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
                    <option value="draft">
                      Draft
                    </option>

                    <option value="published">
                      Published
                    </option>
                  </select>
                </div>

                {/* Display Order */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Display Order
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="1"
                    name="displayOrder"
                    value={form.displayOrder}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                {/* Featured */}
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
                      Featured project
                    </span>
                  </label>
                </div>
              </div>

              {/* Footer */}
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
                    ? "Update Portfolio"
                    : "Create Portfolio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {modal === "view" && selectedPortfolio && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[92vh] w-full max-w-[760px] overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf0f2] px-5 py-4">
              <div>
                <h2 className="text-[17px] font-semibold text-[#171b2b]">
                  Portfolio Details
                </h2>

                <p className="text-[11px] text-[#707686]">
                  Complete project information.
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
              {/* Image */}
              {selectedPortfolio.featuredImage && (
                <img
                  src={selectedPortfolio.featuredImage}
                  alt={selectedPortfolio.title}
                  className="h-[260px] w-full rounded-xl object-cover"
                />
              )}

              {/* Title */}
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[21px] font-semibold text-[#171b2b]">
                      {selectedPortfolio.title}
                    </h3>

                    <p className="mt-1 text-[13px] text-[#707686]">
                      {selectedPortfolio.shortDescription}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                        selectedPortfolio.status ===
                        "published"
                          ? "bg-green-50 text-green-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {selectedPortfolio.status}
                    </span>

                    {selectedPortfolio.isFeatured && (
                      <span className="rounded-full bg-[#e8f7f7] px-3 py-1 text-[11px] font-medium text-[#159a9c]">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-[#edf0f2] p-3">
                  <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                    Category
                  </p>

                  <p className="mt-1 text-[12px] font-medium text-[#171b2b]">
                    {selectedPortfolio.category}
                  </p>
                </div>

                <div className="rounded-lg border border-[#edf0f2] p-3">
                  <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                    Client
                  </p>

                  <p className="mt-1 text-[12px] font-medium text-[#171b2b]">
                    {selectedPortfolio.client || "—"}
                  </p>
                </div>

                <div className="rounded-lg border border-[#edf0f2] p-3">
                  <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                    Display Order
                  </p>

                  <p className="mt-1 text-[12px] font-medium text-[#171b2b]">
                    {selectedPortfolio.displayOrder ?? 0}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="mb-2 text-[13px] font-semibold text-[#171b2b]">
                  Description
                </h4>

                <div className="rounded-xl bg-[#f7fafa] p-4">
                  <p className="whitespace-pre-wrap text-[13px] leading-6 text-[#171b2b]">
                    {selectedPortfolio.description}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              {Array.isArray(
                selectedPortfolio.technologies
              ) &&
                selectedPortfolio.technologies.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-[13px] font-semibold text-[#171b2b]">
                      Technologies
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {selectedPortfolio.technologies.map(
                        (technology, index) => (
                          <span
                            key={`${technology}-${index}`}
                            className="rounded-full bg-[#e8f7f7] px-3 py-1 text-[11px] font-medium text-[#159a9c]"
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Gallery */}
              {Array.isArray(
                selectedPortfolio.gallery
              ) &&
                selectedPortfolio.gallery.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-[13px] font-semibold text-[#171b2b]">
                      Gallery
                    </h4>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {selectedPortfolio.gallery.map(
                        (image, index) => (
                          <img
                            key={`${image}-${index}`}
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            className="h-32 w-full rounded-lg object-cover"
                          />
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Links */}
              {(selectedPortfolio.projectUrl ||
                selectedPortfolio.githubUrl) && (
                <div>
                  <h4 className="mb-2 text-[13px] font-semibold text-[#171b2b]">
                    Project Links
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {selectedPortfolio.projectUrl && (
                      <a
                        href={selectedPortfolio.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#e8f7f7] px-3 py-2 text-[12px] font-medium text-[#159a9c] hover:bg-[#d9f2f2]"
                      >
                        <ExternalLink size={14} />
                        Live Project
                      </a>
                    )}

                    {selectedPortfolio.githubUrl && (
                      <a
                        href={selectedPortfolio.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#f1f3f5] px-3 py-2 text-[12px] font-medium text-[#171b2b] hover:bg-[#e7eaed]"
                      >
                        <Core2 size={14} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Completion */}
              <div className="grid gap-3 border-t border-[#edf0f2] pt-4 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                    Completion Date
                  </p>

                  <p className="mt-1 text-[12px] text-[#171b2b]">
                    {selectedPortfolio.completionDate
                      ? new Date(
                          selectedPortfolio.completionDate
                        ).toLocaleDateString()
                      : "—"}
                  </p>
                </div>

                {selectedPortfolio.createdBy && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                      Created By
                    </p>

                    <p className="mt-1 text-[12px] text-[#171b2b]">
                      {
                        selectedPortfolio.createdBy
                          .fullName
                      }
                    </p>

                    {selectedPortfolio.createdBy.email && (
                      <p className="text-[11px] text-[#707686]">
                        {
                          selectedPortfolio.createdBy
                            .email
                        }
                      </p>
                    )}
                  </div>
                )}
              </div>

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

export default ManagePortfolio;