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
import EmployeeLoginModal from "../../Employee/EmployeeLoginModal";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery("(max-width:900px)");
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "#ffffff",
        color: "#0b2236",
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, ml: -2 }}>
      
          <img
            src="/logo.svg"
            alt="logo"
            style={{ width: 70, height: "auto", display: "block", borderRadius: "8px" }}
          />

    
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
              <Typography sx={{ cursor: "pointer", fontSize: 15 }}>
  Contact Us
</Typography>

            </Box>
          )}
        </Box>


        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
   
          {!isMobile && (
            <Button
              variant="outlined"
              onClick={() => window.open("/employer", "_blank")}
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


          {!isMobile && (
<Button
  variant="contained"
  onClick={() => window.open("/employee", "_blank")}
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
          {isMobile && (
            <IconButton onClick={handleOpen}>
              <MenuIcon sx={{ color: "#0b2236" }} />
            </IconButton>
          )}
        </Box>
      </Toolbar>

<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
  <MenuItem onClick={handleClose}>Find Jobs</MenuItem>
  <MenuItem onClick={handleClose}>Career Compass</MenuItem>
  <MenuItem onClick={handleClose}>Blog</MenuItem>
  <MenuItem onClick={handleClose}>Contact Us</MenuItem>

  <Box sx={{ padding: 1, width: 240 }}>
    <Button
      fullWidth
      variant="outlined"
      sx={{ mb: 1 }}
      onClick={() => {
        handleClose();
        window.open("/employer", "_blank");
      }}
    >
      Employer Login
    </Button>

    <Button
      fullWidth
      variant="contained"
      onClick={() => {
        handleClose();
        window.open("/employee", "_blank");
      }}
    >
      Login
    </Button>
  </Box>
</Menu>

      
    </AppBar>
  );
}
