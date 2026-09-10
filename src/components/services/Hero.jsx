import servicesHero from "../../assets/images/image1.png";

const Hero = () => {
  return (
    <section
      className="page-hero relative flex items-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${servicesHero})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#002633]/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-16">
        <div className="max-w-2xl">
          <p className="mb-5 font-body text-2xl font-light text-[#08b5d2] md:text-3xl">
            WHAT WE OFFER
          </p>

          <h1 className="mb-6 font-heading text-4xl font-light text-white md:text-5xl lg:text-6xl">
            Our Services
          </h1>

          <p className="max-w-xl font-body text-base leading-relaxed text-white md:text-lg">
            We deliver a wide range of IT services designed to help
            businesses grow, innovate and stay ahead in the digital era.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;