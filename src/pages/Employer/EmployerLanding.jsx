import EmployerHeader from "../../components/Employer/EmployerHeader";
import EmployerHero from "../../components/Employer/EmployerHero"; 
import StatsScroller from "../../components/Employer/StatsScroller";
import TopCompanies from "../../components/Employer/TopCompanies";
import PostJob from "../../components/Employer/PostJob";
import DatabaseSection from "../../components/Employer/DatabaseSection";

export default function EmployerLanding() {
  return (
    <>
      <EmployerHeader />
      <EmployerHero />
      <TopCompanies />
      <StatsScroller />
      <PostJob />
      <DatabaseSection />
    </>
  );
}
