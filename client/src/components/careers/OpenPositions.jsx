import { useState } from "react";

import {
  FaJava,
  FaCode,
  FaPalette,
  FaChartBar,
  FaShieldAlt,
  FaCloud,
  FaBriefcase,
} from "react-icons/fa";

const getJobIcon = (job) => {
  const value = `${job?.title || ""} ${job?.department || ""}`.toLowerCase();

  if (value.includes("java")) return <FaJava />;

  if (
    value.includes("frontend") ||
    value.includes("front end") ||
    value.includes("developer")
  ) {
    return <FaCode />;
  }

  if (
    value.includes("ui") ||
    value.includes("ux") ||
    value.includes("design")
  ) {
    return <FaPalette />;
  }

  if (value.includes("data") || value.includes("analyst")) {
    return <FaChartBar />;
  }

  if (
    value.includes("cyber") ||
    value.includes("security")
  ) {
    return <FaShieldAlt />;
  }

  if (value.includes("cloud")) {
    return <FaCloud />;
  }

  return <FaBriefcase />;
};

const formatSkills = (skills) => {
  if (Array.isArray(skills)) {
    const formattedSkills = skills.filter(Boolean).join(", ");

    return formattedSkills || "Not specified";
  }

  if (typeof skills === "string" && skills.trim()) {
    return skills;
  }

  return "Not specified";
};

const formatEmploymentType = (employmentType) => {
  if (!employmentType) return "Not specified";

  return employmentType
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

function OpenPositions({
  jobs = [],
  loading = false,
  error = "",
  onJobDetails,
}) {
  const [showAll, setShowAll] = useState(false);

  /*
   * Public Careers page:
   * - First 6 jobs are shown by default.
   * - Remaining jobs are shown after clicking View All.
   * - Backend currently sends maximum 20 jobs from Careers.jsx.
   */
  const visibleJobs = showAll ? jobs : jobs.slice(0, 6);

  const hasMoreJobs = jobs.length > 6;

  const handleViewAll = () => {
    if (!hasMoreJobs) return;

    setShowAll((previous) => !previous);
  };

  return (
    <section
      id="open-positions"
      className="
        w-full
        bg-white
        px-4
        sm:px-5
        py-[50px]
        sm:py-[55px]
      "
    >
      <div
        className="
          w-full
          max-w-[1000px]
          mx-auto
        "
      >
        {/* =================================================
            HEADING
        ================================================= */}

        <div className="mb-6">
          <span
            className="
              block
              mb-1.5
              text-center
              text-[10px]
              leading-[14px]
              font-bold
              tracking-[1px]
              text-[#159a9c]
            "
          >
            OPEN POSITIONS
          </span>

          <div
            className="
              relative
              flex
              items-center
              justify-center
            "
          >
            <h2
              className="
                m-0
                text-center
                text-[25px]
                sm:text-[29px]
                leading-9
                font-extrabold
                text-[#111827]
              "
            >
              Current Open Positions
            </h2>

            <button
              type="button"
              onClick={handleViewAll}
              disabled={!hasMoreJobs}
              className="
                absolute
                right-0
                top-1/2
                -translate-y-1/2
                border-0
                bg-transparent
                p-1
                text-[11px]
                sm:text-[13px]
                font-bold
                text-[#159a9c]
                cursor-pointer
                transition-all
                duration-300
                hover:text-[#0f766e]
                disabled:opacity-40
                disabled:cursor-not-allowed
                disabled:hover:text-[#159a9c]
              "
            >
              {showAll
                ? "Show Less ↑"
                : "View All Openings →"}
            </button>
          </div>
        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-4
              lg:gap-x-5
              lg:gap-y-[18px]
            "
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  min-h-[166px]
                  rounded-[11px]
                  border
                  border-[#e2e8f0]
                  bg-white
                  px-[18px]
                  pt-[13px]
                  pb-[11px]
                  shadow-[0_5px_12px_rgba(0,0,0,0.08)]
                  animate-pulse
                "
              >
                <div className="flex items-center gap-[10px] mb-[14px]">
                  <div className="w-[38px] h-[38px] rounded-full bg-[#e5e7eb]" />

                  <div className="h-4 w-32 rounded bg-[#e5e7eb]" />
                </div>

                <div className="ml-[48px] space-y-2">
                  <div className="h-3 w-36 rounded bg-[#e5e7eb]" />
                  <div className="h-3 w-28 rounded bg-[#e5e7eb]" />
                  <div className="h-3 w-32 rounded bg-[#e5e7eb]" />
                  <div className="h-3 w-40 rounded bg-[#e5e7eb]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {!loading && error && (
          <div
            className="
              w-full
              rounded-[11px]
              border
              border-red-200
              bg-red-50
              px-5
              py-6
              text-center
            "
          >
            <p className="m-0 text-[14px] font-semibold text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!loading && !error && jobs.length === 0 && (
          <div
            className="
              w-full
              rounded-[11px]
              border
              border-[#e2e8f0]
              bg-white
              px-5
              py-10
              text-center
              shadow-[0_5px_12px_rgba(0,0,0,0.08)]
            "
          >
            <div
              className="
                mx-auto
                mb-3
                w-[46px]
                h-[46px]
                rounded-full
                bg-[#159a9c]
                text-[#101820]
                flex
                items-center
                justify-center
                text-[21px]
              "
            >
              <FaBriefcase />
            </div>

            <h3
              className="
                m-0
                text-[17px]
                font-extrabold
                text-[#171b2b]
              "
            >
              No Open Positions
            </h3>

            <p
              className="
                mt-2
                mb-0
                text-[12px]
                leading-5
                font-medium
                text-[#707686]
              "
            >
              There are currently no open positions.
              Please check back later.
            </p>
          </div>
        )}

        {/* =================================================
            JOB CARDS
        ================================================= */}

        {!loading && !error && jobs.length > 0 && (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-4
              lg:gap-x-5
              lg:gap-y-[18px]
            "
          >
            {visibleJobs.map((job) => {
              const jobId = job?.id || job?._id;

              return (
                <div
                  key={jobId}
                  className="
                    min-w-0
                    min-h-[166px]
                    bg-white
                    border
                    border-[#e2e8f0]
                    rounded-[11px]
                    px-[18px]
                    pt-[13px]
                    pb-[11px]
                    flex
                    flex-col
                    shadow-[0_5px_12px_rgba(0,0,0,0.20)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#159a9c]
                    hover:shadow-[0_10px_22px_rgba(21,154,156,0.22)]
                  "
                >
                  {/* JOB TOP */}

                  <div
                    className="
                      flex
                      items-center
                      gap-[10px]
                      mb-[7px]
                    "
                  >
                    <div
                      className="
                        w-[38px]
                        h-[38px]
                        min-w-[38px]
                        rounded-full
                        bg-[#159a9c]
                        text-[#101820]
                        flex
                        items-center
                        justify-center
                        text-[20px]
                      "
                    >
                      {getJobIcon(job)}
                    </div>

                    <h3
                      className="
                        m-0
                        min-w-0
                        text-[16px]
                        leading-5
                        font-extrabold
                        text-[#171b2b]
                        truncate
                      "
                      title={job?.title || "Untitled Position"}
                    >
                      {job?.title || "Untitled Position"}
                    </h3>
                  </div>

                  {/* JOB DETAILS */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-[2px]
                      ml-[48px]
                      mb-2
                    "
                  >
                    {/* EXPERIENCE */}

                    <div
                      className="
                        min-w-0
                        grid
                        grid-cols-[78px_1fr]
                        gap-1
                        items-start
                      "
                    >
                      <span
                        className="
                          text-[11px]
                          leading-[17px]
                          font-semibold
                          text-[#707686]
                        "
                      >
                        Experience:
                      </span>

                      <strong
                        className="
                          min-w-0
                          overflow-hidden
                          text-ellipsis
                          whitespace-nowrap
                          text-[11px]
                          leading-[17px]
                          font-semibold
                          text-[#707686]
                        "
                        title={
                          job?.experience ||
                          "Not specified"
                        }
                      >
                        {job?.experience || "Not specified"}
                      </strong>
                    </div>

                    {/* LOCATION */}

                    <div
                      className="
                        min-w-0
                        grid
                        grid-cols-[78px_1fr]
                        gap-1
                        items-start
                      "
                    >
                      <span
                        className="
                          text-[11px]
                          leading-[17px]
                          font-semibold
                          text-[#707686]
                        "
                      >
                        Location:
                      </span>

                      <strong
                        className="
                          min-w-0
                          overflow-hidden
                          text-ellipsis
                          whitespace-nowrap
                          text-[11px]
                          leading-[17px]
                          font-semibold
                          text-[#707686]
                        "
                        title={
                          job?.location ||
                          "Not specified"
                        }
                      >
                        {job?.location || "Not specified"}
                      </strong>
                    </div>

                    {/* EMPLOYMENT */}

                    <div
                      className="
                        min-w-0
                        grid
                        grid-cols-[78px_1fr]
                        gap-1
                        items-start
                      "
                    >
                      <span
                        className="
                          text-[11px]
                          leading-[17px]
                          font-semibold
                          text-[#707686]
                        "
                      >
                        Employment:
                      </span>

                      <strong
                        className="
                          min-w-0
                          overflow-hidden
                          text-ellipsis
                          whitespace-nowrap
                          text-[11px]
                          leading-[17px]
                          font-semibold
                          text-[#707686]
                        "
                        title={
                          job?.employmentType ||
                          "Not specified"
                        }
                      >
                        {formatEmploymentType(
                          job?.employmentType
                        )}
                      </strong>
                    </div>

                    {/* SKILLS */}

                    <div
                      className="
                        min-w-0
                        grid
                        grid-cols-[78px_1fr]
                        gap-1
                        items-start
                      "
                    >
                      <span
                        className="
                          text-[11px]
                          leading-[17px]
                          font-semibold
                          text-[#707686]
                        "
                      >
                        Skills:
                      </span>

                      <strong
                        className="
                          min-w-0
                          overflow-hidden
                          text-ellipsis
                          whitespace-nowrap
                          text-[11px]
                          leading-[17px]
                          font-semibold
                          text-[#707686]
                        "
                        title={formatSkills(job?.skills)}
                      >
                        {formatSkills(job?.skills)}
                      </strong>
                    </div>
                  </div>

                  {/* VIEW DETAILS */}

                  <button
                    type="button"
                    disabled={!jobId}
                    onClick={() => {
                      if (jobId) {
                        onJobDetails?.(jobId);
                      }
                    }}
                    className="
                      self-start
                      ml-[48px]
                      mt-auto
                      border-0
                      bg-[#159a9c]
                      text-white
                      px-[10px]
                      py-[6px]
                      rounded-[5px]
                      text-[12px]
                      leading-4
                      font-bold
                      cursor-pointer
                      transition-all
                      duration-300
                      hover:bg-[#0f766e]
                      hover:-translate-y-0.5
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                      disabled:hover:translate-y-0
                    "
                  >
                    View Details →
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MOBILE RESPONSIVE OVERRIDE */}

      <style>{`
        @media (max-width: 600px) {
          #open-positions {
            padding-left: 14px;
            padding-right: 14px;
          }
        }

        @media (max-width: 380px) {
          #open-positions {
            padding-left: 10px;
            padding-right: 10px;
          }
        }
      `}</style>
    </section>
  );
}

export default OpenPositions;