import TestimonialHero from "../../components/testimonials/TestimonialHero";
import TestimonialHeader from "../../components/testimonials/TestimonialHeader";
import TestimonialCards from "../../components/testimonials/TestimonialCards";
import Statistics from "../../components/testimonials/Statistics";

// Navbar and Footer are handled automatically by Layout.jsx
// via React Router.
export default function Testimonials() {
  return (
    <>
      <TestimonialHero />
      <TestimonialHeader />
      <TestimonialCards />
      <Statistics />
    </>
  );
}