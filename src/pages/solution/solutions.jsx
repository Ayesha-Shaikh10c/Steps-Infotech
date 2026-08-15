import SolutionsHero from "../../components/solution/SolutionsHero";
import SolutionCards from "../../components/solution/SolutionCards";
import WhyChooseUs from "../../components/solution/WhyChooseUs";
import Industries from "../../components/solution/Industries";
import SolutionProcess from "../../components/solution/SolutionProcess";
import Technologies from "../../components/solution/Technologies";

// Navbar and Footer are no longer imported here — Layout.jsx
// wraps every page with them automatically via React Router.
export default function Solutions() {
  return (
    <>
      <SolutionsHero />
      <SolutionCards />
      <WhyChooseUs />
      <Industries />
      <SolutionProcess />
      <Technologies />
    </>
  );
}
