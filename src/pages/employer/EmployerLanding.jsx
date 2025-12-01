import EmployerHeader from "../../components/Employer/EmployerHeader";
import EmployerHero from "../../components/Employer/EmployerHero"; 
import StatsScroller from "../../components/Employer/StatsScroller";
import TopCompanies from "../../components/Employer/TopCompanies";
import PostJob from "../../components/Employer/PostJob";
import DatabaseSection from "../../components/Employer/DatabaseSection";
import TestimonialsSection from "../../components/Employer/TestimonialsSection";
import BlogSection from "../../components/Employer/BlogSection";
import Footer from "../../components/common/Footer/FooterMain";


export default function EmployerLanding() {
  return (
    <>
      <EmployerHeader />
      <EmployerHero />
      <TopCompanies />
      <StatsScroller />
      <PostJob />
      <DatabaseSection />
      <TestimonialsSection />
      <BlogSection />
      <Footer />
    </>
  );
}
