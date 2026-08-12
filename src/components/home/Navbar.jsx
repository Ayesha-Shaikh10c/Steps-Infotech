import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    ["HOME", "/"],
    ["ABOUT", "/about"],
    ["SERVICES", "/services"],
    ["SOLUTIONS", "/solutions"],
    ["TECHNOLOGIES", "/technologies"],
    ["PORTFOLIO", "/portfolio"],
    ["TESTIMONIALS", "/testimonials"],
    ["CAREERS", "/careers"],
    ["BLOG", "/blog"],
  ];

  return (
    <header className="relative z-50 bg-white">
      <div className="mx-auto flex h-[66px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
        
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="/assets/logo.png"
            alt="Steps Infotech"
            className="h-[45px] w-auto object-contain"
          />
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-5 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-[9px] font-medium text-[#111] transition hover:text-[#00bfc7]"
            >
              {label}
            </a>
          ))}

          <a
            href="/contact"
            className="rounded-md bg-[#05c6cf] px-4 py-3 text-[9px] font-bold text-[#00373b] transition hover:bg-[#00aeb7]"
          >
            GET IN TOUCH
          </a>
        </nav>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="text-[#003c41] lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-200 bg-white px-6 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="text-xs font-semibold text-[#111]"
              >
                {label}
              </a>
            ))}

            <a
              href="/contact"
              className="w-fit rounded-md bg-[#05c6cf] px-4 py-2.5 text-xs font-bold text-[#00373b]"
            >
              GET IN TOUCH
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;