import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  GraduationCap,
  FileText,
  MessageSquare,
  Newspaper,
  Wrench,
  Star,
  FolderKanban,
  Cpu,
  Handshake,
  LogOut,
  X,
} from "lucide-react";

const PRIMARY = "#159a9c";
const DARK = "#171b2b";
const MUTED = "#707686";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Jobs",
    path: "/admin/jobs",
    icon: BriefcaseBusiness,
  },
  {
    label: "Internships",
    path: "/admin/internships",
    icon: GraduationCap,
  },
  {
    label: "Applications",
    path: "/admin/applications",
    icon: FileText,
  },
  {
    label: "Contacts",
    path: "/admin/contacts",
    icon: MessageSquare,
  },
  {
    label: "Blogs",
    path: "/admin/blogs",
    icon: Newspaper,
  },
  {
    label: "Services",
    path: "/admin/services",
    icon: Wrench,
  },
  {
    label: "Testimonials",
    path: "/admin/testimonials",
    icon: Star,
  },
  {
    label: "Portfolio",
    path: "/admin/portfolio",
    icon: FolderKanban,
  },
  {
    label: "Technologies",
    path: "/admin/technologies",
    icon: Cpu,
  },
  {
    label: "Partners",
    path: "/admin/partners",
    icon: Handshake,
  },
];

const AdminSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          flex h-screen w-[260px] flex-col
          border-r border-gray-100 bg-white
          transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Logo / Header */}
        <div className="flex h-[78px] items-center justify-between border-b border-gray-100 px-5">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2.5"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: PRIMARY }}
            >
              <span className="text-lg font-bold">S</span>
            </div>

            <div className="text-left">
              <h2
                className="text-[17px] font-bold leading-tight"
                style={{ color: DARK }}
              >
                Steps-Infotech
              </h2>

              <p
                className="mt-0.5 text-[10px] font-medium"
                style={{ color: MUTED }}
              >
                ADMIN PANEL
              </p>
            </div>
          </button>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} style={{ color: DARK }} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p
            className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: MUTED }}
          >
            Management
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#eaf8f8" : "transparent",
                    color: isActive ? PRIMARY : MUTED,
                  })}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        strokeWidth={isActive ? 2.3 : 2}
                        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
                      />

                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 hover:bg-red-50 hover:text-red-500"
            style={{ color: MUTED }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;