import { Box, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import StorageIcon from "@mui/icons-material/Storage";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ReceiptIcon from "@mui/icons-material/Receipt";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function Navbar() {
  const location = useLocation();

  const menu = [
    { label: "Jobs", icon: <WorkIcon />, path: "/employer/dashboard/home" },
    { label: "Database", icon: <StorageIcon />, path: "/employer/dashboard/database" },
    { label: "Credits & Usage", icon: <CreditScoreIcon />, path: "/employer/dashboard/credits" },
    { label: "Billing", icon: <ReceiptIcon />, path: "/employer/dashboard/billing" },
    { label: "Verification", icon: <VerifiedIcon />, path: "/employer/dashboard/verification" },
  ];

  return (
    <Box
      sx={{
        width: "240px",
        background: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        display: { xs: "none", md: "block" },
        pt: 3,
      }}
    >
      {menu.map((item) => {
        const active = location.pathname === item.path;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: 3,
                py: 1.6,
                cursor: "pointer",
                borderLeft: active ? "4px solid #3b82f6" : "4px solid transparent",
                background: active ? "#f1f5f9" : "transparent",
                "&:hover": {
                  background: "#f1f5f9",
                },
              }}
            >
              <Box sx={{ color: active ? "#3b82f6" : "#475569" }}>{item.icon}</Box>
              <Typography
                sx={{
                  color: active ? "#1e293b" : "#475569",
                  fontWeight: active ? 600 : 500,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          </NavLink>
        );
      })}
    </Box>
  );
}
