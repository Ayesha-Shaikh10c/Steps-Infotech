import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Bell, ChevronDown } from "lucide-react";

const UserHeader = ({ onMenuClick }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Unable to read user data:", error);
      setUser(null);
    }
  }, [location.pathname]);

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/user") return "Dashboard";
    if (path === "/user/profile") return "My Profile";
    if (path === "/user/jobs") return "Jobs";
    if (path.startsWith("/user/jobs/")) return "Job Details";
    if (path === "/user/saved-jobs") return "Saved Jobs";
    if (path === "/user/applications") return "My Applications";
    if (path.startsWith("/user/applications/")) {
      return "Application Details";
    }
    if (path.startsWith("/user/apply/")) return "Apply for Job";

    return "User Dashboard";
  };

  const getInitials = () => {
    const name = user?.fullName?.trim();

    if (!name) return "U";

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl p-2 text-[#596170] transition hover:bg-gray-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-[#171b2b] sm:text-xl">
              {getPageTitle()}
            </h1>

            <p className="hidden text-xs text-[#707686] sm:block">
              Manage your account and job applications
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification */}
          <button
            type="button"
            className="relative rounded-xl p-2.5 text-[#596170] transition hover:bg-[#f1f8f8] hover:text-[#159a9c]"
            aria-label="Notifications"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#159a9c]" />
          </button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-gray-200 sm:block" />

          {/* User */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#159a9c] text-sm font-semibold text-white">
              {user?.profileImage ? (
                <img
                  src={`http://localhost:5000${user.profileImage}`}
                  alt={user?.fullName || "User"}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                getInitials()
              )}
            </div>

            <div className="hidden min-w-0 md:block">
              <p className="max-w-[140px] truncate text-sm font-semibold text-[#171b2b]">
                {user?.fullName || "User"}
              </p>

              <p className="text-[11px] text-[#707686]">
                User Account
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden text-[#707686] md:block"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;