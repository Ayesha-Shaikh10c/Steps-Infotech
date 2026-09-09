import { FaArrowRight } from "react-icons/fa6";
import Button from "../button/button";
import solutionsImage from "../../assets/images/solutionsbg.png";

export default function SolutionsHero() {
  return (
    <section
      className="
        page-hero
        relative
        w-full
        overflow-hidden
        bg-brand-navy
      "
      style={{
        backgroundImage: `url(${solutionsImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-navy/80" />

      {/* LEFT CONTENT */}
      <div
        className="
          relative
          z-10
          flex
          h-full
          max-w-3xl
          flex-col
          justify-center
          px-6
          md:px-16
        "
      >
        <span
          className="
            mb-4
            inline-block
            font-body
            text-xs
            font-semibold
            tracking-widest
            !text-brand-teal
            md:text-sm
          "
        >
          OUR SOLUTIONS
        </span>

        <h1
          className="
            font-heading
            text-3xl
            font-bold
            leading-tight
            !text-white
            md:text-5xl
          "
        >
          Empowering Business
          <br className="hidden md:block" />
          With Smart Digital Solutions
        </h1>

        <div className="mt-6">
          <Button
            href="#contact"
            variant="primary"
            size="md"
            icon={<FaArrowRight />}
          >
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}