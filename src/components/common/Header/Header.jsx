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
      position="fixed"
      elevation={0}
      sx={{
        background: "#ffffff",
        color: "#0b2236",
        boxShadow: "none",
        zIndex: 2000,
top: 0,
left: 0,
right: 0,

      }}
    >
      <Toolbar
  sx={{
    display: "flex",
    alignItems: "center",
    height: 68,
    width: "100%",
    px: { xs: 2.5, sm: 4, md: 6, lg: 8, xl: 10, xxl: 12 }, 
    justifyContent: "space-between",
    "@media (min-width: 1200px)": {
      paddingLeft: "120px",
  paddingRight: "120px",
    },
  }}
>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexGrow: 1 }}>
      
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
  onClick={() => window.open("/employee", "_self")}
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
              <MenuIcon sx={{ color: "#0b2236", fontSize: "40px" }} />
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
        window.open("/employee", "_self");
      }}
    >
      Login
    </Button>
  </Box>
</Menu>

      
    </AppBar>
  );
}
