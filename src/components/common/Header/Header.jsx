import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Typography,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery("(max-width:900px)");

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "#ffffff",
        color: "#0b2236",
        borderBottom: "1px solid rgba(16,24,40,0.06)",
        boxShadow: "none"
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          height: 68,
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          paddingX: { xs: 2, md: 0 },
          justifyContent: "space-between",
        }}
      >
        {/* LEFT: Logo + Navigation */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* Logo */}
          <img
            src="/logo.svg"
            alt="logo"
            style={{ width: 50, height: "auto", display: "block" }}
          />

          {/* Navigation (Hidden on mobile) */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Typography sx={{ cursor: "pointer", fontSize: 15 }}>
                Find Jobs ▾
              </Typography>

              <Typography sx={{ cursor: "pointer", fontSize: 15 }}>
                Career Compass ▾
              </Typography>

              <Typography sx={{ cursor: "pointer", fontSize: 15 }}>
                Blog
              </Typography>
            </Box>
          )}
        </Box>

        {/* RIGHT: Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Employer Login (hidden on mobile) */}
          {!isMobile && (
            <Button
              variant="outlined"
              sx={{
                borderRadius: "10px",
                paddingX: 2,
                textTransform: "none",
                fontSize: 14,
                border: "1px solid rgba(27,87,229,0.2)",
                background: "rgba(27,87,229,0.06)",
                color: "#174ea6",
                minWidth: 140,
              }}
            >
              Employer Login
            </Button>
          )}

          {/* Login Button */}
          {!isMobile && (
            <Button
              variant="contained"
              sx={{
                borderRadius: "12px",
                paddingX: 2.2,
                textTransform: "none",
                fontSize: 14,
                minWidth: 90,
                background: "#1e63d6",
                "&:hover": {
                  background: "#1856b8",
                },
              }}
            >
              Login
            </Button>
          )}

          {/* Mobile Hamburger */}
          {isMobile && (
            <IconButton onClick={handleOpen}>
              <MenuIcon sx={{ color: "#0b2236" }} />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Dropdown */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Find Jobs</MenuItem>
        <MenuItem onClick={handleClose}>Career Compass</MenuItem>
        <MenuItem onClick={handleClose}>Blog</MenuItem>

        <Box sx={{ padding: 1, width: 240 }}>
          <Button fullWidth variant="outlined" sx={{ mb: 1 }}>
            Employer Login
          </Button>
          <Button fullWidth variant="contained">
            Login
          </Button>
        </Box>
      </Menu>
    </AppBar>
  );
}
