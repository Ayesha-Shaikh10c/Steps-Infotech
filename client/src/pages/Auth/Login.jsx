import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaUserShield,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../lib/api";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ==================================================
  // HANDLE INPUT
  // ==================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  };

  // ==================================================
  // VALIDATE FORM
  // ==================================================

  const validateForm = () => {
    const email = formData.email.trim();
    const password = formData.password;

    if (!email) {
      setErrorMessage("Email address is required.");
      return false;
    }

    if (!password) {
      setErrorMessage("Password is required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  // ==================================================
  // LOGIN
  // ==================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    // ==================================================
    // FORM VALIDATION
    // ==================================================

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // ==================================================
      // BACKEND LOGIN API
      // ==================================================

      const response = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      // ==================================================
      // CHECK BACKEND RESPONSE
      // ==================================================

      if (!response?.success) {
        throw new Error(
          response?.message || "Login failed. Please try again."
        );
      }

      // ==================================================
      // CHECK AUTH RESPONSE
      // ==================================================

      if (!response?.token || !response?.user) {
        throw new Error(
          "Login response is incomplete. Please try again."
        );
      }

      // ==================================================
      // SAVE AUTHENTICATION DATA
      // ==================================================

      const loginSuccess = login(
        response.token,
        response.user
      );

      if (!loginSuccess) {
        throw new Error(
          "Login successful, but authentication data could not be saved."
        );
      }

      // ==================================================
      // SUCCESS MESSAGE
      // ==================================================

      setSuccessMessage("Login successful. Redirecting...");

      // ==================================================
      // ROLE BASED REDIRECT
      // ==================================================

      if (response.user.role === "admin") {
        navigate("/admin", {
          replace: true,
        });
      } else {
        navigate("/user", {
          replace: true,
        });
      }
    } catch (error) {
      console.error("Frontend Login Error:", error);

      // ==================================================
      // API ERROR MESSAGE
      // ==================================================

      if (error?.status === 401) {
        setErrorMessage(
          error?.message || "Invalid email or password."
        );
      } else if (error?.status === 403) {
        setErrorMessage(
          error?.message ||
            "Your account does not have permission to login."
        );
      } else if (
        error instanceof TypeError ||
        error?.message?.includes("Failed to fetch")
      ) {
        setErrorMessage(
          "Unable to connect to the server. Please make sure the backend is running."
        );
      } else {
        setErrorMessage(
          error?.message ||
            "Something went wrong during login."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#f8fafc] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-md items-center justify-center">
        <div className="w-full rounded-xl bg-white p-7 shadow-[0_6px_25px_rgba(0,0,0,0.09)] sm:p-9">

          {/* ================= ICON ================= */}

          <div className="mb-5 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#079c9c] text-2xl text-white">
              <FaUserShield />
            </div>
          </div>

          {/* ================= HEADER ================= */}

          <div className="mb-7 text-center">
            <span className="mb-2 block text-[11px] font-extrabold tracking-[0.8px] text-[#079c9c]">
              WELCOME BACK
            </span>

            <h1 className="mb-2 text-[27px] font-extrabold leading-tight text-[#172033] sm:text-[30px]">
              Login to Your Account
            </h1>

            <p className="text-[12px] leading-5 text-[#7a8290] sm:text-[13px]">
              Sign in to continue to Steps Infotech.
            </p>
          </div>

          {/* ================= ERROR ================= */}

          {errorMessage && (
            <div
              role="alert"
              className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[12px] font-semibold leading-5 text-red-600"
            >
              {errorMessage}
            </div>
          )}

          {/* ================= SUCCESS ================= */}

          {successMessage && (
            <div
              role="status"
              className="mb-5 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-[12px] font-semibold leading-5 text-green-600"
            >
              {successMessage}
            </div>
          )}

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            {/* ================= EMAIL ================= */}

            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-[12px] font-bold text-[#172033]"
              >
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-[#079c9c]" />

                <input
                  id="login-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={loading}
                  className="
                    h-11
                    w-full
                    rounded-md
                    border
                    border-[#dce2e8]
                    bg-white
                    pl-10
                    pr-3
                    text-[13px]
                    text-[#172033]
                    outline-none
                    transition
                    placeholder:text-[#a0a7b2]
                    focus:border-[#079c9c]
                    focus:ring-4
                    focus:ring-[#079c9c]/10
                    disabled:cursor-not-allowed
                    disabled:bg-[#f8fafc]
                  "
                />
              </div>
            </div>

            {/* ================= PASSWORD ================= */}

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="text-[12px] font-bold text-[#172033]"
                >
                  Password
                </label>

                <button
                  type="button"
                  disabled={loading}
                  className="text-[11px] font-semibold text-[#079c9c] hover:text-[#067c7e] disabled:cursor-not-allowed"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-[#079c9c]" />

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                  className="
                    h-11
                    w-full
                    rounded-md
                    border
                    border-[#dce2e8]
                    bg-white
                    pl-10
                    pr-11
                    text-[13px]
                    text-[#172033]
                    outline-none
                    transition
                    placeholder:text-[#a0a7b2]
                    focus:border-[#079c9c]
                    focus:ring-4
                    focus:ring-[#079c9c]/10
                    disabled:cursor-not-allowed
                    disabled:bg-[#f8fafc]
                  "
                />

                <button
                  type="button"
                  disabled={loading}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous
                    )
                  }
                  className="
                    absolute
                    right-3.5
                    top-1/2
                    -translate-y-1/2
                    text-[#7a8290]
                    transition
                    hover:text-[#079c9c]
                    disabled:cursor-not-allowed
                  "
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>

            {/* ================= LOGIN BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-md
                border-none
                bg-[#079c9c]
                text-[13px]
                font-bold
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#067c7e]
                hover:shadow-[0_5px_12px_rgba(7,156,156,0.25)]
                disabled:cursor-not-allowed
                disabled:opacity-70
                disabled:hover:translate-y-0
                disabled:hover:shadow-none
              "
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <FaArrowRight className="text-[11px]" />
                </>
              )}
            </button>
          </form>

          {/* ================= REGISTER ================= */}

          <div className="mt-7 border-t border-[#edf0f4] pt-6 text-center">
            <p className="text-[12px] text-[#7a8290]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-[#079c9c] hover:text-[#067c7e]"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* ================= BACK ================= */}

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

export default Login;