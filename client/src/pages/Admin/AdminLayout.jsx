import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBriefcase,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";

const PRIMARY = "#159a9c";
const DARK = "#171b2b";
const MUTED = "#707686";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminName =
    localStorage.getItem("userName") ||
    localStorage.getItem("fullName") ||
    "Administrator";

  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: FaTachometerAlt,
      end: true,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: FaUsers,
    },
    {
      label: "Jobs",
      path: "/admin/jobs",
      icon: FaBriefcase,
    },
    {
      label: "Applications",
      path: "/admin/applications",
      icon: FaFileAlt,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: FaCog,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("fullName");

    navigate("/login");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fa] font-[Poppins,sans-serif]">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[250px] bg-white border-r border-gray-100 flex flex-col transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="h-[76px] px-5 flex items-center justify-between border-b border-gray-100">
          <div>
            <h1
              className="text-xl font-bold tracking-tight"
              style={{ color: PRIMARY }}
            >
              Steps Infotech
            </h1>

            <p
              className="text-[11px] font-medium mt-0.5"
              style={{ color: MUTED }}
            >
              Admin Panel
            </p>
          </div>

          <button
            onClick={closeSidebar}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto">
          <p
            className="px-3 mb-3 text-[11px] uppercase tracking-wider font-semibold"
            style={{ color: MUTED }}
          >
            Main Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                  style={({ isActive }) =>
                    isActive ? { backgroundColor: PRIMARY } : {}
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className="text-[15px]"
                          style={{
                            color: isActive ? "#fff" : MUTED,
                          }}
                        />

                        <span>{item.label}</span>
                      </div>

                      {isActive && (
                        <FaChevronRight className="text-[10px] opacity-80" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Admin Profile */}
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f7f9fa]">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
              style={{ backgroundColor: PRIMARY }}
            >
              {adminName
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <p
                className="text-sm font-semibold truncate"
                style={{ color: DARK }}
              >
                {adminName}
              </p>

              <p
                className="text-[11px] truncate"
                style={{ color: MUTED }}
              >
                Administrator
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-2 flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition"
          >
            <FaSignOutAlt className="text-sm" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="lg:ml-[250px] min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-[76px] bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
            >
              <FaBars />
            </button>

            <div>
              <h2
                className="text-base sm:text-lg font-semibold"
                style={{ color: DARK }}
              >
                Welcome back, {adminName}
              </h2>

              <p
                className="hidden sm:block text-xs mt-0.5"
                style={{ color: MUTED }}
              >
                Manage your platform from the admin control panel.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/admin/settings")}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            style={{ backgroundColor: PRIMARY }}
            title="Admin Settings"
          >
            {adminName
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </button>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1200px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;