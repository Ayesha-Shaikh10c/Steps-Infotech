const Stats = () => {

  const stats = [
    {
      number: "10+",
      title: "Years of Excellence",
    },
    {
      number: "150+",
      title: "Happy Clients",
    },
    {
      number: "250+",
      title: "Projects Delivered",
    },
    {
      number: "50+",
      title: "Expert Professionals",
    },
    {
      number: "10+",
      title: "Industries Served",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6">

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl p-8 text-center shadow-sm"
          >
            <h2 className="text-4xl font-bold text-blue-600">
              {stat.number}
            </h2>

            <p className="mt-3 text-gray-600">
              {stat.title}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
};

export default Stats;