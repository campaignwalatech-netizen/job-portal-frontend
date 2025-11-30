import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Employee/EmployeeHeader";
import Hero from "../../components/Employee/EmployeeHero";
import TopCompanies from "../../components/Employee/TopCompanies";
import StatsScroller from "../../components/Employee/StatsScroller";
import Testimonials from "../../components/Employee/Testimonials";
import FooterMain from "../../components/common/Footer/FooterMain";


export default function EmployeeLanding() {

  return (
    <>

        <Header />
        <Hero />
        <TopCompanies />
        <StatsScroller />
        <Testimonials />
        <FooterMain />

    </>
      
      
    
  );
}
