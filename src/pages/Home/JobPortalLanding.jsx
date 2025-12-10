import Footer from "../../components/common/Footer/Footer.jsx";
import Header from "../../components/common/Header/Header.jsx";
import FeaturedJobs from "../../components/Home/FeaturedJobs";
import Hero from "../../components/Home/Hero";
import PopularJobCategories from "../../components/Home/PopularJobCategories";
import PopularSearches from "../../components/Home/PopularSearches";
import Testimonials from "../../components/Home/Testimonials.jsx";
import WantToHire from "../../components/Home/WantToHire.jsx";
export default function JobPortalLanding(){
  return (
    <>
      <Header />
      <Hero />
      <PopularSearches />
      <FeaturedJobs />
      <PopularJobCategories />
      <Testimonials />
      <WantToHire />
      <Footer />
    </>
  );
}
