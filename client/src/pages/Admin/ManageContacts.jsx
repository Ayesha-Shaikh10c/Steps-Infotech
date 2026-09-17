import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiEye,
  FiTrash2,
  FiRefreshCw,
  FiX,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMessageSquare,
  FiEdit3,
} from "react-icons/fi";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { apiFetch } from "../../lib/api";

const STATUS_OPTIONS = ["all", "new", "read", "replied"];

const statusStyles = {
  new: "bg-blue-50 text-blue-700 border-blue-100",
  read: "bg-amber-50 text-amber-700 border-amber-100",
  replied: "bg-green-50 text-green-700 border-green-100",
};

const statusLabel = {
  new: "New",
  read: "Read",
  replied: "Replied",
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (!parts.length) return "U";

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const ManageContacts = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [selectedContact, setSelectedContact] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  const [editContact, setEditContact] = useState(null);
  const [editStatus, setEditStatus] = useState("new");
  const [adminNotes, setAdminNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleUnauthorized = (err) => {
    if (err?.status === 401 || err?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login", { replace: true });

      return true;
    }

    return false;
  };

  const fetchContacts = async ({ refresh = false } = {}) => {
    try {
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await apiFetch(
        `/contacts/admin/all?page=${page}&limit=${limit}`
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to fetch contact messages."
        );
      }

      setContacts(Array.isArray(response.data) ? response.data : []);

      setPagination(
        response.pagination || {
          page,
          limit,
          total: response.data?.length || 0,
          totalPages: 1,
        }
      );
    } catch (err) {
      console.error("Manage contacts error:", err);

      if (handleUnauthorized(err)) {
        return;
      }

      setError(
        err?.message || "Unable to load contact messages."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [page]);

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [success]);

  const filteredContacts = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return contacts.filter((contact) => {
      const matchesStatus =
        statusFilter === "all" ||
        contact.status === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (!searchValue) {
        return true;
      }

      return [
        contact.fullName,
        contact.email,
        contact.phone,
        contact.subject,
        contact.message,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(searchValue)
      );
    });
  }, [contacts, search, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: pagination.total || 0,
      newCount: contacts.filter(
        (contact) => contact.status === "new"
      ).length,
      readCount: contacts.filter(
        (contact) => contact.status === "read"
      ).length,
      repliedCount: contacts.filter(
        (contact) => contact.status === "replied"
      ).length,
    };
  }, [contacts, pagination.total]);

  const handlePageChange = (nextPage) => {
    if (
      nextPage < 1 ||
      nextPage > (pagination.totalPages || 1) ||
      nextPage === page
    ) {
      return;
    }

    setPage(nextPage);
  };

  const handleView = async (id) => {
    try {
      setViewLoading(true);
      setError("");

      const response = await apiFetch(
        `/contacts/admin/${id}`
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to fetch contact message."
        );
      }

      setSelectedContact(response.data);
    } catch (err) {
      console.error("View contact error:", err);

      if (handleUnauthorized(err)) {
        return;
      }

      setError(
        err?.message || "Unable to fetch contact message."
      );
    } finally {
      setViewLoading(false);
    }
  };

  const openEditModal = (contact) => {
    setEditContact(contact);
    setEditStatus(contact?.status || "new");
    setAdminNotes(contact?.adminNotes || "");
  };

  const handleUpdate = async () => {
    if (!editContact?._id) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await apiFetch(
        `/contacts/admin/${editContact._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            status: editStatus,
            adminNotes,
          }),
        }
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to update contact."
        );
      }

      const updatedContact = response.data;

      setContacts((prev) =>
        prev.map((contact) =>
          contact._id === updatedContact._id
            ? updatedContact
            : contact
        )
      );

      if (
        selectedContact?._id === updatedContact._id
      ) {
        setSelectedContact(updatedContact);
      }

      setEditContact(null);
      setSuccess(
        response.message || "Contact updated successfully."
      );
    } catch (err) {
      console.error("Update contact error:", err);

      if (handleUnauthorized(err)) {
        return;
      }

      setError(
        err?.message || "Unable to update contact message."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?._id) return;

    try {
      setDeleting(true);
      setError("");
      setSuccess("");

      const response = await apiFetch(
        `/contacts/admin/${deleteTarget._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to delete contact."
        );
      }

      setContacts((prev) =>
        prev.filter(
          (contact) =>
            contact._id !== deleteTarget._id
        )
      );

      if (
        selectedContact?._id === deleteTarget._id
      ) {
        setSelectedContact(null);
      }

      setDeleteTarget(null);

      setSuccess(
        response.message ||
          "Contact message deleted successfully."
      );

      if (
        contacts.length === 1 &&
        page > 1
      ) {
        setPage((prev) => Math.max(prev - 1, 1));
      } else {
        fetchContacts({ refresh: true });
      }
    } catch (err) {
      console.error("Delete contact error:", err);

      if (handleUnauthorized(err)) {
        return;
      }

      setError(
        err?.message || "Unable to delete contact message."
      );
    } finally {
      setDeleting(false);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
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
            <div className="mb-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-[#171b2b]">
                    Contact Messages
                  </h1>

                  <p className="mt-1 text-sm text-[#707686]">
                    Manage and respond to messages
                    submitted through the contact form.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    fetchContacts({ refresh: true })
                  }
                  disabled={refreshing}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dfe7e7] bg-white px-4 py-2.5 text-sm font-medium text-[#171b2b] shadow-sm transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiRefreshCw
                    className={
                      refreshing
                        ? "animate-spin"
                        : ""
                    }
                  />
                  Refresh
                </button>
              </div>
            </div>

            {/* ALERTS */}
            {error && (
              <div className="mb-5 flex items-start justify-between gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                <span>{error}</span>

                <button
                  type="button"
                  onClick={() => setError("")}
                  className="shrink-0 text-red-500 hover:text-red-700"
                >
                  <FiX size={18} />
                </button>
              </div>
            )}

            {success && (
              <div className="mb-5 flex items-start justify-between gap-3 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
                <span>{success}</span>

                <button
                  type="button"
                  onClick={() => setSuccess("")}
                  className="shrink-0 text-green-500 hover:text-green-700"
                >
                  <FiX size={18} />
                </button>
              </div>
            )}

            {/* STATS */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-[#e5ebeb] bg-white p-5 shadow-sm">
                <p className="text-sm text-[#707686]">
                  Total Messages
                </p>

                <p className="mt-2 text-2xl font-semibold text-[#171b2b]">
                  {pagination.total || 0}
                </p>
              </div>

              <div className="rounded-2xl border border-[#e5ebeb] bg-white p-5 shadow-sm">
                <p className="text-sm text-[#707686]">
                  New
                </p>

                <p className="mt-2 text-2xl font-semibold text-blue-700">
                  {stats.newCount}
                </p>
              </div>

              <div className="rounded-2xl border border-[#e5ebeb] bg-white p-5 shadow-sm">
                <p className="text-sm text-[#707686]">
                  Read
                </p>

                <p className="mt-2 text-2xl font-semibold text-amber-700">
                  {stats.readCount}
                </p>
              </div>

              <div className="rounded-2xl border border-[#e5ebeb] bg-white p-5 shadow-sm">
                <p className="text-sm text-[#707686]">
                  Replied
                </p>

                <p className="mt-2 text-2xl font-semibold text-green-700">
                  {stats.repliedCount}
                </p>
              </div>
            </div>

            {/* TABLE CARD */}
            <div className="overflow-hidden rounded-2xl border border-[#e5ebeb] bg-white shadow-sm">
              {/* FILTER BAR */}
              <div className="border-b border-[#edf1f1] p-4 sm:p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="relative w-full lg:max-w-[440px]">
                    <FiSearch
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa1ad]"
                      size={18}
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                      }}
                      placeholder="Search by name, email, subject..."
                      className="h-11 w-full rounded-xl border border-[#dfe7e7] bg-[#fbfcfc] pl-10 pr-4 text-sm text-[#171b2b] outline-none transition placeholder:text-[#a0a6b0] focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setPage(1);
                      }}
                      className="h-11 rounded-xl border border-[#dfe7e7] bg-white px-4 text-sm text-[#171b2b] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                    >
                      {STATUS_OPTIONS.map(
                        (status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status === "all"
                              ? "All Status"
                              : statusLabel[status]}
                          </option>
                        )
                      )}
                    </select>

                    {(search ||
                      statusFilter !== "all") && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="h-11 rounded-xl border border-[#dfe7e7] bg-white px-4 text-sm font-medium text-[#707686] transition hover:border-[#159a9c] hover:text-[#159a9c]"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              {loading ? (
                <div className="space-y-3 p-5">
                  {[1, 2, 3, 4, 5].map(
                    (item) => (
                      <div
                        key={item}
                        className="h-20 animate-pulse rounded-xl bg-[#f2f5f5]"
                      />
                    )
                  )}
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center px-5 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f7f7] text-[#159a9c]">
                    <FiMessageSquare size={25} />
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-[#171b2b]">
                    No contact messages found
                  </h3>

                  <p className="mt-1 max-w-md text-sm text-[#707686]">
                    Try changing your search or
                    status filter.
                  </p>
                </div>
              ) : (
                <>
                  {/* DESKTOP TABLE */}
                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-[850px]">
                      <thead>
                        <tr className="border-b border-[#edf1f1] bg-[#fbfcfc] text-left">
                          <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#707686]">
                            Contact
                          </th>

                          <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#707686]">
                            Subject
                          </th>

                          <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#707686]">
                            Status
                          </th>

                          <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#707686]">
                            Received
                          </th>

                          <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[#707686]">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredContacts.map(
                          (contact) => (
                            <tr
                              key={contact._id}
                              className="border-b border-[#f0f3f3] last:border-b-0 hover:bg-[#fbfdfd]"
                            >
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f7f7] text-sm font-semibold text-[#159a9c]">
                                    {getInitials(
                                      contact.fullName
                                    )}
                                  </div>

                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-[#171b2b]">
                                      {
                                        contact.fullName
                                      }
                                    </p>

                                    <p className="mt-0.5 truncate text-xs text-[#707686]">
                                      {contact.email}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="max-w-[230px] px-5 py-4">
                                <p className="truncate text-sm font-medium text-[#171b2b]">
                                  {contact.subject}
                                </p>

                                <p className="mt-1 truncate text-xs text-[#707686]">
                                  {contact.message}
                                </p>
                              </td>

                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
                                    statusStyles[
                                      contact.status
                                    ] ||
                                    "bg-gray-50 text-gray-700 border-gray-100"
                                  }`}
                                >
                                  {statusLabel[
                                    contact.status
                                  ] ||
                                    contact.status}
                                </span>
                              </td>

                              <td className="whitespace-nowrap px-5 py-4 text-sm text-[#707686]">
                                {formatDate(
                                  contact.createdAt
                                )}
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex justify-end gap-2">
                                  <button
                                    type="button"
                                    title="View"
                                    onClick={() =>
                                      handleView(
                                        contact._id
                                      )
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dfe7e7] bg-white text-[#707686] transition hover:border-[#159a9c] hover:text-[#159a9c]"
                                  >
                                    <FiEye size={16} />
                                  </button>

                                  <button
                                    type="button"
                                    title="Edit"
                                    onClick={() =>
                                      openEditModal(
                                        contact
                                      )
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dfe7e7] bg-white text-[#707686] transition hover:border-[#159a9c] hover:text-[#159a9c]"
                                  >
                                    <FiEdit3
                                      size={16}
                                    />
                                  </button>

                                  <button
                                    type="button"
                                    title="Delete"
                                    onClick={() =>
                                      setDeleteTarget(
                                        contact
                                      )
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-white text-red-500 transition hover:bg-red-50"
                                  >
                                    <FiTrash2
                                      size={16}
                                    />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* MOBILE CARDS */}
                  <div className="space-y-3 p-4 md:hidden">
                    {filteredContacts.map(
                      (contact) => (
                        <div
                          key={contact._id}
                          className="rounded-xl border border-[#e5ebeb] p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f7f7] text-sm font-semibold text-[#159a9c]">
                                {getInitials(
                                  contact.fullName
                                )}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-[#171b2b]">
                                  {
                                    contact.fullName
                                  }
                                </p>

                                <p className="truncate text-xs text-[#707686]">
                                  {contact.email}
                                </p>
                              </div>
                            </div>

                            <span
                              className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${
                                statusStyles[
                                  contact.status
                                ] ||
                                "bg-gray-50 text-gray-700 border-gray-100"
                              }`}
                            >
                              {statusLabel[
                                contact.status
                              ] ||
                                contact.status}
                            </span>
                          </div>

                          <div className="mt-4">
                            <p className="text-sm font-semibold text-[#171b2b]">
                              {contact.subject}
                            </p>

                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#707686]">
                              {contact.message}
                            </p>

                            <p className="mt-3 text-xs text-[#9096a0]">
                              {formatDate(
                                contact.createdAt
                              )}
                            </p>
                          </div>

                          <div className="mt-4 flex gap-2 border-t border-[#edf1f1] pt-3">
                            <button
                              type="button"
                              onClick={() =>
                                handleView(
                                  contact._id
                                )
                              }
                              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#dfe7e7] px-3 py-2 text-xs font-medium text-[#707686] hover:border-[#159a9c] hover:text-[#159a9c]"
                            >
                              <FiEye size={15} />
                              View
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openEditModal(
                                  contact
                                )
                              }
                              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#dfe7e7] px-3 py-2 text-xs font-medium text-[#707686] hover:border-[#159a9c] hover:text-[#159a9c]"
                            >
                              <FiEdit3 size={15} />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setDeleteTarget(
                                  contact
                                )
                              }
                              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50"
                            >
                              <FiTrash2 size={15} />
                              Delete
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {/* PAGINATION */}
              {!loading &&
                pagination.totalPages > 1 && (
                  <div className="flex flex-col gap-3 border-t border-[#edf1f1] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <p className="text-xs text-[#707686]">
                      Page{" "}
                      <span className="font-semibold text-[#171b2b]">
                        {pagination.page}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-[#171b2b]">
                        {pagination.totalPages}
                      </span>
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={page <= 1}
                        onClick={() =>
                          handlePageChange(
                            page - 1
                          )
                        }
                        className="rounded-lg border border-[#dfe7e7] bg-white px-3 py-2 text-xs font-medium text-[#707686] hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        disabled={
                          page >=
                          pagination.totalPages
                        }
                        onClick={() =>
                          handlePageChange(
                            page + 1
                          )
                        }
                        className="rounded-lg border border-[#dfe7e7] bg-white px-3 py-2 text-xs font-medium text-[#707686] hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40"
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

      {/* VIEW MODAL */}
      {selectedContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171b2b]/45 p-4">
          <div className="max-h-[90vh] w-full max-w-[720px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf1f1] px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-[#171b2b]">
                  Contact Message
                </h2>

                <p className="mt-0.5 text-xs text-[#707686]">
                  Message details and admin information
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedContact(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#707686] hover:bg-[#f5f7f7] hover:text-[#171b2b]"
              >
                <FiX size={19} />
              </button>
            </div>

            {viewLoading ? (
              <div className="p-8 text-center text-sm text-[#707686]">
                Loading message...
              </div>
            ) : (
              <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f7f7] font-semibold text-[#159a9c]">
                      {getInitials(
                        selectedContact.fullName
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#171b2b]">
                        {selectedContact.fullName}
                      </h3>

                      <p className="text-xs text-[#707686]">
                        {selectedContact.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`self-start rounded-full border px-3 py-1.5 text-xs font-medium sm:self-auto ${
                      statusStyles[
                        selectedContact.status
                      ] ||
                      "bg-gray-50 text-gray-700 border-gray-100"
                    }`}
                  >
                    {statusLabel[
                      selectedContact.status
                    ] ||
                      selectedContact.status}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-[#f8fafa] p-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#707686]">
                      <FiMail size={15} />
                      Email
                    </div>

                    <p className="mt-2 break-all text-sm text-[#171b2b]">
                      {selectedContact.email ||
                        "—"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#f8fafa] p-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#707686]">
                      <FiPhone size={15} />
                      Phone
                    </div>

                    <p className="mt-2 text-sm text-[#171b2b]">
                      {selectedContact.phone ||
                        "Not provided"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#f8fafa] p-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#707686]">
                      <FiCalendar size={15} />
                      Received
                    </div>

                    <p className="mt-2 text-sm text-[#171b2b]">
                      {formatDate(
                        selectedContact.createdAt
                      )}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#f8fafa] p-4">
                    <div className="text-xs font-medium text-[#707686]">
                      Subject
                    </div>

                    <p className="mt-2 text-sm font-medium text-[#171b2b]">
                      {selectedContact.subject ||
                        "—"}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-sm font-semibold text-[#171b2b]">
                    Message
                  </p>

                  <div className="rounded-xl border border-[#e5ebeb] bg-white p-4 text-sm leading-6 text-[#4f5665]">
                    {selectedContact.message ||
                      "No message provided."}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-sm font-semibold text-[#171b2b]">
                    Admin Notes
                  </p>

                  <div className="rounded-xl border border-[#e5ebeb] bg-[#fbfcfc] p-4 text-sm leading-6 text-[#4f5665]">
                    {selectedContact.adminNotes ||
                      "No admin notes added."}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      openEditModal(
                        selectedContact
                      );
                      setSelectedContact(null);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#159a9c] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#128789]"
                  >
                    <FiEdit3 size={16} />
                    Update Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171b2b]/45 p-4">
          <div className="w-full max-w-[600px] overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf1f1] px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-[#171b2b]">
                  Update Contact
                </h2>

                <p className="mt-0.5 text-xs text-[#707686]">
                  Update status and add internal notes.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditContact(null)
                }
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#707686] hover:bg-[#f5f7f7]"
              >
                <FiX size={19} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="rounded-xl bg-[#f8fafa] p-4">
                <p className="text-sm font-semibold text-[#171b2b]">
                  {editContact.fullName}
                </p>

                <p className="mt-1 text-xs text-[#707686]">
                  {editContact.email}
                </p>

                <p className="mt-2 text-sm text-[#4f5665]">
                  {editContact.subject}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#171b2b]">
                  Status
                </label>

                <select
                  value={editStatus}
                  onChange={(e) =>
                    setEditStatus(
                      e.target.value
                    )
                  }
                  disabled={saving}
                  className="h-11 w-full rounded-xl border border-[#dfe7e7] bg-white px-4 text-sm text-[#171b2b] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                >
                  <option value="new">
                    New
                  </option>

                  <option value="read">
                    Read
                  </option>

                  <option value="replied">
                    Replied
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#171b2b]">
                  Admin Notes
                </label>

                <textarea
                  value={adminNotes}
                  onChange={(e) =>
                    setAdminNotes(
                      e.target.value.slice(
                        0,
                        2000
                      )
                    )
                  }
                  rows={6}
                  disabled={saving}
                  placeholder="Add internal notes about this contact..."
                  className="w-full resize-none rounded-xl border border-[#dfe7e7] bg-white px-4 py-3 text-sm leading-6 text-[#171b2b] outline-none placeholder:text-[#a0a6b0] focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                />

                <p className="mt-1 text-right text-xs text-[#9096a0]">
                  {adminNotes.length}/2000
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setEditContact(null)
                  }
                  disabled={saving}
                  className="rounded-xl border border-[#dfe7e7] bg-white px-5 py-2.5 text-sm font-medium text-[#707686] hover:border-[#159a9c] hover:text-[#159a9c] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#159a9c] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#128789] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <FiRefreshCw
                      className="animate-spin"
                      size={16}
                    />
                  )}

                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#171b2b]/45 p-4">
          <div className="w-full max-w-[440px] rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiTrash2 size={21} />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-[#171b2b]">
              Delete Contact Message?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#707686]">
              This will permanently delete the
              message from{" "}
              <span className="font-medium text-[#171b2b]">
                {deleteTarget.fullName}
              </span>
              . This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(null)
                }
                disabled={deleting}
                className="rounded-xl border border-[#dfe7e7] bg-white px-5 py-2.5 text-sm font-medium text-[#707686] hover:border-[#159a9c] hover:text-[#159a9c] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting && (
                  <FiRefreshCw
                    className="animate-spin"
                    size={16}
                  />
                )}

                {deleting
                  ? "Deleting..."
                  : "Delete Message"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContacts;