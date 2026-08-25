function MissionVision() {
  return (
    <section className="py-20 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* Mission */}
        <div className="border border-gray-200 rounded-2xl p-10 hover:shadow-lg transition">

          <p className="text-blue-600 font-semibold">
            OUR MISSION
          </p>

          <h2 className="text-3xl font-bold mt-3">
            Our Mission
          </h2>

          <p className="mt-5 text-gray-600 leading-8">
            To deliver innovative IT solutions that drive business
            growth, enhance efficiency and create lasting value
            for our clients.
          </p>

        </div>

        {/* Vision */}
        <div className="border border-gray-200 rounded-2xl p-10 hover:shadow-lg transition">

          <p className="text-blue-600 font-semibold">
            OUR VISION
          </p>

          <h2 className="text-3xl font-bold mt-3">
            Our Vision
          </h2>

          <p className="mt-5 text-gray-600 leading-8">
            To be a globally trusted technology partner, recognized
            for innovation, integrity and excellence in everything
            we do.
          </p>

        </div>

      </div>

    </section>
  );
}

export default MissionVision;