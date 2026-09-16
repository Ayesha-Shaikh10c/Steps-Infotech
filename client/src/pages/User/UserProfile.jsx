import React, { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  FileText,
  Save,
  RefreshCw,
  LockKeyhole,
  Eye,
  EyeOff,
  Upload,
  ShieldCheck,
  CheckCircle2,
  ImagePlus,
  Download,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const FILE_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const getFileUrl = (filePath) => {
  if (!filePath) return "";

  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }

  return `${FILE_BASE_URL}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
};

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    bio: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    skills: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#171b2b] outline-none transition placeholder:text-[#a2a8b2] focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-[#404653]";

  const syncLocalUser = (updatedUser) => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...parsedUser,
          ...updatedUser,
        })
      );
    } catch (error) {
      console.error("Local user sync error:", error);
    }
  };

  const populateProfileForm = (user) => {
    setForm({
      fullName: user?.fullName || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      country: user?.country || "",
      pincode: user?.pincode || "",
      skills: Array.isArray(user?.skills)
        ? user.skills.join(", ")
        : user?.skills || "",
    });
  };

  const handleAuthError = (err) => {
    if (err?.status === 401 || err?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return true;
    }

    return false;
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await apiFetch("/users/profile");

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to load profile."
        );
      }

      const user = response.data || {};

      setProfile(user);
      populateProfileForm(user);
      syncLocalUser(user);
    } catch (err) {
      console.error("Profile fetch error:", err);

      if (handleAuthError(err)) return;

      setError(
        err?.message || "Unable to load your profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const fullName = form.fullName.trim();

      if (!fullName) {
        setError("Full name is required.");
        return;
      }

      if (form.phone.trim() && !/^[0-9+\-\s()]{7,20}$/.test(form.phone.trim())) {
        setError("Please enter a valid phone number.");
        return;
      }

      const payload = {
        fullName,
        phone: form.phone.trim(),
        bio: form.bio.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        country: form.country.trim(),
        pincode: form.pincode.trim(),
        skills: form.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const response = await apiFetch("/users/profile", {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to update profile."
        );
      }

      const updatedUser = response.data || {};

      setProfile(updatedUser);
      populateProfileForm(updatedUser);
      syncLocalUser(updatedUser);

      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.error("Profile update error:", err);

      if (handleAuthError(err)) return;

      setError(
        err?.message || "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleProfileImageUpload = async () => {
    if (!profileImageFile) {
      setError("Please select a profile image first.");
      return;
    }

    if (!["image/jpeg", "image/png"].includes(profileImageFile.type)) {
      setError("Only JPG and PNG profile images are allowed.");
      return;
    }

    if (profileImageFile.size > 5 * 1024 * 1024) {
      setError("Profile image must be smaller than 5MB.");
      return;
    }

    try {
      setUploadingImage(true);
      setError("");
      setSuccess("");

      const formData = new FormData();
      formData.append("profileImage", profileImageFile);

      const response = await apiFetch("/users/upload-profile", {
        method: "PUT",
        body: formData,
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to upload profile image."
        );
      }

      const updatedUser = response.data || {};

      setProfile(updatedUser);
      populateProfileForm(updatedUser);
      syncLocalUser(updatedUser);

      setProfileImageFile(null);

      const imageInput = document.getElementById("profileImageInput");

      if (imageInput) {
        imageInput.value = "";
      }

      setSuccess("Profile image updated successfully.");
    } catch (err) {
      console.error("Profile image upload error:", err);

      if (handleAuthError(err)) return;

      setError(
        err?.message || "Unable to upload profile image."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      setError("Please select a PDF resume first.");
      return;
    }

    if (resumeFile.type !== "application/pdf") {
      setError("Only PDF resumes are allowed.");
      return;
    }

    if (resumeFile.size > 10 * 1024 * 1024) {
      setError("Resume must be smaller than 10MB.");
      return;
    }

    try {
      setUploadingResume(true);
      setError("");
      setSuccess("");

      const formData = new FormData();
      formData.append("resume", resumeFile);

      const response = await apiFetch("/users/upload-resume", {
        method: "PUT",
        body: formData,
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to upload resume."
        );
      }

      const updatedUser = response.data || {};

      setProfile(updatedUser);
      populateProfileForm(updatedUser);
      syncLocalUser(updatedUser);

      setResumeFile(null);

      const resumeInput = document.getElementById("resumeInput");

      if (resumeInput) {
        resumeInput.value = "";
      }

      setSuccess("Resume uploaded successfully.");
    } catch (err) {
      console.error("Resume upload error:", err);

      if (handleAuthError(err)) return;

      setError(
        err?.message || "Unable to upload resume."
      );
    } finally {
      setUploadingResume(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    try {
      setChangingPassword(true);
      setError("");
      setSuccess("");

      const currentPassword =
        passwordForm.currentPassword.trim();

      const newPassword = passwordForm.newPassword;
      const confirmPassword = passwordForm.confirmPassword;

      if (!currentPassword) {
        setError("Current password is required.");
        return;
      }

      if (!newPassword) {
        setError("New password is required.");
        return;
      }

      if (newPassword.length < 6) {
        setError(
          "New password must be at least 6 characters long."
        );
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("New password and confirm password do not match.");
        return;
      }

      if (currentPassword === newPassword) {
        setError(
          "New password must be different from your current password."
        );
        return;
      }

      const response = await apiFetch("/users/change-password", {
        method: "PUT",
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "Failed to change password."
        );
      }

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setSuccess("Password changed successfully.");
    } catch (err) {
      console.error("Change password error:", err);

      if (handleAuthError(err)) return;

      setError(
        err?.message || "Unable to change your password."
      );
    } finally {
      setChangingPassword(false);
    }
  };

  const getInitials = () => {
    const name = profile?.fullName || "User";

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="h-7 w-48 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-72 rounded bg-gray-100" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="h-96 animate-pulse rounded-2xl bg-gray-200" />
          <div className="h-[650px] animate-pulse rounded-2xl bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Intro */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-[#171b2b] sm:text-2xl">
              Profile Settings
            </h2>

            <p className="mt-1 text-sm text-[#707686]">
              Manage your personal information, profile image,
              resume and account security.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-[#e9f7f7] px-3 py-2 text-xs font-semibold text-[#159a9c]">
            <ShieldCheck size={16} />
            Account Secure
          </div>
        </div>
      </section>

      {/* Messages */}
      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
          <CheckCircle2 size={17} />
          {success}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* LEFT PROFILE CARD */}
        <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            {/* Profile Image */}
            <div className="relative">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#159a9c] text-3xl font-bold text-white ring-4 ring-[#e9f7f7]">
                {profile?.profileImage ? (
                  <img
                    src={getFileUrl(profile.profileImage)}
                    alt={profile?.fullName || "Profile"}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  getInitials()
                )}
              </div>

              <label
                htmlFor="profileImageInput"
                className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#159a9c] text-white shadow-md transition hover:bg-[#12888a]"
                title="Change profile image"
              >
                <ImagePlus size={17} />
              </label>

              <input
                id="profileImageInput"
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  setProfileImageFile(file);
                  setError("");
                  setSuccess("");
                }}
              />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#171b2b]">
              {profile?.fullName || "User"}
            </h3>

            <p className="mt-1 break-all text-sm text-[#707686]">
              {profile?.email || "No email"}
            </p>

            {/* Upload Image */}
            {profileImageFile && (
              <div className="mt-4 w-full rounded-xl border border-[#159a9c]/20 bg-[#f1fafa] p-3">
                <p className="truncate text-xs font-semibold text-[#171b2b]">
                  {profileImageFile.name}
                </p>

                <button
                  type="button"
                  onClick={handleProfileImageUpload}
                  disabled={uploadingImage}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#159a9c] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#12888a] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploadingImage ? (
                    <>
                      <RefreshCw
                        size={14}
                        className="animate-spin"
                      />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={14} />
                      Upload Image
                    </>
                  )}
                </button>
              </div>
            )}

            {/* User Info */}
            <div className="mt-6 w-full space-y-4 border-t border-gray-100 pt-5 text-left">
              <div className="flex items-start gap-3 text-sm text-[#596170]">
                <Mail
                  size={17}
                  className="mt-0.5 shrink-0 text-[#159a9c]"
                />

                <div className="min-w-0">
                  <p className="text-[11px] text-[#9096a1]">
                    Email
                  </p>
                  <p className="break-all font-medium">
                    {profile?.email || "Not available"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-[#596170]">
                <Phone
                  size={17}
                  className="mt-0.5 shrink-0 text-[#159a9c]"
                />

                <div>
                  <p className="text-[11px] text-[#9096a1]">
                    Phone
                  </p>
                  <p className="font-medium">
                    {profile?.phone || "Not added"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-[#596170]">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-[#159a9c]"
                />

                <div className="min-w-0">
                  <p className="text-[11px] text-[#9096a1]">
                    Location
                  </p>

                  <p className="font-medium">
                    {[
                      profile?.city,
                      profile?.state,
                      profile?.country,
                    ]
                      .filter(Boolean)
                      .join(", ") || "Location not added"}
                  </p>
                </div>
              </div>
            </div>

            {/* Resume */}
            <div className="mt-6 w-full border-t border-gray-100 pt-5 text-left">
              <div className="mb-3 flex items-center gap-2">
                <FileText
                  size={18}
                  className="text-[#159a9c]"
                />

                <p className="text-sm font-semibold text-[#171b2b]">
                  Resume
                </p>
              </div>

              {profile?.resume ? (
                <div className="rounded-xl bg-[#f1f8f8] p-3">
                  <p className="truncate text-xs font-semibold text-[#171b2b]">
                    Resume uploaded
                  </p>

                  <div className="mt-3 flex gap-2">
                    <a
                      href={getFileUrl(profile.resume)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs font-semibold text-[#404653] transition hover:border-[#159a9c] hover:text-[#159a9c]"
                    >
                      <FileText size={14} />
                      View
                    </a>

                    <a
                      href={getFileUrl(profile.resume)}
                      download
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#159a9c] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#12888a]"
                    >
                      <Download size={14} />
                    </a>
                  </div>
                </div>
              ) : (
                <p className="rounded-xl bg-gray-50 p-3 text-xs text-[#707686]">
                  No resume uploaded yet.
                </p>
              )}

              <label
                htmlFor="resumeInput"
                className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 px-3 py-3 text-xs font-semibold text-[#596170] transition hover:border-[#159a9c] hover:bg-[#f7fafa] hover:text-[#159a9c]"
              >
                <Upload size={15} />
                Select PDF Resume
              </label>

              <input
                id="resumeInput"
                type="file"
                accept="application/pdf,.pdf"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  setResumeFile(file);
                  setError("");
                  setSuccess("");
                }}
              />

              {resumeFile && (
                <div className="mt-3 rounded-xl border border-[#159a9c]/20 bg-[#f1fafa] p-3">
                  <p className="truncate text-xs font-semibold text-[#171b2b]">
                    {resumeFile.name}
                  </p>

                  <button
                    type="button"
                    onClick={handleResumeUpload}
                    disabled={uploadingResume}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#159a9c] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#12888a] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {uploadingResume ? (
                      <>
                        <RefreshCw
                          size={14}
                          className="animate-spin"
                        />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={14} />
                        Upload Resume
                      </>
                    )}
                  </button>
                </div>
              )}

              <p className="mt-2 text-[11px] leading-4 text-[#9096a1]">
                PDF only. Maximum size 10MB.
              </p>
            </div>
          </div>
        </aside>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* PERSONAL INFORMATION */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9f7f7] text-[#159a9c]">
                <UserRound size={20} />
              </div>

              <div>
                <h3 className="font-bold text-[#171b2b]">
                  Personal Information
                </h3>

                <p className="text-xs text-[#707686]">
                  Update your profile details below.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleProfileSubmit}
              className="space-y-6"
            >
              {/* Name / Email */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className={labelClass}
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Enter your full name"
                    maxLength={100}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={labelClass}
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={profile?.email || ""}
                    disabled
                    className={`${inputClass} cursor-not-allowed bg-gray-50 text-gray-500`}
                  />

                  <p className="mt-1.5 text-[11px] text-[#9096a1]">
                    Email address cannot be changed here.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter your phone number"
                  maxLength={20}
                />
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className={labelClass}>
                  About You
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us something about yourself..."
                  maxLength={1000}
                />

                <p className="mt-1.5 text-right text-[11px] text-[#9096a1]">
                  {form.bio.length}/1000
                </p>
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className={labelClass}
                >
                  Address
                </label>

                <input
                  id="address"
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter your address"
                  maxLength={250}
                />
              </div>

              {/* Location */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label htmlFor="city" className={labelClass}>
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={form.city}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="City"
                    maxLength={80}
                  />
                </div>

                <div>
                  <label htmlFor="state" className={labelClass}>
                    State
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={form.state}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="State"
                    maxLength={80}
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className={labelClass}
                  >
                    Country
                  </label>

                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={form.country}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Country"
                    maxLength={80}
                  />
                </div>

                <div>
                  <label
                    htmlFor="pincode"
                    className={labelClass}
                  >
                    Pincode
                  </label>

                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    value={form.pincode}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Pincode"
                    maxLength={15}
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label htmlFor="skills" className={labelClass}>
                  Skills
                </label>

                <input
                  id="skills"
                  name="skills"
                  type="text"
                  value={form.skills}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="React, Node.js, MongoDB, JavaScript"
                  maxLength={500}
                />

                <p className="mt-1.5 text-xs text-[#9096a1]">
                  Separate multiple skills using commas.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={fetchProfile}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-[#596170] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RefreshCw size={17} />
                  Reload
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#159a9c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12888a] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <RefreshCw
                        size={17}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* PASSWORD / SECURITY */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9f7f7] text-[#159a9c]">
                <LockKeyhole size={20} />
              </div>

              <div>
                <h3 className="font-bold text-[#171b2b]">
                  Password & Security
                </h3>

                <p className="text-xs text-[#707686]">
                  Change your account password securely.
                </p>
              </div>
            </div>

            <form
              onSubmit={handlePasswordSubmit}
              className="space-y-5"
            >
              {/* Current Password */}
              <div>
                <label
                  htmlFor="currentPassword"
                  className={labelClass}
                >
                  Current Password
                </label>

                <div className="relative">
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type={
                      showCurrentPassword
                        ? "text"
                        : "password"
                    }
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className={`${inputClass} pr-12`}
                    placeholder="Enter current password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrentPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707686] hover:text-[#159a9c]"
                    aria-label={
                      showCurrentPassword
                        ? "Hide current password"
                        : "Show current password"
                    }
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className={labelClass}
                >
                  New Password
                </label>

                <div className="relative">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={
                      showNewPassword ? "text" : "password"
                    }
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className={`${inputClass} pr-12`}
                    placeholder="Enter new password"
                    minLength={6}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707686] hover:text-[#159a9c]"
                    aria-label={
                      showNewPassword
                        ? "Hide new password"
                        : "Show new password"
                    }
                  >
                    {showNewPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <p className="mt-1.5 text-[11px] text-[#9096a1]">
                  Password must contain at least 6 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className={labelClass}
                >
                  Confirm New Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className={`${inputClass} pr-12`}
                    placeholder="Confirm new password"
                    minLength={6}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707686] hover:text-[#159a9c]"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Match Indicator */}
              {passwordForm.confirmPassword && (
                <div
                  className={`rounded-xl px-4 py-3 text-xs font-medium ${
                    passwordForm.newPassword ===
                    passwordForm.confirmPassword
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {passwordForm.newPassword ===
                  passwordForm.confirmPassword
                    ? "✓ Passwords match."
                    : "Passwords do not match."}
                </div>
              )}

              {/* Password Button */}
              <div className="flex justify-end border-t border-gray-100 pt-5">
                <button
                  type="submit"
                  disabled={changingPassword}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#171b2b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#252b40] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {changingPassword ? (
                    <>
                      <RefreshCw
                        size={17}
                        className="animate-spin"
                      />
                      Changing...
                    </>
                  ) : (
                    <>
                      <LockKeyhole size={17} />
                      Change Password
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;