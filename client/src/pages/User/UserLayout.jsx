import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import UserHeader from "./UserHeader";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-[#f7fafa]"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Sidebar */}
      <UserSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="min-h-screen lg:pl-[260px]">
        {/* Header */}
        <UserHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;