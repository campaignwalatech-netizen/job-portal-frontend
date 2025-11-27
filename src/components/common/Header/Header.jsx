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
  const isMobile = useMediaQuery("(max-width: 900px)");

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
        boxShadow: "none",
        height: 70,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, md: 0 },
          height: "70px",
          gap: 2,
        }}
      >
        {/* LEFT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Logo */}
          <img src="/logo.svg" alt="logo" style={{ width: 98, height: 50, objectFit: "contain", display: "block" }} />


          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Typography sx={{ fontSize: 16, cursor: "pointer" }}>
                Find Jobs ▾
              </Typography>

              <Typography sx={{ fontSize: 16, cursor: "pointer" }}>
                Career Compass ▾
              </Typography>

              <Typography sx={{ fontSize: 16, cursor: "pointer" }}>
                Blog
              </Typography>
            </Box>
          )}
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Employer Login */}
          {!isMobile && (
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                fontSize: 14,
                minWidth: 150,
                height: 36,
                color: "#174ea6",
                background: "rgba(27,87,229,0.06)",
                border: "1px solid rgba(27,87,229,0.2)",
              }}
            >
              Employer Login
            </Button>
          )}

          {/* Login */}
          {!isMobile && (
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                fontSize: 14,
                minWidth: 100,
                height: 36,
                background: "#1e63d6",
                "&:hover": { background: "#1856b8" },
              }}
            >
              Login
            </Button>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <IconButton onClick={handleOpen}>
              <MenuIcon sx={{ color: "#0b2236" }} />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 260, paddingY: 1.5 },
        }}
      >
        <MenuItem onClick={handleClose}>Find Jobs</MenuItem>
        <MenuItem onClick={handleClose}>Career Compass</MenuItem>
        <MenuItem onClick={handleClose}>Blog</MenuItem>

        <Box sx={{ padding: 1, mt: 1 }}>
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
