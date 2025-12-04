import React from "react";
import { Box, Typography, IconButton, Avatar, Badge, Drawer } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; 


export default function DashboardHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* HEADER */}
      <Box
        sx={{
          width: "100%",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: { xs: 2, md: 4 },
          py: 1.5,
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
      >
        {/* HAMBURGER ICON (mobile only) */}
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            display: { xs: "flex", md: "none" },
            mr: 1,
          }}
        >
          <MenuIcon sx={{ fontSize: 28, color: "#1e293b" }} />
        </IconButton>

        {/* LOGO */}
        <Box
          onClick={() => navigate("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
            "& img": { transition: "0.2s" },
            "&:hover img": { transform: "scale(1.05)" },
          }}
        >
          <img src="/logo.svg" alt="logo" style={{ width: 60 }} />
          <Typography
            sx={{
              fontWeight: 700,
              color: "#1e63d6",
              fontSize: 20,
              whiteSpace: "nowrap",
            }}
          >
            Naukri Chaahiye
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* RIGHT SIDE BUTTONS */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => navigate("/notifications")}
            sx={{ "&:hover": { background: "rgba(30,99,214,0.08)" } }}
          >
            <Badge variant="dot" color="error">
              <NotificationsNoneIcon sx={{ fontSize: 24, color: "#1e293b" }} />
            </Badge>
          </IconButton>

          <Typography
            onClick={() => navigate("/employer/dashboard/credits")}
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: "#1e63d6",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Credits: 120
          </Typography>

          <Box
            onClick={() => navigate("/profile")}
            sx={{
              cursor: "pointer",
              "& .avatar": { transition: "0.2s" },
              "&:hover .avatar": { transform: "scale(1.05)" },
            }}
          >
            <Avatar
              className="avatar"
              alt="user"
              src="https://i.pravatar.cc/40"
              sx={{ width: 38, height: 38, border: "2px solid #e6f2ff" }}
            />
          </Box>
        </Box>
      </Box>

      {/* MOBILE DRAWER SIDEBAR */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "240px",
            background: "#ffffff",
            pt: 2,
          },
        }}
      >
        <Navbar mobile closeDrawer={() => setOpen(false)} />
      </Drawer>
    </>
  );
}
