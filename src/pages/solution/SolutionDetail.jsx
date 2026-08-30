import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";
import { SOLUTIONS, EXTRA_SOLUTIONS } from "../../components/solution/solutionsData";

const ALL_SOLUTIONS = [...SOLUTIONS, ...EXTRA_SOLUTIONS];

export default function SolutionDetail() {
  const { slug } = useParams();
  const solution = ALL_SOLUTIONS.find((s) => s.slug === slug);

  if (!solution) {
    return (
      <section className="bg-white font-body py-24 text-center">
        <h2 className="font-heading text-brand-navy text-2xl mb-4">
          Solution not found
        </h2>
        <Link to="/solutions" className="text-brand-teal font-semibold">
          Back to Solutions
        </Link>
      </section>
    );
  }

  const { icon: Icon, title, fullDesc, features } = solution;

  return (
    <section className="bg-white font-body">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <Link
          to="/solutions"
          className="inline-flex items-center gap-2 text-brand-teal text-sm font-semibold mb-8 hover:gap-3 transition-all"
        >
          <FaArrowLeft className="text-xs" /> Back to Solutions
        </Link>

        <div className="w-16 h-16 rounded-lg bg-brand-info flex items-center justify-center text-brand-teal text-2xl mb-6">
          <Icon />
        </div>

        <h1 className="font-heading text-brand-navy text-3xl md:text-4xl mb-6">
          {title}
        </h1>

        <p className="text-brand-desc text-base md:text-lg mb-10 leading-relaxed">
          {fullDesc}
        </p>

        <h2 className="font-heading text-brand-navy text-lg md:text-xl mb-4">
          What's Included
        </h2>
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-brand-info text-brand-teal flex items-center justify-center text-xs mt-0.5 shrink-0">
                <FaCheck />
              </span>
              <span className="text-gray-600 text-sm md:text-base">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}