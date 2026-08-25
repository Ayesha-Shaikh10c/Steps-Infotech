const WhyChooseUs = () => {

  const reasons = [
    {
      title: "Innovative Solutions",
      text: "We leverage the latest technologies and creative thinking to build future-ready solutions.",
    },
    {
      title: "Dedicated Support",
      text: "Our support team is always available to ensure smooth operations and client satisfaction.",
    },
    {
      title: "Results-Driven",
      text: "We focus on delivering measurable outcomes that help businesses grow and succeed.",
    },
  ];

  return (
    <section className="py-20 px-6 text-center">

      <p className="text-sm font-semibold tracking-[3px] text-blue-600">
        WHY CHOOSE US
      </p>

      <h2 className="text-3xl md:text-5xl font-bold mt-4">
        What Sets Us Apart
      </h2>

      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-7">

        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="border border-gray-200 rounded-2xl p-8 text-left hover:shadow-xl transition"
          >
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">
              ✓
            </div>

            <h3 className="text-xl font-bold mt-6">
              {reason.title}
            </h3>

            <p className="mt-4 text-gray-600 leading-7">
              {reason.text}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
};

export default WhyChooseUs;