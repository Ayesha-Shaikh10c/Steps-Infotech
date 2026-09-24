import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../lib/api";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (loading) return;

    // -----------------------------
    // BASIC VALIDATION
    // -----------------------------

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // -----------------------------
    // FULL NAME VALIDATION
    // -----------------------------

    if (formData.fullName.trim().length < 2) {
      setErrorMessage("Full name must be at least 2 characters.");
      return;
    }

    // -----------------------------
    // EMAIL VALIDATION
    // -----------------------------

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // -----------------------------
    // PHONE VALIDATION
    // -----------------------------

    const phoneRegex = /^[0-9+\-\s()]{7,20}$/;

    if (!phoneRegex.test(formData.phone.trim())) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    // -----------------------------
    // PASSWORD VALIDATION
    // -----------------------------

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    // -----------------------------
    // CONFIRM PASSWORD
    // -----------------------------

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // -----------------------------
    // API REQUEST
    // -----------------------------

    try {
      setLoading(true);

      const response = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          password: formData.password,
        }),
      });

      console.log("Register Response:", response);

      if (!response?.success) {
        throw new Error(
          response?.message || "Registration failed. Please try again."
        );
      }

      // -----------------------------
      // SUCCESS
      // -----------------------------

      setSuccessMessage(
        response.message ||
          "Registration successful. Your account is waiting for admin approval."
      );

      // Clear form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login
      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: {
            message:
              "Registration successful. Please wait for admin approval before logging in.",
          },
        });
      }, 1800);
    } catch (err) {
      console.error("Frontend Register Error:", err);
      console.error("Backend Response:", err?.data);

      // Backend validation errors
      const backendErrors = err?.data?.errors;

      if (
        backendErrors &&
        typeof backendErrors === "object" &&
        !Array.isArray(backendErrors)
      ) {
        const firstError = Object.values(backendErrors)[0];

        if (typeof firstError === "string") {
          setErrorMessage(firstError);
        } else if (firstError?.message) {
          setErrorMessage(firstError.message);
        } else {
          setErrorMessage("Please check your registration details.");
        }
      } else {
        setErrorMessage(
          err?.data?.message ||
            err?.message ||
            "Registration failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-[calc(100vh-80px)] bg-[#f8fafc] px-4 py-10 sm:px-6 lg:px-8"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="mx-auto flex w-full max-w-md items-center justify-center">
        <div className="w-full rounded-xl bg-white p-7 shadow-[0_6px_25px_rgba(0,0,0,0.09)] sm:p-9">
          {/* Header */}
          <div className="mb-7 text-center">
            <span className="mb-2 block text-[11px] font-extrabold tracking-[0.8px] text-[#079c9c]">
              JOIN STEPS INFOTECH
            </span>

            <h1 className="mb-2 text-[27px] font-extrabold leading-tight text-[#172033] sm:text-[30px]">
              Create Your Account
            </h1>

            <p className="text-[12px] leading-5 text-[#7a8290] sm:text-[13px]">
              Register your account to get started.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[12px] font-semibold leading-5 text-red-600"
            >
              {errorMessage}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div
              role="status"
              className="mb-5 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-[12px] font-semibold leading-5 text-green-600"
            >
              {successMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-[12px] font-bold text-[#172033]"
              >
                Full Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-[#079c9c]" />

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  disabled={loading}
                  maxLength={100}
                  autoComplete="name"
                  className="h-11 w-full rounded-md border border-[#dce2e8] bg-white pl-10 pr-3 text-[13px] text-[#172033] outline-none transition placeholder:text-[#a0a7b2] focus:border-[#079c9c] focus:ring-4 focus:ring-[#079c9c]/10 disabled:cursor-not-allowed disabled:bg-[#f8fafc]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[12px] font-bold text-[#172033]"
              >
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-[#079c9c]" />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                  maxLength={120}
                  autoComplete="email"
                  className="h-11 w-full rounded-md border border-[#dce2e8] bg-white pl-10 pr-3 text-[13px] text-[#172033] outline-none transition placeholder:text-[#a0a7b2] focus:border-[#079c9c] focus:ring-4 focus:ring-[#079c9c]/10 disabled:cursor-not-allowed disabled:bg-[#f8fafc]"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-[12px] font-bold text-[#172033]"
              >
                Phone Number
              </label>

              <div className="relative">
                <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-[#079c9c]" />

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  disabled={loading}
                  maxLength={20}
                  autoComplete="tel"
                  className="h-11 w-full rounded-md border border-[#dce2e8] bg-white pl-10 pr-3 text-[13px] text-[#172033] outline-none transition placeholder:text-[#a0a7b2] focus:border-[#079c9c] focus:ring-4 focus:ring-[#079c9c]/10 disabled:cursor-not-allowed disabled:bg-[#f8fafc]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[12px] font-bold text-[#172033]"
              >
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-[#079c9c]" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  disabled={loading}
                  minLength={6}
                  autoComplete="new-password"
                  className="h-11 w-full rounded-md border border-[#dce2e8] bg-white pl-10 pr-11 text-[13px] text-[#172033] outline-none transition placeholder:text-[#a0a7b2] focus:border-[#079c9c] focus:ring-4 focus:ring-[#079c9c]/10 disabled:cursor-not-allowed disabled:bg-[#f8fafc]"
                />

                <button
                  type="button"
                  disabled={loading}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7a8290] transition hover:text-[#079c9c]"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-[12px] font-bold text-[#172033]"
              >
                Confirm Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-[#079c9c]" />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  disabled={loading}
                  minLength={6}
                  autoComplete="new-password"
                  className="h-11 w-full rounded-md border border-[#dce2e8] bg-white pl-10 pr-11 text-[13px] text-[#172033] outline-none transition placeholder:text-[#a0a7b2] focus:border-[#079c9c] focus:ring-4 focus:ring-[#079c9c]/10 disabled:cursor-not-allowed disabled:bg-[#f8fafc]"
                />

                <button
                  type="button"
                  disabled={loading}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7a8290] transition hover:text-[#079c9c]"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#079c9c] text-[13px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#067c7e] hover:shadow-[0_5px_12px_rgba(7,156,156,0.25)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <FaArrowRight className="text-[11px]" />
                </>
              )}
            </button>
          </form>

          {/* Login */}
          <div className="mt-7 border-t border-[#edf0f4] pt-6 text-center">
            <p className="text-[12px] text-[#7a8290]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#079c9c] hover:text-[#067c7e]"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Back */}
          <div className="mt-5 text-center">
            <Link
              to="/"
              className="text-[12px] font-semibold text-[#64748b] hover:text-[#079c9c]"
            >
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;