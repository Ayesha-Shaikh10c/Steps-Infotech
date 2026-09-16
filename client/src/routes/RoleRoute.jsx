import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleRoute({ allowedRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#079c9c]/20 border-t-[#079c9c]" />

          <p className="text-sm font-semibold text-[#172033]">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/user" replace />;
  }

  return <Outlet />;
}

export default RoleRoute;