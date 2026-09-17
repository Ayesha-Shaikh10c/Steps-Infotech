import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Loader2,
  MapPin,
  Send,
  Upload,
  User,
} from "lucide-react";
import { apiFetch } from "../../lib/api";

const ApplyJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [profile, setProfile] = useState(null);

  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchApplicationData();
  }, [jobId]);

  const fetchApplicationData = async () => {
    try {
      setLoading(true);
      setError("");

      if (!jobId) {
        throw new Error("Job ID is missing.");
      }

      const [jobResponse, profileResponse] = await Promise.all([
        apiFetch(`/jobs/${jobId}`),
        apiFetch("/users/profile"),
      ]);

      if (!jobResponse?.success) {
        throw new Error(
          jobResponse?.message || "Unable to load job details."
        );
      }

      if (!profileResponse?.success) {
        throw new Error(
          profileResponse?.message || "Unable to load your profile."
        );
      }

      setJob(jobResponse.data || jobResponse.job || null);
      setProfile(
        profileResponse.data || profileResponse.user || null
      );
    } catch (err) {
      console.error("Apply page load error:", err);

      if (err?.status === 401 || err?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
        return;
      }

      setError(err?.message || "Unable to load application details.");
    } finally {
      setLoading(false);
    }
  };

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setResume(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Please select a PDF resume.");
      event.target.value = "";
      setResume(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Resume size must be 10MB or less.");
      event.target.value = "";
      setResume(null);
      return;
    }

    setError("");
    setResume(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setError("");
    setSuccess("");

    if (!jobId) {
      setError("Job ID is missing.");
      return;
    }

    if (!job) {
      setError("Job details are unavailable. Please refresh the page.");
      return;
    }

    const trimmedCoverLetter = coverLetter.trim();

    if (!trimmedCoverLetter) {
      setError("Please enter a cover letter.");
      return;
    }

    if (trimmedCoverLetter.length < 30) {
      setError("Cover letter must be at least 30 characters.");
      return;
    }

    /*
     * Backend application controller uses the resume saved
     * on the user's profile.
     *
     * If the user selected a new resume here, upload it to
     * the profile first.
     */
    if (!resume && !profile?.resume) {
      setError(
        "Please upload your resume before applying. You can upload a PDF resume here."
      );
      return;
    }

    try {
      setSubmitting(true);

      // --------------------------------------------------
      // STEP 1: Upload newly selected resume to profile
      // --------------------------------------------------
      if (resume) {
        const resumeFormData = new FormData();
        resumeFormData.append("resume", resume);

        const resumeResponse = await apiFetch(
          "/users/upload-resume",
          {
            method: "PUT",
            body: resumeFormData,
          }
        );

        if (!resumeResponse?.success) {
          throw new Error(
            resumeResponse?.message || "Resume upload failed."
          );
        }

        // Update local profile state when backend returns user data.
        const updatedProfile =
          resumeResponse?.data ||
          resumeResponse?.user ||
          resumeResponse?.data?.user;

        if (updatedProfile) {
          setProfile(updatedProfile);

          // Keep localStorage user data in sync.
          const existingUser = JSON.parse(
            localStorage.getItem("user") || "{}"
          );

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...existingUser,
              ...updatedProfile,
            })
          );
        } else {
          // At minimum mark resume as available locally.
          setProfile((previous) => ({
            ...(previous || {}),
            resume: true,
          }));
        }
      }

      // --------------------------------------------------
      // STEP 2: Submit application as JSON
      // --------------------------------------------------
      const response = await apiFetch("/applications", {
        method: "POST",
        body: JSON.stringify({
          jobId,
          coverLetter: trimmedCoverLetter,
        }),
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "Application submission failed."
        );
      }

      setSuccess(
        response?.message ||
          "Application submitted successfully."
      );

      // Small delay so user can see success message.
      setTimeout(() => {
        navigate("/user/applications", { replace: true });
      }, 900);
    } catch (err) {
      console.error("Application submission error:", err);

      if (err?.status === 401 || err?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
        return;
      }

      setError(
        err?.message ||
          "Unable to submit your application. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getResumeName = () => {
    if (resume) return resume.name;
    if (profile?.resume) return "Resume already uploaded";
    return "No resume uploaded";
  };

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="h-10 w-32 animate-pulse rounded-xl bg-gray-200" />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <div className="h-52 animate-pulse rounded-2xl bg-white shadow-sm" />
            <div className="h-96 animate-pulse rounded-2xl bg-white shadow-sm" />
          </div>

          <div className="h-80 animate-pulse rounded-2xl bg-white shadow-sm" />
        </div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="space-y-5">
        <button
          type="button"
          onClick={() => navigate("/user/jobs")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#707686] transition hover:text-[#159a9c]"
        >
          <ArrowLeft size={17} />
          Back to Jobs
        </button>

        <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <BriefcaseBusiness size={25} />
          </div>

          <h2 className="mt-4 text-xl font-bold text-[#171b2b]">
            Unable to Load Application
          </h2>

          <p className="mt-2 text-sm text-[#707686]">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchApplicationData}
            className="mt-5 rounded-xl bg-[#159a9c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#128587]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Back */}
      <button
        type="button"
        onClick={() =>
          navigate(`/user/jobs/${jobId}`)
        }
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#707686] transition hover:text-[#159a9c]"
      >
        <ArrowLeft size={17} />
        Back to Job
      </button>

      {/* Job Header */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#159a9c]/10 text-[#159a9c]">
              <BriefcaseBusiness size={26} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-[#159a9c]">
                Job Application
              </p>

              <h1 className="mt-1 text-2xl font-bold text-[#171b2b] sm:text-3xl">
                {job?.title || "Untitled Position"}
              </h1>

              <div className="mt-2 flex flex-wrap gap-3 text-sm text-[#707686]">
                {job?.company && (
                  <span className="font-medium">
                    {job.company}
                  </span>
                )}

                {job?.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={15} />
                    {job.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <CheckCircle2 size={18} />
          {success}
        </div>
      )}

      {/* Application Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-5 lg:grid-cols-3"
      >
        {/* Main Form */}
        <div className="space-y-5 lg:col-span-2">
          {/* Applicant Information */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#159a9c]/10 text-[#159a9c]">
                <User size={19} />
              </div>

              <div>
                <h2 className="font-bold text-[#171b2b]">
                  Applicant Information
                </h2>

                <p className="text-xs text-[#707686]">
                  Your profile information will be used with this application.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#707686]">
                  Full Name
                </label>

                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-[#171b2b]">
                  {profile?.fullName || "Not provided"}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#707686]">
                  Email
                </label>

                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-[#171b2b]">
                  {profile?.email || "Not provided"}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#707686]">
                  Phone
                </label>

                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-[#171b2b]">
                  {profile?.phone || "Not provided"}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#707686]">
                  Location
                </label>

                <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-[#171b2b]">
                  {profile?.city ||
                    profile?.state ||
                    profile?.country ||
                    "Not provided"}
                </div>
              </div>
            </div>
          </section>

          {/* Cover Letter */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#159a9c]/10 text-[#159a9c]">
                <FileText size={19} />
              </div>

              <div>
                <h2 className="font-bold text-[#171b2b]">
                  Cover Letter
                </h2>

                <p className="text-xs text-[#707686]">
                  Tell the employer why you are a good fit.
                </p>
              </div>
            </div>

            <textarea
              value={coverLetter}
              onChange={(event) =>
                setCoverLetter(event.target.value)
              }
              rows={9}
              placeholder="Write your cover letter here..."
              className="mt-5 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 text-[#171b2b] outline-none transition placeholder:text-gray-400 focus:border-[#159a9c] focus:ring-2 focus:ring-[#159a9c]/10"
            />

            <div className="mt-2 flex justify-between text-xs text-[#707686]">
              <span>Minimum 30 characters</span>
              <span>{coverLetter.length} characters</span>
            </div>
          </section>

          {/* Resume Upload */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#159a9c]/10 text-[#159a9c]">
                <Upload size={19} />
              </div>

              <div>
                <h2 className="font-bold text-[#171b2b]">
                  Resume
                </h2>

                <p className="text-xs text-[#707686]">
                  PDF format only, maximum 10MB.
                </p>
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-[#fafcfc] px-5 py-8 text-center transition hover:border-[#159a9c]/50 hover:bg-[#159a9c]/5">
              <Upload
                size={24}
                className="text-[#159a9c]"
              />

              <p className="mt-3 text-sm font-semibold text-[#171b2b]">
                {resume
                  ? resume.name
                  : "Choose a new resume"}
              </p>

              <p className="mt-1 text-xs text-[#707686]">
                {resume
                  ? `${(
                      resume.size /
                      (1024 * 1024)
                    ).toFixed(2)} MB`
                  : "Click to browse PDF files"}
              </p>

              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleResumeChange}
                className="hidden"
              />
            </label>

            <div className="mt-4 flex items-start gap-3 rounded-xl bg-[#f7fafa] p-4">
              <FileText
                size={18}
                className="mt-0.5 shrink-0 text-[#159a9c]"
              />

              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#707686]">
                  Current resume
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-[#171b2b]">
                  {getResumeName()}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Application Summary */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-[#171b2b]">
              Application Summary
            </h2>

            <div className="mt-5 space-y-4">
              <SummaryItem
                label="Position"
                value={job?.title || "Not specified"}
              />

              <SummaryItem
                label="Company"
                value={job?.company || "Steps Infotech"}
              />

              <SummaryItem
                label="Location"
                value={job?.location || "Not specified"}
              />

              <SummaryItem
                label="Resume"
                value={
                  resume
                    ? "New resume selected"
                    : profile?.resume
                    ? "Profile resume"
                    : "Missing"
                }
              />
            </div>
          </section>

          {/* Submit */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="rounded-xl bg-[#159a9c]/10 p-4">
              <p className="text-sm font-semibold text-[#171b2b]">
                Ready to apply?
              </p>

              <p className="mt-1 text-xs leading-5 text-[#707686]">
                Make sure your profile and resume are up to date before
                submitting.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting || Boolean(success)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#159a9c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#128587] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={17} />
                  Submit Application
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(`/user/jobs/${jobId}`)
              }
              disabled={submitting}
              className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-[#171b2b] transition hover:border-[#159a9c] hover:text-[#159a9c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
          </section>
        </aside>
      </form>
    </div>
  );
};

const SummaryItem = ({ label, value }) => (
  <div className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
    <p className="text-xs font-medium text-[#707686]">
      {label}
    </p>

    <p className="mt-1 break-words text-sm font-semibold text-[#171b2b]">
      {value}
    </p>
  </div>
);

export default ApplyJob;