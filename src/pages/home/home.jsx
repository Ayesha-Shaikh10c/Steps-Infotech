import TopBar from "../../components/home/TopBar";
import Navbar from "../../components/home/Navbar";
import Hero from "../../components/home/Hero";
import SuccessStories from "../../components/home/SuccessStories";
import InternshipSection from "../../components/home/InternshipSection";
import StatsBar from "../../components/home/StatsBar";
import Technologies from "../../components/home/Technologies";
import CareerCards from "../../components/home/CareerCards";
import TrustedPartners from "../../components/home/TrustedPartners";
import HomeFooter from "../../components/home/HomeFooter";

function Home() {
  return (
    <div className="min-h-screen bg-[#00484d] text-white">
      <TopBar />
      <Navbar />

      <main>
        <Hero />
        <SuccessStories />
        <InternshipSection />
        <StatsBar />
        <Technologies />
        <CareerCards />
        <TrustedPartners />
      </main>

      <HomeFooter />
    </div>
  );
}

export default Home;