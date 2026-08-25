const Values = () => {

  const values = [
    "Integrity and Transparency",
    "Client Success",
    "Innovation",
    "Excellence",
    "Teamwork",
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 text-center">

      <p className="text-sm font-semibold tracking-[3px] text-blue-600">
        OUR VALUES
      </p>

      <h2 className="text-3xl md:text-5xl font-bold mt-4">
        What We Believe In
      </h2>

      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

        {values.map((value) => (
          <div
            key={value}
            className="bg-white p-7 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-lg transition"
          >
            <h3 className="font-semibold">
              {value}
            </h3>
          </div>
        ))}

      </div>

    </section>
  );
};

export default Values;