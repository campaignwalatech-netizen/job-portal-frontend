import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Drawer,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { keyframes } from "@mui/system";

const bellBounce = keyframes`
  0% { transform: scale(1); }
  30% { transform: scale(1.25); }
  60% { transform: scale(0.9); }
  100% { transform: scale(1); }
`;

export default function DashboardHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          px: { xs: 2, md: 4 },
          py: { xs: 1, md: 1.5 },
          gap: { xs: 1, md: 2 },
          position: "sticky",
          top: 0,
          zIndex: 30,
          overflow: "hidden",
        }}
      >
        {/* MOBILE MENU */}
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <MenuIcon sx={{ fontSize: 26, color: "#1e293b" }} />
        </IconButton>

        {/* LOGO */}
        <Box
          onClick={() => navigate("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            flexShrink: 1,
          }}
        >
          <img
            src="/logo.svg"
            alt="logo"
            style={{
              width: "42px",
              height: "auto",
              maxWidth: "100%",
            }}
          />

          <Typography
            sx={{
              fontWeight: 700,
              color: "#1e63d6",
              fontSize: { xs: 16, sm: 18, md: 20 },
              whiteSpace: "nowrap",
            }}
          >
            Naukri Chaahiye
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* RIGHT SIDE */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 1.5, md: 2 },
            minWidth: 0,
          }}
        >
          {/* NOTIFICATION BELL */}
          <IconButton
            onClick={() => {
              const el = document.getElementById("notif-bell");
              if (el) {
                el.classList.remove("animate");
                void el.offsetWidth;
                el.classList.add("animate");
              }
              navigate("/employer/dashboard/notifications");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            sx={{ "&:hover": { background: "rgba(30,99,214,0.08)" } }}
          >
            <Badge variant="dot" color="error">
              <NotificationsNoneIcon
                id="notif-bell"
                sx={{
                  fontSize: { xs: 22, md: 24 },
                  color: "#1e293b",
                  "&.animate": { animation: `${bellBounce} 0.4s ease` },
                }}
              />
            </Badge>
          </IconButton>

          {/* CREDITS */}
          <Typography
            onClick={() => navigate("/employer/dashboard/credits")}
            sx={{
              display: { xs: "none", sm: "block" },
              fontSize: { xs: 12, sm: 13, md: 14 },
              fontWeight: 600,
              color: "#1e63d6",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Credits: 120
          </Typography>

          {/* AVATAR */}
          <Box
            onClick={() => navigate("/employer/dashboard/profile")}
            sx={{ cursor: "pointer" }}
          >
            <Avatar
              src="https://i.pravatar.cc/40"
              alt="user"
              sx={{
                width: { xs: 32, sm: 36, md: 38 },
                height: { xs: 32, sm: 36, md: 38 },
                border: "2px solid #e6f2ff",
                transition: "0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* MOBILE DRAWER */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: 240, background: "#fff", pt: 2 },
        }}
      >
        <Navbar mobile closeDrawer={() => setOpen(false)} />
      </Drawer>
    </>
  );
}
