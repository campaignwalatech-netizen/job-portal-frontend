import React from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../components/common/Header/Header";
import FooterMain from "../../components/common/Footer/FooterMain";

export default function EmployeeDashboard() {
  return (
    <Box>
      <Header />
      <Box sx={{ maxWidth: 1100, mx: "auto", py: 8 }}>
        <Typography sx={{ fontSize: 28, fontWeight: 800, mb: 2 }}>Employer / Employee Dashboard (Demo)</Typography>
        <Typography sx={{ color: "#475569" }}>
          This is a placeholder page. Replace with your dashboard components. You landed here because OTP verification (static "1234") succeeded.
        </Typography>
      </Box>
      <FooterMain />
    </Box>
  );
}
