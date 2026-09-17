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
  logo: "",
  description: "",
  website: "",
  category: "",
  status: "published",
  isFeatured: false,
  displayOrder: 0,
};

const ManagePartners = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [partners, setPartners] = useState([]);
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
  const [selectedPartner, setSelectedPartner] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const redirectIfUnauthorized = (err) => {
    if (err?.status === 401 || err?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login", {
        replace: true,
      });

      return true;
    }

    return false;
  };

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch(
        `/partners/admin/all?page=${page}&limit=${PAGE_LIMIT}`
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Failed to load partners."
        );
      }

      setPartners(response.partners || []);

      setPagination(
        response.pagination || {
          page,
          limit: PAGE_LIMIT,
          total: response.partners?.length || 0,
          totalPages: 1,
        }
      );
    } catch (err) {
      console.error("Partner fetch error:", err);

      if (redirectIfUnauthorized(err)) return;

      setError(
        err?.message ||
          "Unable to load partners."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [page]);

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  const filteredPartners = useMemo(() => {
    const query = search.trim().toLowerCase();

    return partners.filter((partner) => {
      const matchesSearch =
        !query ||
        partner.name
          ?.toLowerCase()
          .includes(query) ||
        partner.slug
          ?.toLowerCase()
          .includes(query) ||
        partner.category
          ?.toLowerCase()
          .includes(query) ||
        partner.description
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        partner.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [partners, search, statusFilter]);

  const openCreateModal = () => {
    setForm(EMPTY_FORM);
    setSelectedPartner(null);
    setModal("create");
    setError("");
  };

  const openEditModal = (partner) => {
    setSelectedPartner(partner);

    setForm({
      name: partner.name || "",
      slug: partner.slug || "",
      logo: partner.logo || "",
      description: partner.description || "",
      website: partner.website || "",
      category: partner.category || "",
      status: partner.status || "published",
      isFeatured: Boolean(partner.isFeatured),
      displayOrder: partner.displayOrder ?? 0,
    });

    setModal("edit");
    setError("");
  };

  const openViewModal = async (partner) => {
    try {
      setError("");

      const response = await apiFetch(
        `/partners/admin/${partner._id}`
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Failed to load partner details."
        );
      }

      setSelectedPartner(response.partner);
      setModal("view");
    } catch (err) {
      console.error(
        "Partner details error:",
        err
      );

      if (redirectIfUnauthorized(err)) return;

      setError(
        err?.message ||
          "Unable to load partner details."
      );
    }
  };

  const closeModal = () => {
    if (saving) return;

    setModal(null);
    setSelectedPartner(null);
    setForm(EMPTY_FORM);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const name = form.name.trim();
    const description = form.description.trim();
    const category = form.category.trim();
    const slug = form.slug.trim();

    if (name.length < 2) {
      return "Partner name must be at least 2 characters.";
    }

    if (name.length > 150) {
      return "Partner name cannot exceed 150 characters.";
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

    if (slug && slug.length > 160) {
      return "Slug cannot exceed 160 characters.";
    }

    if (form.logo.trim().length > 500) {
      return "Logo path cannot exceed 500 characters.";
    }

    if (form.website.trim().length > 500) {
      return "Website URL cannot exceed 500 characters.";
    }

    const displayOrder = Number(
      form.displayOrder
    );

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
        logo: form.logo.trim(),
        description: form.description.trim(),
        website: form.website.trim(),
        category: form.category.trim(),
        status: form.status,
        isFeatured: Boolean(form.isFeatured),
        displayOrder: Number(
          form.displayOrder
        ),
      };

      let response;

      if (
        modal === "edit" &&
        selectedPartner?._id
      ) {
        response = await apiFetch(
          `/partners/admin/${selectedPartner._id}`,
          {
            method: "PUT",
            body: JSON.stringify(payload),
          }
        );
      } else {
        response = await apiFetch(
          "/partners/admin",
          {
            method: "POST",
            body: JSON.stringify(payload),
          }
        );
      }

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Failed to save partner."
        );
      }

      setSuccess(
        modal === "edit"
          ? "Partner updated successfully."
          : "Partner created successfully."
      );

      closeModal();

      await fetchPartners();
    } catch (err) {
      console.error(
        "Save partner error:",
        err
      );

      if (redirectIfUnauthorized(err)) return;

      setError(
        err?.message ||
          "Unable to save partner."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (partner) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${partner.name}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(partner._id);
      setError("");
      setSuccess("");

      const response = await apiFetch(
        `/partners/admin/${partner._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Failed to delete partner."
        );
      }

      setSuccess(
        "Partner deleted successfully."
      );

      if (
        partners.length === 1 &&
        page > 1
      ) {
        setPage((current) => current - 1);
      } else {
        await fetchPartners();
      }
    } catch (err) {
      console.error(
        "Delete partner error:",
        err
      );

      if (redirectIfUnauthorized(err)) return;

      setError(
        err?.message ||
          "Unable to delete partner."
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
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">

            {/* PAGE HEADER */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-[24px] font-semibold text-[#171b2b]">
                  Manage Partners
                </h1>

                <p className="mt-1 text-[13px] text-[#707686]">
                  Manage company and business partners displayed on the website.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fetchPartners}
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
                  Add Partner
                </button>
              </div>
            </div>

            {/* ERROR */}
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

            {/* SUCCESS */}
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
                    placeholder="Search partner..."
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] bg-white pl-10 pr-3 text-[13px] text-[#171b2b] outline-none focus:border-[#159a9c]"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
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

                  <option value="archived">
                    Archived
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
                      Loading partners...
                    </p>
                  </div>
                </div>
              ) : filteredPartners.length ===
                0 ? (
                <div className="flex min-h-[300px] items-center justify-center px-5 text-center">
                  <div>
                    <p className="text-[15px] font-medium text-[#171b2b]">
                      No partners found
                    </p>

                    <p className="mt-1 text-[13px] text-[#707686]">
                      Try changing your filters or add a new partner.
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
                            Partner
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
                        {filteredPartners.map(
                          (partner) => (
                            <tr
                              key={partner._id}
                              className="border-b border-[#edf0f2] last:border-b-0 hover:bg-[#fbfdfd]"
                            >
                              {/* PARTNER */}
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  {partner.logo ? (
                                    <img
                                      src={
                                        partner.logo
                                      }
                                      alt={
                                        partner.name
                                      }
                                      className="h-11 w-11 rounded-lg border border-[#e5eaec] bg-white object-contain p-1.5"
                                    />
                                  ) : (
                                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#e8f7f7] text-[14px] font-semibold text-[#159a9c]">
                                      {partner.name
                                        ?.charAt(
                                          0
                                        )
                                        ?.toUpperCase() ||
                                        "P"}
                                    </div>
                                  )}

                                  <div className="min-w-0">
                                    <p className="max-w-[260px] truncate text-[13px] font-semibold text-[#171b2b]">
                                      {
                                        partner.name
                                      }
                                    </p>

                                    <p className="mt-0.5 max-w-[260px] truncate text-[11px] text-[#707686]">
                                      /
                                      {
                                        partner.slug
                                      }
                                    </p>
                                  </div>
                                </div>
                              </td>

                              {/* CATEGORY */}
                              <td className="px-5 py-4 text-[13px] text-[#171b2b]">
                                {
                                  partner.category
                                }
                              </td>

                              {/* STATUS */}
                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                                    partner.status ===
                                    "published"
                                      ? "bg-green-50 text-green-600"
                                      : partner.status ===
                                        "archived"
                                      ? "bg-gray-100 text-[#707686]"
                                      : "bg-amber-50 text-amber-600"
                                  }`}
                                >
                                  {
                                    partner.status
                                  }
                                </span>
                              </td>

                              {/* FEATURED */}
                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                                    partner.isFeatured
                                      ? "bg-[#e8f7f7] text-[#159a9c]"
                                      : "bg-gray-100 text-[#707686]"
                                  }`}
                                >
                                  {partner.isFeatured
                                    ? "Yes"
                                    : "No"}
                                </span>
                              </td>

                              {/* ORDER */}
                              <td className="px-5 py-4 text-[13px] text-[#171b2b]">
                                {
                                  partner.displayOrder
                                }
                              </td>

                              {/* ACTIONS */}
                              <td className="px-5 py-4">
                                <div className="flex justify-end gap-1">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openViewModal(
                                        partner
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
                                        partner
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
                                      partner._id
                                    }
                                    onClick={() =>
                                      handleDelete(
                                        partner
                                      )
                                    }
                                    className="rounded-lg p-2 text-[#707686] hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                                    title="Delete"
                                  >
                                    {deletingId ===
                                    partner._id ? (
                                      <RefreshCw
                                        size={16}
                                        className="animate-spin"
                                      />
                                    ) : (
                                      <Trash2
                                        size={16}
                                      />
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
                    ? "Edit Partner"
                    : "Add Partner"}
                </h2>

                <p className="mt-0.5 text-[11px] text-[#707686]">
                  Manage partner information and visibility.
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
                    Partner Name *
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    maxLength={150}
                    placeholder="Partner name"
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
                    placeholder="Technology Partner"
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
                    maxLength={160}
                    placeholder="partner-name"
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />

                  <p className="mt-1 text-[10px] text-[#9aa1ad]">
                    Leave empty while creating to generate the slug from the partner name.
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
                    placeholder="Describe the partnership..."
                    className="w-full resize-none rounded-lg border border-[#dfe5e8] px-3 py-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />

                  <div className="mt-1 text-right text-[10px] text-[#9aa1ad]">
                    {form.description.length}/1000
                  </div>
                </div>

                {/* LOGO */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Logo URL / Path
                  </label>

                  <input
                    name="logo"
                    value={form.logo}
                    onChange={handleChange}
                    maxLength={500}
                    placeholder="/images/partner-logo.png"
                    className="h-10 w-full rounded-lg border border-[#dfe5e8] px-3 text-[13px] outline-none focus:border-[#159a9c]"
                  />
                </div>

                {/* WEBSITE */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-[#171b2b]">
                    Website URL
                  </label>

                  <input
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    maxLength={500}
                    placeholder="https://example.com"
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

                    <option value="archived">
                      Archived
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
                      Featured partner
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
                    ? "Update Partner"
                    : "Create Partner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {modal === "view" &&
        selectedPartner && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[92vh] w-full max-w-[700px] overflow-y-auto rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#edf0f2] px-5 py-4">
                <div>
                  <h2 className="text-[17px] font-semibold text-[#171b2b]">
                    Partner Details
                  </h2>

                  <p className="text-[11px] text-[#707686]">
                    Complete partner information.
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
                  {selectedPartner.logo ? (
                    <img
                      src={
                        selectedPartner.logo
                      }
                      alt={
                        selectedPartner.name
                      }
                      className="h-24 w-24 rounded-xl border border-[#e5eaec] bg-white object-contain p-2"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[#e8f7f7] text-[28px] font-semibold text-[#159a9c]">
                      {selectedPartner.name
                        ?.charAt(0)
                        ?.toUpperCase() ||
                        "P"}
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[21px] font-semibold text-[#171b2b]">
                        {
                          selectedPartner.name
                        }
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          selectedPartner.status ===
                          "published"
                            ? "bg-green-50 text-green-600"
                            : selectedPartner.status ===
                              "archived"
                            ? "bg-gray-100 text-[#707686]"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {
                          selectedPartner.status
                        }
                      </span>

                      {selectedPartner.isFeatured && (
                        <span className="rounded-full bg-[#e8f7f7] px-2.5 py-1 text-[11px] font-medium text-[#159a9c]">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-[12px] text-[#707686]">
                      /{selectedPartner.slug}
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
                        selectedPartner.category
                      }
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#edf0f2] p-3">
                    <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                      Display Order
                    </p>

                    <p className="mt-1 text-[12px] font-medium text-[#171b2b]">
                      {
                        selectedPartner.displayOrder
                      }
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#edf0f2] p-3">
                    <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                      Slug
                    </p>

                    <p className="mt-1 truncate text-[12px] font-medium text-[#171b2b]">
                      {
                        selectedPartner.slug
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
                        selectedPartner.description
                      }
                    </p>
                  </div>
                </div>

                {/* WEBSITE */}
                {selectedPartner.website && (
                  <div>
                    <h4 className="mb-2 text-[13px] font-semibold text-[#171b2b]">
                      Website
                    </h4>

                    <a
                      href={
                        selectedPartner.website
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-[#dfe5e8] px-3 py-2 text-[12px] text-[#159a9c] hover:border-[#159a9c]"
                    >
                      Visit Website
                      <ExternalLink
                        size={14}
                      />
                    </a>

                    <p className="mt-2 break-all text-[11px] text-[#707686]">
                      {
                        selectedPartner.website
                      }
                    </p>
                  </div>
                )}

                {/* LOGO */}
                {selectedPartner.logo && (
                  <div>
                    <h4 className="mb-2 text-[13px] font-semibold text-[#171b2b]">
                      Logo
                    </h4>

                    <img
                      src={
                        selectedPartner.logo
                      }
                      alt={
                        selectedPartner.name
                      }
                      className="max-h-[180px] w-full rounded-xl bg-[#f7fafa] object-contain p-5"
                    />
                  </div>
                )}

                {/* CREATED BY */}
                {selectedPartner.createdBy && (
                  <div className="border-t border-[#edf0f2] pt-4">
                    <p className="text-[10px] uppercase tracking-wide text-[#9aa1ad]">
                      Created By
                    </p>

                    <p className="mt-1 text-[12px] font-medium text-[#171b2b]">
                      {
                        selectedPartner
                          .createdBy.fullName
                      }
                    </p>

                    {selectedPartner.createdBy
                      .email && (
                      <p className="text-[11px] text-[#707686]">
                        {
                          selectedPartner
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

export default ManagePartners;