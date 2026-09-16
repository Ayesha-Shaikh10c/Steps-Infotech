import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaUserTimes,
  FaCheck,
  FaTimes,
  FaBan,
  FaUnlock,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaSyncAlt,
} from "react-icons/fa";
import { apiFetch } from "../../lib/api";

const PRIMARY = "#159a9c";
const DARK = "#171b2b";
const MUTED = "#707686";

const statusConfig = {
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

const getInitials = (name = "") => {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (!words.length) return "U";

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
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

const getStatusStyle = (status) => {
  return (
    statusConfig[status]?.className ||
    "bg-gray-50 text-gray-600 border-gray-200"
  );
};

const getStatusLabel = (status) => {
  return statusConfig[status]?.label || status || "Unknown";
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch(
        `/admin/users?page=${page}&limit=10`
      );

      setUsers(response.data || []);

      setPagination(
        response.pagination || {
          page,
          limit: 10,
          total: response.data?.length || 0,
          totalPages: 1,
        }
      );
    } catch (err) {
      setError(err.message || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      const matchesSearch =
        !searchValue ||
        user.fullName?.toLowerCase().includes(searchValue) ||
        user.email?.toLowerCase().includes(searchValue) ||
        user.phone?.toLowerCase().includes(searchValue);

      return matchesStatus && matchesSearch;
    });
  }, [users, search, statusFilter]);

  const runAction = async (user, action, label) => {
    if (!user?._id) return;

    const actionKey = `${action}-${user._id}`;

    try {
      setActionLoading(actionKey);
      setError("");

      let response;

      if (action === "delete") {
        const confirmed = window.confirm(
          `Are you sure you want to delete ${user.fullName || "this user"}?`
        );

        if (!confirmed) return;

        response = await apiFetch(`/admin/users/${user._id}`, {
          method: "DELETE",
        });
      } else {
        response = await apiFetch(
          `/admin/users/${user._id}/${action}`,
          {
            method: "PUT",
          }
        );
      }

      if (response?.success !== false) {
        await fetchUsers(pagination.page);
      }
    } catch (err) {
      setError(err.message || `Unable to ${label.toLowerCase()} user.`);
    } finally {
      setActionLoading("");
    }
  };

  const totalUsers = pagination.total || users.length;

  const pendingCount = users.filter(
    (user) => user.status === "pending"
  ).length;

  const activeCount = users.filter(
    (user) => user.status === "active"
  ).length;

  const blockedCount = users.filter(
    (user) => user.status === "blocked"
  ).length;

  const statCards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: FaUsers,
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      title: "Active",
      value: activeCount,
      icon: FaUserCheck,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Pending",
      value: pendingCount,
      icon: FaUserClock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Blocked",
      value: blockedCount,
      icon: FaUserTimes,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
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
              Users Management
            </h1>

            <p
              className="mt-1 text-sm"
              style={{ color: MUTED }}
            >
              Manage registered users and their account status.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchUsers(pagination.page)}
            disabled={loading}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
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
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}
                  >
                    <Icon className={card.iconColor} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search + Filter */}
        <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <FaSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-sm"
                style={{ color: MUTED }}
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email or phone..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#159a9c] focus:bg-white focus:ring-2 focus:ring-[#159a9c]/10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#159a9c] focus:bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
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

        {/* Users */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold sm:text-lg">
                  Registered Users
                </h2>

                <p
                  className="mt-0.5 text-xs sm:text-sm"
                  style={{ color: MUTED }}
                >
                  Review and manage user accounts.
                </p>
              </div>

              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: `${PRIMARY}15`,
                  color: PRIMARY,
                }}
              >
                {filteredUsers.length} shown
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <FaSpinner
                  className="animate-spin text-2xl"
                  style={{ color: PRIMARY }}
                />

                <p className="text-sm" style={{ color: MUTED }}>
                  Loading users...
                </p>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <FaUsers className="text-xl text-gray-400" />
              </div>

              <h3 className="font-semibold">No users found</h3>

              <p
                className="mt-1 max-w-sm text-sm"
                style={{ color: MUTED }}
              >
                Try changing your search or status filter.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[850px]">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                      <th className="px-5 py-3 font-medium">
                        User
                      </th>
                      <th className="px-5 py-3 font-medium">
                        Contact
                      </th>
                      <th className="px-5 py-3 font-medium">
                        Status
                      </th>
                      <th className="px-5 py-3 font-medium">
                        Joined
                      </th>
                      <th className="px-5 py-3 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((user) => {
                      const approveKey = `approve-${user._id}`;
                      const rejectKey = `reject-${user._id}`;
                      const blockKey = `block-${user._id}`;
                      const unblockKey = `unblock-${user._id}`;
                      const deleteKey = `delete-${user._id}`;

                      return (
                        <tr
                          key={user._id}
                          className="transition hover:bg-gray-50/70"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                                style={{
                                  backgroundColor: PRIMARY,
                                }}
                              >
                                {getInitials(user.fullName)}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">
                                  {user.fullName || "Unnamed User"}
                                </p>

                                {user.city && (
                                  <p
                                    className="truncate text-xs"
                                    style={{ color: MUTED }}
                                  >
                                    {user.city}
                                    {user.state
                                      ? `, ${user.state}`
                                      : ""}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-sm">
                              {user.email || "—"}
                            </p>

                            <p
                              className="mt-0.5 text-xs"
                              style={{ color: MUTED }}
                            >
                              {user.phone || "No phone"}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                                user.status
                              )}`}
                            >
                              {getStatusLabel(user.status)}
                            </span>
                          </td>

                          <td
                            className="px-5 py-4 text-sm"
                            style={{ color: MUTED }}
                          >
                            {formatDate(user.createdAt)}
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">
                              {user.status === "pending" && (
                                <>
                                  <ActionButton
                                    title="Approve"
                                    icon={FaCheck}
                                    loading={
                                      actionLoading === approveKey
                                    }
                                    onClick={() =>
                                      runAction(
                                        user,
                                        "approve",
                                        "Approve"
                                      )
                                    }
                                    className="text-emerald-600 hover:bg-emerald-50"
                                  />

                                  <ActionButton
                                    title="Reject"
                                    icon={FaTimes}
                                    loading={
                                      actionLoading === rejectKey
                                    }
                                    onClick={() =>
                                      runAction(
                                        user,
                                        "reject",
                                        "Reject"
                                      )
                                    }
                                    className="text-red-600 hover:bg-red-50"
                                  />
                                </>
                              )}

                              {user.status === "active" && (
                                <ActionButton
                                  title="Block"
                                  icon={FaBan}
                                  loading={
                                    actionLoading === blockKey
                                  }
                                  onClick={() =>
                                    runAction(
                                      user,
                                      "block",
                                      "Block"
                                    )
                                  }
                                  className="text-amber-600 hover:bg-amber-50"
                                />
                              )}

                              {user.status === "blocked" && (
                                <ActionButton
                                  title="Unblock"
                                  icon={FaUnlock}
                                  loading={
                                    actionLoading === unblockKey
                                  }
                                  onClick={() =>
                                    runAction(
                                      user,
                                      "unblock",
                                      "Unblock"
                                    )
                                  }
                                  className="text-emerald-600 hover:bg-emerald-50"
                                />
                              )}

                              <ActionButton
                                title="Delete"
                                icon={FaTrash}
                                loading={
                                  actionLoading === deleteKey
                                }
                                onClick={() =>
                                  runAction(
                                    user,
                                    "delete",
                                    "Delete"
                                  )
                                }
                                className="text-red-600 hover:bg-red-50"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="divide-y divide-gray-100 md:hidden">
                {filteredUsers.map((user) => {
                  const approveKey = `approve-${user._id}`;
                  const rejectKey = `reject-${user._id}`;
                  const blockKey = `block-${user._id}`;
                  const unblockKey = `unblock-${user._id}`;
                  const deleteKey = `delete-${user._id}`;

                  return (
                    <div key={user._id} className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                          style={{
                            backgroundColor: PRIMARY,
                          }}
                        >
                          {getInitials(user.fullName)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold">
                              {user.fullName || "Unnamed User"}
                            </h3>

                            <span
                              className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${getStatusStyle(
                                user.status
                              )}`}
                            >
                              {getStatusLabel(user.status)}
                            </span>
                          </div>

                          <p
                            className="mt-1 break-all text-xs"
                            style={{ color: MUTED }}
                          >
                            {user.email || "No email"}
                          </p>

                          <p
                            className="mt-0.5 text-xs"
                            style={{ color: MUTED }}
                          >
                            {user.phone || "No phone"}
                          </p>

                          <p
                            className="mt-1 text-xs"
                            style={{ color: MUTED }}
                          >
                            Joined {formatDate(user.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {user.status === "pending" && (
                          <>
                            <MobileActionButton
                              icon={FaCheck}
                              label="Approve"
                              loading={
                                actionLoading === approveKey
                              }
                              onClick={() =>
                                runAction(
                                  user,
                                  "approve",
                                  "Approve"
                                )
                              }
                              className="bg-emerald-50 text-emerald-700"
                            />

                            <MobileActionButton
                              icon={FaTimes}
                              label="Reject"
                              loading={
                                actionLoading === rejectKey
                              }
                              onClick={() =>
                                runAction(
                                  user,
                                  "reject",
                                  "Reject"
                                )
                              }
                              className="bg-red-50 text-red-700"
                            />
                          </>
                        )}

                        {user.status === "active" && (
                          <MobileActionButton
                            icon={FaBan}
                            label="Block"
                            loading={
                              actionLoading === blockKey
                            }
                            onClick={() =>
                              runAction(
                                user,
                                "block",
                                "Block"
                              )
                            }
                            className="bg-amber-50 text-amber-700"
                          />
                        )}

                        {user.status === "blocked" && (
                          <MobileActionButton
                            icon={FaUnlock}
                            label="Unblock"
                            loading={
                              actionLoading === unblockKey
                            }
                            onClick={() =>
                              runAction(
                                user,
                                "unblock",
                                "Unblock"
                              )
                            }
                            className="bg-emerald-50 text-emerald-700"
                          />
                        )}

                        <MobileActionButton
                          icon={FaTrash}
                          label="Delete"
                          loading={
                            actionLoading === deleteKey
                          }
                          onClick={() =>
                            runAction(
                              user,
                              "delete",
                              "Delete"
                            )
                          }
                          className="bg-red-50 text-red-700"
                        />
                      </div>
                    </div>
                  );
                })}
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
                Page {pagination.page} of {pagination.totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={
                    pagination.page <= 1 || loading
                  }
                  onClick={() =>
                    fetchUsers(pagination.page - 1)
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
                    fetchUsers(pagination.page + 1)
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
    </div>
  );
};

const ActionButton = ({
  title,
  icon: Icon,
  loading,
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      title={title}
      disabled={loading}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {loading ? (
        <FaSpinner className="animate-spin text-xs" />
      ) : (
        <Icon className="text-xs" />
      )}
    </button>
  );
};

const MobileActionButton = ({
  icon: Icon,
  label,
  loading,
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      disabled={loading}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {loading ? (
        <FaSpinner className="animate-spin" />
      ) : (
        <Icon />
      )}

      {label}
    </button>
  );
};

export default AdminUsers;