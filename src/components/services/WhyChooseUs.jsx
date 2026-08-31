const WhyChooseUs = () => {

  const features = [
    {
      icon: "👥",
      title: "Experience Team",
      description: "Skilled professionals with industry expertise.",
    },
    {
      icon: "🏅",
      title: "Quality Assurance",
      description: "We deliver high-quality solution on time.",
    },
    {
      icon: "🤝",
      title: "Client-centric Approach",
      description: "Your success is our top priority.",
    },
  ];

  return (
    <section className="px-4 md:px-8 pb-8">

      <div className="max-w-7xl mx-auto bg-[#086765] rounded-xl text-white">

        <div className="grid grid-cols-1 md:grid-cols-3">

          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-5 px-8 py-7"
            >

              {/* Icon */}
              <div className="text-5xl">
                {feature.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-medium">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-100 mt-1 max-w-[180px]">
                  {feature.description}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;