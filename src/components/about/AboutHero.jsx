function AboutHero() {
  return (
    <section className="page-hero relative flex items-center overflow-hidden bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-6 text-center md:px-16">
        <p className="font-body text-sm font-semibold tracking-[4px] text-[#079c9c]">
          ABOUT
        </p>

        <h1 className="mt-5 font-heading text-4xl font-bold text-[#08131A] md:text-5xl lg:text-6xl">
          STEPS INFOTECH
        </h1>

        <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-8 text-gray-600 md:text-lg">
          We are a technology-driven company that builds innovative
          digital solutions and connects talent with opportunities
          across multiple domains.
        </p>

        <button className="mt-8 rounded-md bg-[#079c9c] px-7 py-3 font-body text-sm font-semibold text-white transition hover:bg-[#067c7e]">
          Join Our Team
        </button>
      </div>
    </section>
  );
}

export default AboutHero;