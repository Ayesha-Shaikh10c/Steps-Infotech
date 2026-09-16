import { useEffect, useState } from "react";

import CareerHero from "../../components/careers/CareerHero";
import WhyJoinUs from "../../components/careers/WhyJoinUs";
import OpenPositions from "../../components/careers/OpenPositions";
import Internship from "../../components/careers/Internship";
import HiringProcess from "../../components/careers/HiringProcess";
import LifeAtSteps from "../../components/careers/LifeAtSteps";

import JobDetails from "../../components/careers/InsidePages/JobDetails/JobDetails";


import { getOpenJobs } from "./careersApi";

function Careers() {
  const [currentPage, setCurrentPage] = useState("careers");
  const [selectedJob, setSelectedJob] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [jobsError, setJobsError] = useState("");

  /* =========================================================
     LOAD ALL OPEN JOBS
  ========================================================= */

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      try {
        setLoadingJobs(true);
        setJobsError("");

        // Fetch ALL open jobs.
        // No frontend limit is applied here.
        const response = await getOpenJobs();

        if (!isMounted) return;

        setJobs(
          Array.isArray(response?.jobs)
            ? response.jobs
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load careers jobs:",
          error
        );

        if (!isMounted) return;

        setJobs([]);

        setJobsError(
          error?.message ||
            "Unable to load open positions. Please try again later."
        );
      } finally {
        if (isMounted) {
          setLoadingJobs(false);
        }
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================================================
     OPEN JOB DETAILS
  ========================================================= */

  const handleJobDetails = (jobId) => {
    if (!jobId) return;

    setSelectedJob(jobId);
    setCurrentPage("jobDetails");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     BACK TO CAREERS
  ========================================================= */

  const handleBackToCareers = () => {
    setCurrentPage("careers");

    setTimeout(() => {
      const section =
        document.getElementById("open-positions");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  };

  /* =========================================================
     JOB DETAILS PAGE
  ========================================================= */

  if (currentPage === "jobDetails") {
    return (
      <main className="w-full overflow-hidden">
        <JobDetails
          jobId={selectedJob}
          onBack={handleBackToCareers}
        />
      </main>
    );
  }

  /* =========================================================
     CAREERS PAGE
  ========================================================= */

  return (
    <main className="w-full overflow-hidden">

      <CareerHero />

      <WhyJoinUs />

      <OpenPositions
        jobs={jobs}
        loading={loadingJobs}
        error={jobsError}
        onJobDetails={handleJobDetails}
      />

      <Internship />

      <HiringProcess />

      <LifeAtSteps />
    </main>
  );
}

export default Careers;