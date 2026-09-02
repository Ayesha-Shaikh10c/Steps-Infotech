import CareerHero from "./AllSection/CareerHero/CareerHero";
import WhyJoinUs from "./AllSection/WhyJoinUs/WhyJoinUs";
import OpenPositions from "./AllSection/OpenPositions/OpenPositions";
import Internship from "./AllSection/Internship/Internship";
import HiringProcess from "./AllSection/HiringProcess/HiringProcess";
import LifeAtSteps from "./AllSection/LifeAtSteps/LifeAtSteps";

import JobDetails from "./AllSection/InsidePages/JobDetails/JobDetails";

import { useState } from "react";

function Careers() {
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

export default Careers;