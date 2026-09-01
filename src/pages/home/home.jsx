
import InternshipHighlights from "../../components/home/InternshipHighlights";
import InternshipSection from "../../components/home/InternshipSection";
import RoadmapGenerator from "../../components/home/RoadmapGenerator";
import ServicesSection from "../../components/home/ServicesSection";
import SuccessStories from "../../components/home/SuccessStories";

function Home() {
  return (
    <>
    <InternshipSection/>
     <SuccessStories/> 
     < ServicesSection/>
     < InternshipHighlights/>
     < RoadmapGenerator/>
    </>
  );
}

export default Home;

