import Hero from "../../components/services/Hero";
import Services from "../../components/services/Services";
import WhyChooseUs from "../../components/services/WhyChooseUs";
import CTA from "../../components/services/CTA";

export default function ServicesPage() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyChooseUs />
      <CTA />
    </main>
  );
}