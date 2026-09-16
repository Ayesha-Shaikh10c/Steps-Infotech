import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaSave, FaEye, FaEyeSlash } from "react-icons/fa";
import { apiFetch } from "../../lib/api";

const PRIMARY = "#159a9c";
const DARK = "#171b2b";
const MUTED = "#707686";

const AdminSettings = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch("/users/profile");

      const user = response?.user || response?.data || response;

      setProfile({
        name: user?.fullName || user?.name || "",
        email: user?.email || "",
      });
    } catch (err) {
      setError(err.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      setSavingProfile(true);
      setMessage("");
      setError("");

      await apiFetch("/users/profile", {
        method: "PUT",
        body: JSON.stringify({
          fullName: profile.name,
        }),
      });

      localStorage.setItem("userName", profile.name);
      localStorage.setItem("fullName", profile.name);

      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!password.currentPassword || !password.newPassword) {
      setError("Please fill all password fields.");
      return;
    }

    if (password.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (password.newPassword !== password.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      setSavingPassword(true);

      await apiFetch("/users/change-password", {
        method: "PUT",
        body: JSON.stringify({
          currentPassword: password.currentPassword,
          newPassword: password.newPassword,
        }),
      });

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setMessage("Password changed successfully.");
    } catch (err) {
      setError(err.message || "Failed to change password.");
    } finally {
      setSavingPassword(false);
    }
  };

  const togglePassword = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-[Poppins,sans-serif]">
        <div
          className="w-10 h-10 border-4 border-gray-200 rounded-full animate-spin"
          style={{ borderTopColor: PRIMARY }}
        />
      </div>
    );
  }

  return (
    <div className="font-[Poppins,sans-serif]">
      {/* Header */}
      <div className="mb-7">
        <h1
          className="text-2xl md:text-3xl font-bold"
          style={{ color: DARK }}
        >
          Admin Settings
        </h1>

        <p className="mt-1 text-sm" style={{ color: MUTED }}>
          Manage your administrator profile and account security.
        </p>
      </div>

      {/* Messages */}
      {message && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="p-5 md:p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${PRIMARY}15`,
                  color: PRIMARY,
                }}
              >
                <FaUser />
              </div>

              <div>
                <h2
                  className="font-semibold text-lg"
                  style={{ color: DARK }}
                >
                  Profile Information
                </h2>

                <p className="text-xs mt-0.5" style={{ color: MUTED }}>
                  Update your administrator information.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="p-5 md:p-6">
            <div className="mb-5">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: DARK }}
              >
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm transition focus:border-[#159a9c]"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: DARK }}
              >
                Email Address
              </label>

              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 outline-none text-sm cursor-not-allowed"
              />

              <p className="text-xs mt-2" style={{ color: MUTED }}>
                Admin email cannot be changed from this panel.
              </p>
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: PRIMARY }}
            >
              <FaSave />

              {savingProfile ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>

        {/* Password */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="p-5 md:p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${PRIMARY}15`,
                  color: PRIMARY,
                }}
              >
                <FaLock />
              </div>

              <div>
                <h2
                  className="font-semibold text-lg"
                  style={{ color: DARK }}
                >
                  Change Password
                </h2>

                <p className="text-xs mt-0.5" style={{ color: MUTED }}>
                  Keep your administrator account secure.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="p-5 md:p-6">
            {/* Current */}
            <div className="mb-5">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: DARK }}
              >
                Current Password
              </label>

              <div className="relative">
                <input
                  type={showPassword.current ? "text" : "password"}
                  name="currentPassword"
                  value={password.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 outline-none text-sm focus:border-[#159a9c]"
                />

                <button
                  type="button"
                  onClick={() => togglePassword("current")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* New */}
            <div className="mb-5">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: DARK }}
              >
                New Password
              </label>

              <div className="relative">
                <input
                  type={showPassword.new ? "text" : "password"}
                  name="newPassword"
                  value={password.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 outline-none text-sm focus:border-[#159a9c]"
                />

                <button
                  type="button"
                  onClick={() => togglePassword("new")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <p className="text-xs mt-2" style={{ color: MUTED }}>
                Use at least 6 characters.
              </p>
            </div>

            {/* Confirm */}
            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: DARK }}
              >
                Confirm New Password
              </label>

              <div className="relative">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={password.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 outline-none text-sm focus:border-[#159a9c]"
                />

                <button
                  type="button"
                  onClick={() => togglePassword("confirm")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={savingPassword}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: PRIMARY }}
            >
              <FaLock />

              {savingPassword ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;