import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import DashboardOverview from "./DashboardOverview";

import { apiFetch } from "../../lib/api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      setLoading(true);

      const response = await apiFetch("/dashboard/admin");

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to load dashboard"
        );
      }

      setDashboard(response.data);
    } catch (err) {
      console.error("Admin dashboard error:", err);

      if (
        err?.status === 401 ||
        err?.status === 403
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });
        return;
      }

      setError(
        err?.message ||
          "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div
      className="min-h-screen bg-[#f7fafa]"
      style={{
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="min-h-screen lg:pl-[260px]">
        {/* Header */}
        <AdminHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Content */}
        <main className="px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            <DashboardOverview
              dashboard={dashboard}
              loading={loading}
              error={error}
              onRefresh={fetchDashboard}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;