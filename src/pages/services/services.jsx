import Hero from "../../components/services/Hero";
import Services from "../../components/services/Services";
import WhyChooseUs from "../../components/services/WhyChooseUs";
import ServiceProcess from "../../components/services/ServiceProcess";
import ServiceFAQ from "../../components/services/ServiceFAQ";
import CTA from "../../components/services/CTA";

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Introduction and Cards */}
      <Services />

      {/* Why Choose Our Services */}
      <WhyChooseUs />

      {/* Our Service Process */}
      <ServiceProcess />

      {/* Frequently Asked Questions */}
      <ServiceFAQ />

      {/* Call to Action */}
      <CTA />
    </>
  );
}