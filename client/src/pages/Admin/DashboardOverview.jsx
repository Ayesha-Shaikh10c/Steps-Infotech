import React from "react";
import {
  Users,
  BriefcaseBusiness,
  GraduationCap,
  FileText,
  UserCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
  Send,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const PRIMARY = "#159a9c";
const DARK = "#171b2b";
const MUTED = "#707686";

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

const getStatusClasses = (status) => {
  switch (status) {
    case "pending":
      return "bg-amber-50 text-amber-600";

    case "shortlisted":
      return "bg-blue-50 text-blue-600";

    case "interview":
      return "bg-purple-50 text-purple-600";

    case "selected":
      return "bg-green-50 text-green-600";

    case "rejected":
      return "bg-red-50 text-red-600";

    default:
      return "bg-gray-50 text-gray-600";
  }
};

const StatCard = ({ title, value, icon: Icon, description }) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className="text-[12px] font-medium"
            style={{ color: MUTED }}
          >
            {title}
          </p>

          <h3
            className="mt-2 text-[27px] font-bold leading-none"
            style={{ color: DARK }}
          >
            {value ?? 0}
          </h3>

          {description && (
            <p
              className="mt-2 text-[10px]"
              style={{ color: MUTED }}
            >
              {description}
            </p>
          )}
        </div>

        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: "#eaf8f8",
            color: PRIMARY,
          }}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
};

const SmallStat = ({
  title,
  value,
  icon: Icon,
  iconClass,
}) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
      >
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p
          className="truncate text-[11px]"
          style={{ color: MUTED }}
        >
          {title}
        </p>

        <p
          className="mt-0.5 text-[17px] font-bold"
          style={{ color: DARK }}
        >
          {value ?? 0}
        </p>
      </div>
    </div>
  );
};

const DashboardOverview = ({
  dashboard,
  loading,
  error,
  onRefresh,
}) => {
  const users = dashboard?.users || {};
  const jobs = dashboard?.jobs || {};
  const internships = dashboard?.internships || {};
  const applications = dashboard?.applications || {};

  const recentApplications =
    dashboard?.recentApplications || [];

  const recentUsers =
    dashboard?.recentUsers || [];

  return (
    <div
      className="space-y-6"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            className="text-[18px] font-bold"
            style={{ color: DARK }}
          >
            Dashboard Overview
          </h2>

          <p
            className="mt-1 text-[11px]"
            style={{ color: MUTED }}
          >
            Monitor users, jobs, internships and applications.
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          style={{ backgroundColor: PRIMARY }}
        >
          <RefreshCw
            size={15}
            className={loading ? "animate-spin" : ""}
          />

          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex flex-col gap-3 rounded-xl border border-red-100 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[12px] font-semibold text-red-600">
              Unable to load dashboard
            </p>

            <p className="mt-1 text-[11px] text-red-500">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={onRefresh}
            className="rounded-lg bg-white px-3 py-2 text-[11px] font-semibold text-red-600 shadow-sm"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && !dashboard ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[130px] animate-pulse rounded-2xl border border-gray-100 bg-white"
            />
          ))}
        </div>
      ) : (
        <>
          {/* Main Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Users"
              value={users.total}
              icon={Users}
              description="Registered users"
            />

            <StatCard
              title="Total Jobs"
              value={jobs.total}
              icon={BriefcaseBusiness}
              description={`${jobs.open || 0} currently open`}
            />

            <StatCard
              title="Total Internships"
              value={internships.total}
              icon={GraduationCap}
              description={`${internships.open || 0} currently open`}
            />

            <StatCard
              title="Total Applications"
              value={applications.total}
              icon={FileText}
              description="All submitted applications"
            />
          </div>

          {/* Users + Applications */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {/* User Overview */}
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h3
                  className="text-[15px] font-bold"
                  style={{ color: DARK }}
                >
                  User Overview
                </h3>

                <p
                  className="mt-1 text-[10px]"
                  style={{ color: MUTED }}
                >
                  Current user account status
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <SmallStat
                  title="Active Users"
                  value={users.active}
                  icon={UserCheck}
                  iconClass="bg-green-50 text-green-600"
                />

                <SmallStat
                  title="Pending Users"
                  value={users.pending}
                  icon={Clock3}
                  iconClass="bg-amber-50 text-amber-600"
                />

                <SmallStat
                  title="Blocked Users"
                  value={users.blocked}
                  icon={XCircle}
                  iconClass="bg-red-50 text-red-600"
                />
              </div>
            </section>

            {/* Application Overview */}
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h3
                  className="text-[15px] font-bold"
                  style={{ color: DARK }}
                >
                  Application Overview
                </h3>

                <p
                  className="mt-1 text-[10px]"
                  style={{ color: MUTED }}
                >
                  Application pipeline by status
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                <SmallStat
                  title="Pending"
                  value={applications.pending}
                  icon={Clock3}
                  iconClass="bg-amber-50 text-amber-600"
                />

                <SmallStat
                  title="Shortlisted"
                  value={applications.shortlisted}
                  icon={UserCheck}
                  iconClass="bg-blue-50 text-blue-600"
                />

                <SmallStat
                  title="Interview"
                  value={applications.interview}
                  icon={CalendarDays}
                  iconClass="bg-purple-50 text-purple-600"
                />

                <SmallStat
                  title="Selected"
                  value={applications.selected}
                  icon={CheckCircle2}
                  iconClass="bg-green-50 text-green-600"
                />

                <SmallStat
                  title="Rejected"
                  value={applications.rejected}
                  icon={XCircle}
                  iconClass="bg-red-50 text-red-600"
                />
              </div>
            </section>
          </div>

          {/* Quick Actions */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h3
                className="text-[15px] font-bold"
                style={{ color: DARK }}
              >
                Quick Actions
              </h3>

              <p
                className="mt-1 text-[10px]"
                style={{ color: MUTED }}
              >
                Quickly access frequently used admin modules.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/admin/users";
                }}
                className="group flex items-center justify-between rounded-xl border border-gray-100 p-4 text-left transition hover:border-[#159a9c] hover:bg-[#eaf8f8]"
              >
                <div className="flex items-center gap-3">
                  <Users
                    size={19}
                    style={{ color: PRIMARY }}
                  />

                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: DARK }}
                  >
                    Manage Users
                  </span>
                </div>

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                  style={{ color: MUTED }}
                />
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/admin/jobs";
                }}
                className="group flex items-center justify-between rounded-xl border border-gray-100 p-4 text-left transition hover:border-[#159a9c] hover:bg-[#eaf8f8]"
              >
                <div className="flex items-center gap-3">
                  <BriefcaseBusiness
                    size={19}
                    style={{ color: PRIMARY }}
                  />

                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: DARK }}
                  >
                    Manage Jobs
                  </span>
                </div>

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                  style={{ color: MUTED }}
                />
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/admin/applications";
                }}
                className="group flex items-center justify-between rounded-xl border border-gray-100 p-4 text-left transition hover:border-[#159a9c] hover:bg-[#eaf8f8]"
              >
                <div className="flex items-center gap-3">
                  <FileText
                    size={19}
                    style={{ color: PRIMARY }}
                  />

                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: DARK }}
                  >
                    Applications
                  </span>
                </div>

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                  style={{ color: MUTED }}
                />
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/admin/jobs?create=true";
                }}
                className="group flex items-center justify-between rounded-xl border border-gray-100 p-4 text-left transition hover:border-[#159a9c] hover:bg-[#eaf8f8]"
              >
                <div className="flex items-center gap-3">
                  <Send
                    size={19}
                    style={{ color: PRIMARY }}
                  />

                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: DARK }}
                  >
                    Create Job
                  </span>
                </div>

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                  style={{ color: MUTED }}
                />
              </button>
            </div>
          </section>

          {/* Recent Applications */}
          <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h3
                  className="text-[15px] font-bold"
                  style={{ color: DARK }}
                >
                  Recent Applications
                </h3>

                <p
                  className="mt-1 text-[10px]"
                  style={{ color: MUTED }}
                >
                  Latest applications received
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/admin/applications";
                }}
                className="inline-flex items-center gap-1 text-[11px] font-semibold"
                style={{ color: PRIMARY }}
              >
                View All
                <ArrowRight size={14} />
              </button>
            </div>

            {recentApplications.length === 0 ? (
              <div className="p-8 text-center">
                <FileText
                  size={28}
                  className="mx-auto mb-2"
                  style={{ color: "#c8cdd5" }}
                />

                <p
                  className="text-[12px] font-medium"
                  style={{ color: MUTED }}
                >
                  No applications found
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentApplications.map((application) => {
                  const applicantName =
                    application.applicant?.fullName ||
                    application.fullName ||
                    "Unknown Applicant";

                  const jobTitle =
                    application.job?.title ||
                    "Job unavailable";

                  const status =
                    application.status || "pending";

                  return (
                    <div
                      key={application._id}
                      className="flex flex-col gap-3 p-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                          style={{
                            backgroundColor: PRIMARY,
                          }}
                        >
                          {applicantName
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <p
                            className="truncate text-[12px] font-semibold"
                            style={{ color: DARK }}
                          >
                            {applicantName}
                          </p>

                          <p
                            className="mt-0.5 truncate text-[10px]"
                            style={{ color: MUTED }}
                          >
                            {jobTitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:justify-end">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[9px] font-semibold capitalize ${getStatusClasses(
                            status
                          )}`}
                        >
                          {status}
                        </span>

                        <span
                          className="whitespace-nowrap text-[10px]"
                          style={{ color: MUTED }}
                        >
                          {formatDate(
                            application.appliedAt ||
                              application.createdAt
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Recent Users */}
          <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h3
                  className="text-[15px] font-bold"
                  style={{ color: DARK }}
                >
                  Recent Users
                </h3>

                <p
                  className="mt-1 text-[10px]"
                  style={{ color: MUTED }}
                >
                  Recently registered users
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/admin/users";
                }}
                className="inline-flex items-center gap-1 text-[11px] font-semibold"
                style={{ color: PRIMARY }}
              >
                View All
                <ArrowRight size={14} />
              </button>
            </div>

            {recentUsers.length === 0 ? (
              <div className="p-8 text-center">
                <Users
                  size={28}
                  className="mx-auto mb-2"
                  style={{ color: "#c8cdd5" }}
                />

                <p
                  className="text-[12px] font-medium"
                  style={{ color: MUTED }}
                >
                  No users found
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentUsers.map((user) => {
                  const name =
                    user.fullName || "Unknown User";

                  return (
                    <div
                      key={user._id}
                      className="flex flex-col gap-3 p-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={name}
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                            style={{
                              backgroundColor: PRIMARY,
                            }}
                          >
                            {name
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p
                            className="truncate text-[12px] font-semibold"
                            style={{ color: DARK }}
                          >
                            {name}
                          </p>

                          <p
                            className="mt-0.5 truncate text-[10px]"
                            style={{ color: MUTED }}
                          >
                            {user.email || "No email"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:justify-end">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[9px] font-semibold capitalize ${
                            user.status === "active"
                              ? "bg-green-50 text-green-600"
                              : user.status === "blocked"
                              ? "bg-red-50 text-red-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {user.status || "pending"}
                        </span>

                        <span
                          className="whitespace-nowrap text-[10px]"
                          style={{ color: MUTED }}
                        >
                          {formatDate(user.createdAt)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default DashboardOverview;