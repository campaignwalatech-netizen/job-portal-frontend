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

        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            width: "100%",
            maxWidth: { md: "1200px" },
            mx: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <FooterMain />
    </Box>
  );
}
