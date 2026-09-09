import CareerHero from "../../components/careers/CareerHero";
import WhyJoinUs from "../../components/careers/WhyJoinUs";
import OpenPositions from "../../components/careers/OpenPositions";
import Internship from "../../components/careers/Internship";
import HiringProcess from "../../components/careers/HiringProcess";
import LifeAtSteps from "../../components/careers/LifeAtSteps";

import JobApplication from "../../components/careers/InsidePages/JobApplication/JobApplication";
import JobDetails from "../../components/careers/InsidePages/JobDetails/JobDetails";

import { useState } from "react";

function careers() {
  const [currentPage, setCurrentPage] = useState("careers");
  const [selectedJob, setSelectedJob] = useState(1);

  /* ================================
     OPEN JOB DETAILS
  ================================= */

  const handleJobDetails = (jobId) => {
    setSelectedJob(jobId);

    setCurrentPage("jobDetails");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ================================
     BACK TO CAREERS
  ================================= */

  const handleBackToCareers = () => {
    setCurrentPage("careers");

    setTimeout(() => {
      const section = document.getElementById("open-positions");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  };

  /* ================================
     JOB DETAILS PAGE
  ================================= */

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

  /* ================================
     MAIN CAREERS PAGE
  ================================= */

  return (
    <main className="w-full overflow-hidden">
      <CareerHero />

      <WhyJoinUs />

      <OpenPositions
        onJobDetails={handleJobDetails}
      />

      <Internship />

      <HiringProcess />

      <LifeAtSteps />
    </main>
  );
}

export default careers;