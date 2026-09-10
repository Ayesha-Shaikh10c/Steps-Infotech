import aboutBanner from "../../assets/about-banner.png";

function AboutHero() {
  return (
    <section className="w-full px-0">
      <div
        className="
          mx-auto
          w-full
          max-w-[1024px]
          overflow-hidden
          rounded-[28px]
        "
      >
        <img
          src={aboutBanner}
          alt="Steps Infotech About"
          className="
            block
            h-auto
            w-full
            object-cover
          "
        />
      </div>
    </section>
  );
}

export default AboutHero;