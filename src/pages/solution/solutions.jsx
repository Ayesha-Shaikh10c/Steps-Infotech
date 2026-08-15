import SolutionsNavbar from "../../components/solution/SolutionsNavbar";
import SolutionsHero from "../../components/solution/SolutionsHero";
import SolutionCards from "../../components/solution/SolutionCards";
import WhyChooseUs from "../../components/solution/WhyChooseUs";
import Industries from "../../components/solution/Industries";
import SolutionProcess from "../../components/solution/SolutionProcess";
import Technologies from "../../components/solution/Technologies";
import SolutionsFooter from "../../components/solution/SolutionsFooter";

export default function Solutions() {
  return (
    <div className="w-full">
      <SolutionsNavbar />
      <SolutionsHero />
      <SolutionCards />
      <WhyChooseUs />
      <Industries />
      <SolutionProcess />
      <Technologies />
      <SolutionsFooter />
    </div>
  );
}
