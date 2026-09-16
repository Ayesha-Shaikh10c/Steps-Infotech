import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  LogOut,
  UserCircle,
  ChevronDown,
} from "lucide-react";

const PRIMARY = "#159a9c";
const DARK = "#171b2b";
const MUTED = "#707686";

const pageTitles = {
  "/admin": {
    title: "Dashboard",
    subtitle: "Overview of your platform",
  },
  "/admin/users": {
    title: "Manage Users",
    subtitle: "View and manage registered users",
  },
  "/admin/jobs": {
    title: "Manage Jobs",
    subtitle: "Create and manage job openings",
  },
  "/admin/internships": {
    title: "Manage Internships",
    subtitle: "Create and manage internship opportunities",
  },
  "/admin/applications": {
    title: "Manage Applications",
    subtitle: "Review and manage job applications",
  },
  "/admin/contacts": {
    title: "Manage Contacts",
    subtitle: "View and manage contact enquiries",
  },
  "/admin/blogs": {
    title: "Manage Blogs",
    subtitle: "Create and manage blog content",
  },
  "/admin/services": {
    title: "Manage Services",
    subtitle: "Manage company services",
  },
  "/admin/testimonials": {
    title: "Manage Testimonials",
    subtitle: "Manage customer testimonials",
  },
  "/admin/portfolio": {
    title: "Manage Portfolio",
    subtitle: "Manage portfolio projects",
  },
  "/admin/technologies": {
    title: "Manage Technologies",
    subtitle: "Manage technologies and skills",
  },
  "/admin/partners": {
    title: "Manage Partners",
    subtitle: "Manage company partners",
  },
};

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

const getInitials = (user) => {
  const name = user?.fullName || user?.name || "Admin";

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const AdminHeader = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = getStoredUser();

  const currentPage =
    pageTitles[location.pathname] || pageTitles["/admin"];

  const adminName =
    user?.fullName || user?.name || "Admin";

  const adminEmail =
    user?.email || "Administrator";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header
      className="sticky top-0 z-30 border-b border-gray-100 bg-white"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="flex h-[78px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white transition hover:bg-gray-50 lg:hidden"
            aria-label="Open admin menu"
          >
            <Menu
              size={21}
              style={{ color: DARK }}
            />
          </button>

          <div className="min-w-0">
            <h1
              className="truncate text-[18px] font-bold sm:text-[20px]"
              style={{ color: DARK }}
            >
              {currentPage.title}
            </h1>

            <p
              className="mt-0.5 hidden truncate text-[11px] sm:block sm:text-[12px]"
              style={{ color: MUTED }}
            >
              {currentPage.subtitle}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Admin Profile */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-gray-50 sm:gap-3"
            >
              {/* Avatar */}
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={adminName}
                  className="h-9 w-9 rounded-full border border-gray-100 object-cover"
                />
              ) : (
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold text-white"
                  style={{
                    backgroundColor: PRIMARY,
                  }}
                >
                  {getInitials(user)}
                </div>
              )}

              {/* User Details */}
              <div className="hidden text-left sm:block">
                <p
                  className="max-w-[150px] truncate text-[12px] font-semibold"
                  style={{ color: DARK }}
                >
                  {adminName}
                </p>

                <p
                  className="max-w-[150px] truncate text-[10px]"
                  style={{ color: MUTED }}
                >
                  {adminEmail}
                </p>
              </div>

              <ChevronDown
                size={15}
                className="hidden sm:block"
                style={{ color: MUTED }}
              />
            </button>

            {/* Dropdown */}
            <div className="invisible absolute right-0 top-[calc(100%+8px)] w-[210px] translate-y-1 rounded-xl border border-gray-100 bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="border-b border-gray-100 px-3 py-2.5">
                <p
                  className="truncate text-[12px] font-semibold"
                  style={{ color: DARK }}
                >
                  {adminName}
                </p>

                <p
                  className="mt-0.5 truncate text-[10px]"
                  style={{ color: MUTED }}
                >
                  {adminEmail}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[12px] transition hover:bg-gray-50"
                style={{ color: DARK }}
              >
                <UserCircle size={16} />
                Dashboard
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[12px] text-red-500 transition hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;