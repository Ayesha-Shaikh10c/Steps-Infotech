import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa6";

import {
  SOLUTIONS,
  EXTRA_SOLUTIONS,
} from "../../components/solution/solutionsData";

const ALL_SOLUTIONS = [...SOLUTIONS, ...EXTRA_SOLUTIONS];

export default function SolutionDetail() {
  const { slug } = useParams();

  const solution = ALL_SOLUTIONS.find((s) => s.slug === slug);

  if (!solution) {
    return (
      <section className="flex min-h-[500px] items-center justify-center bg-white px-6 font-body text-center">
        <div>
          <h2 className="mb-4 font-heading text-2xl font-bold text-brand-navy">
            Solution not found
          </h2>

          <Link
            to="/solutions"
            className="font-body font-semibold text-brand-teal hover:text-brand-teal-dark"
          >
            Back to Solutions
          </Link>
        </div>
      </section>
    );
  }

  const {
    icon: Icon,
    title,
    desc,
    fullDesc,
    overview,
    services,
    features,
    benefits,
    idealFor,
    approach,
  } = solution;

  return (
    <main className="bg-white font-body">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="page-hero relative overflow-hidden bg-brand-navy">

        {/* Decorative glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-[420px]
            w-[420px]
            rounded-full
            bg-brand-teal/20
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-40
            h-[400px]
            w-[400px]
            rounded-full
            bg-brand-cyan/10
            blur-3xl
          "
        />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 md:px-8">

          <Link
            to="/solutions"
            className="
              mb-8
              inline-flex
              w-fit
              items-center
              gap-2
              text-sm
              font-semibold
              !text-brand-info
              transition-all
              hover:gap-3
            "
          >
            <FaArrowLeft className="text-xs" />
            Back to Solutions
          </Link>

          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-brand-teal/20 text-2xl !text-brand-cyan">
            <Icon />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] !text-brand-cyan md:text-sm">
            OUR SOLUTIONS
          </p>

          <h1 className="max-w-4xl font-heading text-3xl font-bold leading-tight !text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-7 !text-white/75 md:text-base">
            {desc}
          </p>

        </div>
      </section>


      {/* =====================================================
          OVERVIEW
      ===================================================== */}

      <section className="bg-white px-6 py-16 md:px-8 md:py-20">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] !text-brand-teal">
                OVERVIEW
              </p>

              <h2 className="font-heading text-2xl font-bold !text-brand-navy md:text-3xl">
                Technology Designed Around Your Goals
              </h2>
            </div>

            <div>
              <p className="text-sm leading-7 !text-text-body md:text-base md:leading-8">
                {fullDesc}
              </p>

              {overview && (
                <p className="mt-5 text-sm leading-7 !text-text-muted md:text-base md:leading-8">
                  {overview}
                </p>
              )}
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      {services?.length > 0 && (
        <section className="bg-surface-alt px-6 py-16 md:px-8 md:py-20">

          <div className="mx-auto max-w-6xl">

            <div className="mb-10 text-center">

              <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] !text-brand-teal">
                WHAT WE PROVIDE
              </p>

              <h2 className="font-heading text-2xl font-bold !text-brand-navy md:text-3xl">
                Our Services
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 !text-text-muted">
                Practical technology services designed to solve business
                challenges and create measurable value.
              </p>

            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {services.map((service, index) => (
                <div
                  key={service}
                  className="
                    rounded-xl
                    border
                    border-border
                    bg-white
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-brand-teal-light
                    hover:shadow-lg
                  "
                >
                  <span className="mb-4 block font-heading text-sm font-bold !text-brand-cyan">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-heading text-base font-bold !text-brand-navy md:text-lg">
                    {service}
                  </h3>
                </div>
              ))}

            </div>

          </div>
        </section>
      )}


      {/* =====================================================
          KEY FEATURES
      ===================================================== */}

      {features?.length > 0 && (
        <section className="bg-white px-6 py-16 md:px-8 md:py-20">

          <div className="mx-auto max-w-6xl">

            <div className="mb-10">

              <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] !text-brand-teal">
                CAPABILITIES
              </p>

              <h2 className="font-heading text-2xl font-bold !text-brand-navy md:text-3xl">
                Key Features
              </h2>

            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {features.map((feature) => (
                <div
                  key={feature}
                  className="
                    flex
                    items-start
                    gap-4
                    rounded-xl
                    border
                    border-border
                    bg-surface-alt
                    p-5
                  "
                >
                  <span
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-brand-info
                      !text-brand-teal
                    "
                  >
                    <FaCheck className="text-xs" />
                  </span>

                  <span className="text-sm leading-6 !text-text-body">
                    {feature}
                  </span>
                </div>
              ))}

            </div>

          </div>
        </section>
      )}


      {/* =====================================================
          BENEFITS
      ===================================================== */}

      {benefits?.length > 0 && (
        <section className="bg-brand-navy px-6 py-16 md:px-8 md:py-20">

          <div className="mx-auto max-w-6xl">

            <div className="mb-10 text-center">

              <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] !text-brand-cyan">
                BUSINESS IMPACT
              </p>

              <h2 className="font-heading text-2xl font-bold !text-white md:text-3xl">
                Why Choose This Solution?
              </h2>

            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    p-5
                    backdrop-blur-sm
                  "
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-teal/20 !text-brand-cyan">
                    <FaCheck className="text-xs" />
                  </div>

                  <p className="text-sm font-medium leading-6 !text-white/85">
                    {benefit}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </section>
      )}


      {/* =====================================================
          OUR APPROACH
      ===================================================== */}

      {approach?.length > 0 && (
        <section className="bg-white px-6 py-16 md:px-8 md:py-20">

          <div className="mx-auto max-w-6xl">

            <div className="mb-10 text-center">

              <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] !text-brand-teal">
                HOW WE WORK
              </p>

              <h2 className="font-heading text-2xl font-bold !text-brand-navy md:text-3xl">
                Our Approach
              </h2>

            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {approach.map((step, index) => (
                <div
                  key={step}
                  className="
                    relative
                    rounded-xl
                    border
                    border-border
                    bg-white
                    p-6
                    shadow-sm
                  "
                >
                  <span className="mb-4 block font-heading text-2xl font-bold !text-brand-cyan">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-heading text-base font-bold !text-brand-navy">
                    {step}
                  </h3>
                </div>
              ))}

            </div>

          </div>
        </section>
      )}


      {/* =====================================================
          IDEAL FOR
      ===================================================== */}

      {idealFor?.length > 0 && (
        <section className="bg-surface-alt px-6 py-16 md:px-8 md:py-20">

          <div className="mx-auto max-w-5xl text-center">

            <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] !text-brand-teal">
              WHO IT'S FOR
            </p>

            <h2 className="font-heading text-2xl font-bold !text-brand-navy md:text-3xl">
              Ideal For
            </h2>

            <div className="mt-8 flex flex-wrap justify-center gap-3">

              {idealFor.map((item) => (
                <span
                  key={item}
                  className="
                    rounded-full
                    border
                    border-brand-teal/20
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-medium
                    !text-brand-desc
                    shadow-sm
                  "
                >
                  {item}
                </span>
              ))}

            </div>

          </div>
        </section>
      )}


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="bg-white px-6 py-16 md:px-8 md:py-20">

        <div
          className="
            mx-auto
            max-w-6xl
            overflow-hidden
            rounded-2xl
            bg-brand-navy
            px-6
            py-12
            text-center
            md:px-12
            md:py-16
          "
        >

          <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] !text-brand-cyan">
            LET'S BUILD TOGETHER
          </p>

          <h2 className="font-heading text-2xl font-bold !text-white md:text-4xl">
            Ready to Transform Your Business?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 !text-white/70 md:text-base">
            Let's discuss your requirements and build a solution that fits
            your business goals.
          </p>

          <div className="mt-7 flex justify-center">

            <Link
              to="/contact"
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-brand-teal
                px-6
                py-3
                text-sm
                font-semibold
                !text-white
                transition-all
                duration-300
                hover:bg-brand-teal-dark
                hover:gap-3
              "
            >
              Start Your Project
              <FaArrowRight className="text-xs" />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}