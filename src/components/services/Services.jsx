const Services = () => {

  const services = [
    {
      icon: "🖥️",
      title: "Web Development",
      description:
        "We build fast, secure and responsive websites tailored to your business needs.",
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      description:
        "we develop user mendly mobile applications for Android and iOS platforms.",
    },
    {
      icon: "⚙️",
      title: "Software Development",
      description:
        "Custom software solutions designed to solve complex business challenges.",
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description:
        "Scalable and secure cloud solutions to streamline your business operation.",
    },
    {
      icon: "🔒",
      title: "Cyber Security",
      description:
        "Protecting your digital assets with advanced security strategies and solution.",
    },
    {
      icon: "🎧",
      title: "IT Support & Maintenance",
      description:
        "Reliable support and maintenance to ensure smooth and uninterrupted business operation.",
    },
  ];

  return (
    <section className="bg-white py-14 px-6">

      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-[#075b68] text-3xl md:text-4xl mb-2">
          Our services
        </p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900">
          Comprehensive IT solution for your Business
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-7 min-h-[150px]
            shadow-[0_5px_20px_rgba(0,0,0,0.25)]
            hover:-translate-y-2 hover:shadow-xl
            transition duration-300"
          >

            <div className="flex items-center gap-5 mb-5">

              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-[#108d8c] flex items-center justify-center text-2xl">
                {service.icon}
              </div>

              <h3 className="text-lg font-medium text-gray-900">
                {service.title}
              </h3>

            </div>

            <p className="text-gray-800 text-sm max-w-[260px] mx-auto">
              {service.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Services;