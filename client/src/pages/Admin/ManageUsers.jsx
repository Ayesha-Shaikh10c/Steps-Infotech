import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  CheckCircle,
  XCircle,
  Ban,
  ShieldCheck,
  Trash2,
  Edit3,
  ChevronLeft,
  ChevronRight,
  Users,
  X,
  AlertTriangle,
  Eye,
  UserCheck,
  Clock3,
} from "lucide-react";
import { apiFetch } from "../../lib/api";

const LIMIT = 10;

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  active: {
    label: "Active",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  blocked: {
    label: "Blocked",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

const emptyEditForm = {
  fullName: "",
  phone: "",
  status: "pending",
  isVerified: false,
  bio: "",
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  skills: "",
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedUser, setSelectedUser] = useState(null);

  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState(emptyEditForm);
  const [editSaving, setEditSaving] = useState(false);

  const currentUser = useMemo(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  const currentUserId =
    currentUser?.id ||
    currentUser?._id ||
    currentUser?.userId ||
    "";

  // ==================================================
  // FETCH USERS
  // ==================================================

  const fetchUsers = async (requestedPage = page, options = {}) => {
    const isRefresh = Boolean(options.refresh);

    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await apiFetch(
        `/admin/users?page=${requestedPage}&limit=${LIMIT}`
      );

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to load users."
        );
      }

      const fetchedUsers = Array.isArray(response.users)
        ? response.users
        : [];

      setUsers(fetchedUsers);
      setTotal(Number(response.total) || 0);
      setTotalPages(
        Math.max(Number(response.totalPages) || 1, 1)
      );
      setPage(Number(response.page) || requestedPage);
    } catch (err) {
      console.error("Fetch users error:", err);

      if (err?.status === 401 || err?.status === 403) {
        setError(
          err?.message ||
            "You are not authorized to manage users."
        );
      } else {
        setError(
          err?.message || "Unable to load users."
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  // ==================================================
  // CLEAR MESSAGES
  // ==================================================

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  // ==================================================
  // USER ID
  // ==================================================

  const getUserId = (user) => {
    return (
      user?.id ||
      user?._id ||
      user?.userId ||
      ""
    );
  };

  // ==================================================
  // PROTECTED USER
  // ==================================================

  const isProtectedUser = (user) => {
    const userId = getUserId(user);

    return (
      user?.role === "admin" ||
      String(userId) === String(currentUserId)
    );
  };

  // ==================================================
  // RUN USER ACTION
  // ==================================================

  const runAction = async ({
    userId,
    endpoint,
    method = "PUT",
    successMessage,
    confirmMessage,
  }) => {
    clearMessages();

    if (!userId) {
      setError("Invalid user ID.");
      return;
    }

    if (confirmMessage) {
      const confirmed = window.confirm(confirmMessage);

      if (!confirmed) {
        return;
      }
    }

    try {
      setActionLoading(`${method}-${userId}`);

      const response = await apiFetch(endpoint, {
        method,
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "User action failed."
        );
      }

      setSuccess(
        response?.message ||
          successMessage ||
          "User updated successfully."
      );

      await fetchUsers(page);

      setSelectedUser(null);
      setEditUser(null);
    } catch (err) {
      console.error("User action error:", err);

      setError(
        err?.message ||
          "Unable to complete this action."
      );
    } finally {
      setActionLoading("");
    }
  };

  // ==================================================
  // APPROVE
  // ==================================================

  const handleApprove = (user) => {
    const userId = getUserId(user);

    return runAction({
      userId,
      endpoint: `/admin/users/${userId}/approve`,
      method: "PUT",
      successMessage: "User approved successfully.",
      confirmMessage: `Approve ${
        user?.fullName || "this user"
      }?`,
    });
  };

  // ==================================================
  // REJECT
  // ==================================================

  const handleReject = (user) => {
    const userId = getUserId(user);

    return runAction({
      userId,
      endpoint: `/admin/users/${userId}/reject`,
      method: "PUT",
      successMessage: "User rejected successfully.",
      confirmMessage: `Reject ${
        user?.fullName || "this user"
      }?`,
    });
  };

  // ==================================================
  // BLOCK
  // ==================================================

  const handleBlock = (user) => {
    const userId = getUserId(user);

    return runAction({
      userId,
      endpoint: `/admin/users/${userId}/block`,
      method: "PUT",
      successMessage: "User blocked successfully.",
      confirmMessage: `Block ${
        user?.fullName || "this user"
      }?`,
    });
  };

  // ==================================================
  // UNBLOCK
  // ==================================================

  const handleUnblock = (user) => {
    const userId = getUserId(user);

    return runAction({
      userId,
      endpoint: `/admin/users/${userId}/unblock`,
      method: "PUT",
      successMessage: "User unblocked successfully.",
      confirmMessage: `Unblock ${
        user?.fullName || "this user"
      }?`,
    });
  };

  // ==================================================
  // DELETE
  // ==================================================

  const handleDelete = (user) => {
    const userId = getUserId(user);

    return runAction({
      userId,
      endpoint: `/admin/users/${userId}`,
      method: "DELETE",
      successMessage: "User deleted successfully.",
      confirmMessage: `Delete ${
        user?.fullName || "this user"
      } permanently? This action cannot be undone.`,
    });
  };

  // ==================================================
  // OPEN EDIT
  // ==================================================

  const openEdit = (user) => {
    clearMessages();

    const skills = Array.isArray(user?.skills)
      ? user.skills.join(", ")
      : "";

    setEditUser(user);

    setEditForm({
      fullName: user?.fullName || "",
      phone: user?.phone || "",
      status: user?.status || "pending",
      isVerified: Boolean(user?.isVerified),
      bio: user?.bio || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      country: user?.country || "",
      pincode: user?.pincode || "",
      skills,
    });
  };

  // ==================================================
  // EDIT INPUT
  // ==================================================

  const handleEditChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==================================================
  // UPDATE USER
  // ==================================================

  const handleUpdate = async (event) => {
    event.preventDefault();

    clearMessages();

    const userId = getUserId(editUser);

    if (!userId) {
      setError("Invalid user ID.");
      return;
    }

    if (editUser?.role === "admin") {
      setError(
        "Admin account cannot be modified through user management."
      );
      return;
    }

    if (
      String(userId) ===
      String(currentUserId)
    ) {
      setError(
        "You cannot modify your own account from this route."
      );
      return;
    }

    try {
      setEditSaving(true);

      const payload = {
        fullName: editForm.fullName.trim(),
        phone: editForm.phone.trim(),
        status: editForm.status,
        isVerified: Boolean(editForm.isVerified),
        bio: editForm.bio.trim(),
        address: editForm.address.trim(),
        city: editForm.city.trim(),
        state: editForm.state.trim(),
        country: editForm.country.trim(),
        pincode: editForm.pincode.trim(),
        skills: editForm.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const response = await apiFetch(
        `/admin/users/${userId}`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
        }
      );

      if (!response?.success) {
        throw new Error(
          response?.message ||
            "Unable to update user."
        );
      }

      setSuccess(
        response?.message ||
          "User updated successfully."
      );

      setEditUser(null);
      setSelectedUser(null);

      await fetchUsers(page);
    } catch (err) {
      console.error("Update user error:", err);

      setError(
        err?.message ||
          "Unable to update user."
      );
    } finally {
      setEditSaving(false);
    }
  };

  // ==================================================
  // SEARCH + FILTER
  // ==================================================

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        String(user?.fullName || "")
          .toLowerCase()
          .includes(query) ||
        String(user?.email || "")
          .toLowerCase()
          .includes(query) ||
        String(user?.phone || "")
          .toLowerCase()
          .includes(query) ||
        String(user?.city || "")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        user?.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  // ==================================================
  // PAGINATION
  // ==================================================

  const goToPage = async (nextPage) => {
    if (
      nextPage < 1 ||
      nextPage > totalPages ||
      nextPage === page
    ) {
      return;
    }

    await fetchUsers(nextPage);
  };

  // ==================================================
  // STATUS BADGE
  // ==================================================

  const StatusBadge = ({ status }) => {
    const config =
      STATUS_CONFIG[status] ||
      STATUS_CONFIG.pending;

    return (
      <span
        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${config.className}`}
      >
        {config.label}
      </span>
    );
  };

  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <div
        className="space-y-6"
        style={{
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-7 w-48 rounded bg-gray-200" />
            <div className="h-4 w-72 rounded bg-gray-100" />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="space-y-4 p-6">
            {Array.from({ length: 7 }).map(
              (_, index) => (
                <div
                  key={`loading-row-${index}`}
                  className="grid grid-cols-6 gap-4"
                >
                  {Array.from({ length: 6 }).map(
                    (_, cellIndex) => (
                      <div
                        key={`loading-cell-${index}-${cellIndex}`}
                        className="h-10 animate-pulse rounded bg-gray-100"
                      />
                    )
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==================================================
  // MAIN UI
  // ==================================================

  return (
    <div
      className="space-y-6"
      style={{
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#159a9c]/10 text-[#159a9c]">
              <Users size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#171b2b]">
                Manage Users
              </h1>

              <p className="mt-1 text-sm text-[#707686]">
                Manage registrations, approvals,
                access and user accounts.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fetchUsers(page, { refresh: true })}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#171b2b] shadow-sm transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={
              refreshing
                ? "animate-spin"
                : ""
            }
          />
          Refresh
        </button>
      </div>

      {/* ALERTS */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div className="flex-1">
            {error}
          </div>

          <button
            type="button"
            onClick={() => setError("")}
            className="text-red-500 hover:text-red-700"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div className="flex-1">
            {success}
          </div>

          <button
            type="button"
            onClick={() => setSuccess("")}
            className="text-emerald-600 hover:text-emerald-800"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#707686]">
              Total Users
            </p>

            <Users
              size={19}
              className="text-[#159a9c]"
            />
          </div>

          <p className="mt-2 text-2xl font-bold text-[#171b2b]">
            {total}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#707686]">
              Pending
            </p>

            <Clock3
              size={19}
              className="text-amber-500"
            />
          </div>

          <p className="mt-2 text-2xl font-bold text-[#171b2b]">
            {
              users.filter(
                (user) =>
                  user?.status === "pending"
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#707686]">
              Active
            </p>

            <UserCheck
              size={19}
              className="text-emerald-500"
            />
          </div>

          <p className="mt-2 text-2xl font-bold text-[#171b2b]">
            {
              users.filter(
                (user) =>
                  user?.status === "active"
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#707686]">
              Blocked
            </p>

            <Ban
              size={19}
              className="text-red-500"
            />
          </div>

          <p className="mt-2 text-2xl font-bold text-[#171b2b]">
            {
              users.filter(
                (user) =>
                  user?.status === "blocked"
              ).length
            }
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by name, email, phone or city..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-[#171b2b] outline-none transition placeholder:text-gray-400 focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#171b2b] outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
          >
            <option value="all">
              All Status
            </option>
            <option value="pending">
              Pending
            </option>
            <option value="active">
              Active
            </option>
            <option value="blocked">
              Blocked
            </option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[1050px] w-full">
            <thead className="border-b border-gray-100 bg-[#f8fafa]">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#707686]">
                  User
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#707686]">
                  Contact
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#707686]">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#707686]">
                  Verification
                </th>

                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#707686]">
                  Joined
                </th>

                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-[#707686]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-14 text-center"
                  >
                    <Users
                      size={40}
                      className="mx-auto text-gray-300"
                    />

                    <p className="mt-3 text-sm font-semibold text-[#171b2b]">
                      No users found
                    </p>

                    <p className="mt-1 text-xs text-[#707686]">
                      Try changing your search or
                      status filter.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => {
                  const userId = getUserId(user);
                  const protectedUser =
                    isProtectedUser(user);

                  const rowKey =
                    userId ||
                    `user-row-${page}-${index}`;

                  const actionKey = `${userId}`;

                  return (
                    <tr
                      key={rowKey}
                      className="transition hover:bg-[#fafcfc]"
                    >
                      {/* USER */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#159a9c]/10">
                            {user?.profileImage ? (
                              <img
                                src={`http://localhost:5000${user.profileImage}`}
                                alt={
                                  user?.fullName ||
                                  "User"
                                }
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-sm font-bold text-[#159a9c]">
                                {(
                                  user?.fullName ||
                                  "U"
                                )
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#171b2b]">
                              {user?.fullName ||
                                "Unnamed User"}
                            </p>

                            <p className="truncate text-xs text-[#707686]">
                              {user?.email ||
                                "No email"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CONTACT */}
                      <td className="px-5 py-4">
                        <p className="text-sm text-[#171b2b]">
                          {user?.phone ||
                            "No phone"}
                        </p>

                        <p className="mt-1 text-xs text-[#707686]">
                          {[
                            user?.city,
                            user?.state,
                          ]
                            .filter(Boolean)
                            .join(", ") ||
                            "Location not added"}
                        </p>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <StatusBadge
                          status={user?.status}
                        />
                      </td>

                      {/* VERIFICATION */}
                      <td className="px-5 py-4">
                        {user?.isVerified ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                            <ShieldCheck size={16} />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                            <XCircle size={16} />
                            Not Verified
                          </span>
                        )}
                      </td>

                      {/* JOINED */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-[#707686]">
                          {user?.createdAt
                            ? new Date(
                                user.createdAt
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "—"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* VIEW */}
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedUser(
                                user
                              )
                            }
                            title="View user"
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#171b2b]"
                          >
                            <Eye size={17} />
                          </button>

                          {!protectedUser && (
                            <>
                              {/* EDIT */}
                              <button
                                type="button"
                                onClick={() =>
                                  openEdit(user)
                                }
                                title="Edit user"
                                className="rounded-lg p-2 text-gray-500 transition hover:bg-[#159a9c]/10 hover:text-[#159a9c]"
                              >
                                <Edit3 size={17} />
                              </button>

                              {/* APPROVE */}
                              {user?.status ===
                                "pending" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleApprove(
                                      user
                                    )
                                  }
                                  disabled={
                                    actionLoading ===
                                    `PUT-${actionKey}`
                                  }
                                  title="Approve user"
                                  className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {actionLoading ===
                                  `PUT-${actionKey}` ? (
                                    <RefreshCw
                                      size={17}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <CheckCircle
                                      size={17}
                                    />
                                  )}
                                </button>
                              )}

                              {/* REJECT */}
                              {user?.status ===
                                "pending" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleReject(
                                      user
                                    )
                                  }
                                  disabled={
                                    actionLoading ===
                                    `PUT-${actionKey}`
                                  }
                                  title="Reject user"
                                  className="rounded-lg p-2 text-orange-600 transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <XCircle
                                    size={17}
                                  />
                                </button>
                              )}

                              {/* BLOCK */}
                              {user?.status !==
                                "blocked" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleBlock(user)
                                  }
                                  disabled={
                                    actionLoading ===
                                    `PUT-${actionKey}`
                                  }
                                  title="Block user"
                                  className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <Ban size={17} />
                                </button>
                              )}

                              {/* UNBLOCK */}
                              {user?.status ===
                                "blocked" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUnblock(
                                      user
                                    )
                                  }
                                  disabled={
                                    actionLoading ===
                                    `PUT-${actionKey}`
                                  }
                                  title="Unblock user"
                                  className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <ShieldCheck
                                    size={17}
                                  />
                                </button>
                              )}

                              {/* DELETE */}
                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(user)
                                }
                                disabled={
                                  actionLoading ===
                                  `DELETE-${actionKey}`
                                }
                                title="Delete user"
                                className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {actionLoading ===
                                `DELETE-${actionKey}` ? (
                                  <RefreshCw
                                    size={17}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Trash2 size={17} />
                                )}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#707686]">
            Showing{" "}
            <span className="font-semibold text-[#171b2b]">
              {filteredUsers.length}
            </span>{" "}
            users on this page ·{" "}
            <span className="font-semibold text-[#171b2b]">
              {total}
            </span>{" "}
            total
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                goToPage(page - 1)
              }
              disabled={page <= 1}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={17} />
            </button>

            <span className="min-w-[80px] text-center text-sm font-semibold text-[#171b2b]">
              Page {page} / {totalPages}
            </span>

            <button
              type="button"
              onClick={() =>
                goToPage(page + 1)
              }
              disabled={
                page >= totalPages
              }
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================
          VIEW USER MODAL
      ================================================== */}

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#171b2b]/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#171b2b]">
                  User Details
                </h2>

                <p className="text-xs text-[#707686]">
                  Complete account information
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedUser(null)
                }
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-[#171b2b]"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-6 p-5">
              {/* PROFILE */}
              <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-[#fafcfc] p-4 sm:flex-row sm:items-center">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#159a9c]/10">
                  {selectedUser?.profileImage ? (
                    <img
                      src={`http://localhost:5000${selectedUser.profileImage}`}
                      alt={
                        selectedUser?.fullName ||
                        "User"
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-[#159a9c]">
                      {(
                        selectedUser?.fullName ||
                        "U"
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold text-[#171b2b]">
                    {selectedUser?.fullName ||
                      "Unnamed User"}
                  </h3>

                  <p className="mt-1 break-all text-sm text-[#707686]">
                    {selectedUser?.email ||
                      "No email"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <StatusBadge
                      status={
                        selectedUser?.status
                      }
                    />

                    {selectedUser?.isVerified && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        <ShieldCheck
                          size={14}
                        />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* INFORMATION */}
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem
                  label="Phone"
                  value={
                    selectedUser?.phone ||
                    "Not provided"
                  }
                />

                <InfoItem
                  label="Role"
                  value={
                    selectedUser?.role ||
                    "user"
                  }
                />

                <InfoItem
                  label="City"
                  value={
                    selectedUser?.city ||
                    "Not provided"
                  }
                />

                <InfoItem
                  label="State"
                  value={
                    selectedUser?.state ||
                    "Not provided"
                  }
                />

                <InfoItem
                  label="Country"
                  value={
                    selectedUser?.country ||
                    "Not provided"
                  }
                />

                <InfoItem
                  label="Pincode"
                  value={
                    selectedUser?.pincode ||
                    "Not provided"
                  }
                />

                <InfoItem
                  label="Address"
                  value={
                    selectedUser?.address ||
                    "Not provided"
                  }
                />

                <InfoItem
                  label="Last Login"
                  value={
                    selectedUser?.lastLogin
                      ? new Date(
                          selectedUser.lastLogin
                        ).toLocaleString(
                          "en-IN"
                        )
                      : "Never"
                  }
                />
              </div>

              {/* BIO */}
              <div>
                <p className="mb-2 text-sm font-semibold text-[#171b2b]">
                  Bio
                </p>

                <div className="rounded-xl border border-gray-100 bg-[#fafcfc] p-4 text-sm leading-6 text-[#707686]">
                  {selectedUser?.bio ||
                    "No bio added."}
                </div>
              </div>

              {/* SKILLS */}
              <div>
                <p className="mb-2 text-sm font-semibold text-[#171b2b]">
                  Skills
                </p>

                {Array.isArray(
                  selectedUser?.skills
                ) &&
                selectedUser.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.skills.map(
                      (skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="rounded-full bg-[#159a9c]/10 px-3 py-1.5 text-xs font-medium text-[#159a9c]"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-[#707686]">
                    No skills added.
                  </p>
                )}
              </div>

              {/* RESUME */}
              {selectedUser?.resume && (
                <div>
                  <p className="mb-2 text-sm font-semibold text-[#171b2b]">
                    Resume
                  </p>

                  <a
                    href={`http://localhost:5000${selectedUser.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-xl bg-[#159a9c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#128789]"
                  >
                    View Resume
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          EDIT USER MODAL
      ================================================== */}

      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#171b2b]/50 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#171b2b]">
                  Edit User
                </h2>

                <p className="text-xs text-[#707686]">
                  Update user account information
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditUser(null)
                }
                disabled={editSaving}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-[#171b2b] disabled:opacity-50"
              >
                <X size={19} />
              </button>
            </div>

            <form
              onSubmit={handleUpdate}
              className="space-y-5 p-5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Full Name"
                  name="fullName"
                  value={editForm.fullName}
                  onChange={handleEditChange}
                  required
                />

                <FormField
                  label="Phone"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                />

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#171b2b]">
                    Status
                  </label>

                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                  >
                    <option value="pending">
                      Pending
                    </option>

                    <option value="active">
                      Active
                    </option>

                    <option value="blocked">
                      Blocked
                    </option>
                  </select>
                </div>

                <FormField
                  label="Pincode"
                  name="pincode"
                  value={editForm.pincode}
                  onChange={handleEditChange}
                />

                <FormField
                  label="City"
                  name="city"
                  value={editForm.city}
                  onChange={handleEditChange}
                />

                <FormField
                  label="State"
                  name="state"
                  value={editForm.state}
                  onChange={handleEditChange}
                />

                <FormField
                  label="Country"
                  name="country"
                  value={editForm.country}
                  onChange={handleEditChange}
                />
              </div>

              <FormField
                label="Address"
                name="address"
                value={editForm.address}
                onChange={handleEditChange}
              />

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#171b2b]">
                  Bio
                </label>

                <textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={handleEditChange}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                  placeholder="User bio..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#171b2b]">
                  Skills
                </label>

                <input
                  type="text"
                  name="skills"
                  value={editForm.skills}
                  onChange={handleEditChange}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
                />

                <p className="mt-1.5 text-xs text-[#707686]">
                  Separate skills with commas.
                </p>
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4">
                <input
                  type="checkbox"
                  name="isVerified"
                  checked={editForm.isVerified}
                  onChange={handleEditChange}
                  className="h-4 w-4 rounded border-gray-300 text-[#159a9c] focus:ring-[#159a9c]"
                />

                <span>
                  <span className="block text-sm font-semibold text-[#171b2b]">
                    Verified User
                  </span>

                  <span className="block text-xs text-[#707686]">
                    Mark this account as verified.
                  </span>
                </span>
              </label>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setEditUser(null)
                  }
                  disabled={editSaving}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#171b2b] transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={editSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#159a9c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#128789] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {editSaving && (
                    <RefreshCw
                      size={17}
                      className="animate-spin"
                    />
                  )}

                  {editSaving
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================================================
// INFO ITEM
// ==================================================

const InfoItem = ({ label, value }) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-[#fafcfc] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#707686]">
        {label}
      </p>

      <p className="mt-1.5 break-words text-sm font-medium text-[#171b2b]">
        {value}
      </p>
    </div>
  );
};

// ==================================================
// FORM FIELD
// ==================================================

const FormField = ({
  label,
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#171b2b]">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
      />
    </div>
  );
};

export default ManageUsers;