const CTA = () => {
  return (
    <section className="bg-white py-3 px-6">

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">

        {/* Text */}
        <div>
          <h2 className="text-xl font-medium text-gray-900">
            Ready to Get Started?
          </h2>

          <p className="text-gray-800">
            Let’s discuss how our services help your business grow.
          </p>
        </div>

        {/* Button */}
        <button className="text-lg text-gray-900 hover:text-[#079ba5] transition">
          Contact us →
        </button>

      </div>

    </section>
  );
};

export default CTA;