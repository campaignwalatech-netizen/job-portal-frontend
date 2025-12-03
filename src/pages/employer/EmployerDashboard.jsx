import { Outlet, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import DashboardHeader from "../../components/Employer/dashboard/dashboardheader";
import Navbar from "../../components/Employer/dashboard/Navbar";

export default function EmployerDashboard() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      {/* LEFT SIDEBAR */}
      <Navbar />

      {/* RIGHT AREA */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* TOP HEADER */}
        <DashboardHeader />

        {/* PAGE CONTENT */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
