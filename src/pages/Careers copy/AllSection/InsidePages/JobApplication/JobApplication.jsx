import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCode,
  FaFileUpload,
  FaCheckCircle,
} from "react-icons/fa";

import { useState } from "react";

function JobApplication() {
  const params = new URLSearchParams(window.location.search);

  const applicationType =
    params.get("type") === "internship"
      ? "internship"
      : "job";

  const position = params.get("position") || "";

  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    education: "",
    college: "",
    course: "",
    graduationYear: "",
    skills: "",
    experience: "",
    coverLetter: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     APPLICATION SUCCESS SCREEN
  ===================================================== */

  if (submitted) {
    return (
      <section className="w-full min-h-screen bg-slate-50 px-3 sm:px-5 py-8 sm:py-12">

        <div className="w-[92%] max-w-[760px] mx-auto mt-4 sm:mt-7 p-6 sm:p-9 md:p-11 bg-white rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.10)] text-center">

          {/* SUCCESS ICON */}
          <div className="w-[70px] h-[70px] mx-auto mb-4 flex items-center justify-center rounded-full bg-[#079c9c] text-white text-[35px]">
            <FaCheckCircle />
          </div>

          {/* SUCCESS LABEL */}
          <span className="text-[#079c9c] text-[11px] font-extrabold tracking-[0.6px]">
            APPLICATION SUBMITTED
          </span>

          {/* TITLE */}
          <h1 className="mt-2 mb-2 text-[#172033] text-[23px] sm:text-[28px] font-extrabold">
            Thank You for Applying!
          </h1>

          {/* DESCRIPTION */}
          <p className="max-w-[600px] mx-auto text-slate-500 text-[12px] sm:text-[13px] leading-[1.7]">
            Your application has been successfully submitted.
            Our recruitment team will review your application
            and contact you if your profile is shortlisted.
          </p>

          {/* INTERNSHIP PROCESS */}
          {applicationType === "internship" && (
            <div className="mt-7 p-5 sm:p-6 border border-gray-200 rounded-[9px] text-left">

              <h2 className="mb-5 text-[#172033] text-center text-[17px] sm:text-[19px] font-bold">
                Internship Application Process
              </h2>

              <div className="flex flex-col">

                {/* STEP 1 */}
                <div className="relative flex gap-3.5 pb-[22px]">

                  <div className="relative z-10 w-[30px] h-[30px] shrink-0 flex items-center justify-center rounded-full bg-[#079c9c] text-white text-xs font-extrabold">
                    1
                  </div>

                  <div>
                    <h3 className="mt-0.5 mb-1 text-[#172033] text-[13px] font-bold">
                      Application Submitted
                    </h3>

                    <p className="m-0 text-slate-500 text-[11px] leading-[1.5]">
                      Your internship application has been received.
                    </p>
                  </div>

                  <div className="absolute left-[14px] top-[30px] w-[2px] h-full bg-gray-200" />
                </div>

                {/* STEP 2 */}
                <div className="relative flex gap-3.5 pb-[22px]">

                  <div className="relative z-10 w-[30px] h-[30px] shrink-0 flex items-center justify-center rounded-full bg-gray-200 text-slate-500 text-xs font-extrabold">
                    2
                  </div>

                  <div>
                    <h3 className="mt-0.5 mb-1 text-[#172033] text-[13px] font-bold">
                      Application Review
                    </h3>

                    <p className="m-0 text-slate-500 text-[11px] leading-[1.5]">
                      Our team will review your profile and resume.
                    </p>
                  </div>

                  <div className="absolute left-[14px] top-[30px] w-[2px] h-full bg-gray-200" />
                </div>

                {/* STEP 3 */}
                <div className="relative flex gap-3.5 pb-[22px]">

                  <div className="relative z-10 w-[30px] h-[30px] shrink-0 flex items-center justify-center rounded-full bg-gray-200 text-slate-500 text-xs font-extrabold">
                    3
                  </div>

                  <div>
                    <h3 className="mt-0.5 mb-1 text-[#172033] text-[13px] font-bold">
                      Shortlisting
                    </h3>

                    <p className="m-0 text-slate-500 text-[11px] leading-[1.5]">
                      Shortlisted candidates will be contacted.
                    </p>
                  </div>

                  <div className="absolute left-[14px] top-[30px] w-[2px] h-full bg-gray-200" />
                </div>

                {/* STEP 4 */}
                <div className="relative flex gap-3.5 pb-[22px]">

                  <div className="relative z-10 w-[30px] h-[30px] shrink-0 flex items-center justify-center rounded-full bg-gray-200 text-slate-500 text-xs font-extrabold">
                    4
                  </div>

                  <div>
                    <h3 className="mt-0.5 mb-1 text-[#172033] text-[13px] font-bold">
                      Interview / Discussion
                    </h3>

                    <p className="m-0 text-slate-500 text-[11px] leading-[1.5]">
                      Selected students may be invited for an interview.
                    </p>
                  </div>

                  <div className="absolute left-[14px] top-[30px] w-[2px] h-full bg-gray-200" />
                </div>

                {/* STEP 5 */}
                <div className="relative flex gap-3.5">

                  <div className="relative z-10 w-[30px] h-[30px] shrink-0 flex items-center justify-center rounded-full bg-gray-200 text-slate-500 text-xs font-extrabold">
                    5
                  </div>

                  <div>
                    <h3 className="mt-0.5 mb-1 text-[#172033] text-[13px] font-bold">
                      Internship Selection
                    </h3>

                    <p className="m-0 text-slate-500 text-[11px] leading-[1.5]">
                      Selected candidates will receive internship details.
                    </p>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* BACK BUTTON */}
          <a
            href="/Careers"
            className="inline-flex items-center justify-center h-[43px] mt-6 px-[22px] rounded-md bg-[#079c9c] text-white no-underline text-[13px] font-bold transition-all duration-200 hover:bg-[#067c7e] hover:-translate-y-0.5"
          >
            ← Back to Careers
          </a>

        </div>
      </section>
    );
  }

  /* =====================================================
     APPLICATION FORM
  ===================================================== */

  return (
    <section className="w-full min-h-screen bg-slate-50 px-2.5 sm:px-4 md:px-5 py-8 sm:py-10 md:py-[55px]">

      <div className="w-[96%] sm:w-[94%] md:w-[92%] max-w-[900px] mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="text-center mb-6">

          <span className="block text-[#079c9c] text-[11px] sm:text-xs font-extrabold tracking-[0.7px] mb-1.5">
            {applicationType === "internship"
              ? "INTERNSHIP PROGRAM"
              : "CAREER APPLICATION"}
          </span>

          <h1 className="m-0 mb-2 text-[#172033] text-2xl sm:text-[27px] md:text-[32px] font-extrabold">
            {applicationType === "internship"
              ? "Apply for Internship"
              : "Apply for Position"}
          </h1>

          <p className="m-0 text-slate-500 text-xs sm:text-sm leading-[1.6]">
            {applicationType === "internship"
              ? "Start your professional journey with Steps Infotech."
              : `Submit your application for ${position}.`}
          </p>

        </div>


        {/* =================================================
            SELECTED POSITION
        ================================================= */}

        {position && (
          <div className="flex items-center gap-3.5 bg-white border border-slate-200 border-l-4 border-l-[#079c9c] rounded-lg px-3.5 sm:px-[18px] py-3.5 sm:py-[15px] mb-5 shadow-[0_4px_12px_rgba(0,0,0,0.07)]">

            <div className="w-[42px] h-[42px] shrink-0 flex items-center justify-center rounded-full bg-[#079c9c] text-white text-[19px]">
              <FaCode />
            </div>

            <div>
              <span className="block text-[#7a8290] text-[10px] font-bold mb-0.5">
                APPLYING FOR
              </span>

              <strong className="block text-[#172033] text-[15px] font-bold">
                {position}
              </strong>
            </div>

          </div>
        )}


        {/* =================================================
            FORM
        ================================================= */}

        <form
          className="bg-white rounded-[10px] shadow-[0_5px_18px_rgba(0,0,0,0.09)] overflow-hidden"
          onSubmit={handleSubmit}
        >

          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <div className="px-[17px] sm:px-[22px] md:px-[30px] py-[22px] sm:py-[25px] md:py-7 border-b border-[#edf0f4]">

            <div className="mb-5">

              <h2 className="relative m-0 text-[#172033] text-[17px] sm:text-[19px] font-bold after:content-[''] after:block after:w-[35px] after:h-[3px] after:mt-1.5 after:bg-[#079c9c] after:rounded-full">
                Personal Information
              </h2>

              <p className="mt-2 mb-0 text-[#7a8290] text-xs">
                Tell us a little about yourself.
              </p>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">

              {/* FULL NAME */}

              <div className="flex flex-col">

                <label className="text-[#172033] text-xs font-bold mb-1.5">
                  Full Name
                </label>

                <div className="relative w-full">

                  <FaUser className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#079c9c] text-[13px] pointer-events-none" />

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full h-[43px] box-border border border-[#dce2e8] rounded-md outline-none bg-white text-[#172033] pl-[37px] pr-3 font-inherit text-[13px] transition-all duration-200 focus:border-[#079c9c] focus:ring-[3px] focus:ring-[#079c9c]/10"
                  />

                </div>

              </div>


              {/* EMAIL */}

              <div className="flex flex-col">

                <label className="text-[#172033] text-xs font-bold mb-1.5">
                  Email Address
                </label>

                <div className="relative w-full">

                  <FaEnvelope className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#079c9c] text-[13px] pointer-events-none" />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full h-[43px] box-border border border-[#dce2e8] rounded-md outline-none bg-white text-[#172033] pl-[37px] pr-3 text-[13px] transition-all duration-200 focus:border-[#079c9c] focus:ring-[3px] focus:ring-[#079c9c]/10"
                  />

                </div>

              </div>


              {/* PHONE */}

              <div className="flex flex-col">

                <label className="text-[#172033] text-xs font-bold mb-1.5">
                  Phone Number
                </label>

                <div className="relative w-full">

                  <FaPhone className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#079c9c] text-[13px] pointer-events-none" />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full h-[43px] box-border border border-[#dce2e8] rounded-md outline-none bg-white text-[#172033] pl-[37px] pr-3 text-[13px] transition-all duration-200 focus:border-[#079c9c] focus:ring-[3px] focus:ring-[#079c9c]/10"
                  />

                </div>

              </div>


              {/* CITY */}

              <div className="flex flex-col">

                <label className="text-[#172033] text-xs font-bold mb-1.5">
                  City
                </label>

                <div className="relative w-full">

                  <FaMapMarkerAlt className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#079c9c] text-[13px] pointer-events-none" />

                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full h-[43px] box-border border border-[#dce2e8] rounded-md outline-none bg-white text-[#172033] pl-[37px] pr-3 text-[13px] transition-all duration-200 focus:border-[#079c9c] focus:ring-[3px] focus:ring-[#079c9c]/10"
                  />

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              EDUCATION
          ================================================= */}

          <div className="px-[17px] sm:px-[22px] md:px-[30px] py-[22px] sm:py-[25px] md:py-7 border-b border-[#edf0f4]">

            <div className="mb-5">

              <h2 className="m-0 text-[#172033] text-[17px] sm:text-[19px] font-bold after:content-[''] after:block after:w-[35px] after:h-[3px] after:mt-1.5 after:bg-[#079c9c] after:rounded-full">
                Education Details
              </h2>

              <p className="mt-2 mb-0 text-[#7a8290] text-xs">
                Provide your current education details.
              </p>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">

              {/* EDUCATION */}

              <div className="flex flex-col">

                <label className="text-[#172033] text-xs font-bold mb-1.5">
                  Highest Education
                </label>

                <div className="relative w-full">

                  <FaGraduationCap className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#079c9c] text-[13px] pointer-events-none" />

                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                    className="w-full h-[43px] box-border border border-[#dce2e8] rounded-md outline-none bg-white text-[#172033] pl-[37px] pr-3 text-[13px] cursor-pointer transition-all duration-200 focus:border-[#079c9c] focus:ring-[3px] focus:ring-[#079c9c]/10"
                  >
                    <option value="">
                      Select education
                    </option>

                    <option value="12th">
                      12th / HSC
                    </option>

                    <option value="Diploma">
                      Diploma
                    </option>

                    <option value="BCA">
                      BCA
                    </option>

                    <option value="BSc CA">
                      BSc Computer Application
                    </option>

                    <option value="BE">
                      BE / BTech
                    </option>

                    <option value="MCA">
                      MCA
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

              </div>


              {/* COLLEGE */}

              <div className="flex flex-col">

                <label className="text-[#172033] text-xs font-bold mb-1.5">
                  College / University
                </label>

                <div className="relative w-full">

                  <FaGraduationCap className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#079c9c] text-[13px] pointer-events-none" />

                  <input
                    type="text"
                    name="college"
                    placeholder="Enter college name"
                    value={formData.college}
                    onChange={handleChange}
                    required
                    className="w-full h-[43px] box-border border border-[#dce2e8] rounded-md outline-none bg-white text-[#172033] pl-[37px] pr-3 text-[13px] focus:border-[#079c9c] focus:ring-[3px] focus:ring-[#079c9c]/10"
                  />

                </div>

              </div>


              {/* COURSE */}

              <div className="flex flex-col">

                <label className="text-[#172033] text-xs font-bold mb-1.5">
                  Course / Specialization
                </label>

                <div className="relative w-full">

                  <FaGraduationCap className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#079c9c] text-[13px] pointer-events-none" />

                  <input
                    type="text"
                    name="course"
                    placeholder="Example: Computer Application"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="w-full h-[43px] box-border border border-[#dce2e8] rounded-md outline-none bg-white text-[#172033] pl-[37px] pr-3 text-[13px] focus:border-[#079c9c] focus:ring-[3px] focus:ring-[#079c9c]/10"
                  />

                </div>

              </div>


              {/* GRADUATION YEAR */}

              <div className="flex flex-col">

                <label className="text-[#172033] text-xs font-bold mb-1.5">
                  Graduation Year
                </label>

                <div className="relative w-full">

                  <FaGraduationCap className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#079c9c] text-[13px] pointer-events-none" />

                  <select
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    required
                    className="w-full h-[43px] box-border border border-[#dce2e8] rounded-md outline-none bg-white text-[#172033] pl-[37px] pr-3 text-[13px] cursor-pointer focus:border-[#079c9c] focus:ring-[3px] focus:ring-[#079c9c]/10"
                  >
                    <option value="">
                      Select year
                    </option>

                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>

                  </select>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              SKILLS & EXPERIENCE
          ================================================= */}

          <div className="px-[17px] sm:px-[22px] md:px-[30px] py-[22px] sm:py-[25px] md:py-7 border-b border-[#edf0f4]">

            <div className="mb-5">

              <h2 className="m-0 text-[#172033] text-[17px] sm:text-[19px] font-bold after:content-[''] after:block after:w-[35px] after:h-[3px] after:mt-1.5 after:bg-[#079c9c] after:rounded-full">
                Skills & Experience
              </h2>

              <p className="mt-2 mb-0 text-[#7a8290] text-xs">
                Tell us about your technical skills.
              </p>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">

              {/* TECHNICAL SKILLS */}

              <div className="flex flex-col md:col-span-2">

                <label className="text-[#172033] text-xs font-bold mb-1.5">
                  Technical Skills
                </label>

                <div className="relative w-full">

                  <FaCode className="absolute left-[13px] top-[17px] text-[#079c9c] text-[13px] pointer-events-none" />

                  <textarea
                    name="skills"
                    placeholder="Example: Java, SQL, HTML, CSS, JavaScript..."
                    value={formData.skills}
                    onChange={handleChange}
                    required
                    className="w-full min-h-[100px] box-border resize-y border border-[#dce2e8] rounded-md outline-none bg-white text-[#172033] px-3 py-3 pl-[37px] text-[13px] leading-[1.5] transition-all duration-200 focus:border-[#079c9c] focus:ring-[3px] focus:ring-[#079c9c]/10"
                  />

                </div>

              </div>


              {/* EXPERIENCE */}

              <div className="flex flex-col">

                <label className="text-[#172033] text-xs font-bold mb-1.5">
                  Experience
                </label>

                <select
                  className="w-full h-[43px] box-border border border-[#dce2e8] rounded-md outline-none bg-white text-[#172033] px-3 text-[13px] cursor-pointer focus:border-[#079c9c] focus:ring-[3px] focus:ring-[#079c9c]/10"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select experience
                  </option>

                  <option value="Fresher">
                    Fresher
                  </option>

                  <option value="Less than 1 Year">
                    Less than 1 Year
                  </option>

                  <option value="1–2 Years">
                    1–2 Years
                  </option>

                  <option value="2+ Years">
                    2+ Years
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* =================================================
              RESUME
          ================================================= */}

          <div className="px-[17px] sm:px-[22px] md:px-[30px] py-[22px] sm:py-[25px] md:py-7 border-b border-[#edf0f4]">

            <div className="mb-5">

              <h2 className="m-0 text-[#172033] text-[17px] sm:text-[19px] font-bold after:content-[''] after:block after:w-[35px] after:h-[3px] after:mt-1.5 after:bg-[#079c9c] after:rounded-full">
                Resume
              </h2>

              <p className="mt-2 mb-0 text-[#7a8290] text-xs">
                Upload your latest resume.
              </p>

            </div>


            <div className="relative min-h-[145px] border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-[#079c9c] hover:bg-[#f0fafa]">

              <FaFileUpload className="text-[#079c9c] text-[28px] mb-2" />

              <label className="text-[#172033] text-[13px] font-bold mb-1">
                Upload Resume
              </label>

              <span className="text-[#7a8290] text-[11px]">
                PDF, DOC or DOCX
              </span>

              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                required
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

            </div>

          </div>


          {/* =================================================
              COVER LETTER
          ================================================= */}

          <div className="px-[17px] sm:px-[22px] md:px-[30px] py-[22px] sm:py-[25px] md:py-7">

            <div className="mb-5">

              <h2 className="m-0 text-[#172033] text-[17px] sm:text-[19px] font-bold after:content-[''] after:block after:w-[35px] after:h-[3px] after:mt-1.5 after:bg-[#079c9c] after:rounded-full">
                Message
              </h2>

              <p className="mt-2 mb-0 text-[#7a8290] text-xs">
                Tell us why you are interested in this opportunity.
              </p>

            </div>


            <textarea
              className="w-full min-h-[130px] box-border resize-y border border-[#dce2e8] rounded-md outline-none px-3 py-3 text-[#172033] text-[13px] leading-[1.6] focus:border-[#079c9c] focus:ring-[3px] focus:ring-[#079c9c]/10"
              name="coverLetter"
              placeholder="Write your message..."
              value={formData.coverLetter}
              onChange={handleChange}
              required
            />

          </div>


          {/* =================================================
              SUBMIT
          ================================================= */}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-[18px] px-[17px] sm:px-[22px] md:px-[30px] py-[18px] sm:py-5 md:py-[22px] bg-[#fbfcfd]">

            <button
              type="submit"
              className="w-full sm:w-auto h-11 rounded-md border-none bg-[#079c9c] text-white px-[23px] font-inherit text-[13px] font-bold cursor-pointer transition-all duration-200 hover:bg-[#067c7e] hover:-translate-y-0.5"
            >
              Submit Application →
            </button>

            <a
              href="/Careers"
              className="text-center text-slate-500 no-underline text-[13px] font-semibold transition-colors hover:text-[#079c9c]"
            >
              Cancel
            </a>

          </div>

        </form>

      </div>

    </section>
  );
}

export default JobApplication;