const REASONS = [
  {
    title: "Expert Team",
    desc: "Skilled professionals with deep industry knowledge",
  },
  {
    title: "Innovative Approach",
    desc: "We use the latest technology to deliver innovative solutions",
  },
  {
    title: "Client-Centric",
    desc: "Your success is our priority. We work as your partner",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-desc font-body">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
        <div>
          <span className="block text-brand-teal font-semibold text-xs tracking-widest mb-1">
            Why choose
          </span>
          <h2 className="font-heading text-white text-xl md:text-2xl">
            STEPS INFOTECH?
          </h2>
        </div>

        {REASONS.map(({ title, desc }) => (
          <div key={title} className="md:border-l md:border-white/20 md:pl-6">
            <h3 className="font-heading text-white text-base md:text-lg mb-1">
              {title}
            </h3>
            <p className="text-white/70 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
