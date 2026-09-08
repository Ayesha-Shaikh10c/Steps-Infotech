import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Solutions", path: "/solutions" },
    { name: "Technologies", path: "/technologies" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  // Was 3 near-identical hand-written divs — now one array + one .map()
  const contactInfo = [
    { icon: FaPhoneAlt, text: "+91 9876543210", visibility: "" },
    { icon: FaEnvelope, text: "stepsinfotech@org.com", visibility: "hidden sm:flex" },
    { icon: FaMapMarkerAlt, text: "Pune Maharashtra", visibility: "hidden md:flex" },
  ];

  // Was 4 near-identical <a> tags — now one array + one .map()
  const socialLinks = [
    { label: "X", icon: () => "𝕏" },
    { label: "Instagram", icon: FaInstagram },
    { label: "Facebook", icon: FaFacebookF },
    { label: "LinkedIn", icon: FaLinkedinIn },
  ];

  return (
    <header className="sticky top-0 z-[9999] w-full bg-white">
      {/* TOP BAR */}
      <div className="w-full bg-[#111c2b] text-white">
        <div className="mx-auto flex h-[34px] w-[92%] max-w-[1320px] items-center justify-between">
          <div className="flex items-center gap-5 md:gap-8">
            {contactInfo.map(({ icon: Icon, text, visibility }) => (
              <div
                key={text}
                className={`items-center gap-2 whitespace-nowrap text-[10px] font-medium sm:text-[11px] flex ${visibility}`}
              >
                <Icon className="text-[12px] text-[#079c9c]" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            {socialLinks.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-5 w-5 items-center justify-center text-[11px] transition hover:text-[#0ba5a5]"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="w-full border-b border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-[58px] w-[92%] max-w-[1320px] items-center justify-between">
          {/* LOGO — was: a fake "S" built from a <span>, plus text spans.
              Now: your real logo.png. Link now correctly goes home ("/"),
              not to the image file path. */}
          <Link to="/" onClick={closeMenu} className="flex shrink-0 items-center">
            <img src={logo} alt="Steps Infotech" className="h-10 w-auto" />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden h-full items-center lg:flex">
            <ul className="flex h-full items-center gap-[25px]">
              {navItems.map((item) => (
                <li key={item.name} className="h-full">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `relative flex h-full items-center whitespace-nowrap text-[13px] font-semibold transition ${
                        isActive ? "text-[#079c9c]" : "text-[#172033] hover:text-[#079c9c]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.name}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#079c9c]" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              className="ml-6 flex h-[36px] shrink-0 items-center justify-center rounded-[5px] bg-[#079c9c] px-[15px] text-[12px] font-semibold whitespace-nowrap text-white transition hover:-translate-y-[1px] hover:bg-[#067c7e]"
            >
              Get In Touch
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex items-center justify-center border-0 bg-transparent text-[23px] text-[#172033] lg:hidden"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`overflow-hidden border-t border-gray-200 bg-white shadow-[0_10px_20px_rgba(0,0,0,0.08)] transition-all duration-300 lg:hidden ${
            menuOpen ? "max-h-[600px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto flex w-[90%] flex-col py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `border-b border-gray-100 px-1 py-3 text-[14px] font-semibold transition ${
                    isActive ? "text-[#079c9c]" : "text-[#172033] hover:text-[#079c9c]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* FIX: this used to link to "/" instead of "/contact" like the desktop version */}
            <Link
              to="/contact"
              onClick={closeMenu}
              className="mt-3 mb-2 flex h-[42px] items-center justify-center rounded-[5px] bg-[#079c9c] text-[14px] font-semibold text-white transition hover:bg-[#067c7e]"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
