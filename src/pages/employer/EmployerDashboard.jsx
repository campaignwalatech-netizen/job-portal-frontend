import { Box } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../../components/Employer/dashboard/dashboardheader";
import Navbar from "../../components/Employer/dashboard/Navbar";
import FooterMain from "../../components/common/Footer/FooterMain";
import { getEmployerProfile } from "../../api/auth";

export default function EmployerDashboard() {
  // Minimal integration: fetch employer profile on dashboard mount and persist it.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    (async () => {
      try {
        const res = await getEmployerProfile(token);
        localStorage.setItem("employerProfile", JSON.stringify(res.data));
      } catch (e) {
        // Non-blocking; ignore 401/404 and proceed.
        console.warn("Employer profile fetch on dashboard failed", e?.response?.status, e?.response?.data);
      }
    })();
  }, []);
  return (
    <Box sx={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* HEADER (fixed top) */}
      <DashboardHeader />

      {/* SIDEBAR (fixed left, NOT inside flex layout) */}
      <Navbar />

      {/* MAIN CONTENT WRAPPER */}
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            width: "100%",
            maxWidth: "100%",
            ml: { md: "240px" },
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {/* FOOTER */}
      <Box sx={{ ml: { md: "240px" } }}>
        <FooterMain />
      </Box>
    </Box>
  );
}
