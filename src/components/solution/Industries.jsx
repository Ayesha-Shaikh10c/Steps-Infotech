import {
  FaHeartPulse,
  FaLandmark,
  FaCartShopping,
  FaGraduationCap,
  FaIndustry,
  FaTruck,
  FaHotel,
  FaCity,
} from "react-icons/fa6";

const INDUSTRIES = [
  { icon: FaHeartPulse, label: "Healthcare" },
  { icon: FaLandmark, label: "Finance" },
  { icon: FaCartShopping, label: "Retail" },
  { icon: FaGraduationCap, label: "Education" },
  { icon: FaIndustry, label: "Manufacturing" },
  { icon: FaTruck, label: "Logistics" },
  { icon: FaHotel, label: "Hospitality" },
  { icon: FaCity, label: "Real Estate" },
];

export default function Industries() {
  return (
    <section className="bg-white font-body">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="text-center max-w-xl mx-auto mb-4">
          <span className="text-brand-teal font-semibold tracking-widest text-xs md:text-sm">
            INDUSTRIES WE SERVE
          </span>
          <h2 className="font-heading text-brand-navy text-2xl md:text-4xl mt-2">
            Solutions Across Diverse Industries
          </h2>
        </div>
        <div className="w-16 h-0.5 bg-brand-teal mx-auto mb-12" />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8">
          {INDUSTRIES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-full bg-brand-info flex items-center justify-center text-brand-navy text-xl group-hover:bg-brand-teal group-hover:text-white transition-colors">
                <Icon />
              </div>
              <span className="text-sm text-brand-navy font-medium text-center">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
