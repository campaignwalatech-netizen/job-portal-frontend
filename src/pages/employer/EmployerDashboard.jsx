import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../../components/Employer/dashboard/dashboardheader";
import Navbar from "../../components/Employer/dashboard/Navbar";
import FooterMain from "../../components/common/Footer/FooterMain";

export default function EmployerDashboard() {
  return (
    <Box sx={{ minHeight: "100vh", background: "#f8fafc" }}>
      <DashboardHeader />

      <Box sx={{ display: "flex" }}>
        <Navbar />

        {/* MAIN CONTENT */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            width: "100%",
            maxWidth: { md: "1400px" },
            mx: "auto",
            ml: { md: "240px" }, 
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* FOOTER FIXED CORRECTLY */}
      <Box sx={{ ml: { md: "240px" } }}>
        <FooterMain />
      </Box>
    </Box>
  );
}
