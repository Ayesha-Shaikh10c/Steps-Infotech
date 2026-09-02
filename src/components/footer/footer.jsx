import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function footer() {
  const quickLinks = [
    { name: "Home", path: "/home" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Solutions", path: "/solutions" },
    { name: "Technologies", path: "/technologies" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/contact" },
  ];

  const services = [
    "Web Development",
    "Mobile App Development",
    "Cloud Solutions",
    "Cyber Security",
    "Digital Marketing",
    "UI/UX Design",
    "IT Support",
  ];

  return (
    <footer className="w-full bg-[#0b3d3d] text-white">
      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="mx-auto grid w-[90%] max-w-[1180px] grid-cols-1 gap-[35px] py-[45px] md:grid-cols-2 md:gap-[45px] lg:grid-cols-[1.25fr_0.8fr_1.15fr_1.15fr] lg:gap-[70px] lg:py-[25px]">
        {/* =================================================
            LOGO + ABOUT
        ================================================== */}

        <div className="min-w-0">
          {/* LOGO */}

          <Link
            to="/"
            className="mb-[20px] flex items-center gap-[10px]"
          >
            {/* S SYMBOL */}

            <div className="flex h-[43px] w-[43px] skew-[-8deg] items-center justify-center rounded-[8px] border-[6px] border-[#38bdf8] border-t-transparent border-b-[#14b8a6] font-[Arial,sans-serif] text-[35px] font-black leading-none text-[#38bdf8]">
              S
            </div>

            {/* LOGO TEXT */}

            <div className="flex flex-col leading-none">
              <h2 className="m-0 text-[28px] font-bold tracking-[1px] text-[#38bdf8]">
                STEPS
              </h2>

              <span className="mt-[4px] text-[12px] tracking-[3px] text-[#38bdf8]">
                INFOTECH
              </span>
            </div>
          </Link>

          {/* DESCRIPTION */}

          <p className="m-0 text-[15px] font-medium leading-[27px] text-white sm:text-[16px] sm:leading-[30px]">
            We build digital experience
            <br />
            that inspire and create
            <br />
            value for businesses
            <br />
            worldwide.
          </p>

          {/* SOCIAL ICONS */}

          <div className="mt-[22px] flex items-center gap-[18px] sm:mt-[28px] sm:gap-[20px]">
            {/* X */}

            <a
              href="#"
              aria-label="X"
              className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-black text-[13px] text-white transition duration-300 hover:-translate-y-[3px]"
            >
              X
            </a>

            {/* INSTAGRAM */}

            <a
              href="#"
              aria-label="Instagram"
              className="flex h-[24px] w-[24px] items-center justify-center text-[15px] text-[#ff4d91] transition duration-300 hover:-translate-y-[3px]"
            >
              <FaInstagram />
            </a>

            {/* FACEBOOK */}

            <a
              href="#"
              aria-label="Facebook"
              className="flex h-[24px] w-[24px] items-center justify-center text-[15px] text-[#4285f4] transition duration-300 hover:-translate-y-[3px]"
            >
              <FaFacebookF />
            </a>

            {/* LINKEDIN */}

            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-[24px] w-[24px] items-center justify-center text-[15px] text-[#2496d8] transition duration-300 hover:-translate-y-[3px]"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* =================================================
            QUICK LINKS
        ================================================== */}

        <div>
          <h3 className="mb-[15px] text-[21px] font-bold text-white lg:mb-[18px] lg:text-[22px]">
            Quick Links
          </h3>

          <ul className="m-0 list-none p-0">
            {quickLinks.map((item) => (
              <li key={item.name} className="mb-[7px]">
                <Link
                  to={item.path}
                  className="text-[16px] leading-[1.45] text-white transition duration-300 hover:pl-[3px] hover:text-[#2dd4bf] lg:text-[17px]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* =================================================
            OUR SERVICES
        ================================================== */}

        <div>
          <h3 className="mb-[15px] text-[21px] font-bold text-white lg:mb-[18px] lg:text-[22px]">
            Our Services
          </h3>

          <ul className="m-0 list-none p-0">
            {services.map((service) => (
              <li key={service} className="mb-[7px]">
                <Link
                  to="/services"
                  className="text-[16px] leading-[1.45] text-white transition duration-300 hover:pl-[3px] hover:text-[#2dd4bf] lg:text-[17px]"
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* =================================================
            CONTACT US
        ================================================== */}

        <div className="min-w-0">
          <h3 className="mb-[15px] text-[21px] font-bold text-white lg:mb-[18px] lg:text-[22px]">
            Contact Us
          </h3>

          {/* ADDRESS */}

          <div className="mb-[20px] flex items-start gap-[17px] lg:mb-[24px]">
            <FaMapMarkerAlt className="mt-[5px] shrink-0 text-[18px] text-[#079f9a]" />

            <p className="m-0 text-[14px] leading-[21px] text-white sm:text-[15px]">
              123,Tawheed Heights ,
              <br />
              Kondhwa kh,
              <br />
              Pune-411048 , India
            </p>
          </div>

          {/* PHONE */}

          <div className="mb-[20px] flex items-start gap-[17px] lg:mb-[24px]">
            <FaPhoneAlt className="mt-[5px] shrink-0 text-[18px] text-[#079f9a]" />

            <p className="m-0 text-[14px] leading-[21px] text-white sm:text-[15px]">
              +91 9876543210
            </p>
          </div>

          {/* EMAIL */}

          <div className="flex items-start gap-[17px]">
            <FaEnvelope className="mt-[5px] shrink-0 text-[18px] text-[#079f9a]" />

            <p className="m-0 break-all text-[14px] leading-[21px] text-white sm:text-[15px]">
              stepsinfotech@org.com
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          FOOTER BOTTOM
      ====================================================== */}

      <div className="min-h-[52px] w-full border-t-2 border-dashed border-black/75 px-[5%] py-[18px] lg:px-[8%] lg:py-[12px]">
        <div className="flex flex-col items-center justify-between gap-[15px] text-center md:flex-row md:text-left">
          {/* COPYRIGHT */}

          <div className="flex flex-wrap items-center justify-center gap-[10px] text-[13px] font-medium text-white sm:text-[14px] lg:text-[18px]">
            <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border-2 border-black text-[17px] font-bold text-black">
              ©
            </span>

            <span>
              2026 Steps Infotech, All Rights Reserved
            </span>
          </div>

          {/* LEGAL */}

          <div className="flex items-center gap-[10px] sm:gap-[14px]">
            <Link
              to="/privacy-policy"
              className="text-[13px] text-white transition duration-300 hover:text-[#2dd4bf] sm:text-[14px] lg:text-[17px]"
            >
              Privacy Policy
            </Link>

            <span className="text-[16px] text-white sm:text-[18px]">
              |
            </span>

            <Link
              to="/terms"
              className="text-[13px] text-white transition duration-300 hover:text-[#2dd4bf] sm:text-[14px] lg:text-[17px]"
            >
              Term & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default footer;