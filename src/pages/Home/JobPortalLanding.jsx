import React from "react";
import Header from "../../components/common/Header/Header.jsx";
import Hero from "../../components/Home/Hero";
import SuccessStories from "../../components/Home/SuccessStories";
import PopularSearches from "../../components/Home/PopularSearches";
import FeaturedJobs from "../../components/Home/FeaturedJobs";
import PopularJobCategories from "../../components/Home/PopularJobCategories";
import Footer from "../../components/common/Footer/Footer.jsx";
import WantToHire from "../../components/Home/WantToHire.jsx";



export default function JobPortalLanding(){
  return (
    <>
      <Header />
      <Hero />
      <SuccessStories />
      <PopularSearches />
      <FeaturedJobs />
      <PopularJobCategories />
      <WantToHire />
      <Footer />
    </>
  );
}
