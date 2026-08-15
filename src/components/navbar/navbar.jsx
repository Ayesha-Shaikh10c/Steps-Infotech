import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
  FaBars,
  FaXmark,
} from "react-icons/fa6";
import logo from "../../assets/logo.png";

// Single source of truth for nav links — add/remove a page here and
// it updates the navbar everywhere, on every page, automatically.
const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Solutions", to: "/solutions" },
  { label: "Technologies", to: "/technologies" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Careers", to: "/careers" },
  { label: "Blog", to: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Shared class logic for active vs inactive link state.
  // NavLink automatically knows which page is current — no manual
  // string-checking against a page name needed anywhere.
  const linkClass = ({ isActive }) =>
    `transition-colors hover:text-brand-teal ${
      isActive ? "text-brand-teal font-semibold" : ""
    }`;

  return (
    <header className="w-full font-body">
      {/* Top utility bar */}
      <div className="hidden md:flex items-center justify-between bg-brand-navy text-white text-xs px-8 py-2">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <FaPhone className="text-brand-teal" /> +91 7487447474
          </span>
          <span className="flex items-center gap-2">
            <FaEnvelope className="text-brand-teal" /> stepsinfotech@org.com
          </span>
          <span className="flex items-center gap-2">
            <FaLocationDot className="text-brand-teal" /> Pune, Maharashtra, India
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Facebook" className="hover:text-brand-teal transition-colors">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-brand-teal transition-colors">
            <FaLinkedinIn />
          </a>
          <a href="#" aria-label="X" className="hover:text-brand-teal transition-colors">
            <FaXTwitter />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-brand-teal transition-colors">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-3 bg-white shadow-sm">
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="Steps Infotech" className="h-8 w-auto" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-5 text-[13px] font-medium text-brand-navy uppercase tracking-wide">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink to={link.to} end={link.to === "/"} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden lg:inline-block bg-brand-teal text-white text-xs font-semibold uppercase tracking-wide px-4 py-2 rounded-md hover:bg-brand-desc transition-colors shrink-0"
        >
          Get In Touch
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-brand-navy text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="lg:hidden flex flex-col gap-1 bg-white border-t border-gray-100 px-6 py-4 text-brand-navy font-medium">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `block py-2 hover:text-brand-teal transition-colors ${
                    isActive ? "text-brand-teal font-semibold" : ""
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="mt-2 inline-block bg-brand-teal text-white text-sm font-semibold px-5 py-2.5 rounded-md"
              onClick={() => setOpen(false)}
            >
              Get In Touch
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
