import { FaArrowRight } from "react-icons/fa6";

export default function SolutionsHero() {
  return (
    <section
      className="relative w-full bg-brand-navy overflow-hidden"
      style={{
        backgroundImage: "url('/src/assets/hero-office.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* dark overlay so text stays legible over any hero image */}
      <div className="absolute inset-0 bg-brand-navy/80" />

      {/* Decorative tech background: circuit lines + nodes */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        viewBox="0 0 1440 500"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#0F7C7A" strokeWidth="1.5" fill="none">
          <path d="M100 60 L280 60 L280 160 L460 160" />
          <path d="M460 160 L460 40 L620 40" />
          <path d="M900 400 L900 300 L1080 300 L1080 200" />
          <path d="M1200 80 L1200 200 L1340 200 L1340 340" />
          <path d="M50 320 L200 320 L200 420 L380 420" />
          <path d="M700 60 L700 140 L820 140" />
          <path d="M1000 60 L1140 60 L1140 130" />
          <path d="M300 300 L300 380 L420 380" />
        </g>
        <g fill="#0F7C7A">
          <circle cx="100" cy="60" r="5" />
          <circle cx="280" cy="60" r="4" />
          <circle cx="280" cy="160" r="5" />
          <circle cx="460" cy="160" r="4" />
          <circle cx="460" cy="40" r="5" />
          <circle cx="620" cy="40" r="4" />
          <circle cx="900" cy="400" r="5" />
          <circle cx="900" cy="300" r="4" />
          <circle cx="1080" cy="300" r="5" />
          <circle cx="1080" cy="200" r="4" />
          <circle cx="1200" cy="80" r="5" />
          <circle cx="1200" cy="200" r="4" />
          <circle cx="1340" cy="200" r="5" />
          <circle cx="1340" cy="340" r="4" />
          <circle cx="50" cy="320" r="4" />
          <circle cx="200" cy="320" r="5" />
          <circle cx="200" cy="420" r="4" />
          <circle cx="380" cy="420" r="5" />
          <circle cx="700" cy="60" r="4" />
          <circle cx="700" cy="140" r="5" />
          <circle cx="820" cy="140" r="4" />
          <circle cx="1000" cy="60" r="4" />
          <circle cx="1140" cy="60" r="5" />
          <circle cx="1140" cy="130" r="4" />
          <circle cx="300" cy="300" r="4" />
          <circle cx="300" cy="380" r="5" />
          <circle cx="420" cy="380" r="4" />
        </g>
        {/* Faint hex/code motif, top-right corner */}
        <g fill="#E3FAFB" opacity="0.5" fontFamily="ui-monospace, monospace" fontSize="13">
          <text x="1150" y="420">{"</>"}</text>
          <text x="60" y="150">{"01"}</text>
          <text x="1300" y="120">{"{ }"}</text>
        </g>
      </svg>

      <div className="relative max-w-3xl px-6 md:px-16 py-20 md:py-28 font-body">
        <span className="inline-block text-brand-teal font-semibold tracking-widest text-xs md:text-sm mb-4">
          OUR SOLUTIONS
        </span>
        <h1 className="font-heading text-white text-3xl md:text-5xl leading-tight mb-6">
          Empowering Business <br className="hidden md:block" />
          With Smart Digital Solutions
        </h1>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 bg-brand-teal text-white font-semibold px-6 py-3 rounded-md hover:bg-brand-desc transition-colors"
        >
          Contact us <FaArrowRight />
        </a>
      </div>
    </section>
  );
}
