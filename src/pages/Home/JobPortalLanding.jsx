import React from "react";
import Hero from "../../components/Home/Hero";
import SuccessStories from "../../components/Home/SuccessStories";
import PopularSearches from "../../components/Home/PopularSearches";
import FeaturedJobs from "../../components/Home/FeaturedJobs";
import PopularJobCategories from "../../components/Home/PopularJobCategories";
import Footer from "../../components/common/Footer/Footer.jsx";


export default function JobPortalLanding(){
  return (
    <>
      <Hero />
      <SuccessStories />
      <PopularSearches />
      <FeaturedJobs />
      <PopularJobCategories />
      <Footer />
    </>
  );
}
