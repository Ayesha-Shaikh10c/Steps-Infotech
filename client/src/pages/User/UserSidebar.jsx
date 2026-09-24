import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  BriefcaseBusiness,
  Bookmark,
  FileText,
  LogOut,
  X,
} from "lucide-react";

const UserSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/user",
      icon: LayoutDashboard,
    },
    {
      label: "My Profile",
      path: "/user/profile",
      icon: UserRound,
    },
    {
      label: "Jobs",
      path: "/user/jobs",
      icon: BriefcaseBusiness,
    },
    {
      label: "Saved Jobs",
      path: "/user/saved-jobs",
      icon: Bookmark,
    },
    {
      label: "My Applications",
      path: "/user/applications",
      icon: FileText,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-gray-200 bg-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo / Brand */}
        <div className="flex h-[72px] items-center justify-between border-b border-gray-100 px-5">
          <button
            type="button"
            onClick={() => navigate("/user")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#159a9c] text-lg font-bold text-white">
              SI
            </div>

            <div className="text-left">
              <p className="text-[17px] font-bold text-[#171b2b]">
                Steps-Infotech
              </p>
              <p className="text-[11px] text-[#707686]">
                User Panel
              </p>
            </div>
          </button>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#707686] transition hover:bg-gray-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#9aa0ac]">
            Main Menu
          </p>

          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/user"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-[#159a9c] text-white shadow-sm"
                        : "text-[#596170] hover:bg-[#f1f8f8] hover:text-[#159a9c]"
                    }`
                  }
                >
                  <Icon size={19} strokeWidth={2} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-100 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#596170] transition hover:bg-red-50 hover:text-red-500"
          >
            <LogOut size={19} strokeWidth={2} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;