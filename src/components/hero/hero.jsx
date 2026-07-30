import {
  FaUserGraduate,
  FaFaceSmile,
  FaBuilding,
  FaStar,
  FaImage,
} from "react-icons/fa6";

const stats = [
  { icon: <FaUserGraduate />, value: "500+", label: "Internship opportunities" },
  { icon: <FaFaceSmile />, value: "10K+", label: "Happy Interns" },
  { icon: <FaBuilding />, value: "100+", label: "Partner Companies" },
  { icon: <FaStar />, value: "90%", label: "Intern Satisfaction" },
];

const trustedBy = ["Google", "Microsoft", "AWS", "Oracle", "LinkedIn"];

const Hero = () => {
  return (
    <section className="h-[50%] w-full bg-red-500 text-white font-body px-6 lg:px-16 py-16">      <div className="max-w-1440px mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div>
          <h1 className="font-heading text-4xl lg:text-5xl leading-tight mb-4">
            Top In-demand <br />
            Internship In <br />
            <span className="text-btn">2026</span>
          </h1>
          <p className="text-gray-300 mb-6 max-w-md">
            Join hands with Steps Infotech for the latest internship
            opportunities and tech career updates.
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <button className="bg-btn text-white text-sm font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity">
              Explore Internships →
            </button>
            <button className="border border-white/40 text-white text-sm font-semibold px-6 py-3 rounded-md hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6 mb-8 border-t border-white/10 pt-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="text-btn text-lg">{stat.icon}</span>
                <div>
                  <div className="font-semibold text-sm">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Trusted by */}
          <div>
            <p className="text-xs text-gray-400 mb-3">Trusted By</p>
            <div className="flex flex-wrap gap-6 opacity-70">
              {trustedBy.map((brand) => (
                <span key={brand} className="text-sm font-medium">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - image placeholder */}
        <div className="relative">
          <div className="aspect-4/3 w-full rounded-xl bg-white/5 border border-btn/40 flex flex-col items-center justify-center gap-2 text-gray-500">
            <FaImage className="text-3xl" />
            <span className="text-xs">Office image placeholder</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;