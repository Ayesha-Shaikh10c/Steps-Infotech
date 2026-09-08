function OurApproach() {
  const approaches = [
    {
      title: "Innovation",
      description:
        "We adopt modern technologies to build future-ready digital solutions that help businesses stay competitive.",
    },
    {
      title: "Scalability",
      description:
        "Our systems are designed to grow with your business while maintaining reliability and performance.",
    },
    {
      title: "Quality",
      description:
        "Every solution is built using clean architecture, thorough testing, and industry best practices.",
    },
  ];

  return (
    <section className="w-full bg-[#f5f4f1] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-[90%] max-w-[1120px]">

        {/* TOP CONTENT */}
        <div>
          <p className="mb-3 text-xs font-bold tracking-[1px] text-[#176466] sm:text-sm">
            OUR APPROACH
          </p>

          <h2 className="font-['Barlow_Condensed'] text-5xl leading-[0.9] font-bold text-[#151c27] sm:text-6xl lg:text-7xl">
            Building Digital Solutions
            <br className="hidden sm:block" />
            {" "}That Drive Business Growth
          </h2>

          <p className="mt-5 max-w-[500px] text-sm leading-6 text-[#687277] sm:text-base">
            We combine modern technologies, industry best practices, and
            innovative thinking to deliver secure, scalable, and
            high-performing digital solutions.
          </p>
        </div>

        {/* THREE APPROACH COLUMNS */}
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {approaches.map((item) => (
            <div key={item.title}>
              <h3 className="font-['Barlow_Condensed'] text-5xl leading-none font-bold text-black sm:text-6xl">
                {item.title}
              </h3>

              <p className="mt-2 max-w-[280px] text-sm leading-5 font-medium text-[#506467]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* QUOTE */}
        <div className="mx-auto mt-16 max-w-[720px] text-center">
          <p className="text-xl leading-8 italic text-[#6d8588] sm:text-2xl sm:leading-9">
            "Technology is not just about software—
            <br className="hidden sm:block" />
            it's about creating meaningful digital experiences."
          </p>

          <div className="mx-auto my-5 h-[3px] w-6 rounded-full bg-[#1a7778]" />

          <p className="mx-auto max-w-[500px] text-xs leading-6 italic text-[#7c8287] sm:text-sm">
            We help startups, businesses, and enterprises transform ideas
            into innovative digital products through modern technology and
            expert development.
          </p>
        </div>

      </div>
    </section>
  );
}

export default OurApproach;