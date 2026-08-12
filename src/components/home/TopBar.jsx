import {
  Camera,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

function TopBar() {
  return (
    <div className="hidden h-[24px] bg-[#002c31] text-[9px] text-white sm:block">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 lg:px-10">
        
        {/* Contact information */}
        <div className="flex items-center gap-6">
          <a
            href="tel:+917487447474"
            className="flex items-center gap-1.5 transition hover:text-[#05d5dc]"
          >
            <Phone size={9} />
            +917487447474
          </a>

          <a
            href="mailto:stepsinfotech@org.com"
            className="flex items-center gap-1.5 transition hover:text-[#05d5dc]"
          >
            <Mail size={9} />
            stepsinfotech@org.com
          </a>

          <span className="flex items-center gap-1.5">
            <MapPin size={9} />
            Pune, Maharashtra, India
          </span>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            aria-label="Website"
            className="transition hover:text-[#05d5dc]"
          >
            <Globe size={10} />
          </a>

          <a
            href="#"
            aria-label="Social media"
            className="transition hover:text-[#05d5dc]"
          >
            <MessageCircle size={10} />
          </a>

          <a
            href="#"
            aria-label="Instagram"
            className="transition hover:text-[#05d5dc]"
          >
            <Camera size={10} />
          </a>

          <a
            href="#"
            aria-label="Send message"
            className="transition hover:text-[#05d5dc]"
          >
            <Send size={10} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopBar;