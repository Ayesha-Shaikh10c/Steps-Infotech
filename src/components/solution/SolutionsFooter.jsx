import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
  FaArrowRight,
  FaRobot,
  FaComments,
} from "react-icons/fa6";
import logoWhite from "../../assets/logo-footer.png";

const QUICK_LINKS = ["Home", "About us", "Services", "Solution", "Technologies"];
const SERVICES = [
  "Web Development",
  "Mobile App Development",
  "Cloud Solutions",
  "Digital Marketing",
];

export default function SolutionsFooter() {
  return (
    <footer className="bg-brand-navy text-white font-body relative">
      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-16 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <img src={logoWhite} alt="Steps Infotech" className="h-9 w-auto mb-4" />
          <p className="text-white/60 text-sm">
            Building secure, scalable and innovative software solutions using
            modern technologies.
          </p>
          <div className="flex items-center gap-3 mt-5">
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

        <div>
          <h4 className="font-heading text-base mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/60">
            {QUICK_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={link === "Home" ? "/" : "#"}
                  className="hover:text-brand-teal transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-base mb-4">Our Services</h4>
          <ul className="space-y-2 text-sm text-white/60">
            {SERVICES.map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-brand-teal transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-base mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <FaLocationDot className="mt-1 text-brand-teal shrink-0" />
              123, Tawheed Heights, Kondhwa Kh, Pune-411048, India
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-brand-teal shrink-0" /> +91 9876543210
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-brand-teal shrink-0" /> stepsinfotech@org.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs text-white/40 py-5">
        © 2026 Steps Infotech. All Rights Reserved.
      </div>

      {/* Bottom CTA strip */}
      <div id="contact" className="bg-brand-teal scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white text-lg shrink-0">
              <FaComments />
            </span>
            <div>
              <h3 className="font-heading text-white text-base md:text-lg">
                Ready to Transform Your Business?
              </h3>
              <p className="text-white/80 text-sm">
                Let's build the right solution for your business and drive real results.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-brand-navy text-white font-semibold px-6 py-3 rounded-md hover:bg-brand-desc transition-colors shrink-0"
          >
            Get Free Consultation <FaArrowRight />
          </a>
        </div>
      </div>

      {/* Floating chatbot launcher */}
      <button
        aria-label="Open chatbot"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-brand-teal text-white text-xl flex items-center justify-center shadow-lg hover:bg-brand-desc transition-colors z-50"
      >
        <FaRobot />
      </button>
    </footer>
  );
}
