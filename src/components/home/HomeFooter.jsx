import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

function HomeFooter() {
  return (
    <footer className="bg-[#002b31]">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-8 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        
        {/* Company */}
        <div>
          <img
            src="/assets/logo.png"
            alt="Steps Infotech"
            className="h-[38px] w-auto brightness-0 invert"
          />

          <p className="mt-4 max-w-[280px] text-[9px] leading-4 text-white/70">
            Building secure, scalable and innovative software solutions
            using modern technologies.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-[10px] font-bold">
            Quick Links
          </h3>

          <div className="mt-3 flex flex-col gap-2 text-[9px] text-white/70">
            <a href="/">Home</a>
            <a href="/about">About us</a>
            <a href="/services">Services</a>
            <a href="/solutions">Solution</a>
            <a href="/technologies">Technologies</a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-[10px] font-bold">
            Our Services
          </h3>

          <div className="mt-3 flex flex-col gap-2 text-[9px] text-white/70">
            <a href="/services/web">
              Web Development
            </a>

            <a href="/services/mobile">
              Mobile App Development
            </a>

            <a href="/services/cloud">
              Cloud Solutions
            </a>

            <a href="/services/cyber-security">
              Cyber Security
            </a>

            <a href="/services/digital-marketing">
              Digital Marketing
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[10px] font-bold">
            Contact Us
          </h3>

          <div className="mt-3 space-y-3 text-[9px] text-white/70">
            <div className="flex gap-2">
              <MapPin
                size={11}
                className="mt-0.5 shrink-0 text-[#06d5dc]"
              />

              <span>
                123, Tawheed Heights, Kondhwa kh,
                <br />
                Pune-411048, India
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Phone
                size={11}
                className="text-[#06d5dc]"
              />

              <a href="tel:+919874874474">
                +91 9876543210
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Mail
                size={11}
                className="text-[#06d5dc]"
              />

              <a href="mailto:stepsinfotech@org.com">
                stepsinfotech@org.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-3 text-center text-[8px] text-white/50">
        © 2026 Steps Infotech. All Rights Reserved.
      </div>
    </footer>
  );
}

export default HomeFooter;