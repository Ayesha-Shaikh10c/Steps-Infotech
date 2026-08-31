const Hero = () => {
  return (
    <section
      className="relative min-h-[550px] md:min-h-[620px] bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/services-hero.jpg')",
      }}
    >

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#002633]/30"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">

        <p className="text-[#08b5d2] text-3xl md:text-4xl font-light mb-6">
          WHAT WE OFFER
        </p>

        <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-light mb-6">
          Our Services
        </h1>

        <p className="text-white text-lg md:text-xl max-w-xl leading-relaxed">
          We deliver a wide range of IT services designed to help
          businesses grow, innovate and stay ahead in the digital era.
        </p>

      </div>
    </section>
  );
};

export default Hero;