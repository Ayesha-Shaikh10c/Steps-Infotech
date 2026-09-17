import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { apiFetch } from "../../lib/api";

const EMPTY_FORM = {
  title: "",
  shortDescription: "",
  description: "",
  icon: "",
  image: "",
  technologies: [],
  features: [],
  category: "",
  status: "draft",
  isFeatured: false,
  displayOrder: 0,
};

const PAGE_LIMIT = 10;

const ManageServices = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGE_LIMIT,
    total: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modal, setModal] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const [technologyInput, setTechnologyInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  const handleAuthError = (err) => {
    if (err?.status === 401 || err?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
      return true;
    }

    return false;
  };

  const fetchServices = async (page = pagination.page) => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch(
        `/services/admin/all?page=${page}&limit=${PAGE_LIMIT}`
      );

      if (!response?.success) {
        throw new Error(response?.message || "Failed to load services.");
      }

      setServices(Array.isArray(response.services) ? response.services : []);

      setPagination(
        response.pagination || {
          page,
          limit: PAGE_LIMIT,
          total: 0,
          totalPages: 0,
        }
      );
    } catch (err) {
      console.error("Fetch services error:", err);

      if (handleAuthError(err)) return;

      setError(err?.message || "Unable to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    fetchServices(1);
  }, []);

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesSearch =
        !query ||
        service.title?.toLowerCase().includes(query) ||
        service.category?.toLowerCase().includes(query) ||
        service.shortDescription?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || service.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [services, search, statusFilter]);

  const openCreateModal = () => {
    setSelectedService(null);
    setForm({ ...EMPTY_FORM, technologies: [], features: [] });
    setTechnologyInput("");
    setFeatureInput("");
    setError("");
    setSuccess("");
    setModal("create");
  };

  const openEditModal = (service) => {
    setSelectedService(service);

    setForm({
      title: service.title || "",
      shortDescription: service.shortDescription || "",
      description: service.description || "",
      icon: service.icon || "",
      image: service.image || "",
      technologies: Array.isArray(service.technologies)
        ? service.technologies
        : [],
      features: Array.isArray(service.features) ? service.features : [],
      category: service.category || "",
      status: service.status || "draft",
      isFeatured: Boolean(service.isFeatured),
      displayOrder: service.displayOrder ?? 0,
    });

    setTechnologyInput("");
    setFeatureInput("");
    setError("");
    setSuccess("");
    setModal("edit");
  };

  const closeModal = () => {
    if (saving) return;

    setModal(null);
    setSelectedService(null);
    setForm(EMPTY_FORM);
    setTechnologyInput("");
    setFeatureInput("");
  };

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTechnology = () => {
    const value = technologyInput.trim();

    if (!value) return;

    if (form.technologies.includes(value)) {
      setTechnologyInput("");
      return;
    }

    setForm((prev) => ({
      ...prev,
      technologies: [...prev.technologies, value],
    }));

    setTechnologyInput("");
  };

  const removeTechnology = (index) => {
    setForm((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const addFeature = () => {
    const value = featureInput.trim();

    if (!value) return;

    if (form.features.includes(value)) {
      setFeatureInput("");
      return;
    }

    setForm((prev) => ({
      ...prev,
      features: [...prev.features, value],
    }));

    setFeatureInput("");
  };

  const removeFeature = (index) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleArrayKeyDown = (event, callback) => {
    if (event.key === "Enter") {
      event.preventDefault();
      callback();
    }
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Service title is required.";
    if (!form.shortDescription.trim())
      return "Short description is required.";
    if (!form.description.trim()) return "Description is required.";
    if (!form.category.trim()) return "Category is required.";

    const displayOrder = Number(form.displayOrder);

    if (!Number.isFinite(displayOrder) || displayOrder < 0) {
      return "Display order must be a non-negative number.";
    }

    if (!Number.isInteger(displayOrder)) {
      return "Display order must be a whole number.";
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
        shortDescription: form.shortDescription.trim(),
        description: form.description.trim(),
        icon: form.icon.trim(),
        image: form.image.trim(),
        technologies: form.technologies,
        features: form.features,
        category: form.category.trim(),
        status: form.status,
        isFeatured: Boolean(form.isFeatured),
        displayOrder: Number(form.displayOrder),
      };

      let response;

      if (modal === "edit" && selectedService?._id) {
        response = await apiFetch(`/services/admin/${selectedService._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        response = await apiFetch("/services/admin", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      if (!response?.success) {
        throw new Error(response?.message || "Unable to save service.");
      }

      setSuccess(
        modal === "edit"
          ? "Service updated successfully."
          : "Service created successfully."
      );

      closeModal();
      await fetchServices(pagination.page);
    } catch (err) {
      console.error("Save service error:", err);

      if (handleAuthError(err)) return;

      setError(err?.message || "Unable to save service.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (service) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${service.title}"?`
    );

    if (!confirmed) return;

    try {
      setActionLoading(`delete-${service._id}`);
      setError("");
      setSuccess("");

      const response = await apiFetch(`/services/admin/${service._id}`, {
        method: "DELETE",
      });

      if (!response?.success) {
        throw new Error(response?.message || "Unable to delete service.");
      }

      setSuccess("Service deleted successfully.");

      const nextPage =
        services.length === 1 && pagination.page > 1
          ? pagination.page - 1
          : pagination.page;

      await fetchServices(nextPage);
    } catch (err) {
      console.error("Delete service error:", err);

      if (handleAuthError(err)) return;

      setError(err?.message || "Unable to delete service.");
    } finally {
      setActionLoading("");
    }
  };

  const handleView = async (service) => {
    try {
      setActionLoading(`view-${service._id}`);
      setError("");

      const response = await apiFetch(`/services/admin/${service._id}`);

      if (!response?.success) {
        throw new Error(response?.message || "Unable to load service.");
      }

      setSelectedService(response.service);
      setModal("view");
    } catch (err) {
      console.error("View service error:", err);

      if (handleAuthError(err)) return;

      setError(err?.message || "Unable to load service.");
    } finally {
      setActionLoading("");
    }
  };

  const goToPage = (page) => {
    if (loading) return;
    if (page < 1 || page > pagination.totalPages) return;

    setSearch("");
    setStatusFilter("all");
    fetchServices(page);
  };

  const renderStatus = (status) => {
    const published = status === "published";

    return (
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
          published
            ? "bg-emerald-50 text-emerald-700"
            : "bg-amber-50 text-amber-700"
        }`}
      >
        {published ? "Published" : "Draft"}
      </span>
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
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            {/* Heading */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-[#159a9c]">
                  Content Management
                </p>

                <h1 className="text-2xl font-bold text-[#171b2b] sm:text-3xl">
                  Manage Services
                </h1>

                <p className="mt-1 text-sm text-[#707686]">
                  Create, update, publish and manage company services.
                </p>
              </div>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center justify-center rounded-xl bg-[#159a9c] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#128688]"
              >
                + Add Service
              </button>
            </div>

            {/* Alerts */}
            {error && (
              <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {success}
              </div>
            )}

            {/* Filters */}
            <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search services..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#171b2b] outline-none transition focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#171b2b] outline-none focus:border-[#159a9c]"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>

                <button
                  type="button"
                  onClick={() => fetchServices(pagination.page)}
                  className="rounded-xl border border-[#159a9c] px-5 py-3 text-sm font-semibold text-[#159a9c] transition hover:bg-[#159a9c] hover:text-white"
                >
                  Refresh
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full">
                  <thead className="border-b border-gray-100 bg-[#fafcfc]">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                        Service
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                        Category
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                        Status
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                        Featured
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#707686]">
                        Order
                      </th>
                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#707686]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {loading ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index}>
                          <td colSpan="6" className="px-5 py-5">
                            <div className="h-5 w-full animate-pulse rounded bg-gray-100" />
                          </td>
                        </tr>
                      ))
                    ) : filteredServices.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-5 py-12 text-center">
                          <p className="text-sm font-medium text-[#171b2b]">
                            No services found
                          </p>
                          <p className="mt-1 text-xs text-[#707686]">
                            Try changing your search or filters.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredServices.map((service) => (
                        <tr
                          key={service._id}
                          className="transition hover:bg-[#fafcfc]"
                        >
                          <td className="px-5 py-4">
                            <div className="flex min-w-[250px] items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#159a9c]/10 text-sm font-bold text-[#159a9c]">
                                {service.image ? (
                                  <img
                                    src={service.image}
                                    alt={service.title}
                                    className="h-full w-full object-cover"
                                  />
                                ) : service.icon ? (
                                  service.icon
                                ) : (
                                  service.title?.charAt(0)?.toUpperCase() || "S"
                                )}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-[#171b2b]">
                                  {service.title}
                                </p>
                                <p className="mt-1 max-w-[320px] truncate text-xs text-[#707686]">
                                  {service.shortDescription}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4 text-sm text-[#171b2b]">
                            {service.category}
                          </td>

                          <td className="px-5 py-4">
                            {renderStatus(service.status)}
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`text-sm font-medium ${
                                service.isFeatured
                                  ? "text-[#159a9c]"
                                  : "text-[#707686]"
                              }`}
                            >
                              {service.isFeatured ? "Yes" : "No"}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-sm text-[#171b2b]">
                            {service.displayOrder ?? 0}
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleView(service)}
                                disabled={
                                  actionLoading === `view-${service._id}`
                                }
                                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-[#171b2b] transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:opacity-50"
                              >
                                View
                              </button>

                              <button
                                type="button"
                                onClick={() => openEditModal(service)}
                                className="rounded-lg border border-[#159a9c]/20 bg-[#159a9c]/5 px-3 py-2 text-xs font-semibold text-[#159a9c] transition hover:bg-[#159a9c] hover:text-white"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDelete(service)}
                                disabled={
                                  actionLoading === `delete-${service._id}`
                                }
                                className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-50"
                              >
                                Delete
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
              {!loading && pagination.totalPages > 0 && (
                <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-[#707686]">
                    Page {pagination.page} of {pagination.totalPages} ·{" "}
                    {pagination.total} total services
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => goToPage(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-[#171b2b] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>

                    <span className="rounded-lg bg-[#159a9c]/10 px-3 py-2 text-xs font-semibold text-[#159a9c]">
                      {pagination.page}
                    </span>

                    <button
                      type="button"
                      onClick={() => goToPage(pagination.page + 1)}
                      disabled={pagination.page >= pagination.totalPages}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-[#171b2b] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* CREATE / EDIT MODAL */}
      {(modal === "create" || modal === "edit") && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#171b2b]">
                  {modal === "edit" ? "Edit Service" : "Create Service"}
                </h2>
                <p className="mt-1 text-xs text-[#707686]">
                  Manage service information and publishing settings.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="text-xl text-[#707686] hover:text-[#171b2b]"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Title *">
                  <input
                    value={form.title}
                    onChange={(e) => updateForm("title", e.target.value)}
                    maxLength={150}
                    placeholder="Web Development"
                    className={inputClass}
                  />
                </Field>

                <Field label="Category *">
                  <input
                    value={form.category}
                    onChange={(e) => updateForm("category", e.target.value)}
                    maxLength={100}
                    placeholder="Development"
                    className={inputClass}
                  />
                </Field>

                <Field label="Short Description *">
                  <input
                    value={form.shortDescription}
                    onChange={(e) =>
                      updateForm("shortDescription", e.target.value)
                    }
                    maxLength={300}
                    placeholder="Short service summary"
                    className={inputClass}
                  />
                </Field>

                <Field label="Display Order">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={form.displayOrder}
                    onChange={(e) =>
                      updateForm("displayOrder", e.target.value)
                    }
                    className={inputClass}
                  />
                </Field>

                <Field label="Icon">
                  <input
                    value={form.icon}
                    onChange={(e) => updateForm("icon", e.target.value)}
                    maxLength={500}
                    placeholder="Icon name / icon URL"
                    className={inputClass}
                  />
                </Field>

                <Field label="Image">
                  <input
                    value={form.image}
                    onChange={(e) => updateForm("image", e.target.value)}
                    maxLength={500}
                    placeholder="Image URL"
                    className={inputClass}
                  />
                </Field>

                <Field label="Status">
                  <select
                    value={form.status}
                    onChange={(e) => updateForm("status", e.target.value)}
                    className={inputClass}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </Field>

                <Field label="Featured">
                  <label className="flex h-[46px] cursor-pointer items-center gap-3 rounded-xl border border-gray-200 px-4">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(e) =>
                        updateForm("isFeatured", e.target.checked)
                      }
                      className="h-4 w-4 accent-[#159a9c]"
                    />
                    <span className="text-sm text-[#171b2b]">
                      Show as featured service
                    </span>
                  </label>
                </Field>
              </div>

              <Field label="Description *">
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    updateForm("description", e.target.value)
                  }
                  maxLength={5000}
                  rows={6}
                  placeholder="Describe this service..."
                  className={`${inputClass} resize-none`}
                />
              </Field>

              <ArrayField
                label="Technologies"
                value={technologyInput}
                setValue={setTechnologyInput}
                items={form.technologies}
                onAdd={addTechnology}
                onRemove={removeTechnology}
                placeholder="React, Node.js, MongoDB..."
                onKeyDown={(e) =>
                  handleArrayKeyDown(e, addTechnology)
                }
              />

              <ArrayField
                label="Features"
                value={featureInput}
                setValue={setFeatureInput}
                items={form.features}
                onAdd={addFeature}
                onRemove={removeFeature}
                placeholder="Responsive design, SEO, Support..."
                onKeyDown={(e) => handleArrayKeyDown(e, addFeature)}
              />

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-[#171b2b] hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#159a9c] px-5 py-3 text-sm font-semibold text-white hover:bg-[#128688] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : modal === "edit"
                    ? "Update Service"
                    : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {modal === "view" && selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#171b2b]">
                  Service Details
                </h2>
                <p className="mt-1 text-xs text-[#707686]">
                  Complete service information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="text-xl text-[#707686] hover:text-[#171b2b]"
              >
                ×
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#159a9c]/10 text-xl font-bold text-[#159a9c]">
                  {selectedService.image ? (
                    <img
                      src={selectedService.image}
                      alt={selectedService.title}
                      className="h-full w-full object-cover"
                    />
                  ) : selectedService.icon ? (
                    selectedService.icon
                  ) : (
                    selectedService.title?.charAt(0)?.toUpperCase() || "S"
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#171b2b]">
                    {selectedService.title}
                  </h3>

                  <p className="mt-1 text-sm text-[#707686]">
                    {selectedService.shortDescription}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {renderStatus(selectedService.status)}

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-[#707686]">
                      {selectedService.category}
                    </span>

                    {selectedService.isFeatured && (
                      <span className="rounded-full bg-[#159a9c]/10 px-3 py-1 text-xs font-semibold text-[#159a9c]">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <DetailBlock
                title="Description"
                value={selectedService.description}
              />

              <DetailBlock
                title="Icon"
                value={selectedService.icon || "Not provided"}
              />

              <DetailBlock
                title="Image"
                value={selectedService.image || "Not provided"}
              />

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#707686]">
                  Technologies
                </p>

                <TagList
                  items={selectedService.technologies}
                  emptyText="No technologies added."
                />
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#707686]">
                  Features
                </p>

                <TagList
                  items={selectedService.features}
                  emptyText="No features added."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <DetailBlock
                  title="Display Order"
                  value={String(selectedService.displayOrder ?? 0)}
                />

                <DetailBlock
                  title="Created By"
                  value={
                    selectedService.createdBy?.fullName ||
                    "Admin"
                  }
                />
              </div>

              <div className="flex justify-end border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => openEditModal(selectedService)}
                  className="rounded-xl bg-[#159a9c] px-5 py-3 text-sm font-semibold text-white hover:bg-[#128688]"
                >
                  Edit Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const inputClass =
  "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#171b2b] outline-none transition placeholder:text-[#a0a6b2] focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10";

const Field = ({ label, children }) => (
  <div>
    <label className="mb-2 block text-xs font-semibold text-[#171b2b]">
      {label}
    </label>
    {children}
  </div>
);

const ArrayField = ({
  label,
  value,
  setValue,
  items,
  onAdd,
  onRemove,
  placeholder,
  onKeyDown,
}) => (
  <div>
    <label className="mb-2 block text-xs font-semibold text-[#171b2b]">
      {label}
    </label>

    <div className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        maxLength={200}
        placeholder={placeholder}
        className={inputClass}
      />

      <button
        type="button"
        onClick={onAdd}
        className="shrink-0 rounded-xl bg-[#159a9c] px-4 text-sm font-semibold text-white hover:bg-[#128688]"
      >
        Add
      </button>
    </div>

    {items?.length > 0 && (
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#159a9c]/10 px-3 py-1.5 text-xs font-medium text-[#159a9c]"
          >
            {item}

            <button
              type="button"
              onClick={() => onRemove(index)}
              className="font-bold hover:text-red-600"
              aria-label={`Remove ${item}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    )}
  </div>
);

const DetailBlock = ({ title, value }) => (
  <div>
    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#707686]">
      {title}
    </p>
    <p className="whitespace-pre-wrap break-words text-sm leading-6 text-[#171b2b]">
      {value || "Not provided"}
    </p>
  </div>
);

const TagList = ({ items, emptyText }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return <p className="text-sm text-[#707686]">{emptyText}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-[#171b2b]"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default ManageServices;