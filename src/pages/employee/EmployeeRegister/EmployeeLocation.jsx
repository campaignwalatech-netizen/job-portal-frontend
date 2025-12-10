import MyLocationIcon from "@mui/icons-material/MyLocation";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeLocation() {
  const [form, setForm] = useState({
    addressLine: "",
    currentCity: "",
    jobPref: "",
    preferredCity: "",
  });

  const [isMobile, setIsMobile] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Sample city data
  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", 
    "Kolkata", "Pune", "Jaipur", "Ahmedabad", "Surat",
    "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane"
  ];

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    
    // Reset preferred city if jobPref changes from "other"
    if (field === "jobPref" && value !== "other") {
      setForm(prev => ({ ...prev, preferredCity: "" }));
    }
  };

  // Get current location using browser's geolocation API
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setSnackbar({
        open: true,
        message: "Geolocation is not supported by your browser",
        severity: "error"
      });
      return;
    }

    // Show loading message
    setSnackbar({
      open: true,
      message: "Getting your location...",
      severity: "info"
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocoding to get address
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          
          if (!response.ok) throw new Error("Geocoding failed");
          
          const data = await response.json();
          
          // Extract city from address
          const city = data.address.city || 
                      data.address.town || 
                      data.address.village || 
                      data.address.county || 
                      "Unknown";
          
          const address = data.display_name || "";
          
          setForm(prev => ({
            ...prev,
            addressLine: address,
            currentCity: city
          }));
          
          setSnackbar({
            open: true,
            message: `Location set to ${city}`,
            severity: "success"
          });
        } catch (error) {
          setSnackbar({
            open: true,
            message: "Failed to get location details",
            severity: "error"
          });
        }
      },
      (error) => {
        let message = "Failed to get location";
        switch(error.code) {
          case error.PERMISSION_DENIED:
            message = "Location permission denied. Please enable location services.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            message = "Location request timed out.";
            break;
        }
        
        setSnackbar({
          open: true,
          message,
          severity: "error"
        });
      }
    );
  };

  // Handle city search (when search button is clicked)
  const handleCitySearch = () => {
    // Simple search - you can enhance this with a dialog/modal
    setSnackbar({
      open: true,
      message: "City search feature. You can type in the city select dropdown.",
      severity: "info"
    });
  };

const navigate = useNavigate(); // <-- INIT NAVIGATION

// Handle form submission
const handleNext = () => {
  // Validation
  if (!form.addressLine.trim()) {
    setSnackbar({
      open: true,
      message: "Please enter your address",
      severity: "error"
    });
    return;
  }

  if (!form.currentCity) {
    setSnackbar({
      open: true,
      message: "Please select your current city",
      severity: "error"
    });
    return;
  }

  if (!form.jobPref) {
    setSnackbar({
      open: true,
      message: "Please select a job preference",
      severity: "error"
    });
    return;
  }

  if (form.jobPref === "other" && !form.preferredCity) {
    setSnackbar({
      open: true,
      message: "Please select a preferred city",
      severity: "error"
    });
    return;
  }

  // Success
  console.log("Form submitted:", form);

  setSnackbar({
    open: true,
    message: "Location preferences saved successfully!",
    severity: "success"
  });

  // Wait 1 sec and go to Education Page
  setTimeout(() => {
    navigate("/employee/register/location/education");
  }, 800);
};


  // Handle going back
  const handleBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ bgcolor: "#fff", height: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ---------------- TOP NAV ---------------- */}
      <AppBar
        position="static"
        elevation={0}
        color="transparent"
        sx={{ borderBottom: "1px solid #e6e8ef" }}
      >
        <Toolbar sx={{ minHeight: 60 }}>
          <IconButton
            edge="start"
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
          </IconButton>

          {isMobile && (
            <Box
              component="img"
              src="/logo.svg"
              alt="logo"
              sx={{ height: 42, objectFit: "contain" }}
            />
          )}
        </Toolbar>
      </AppBar>

      {/* ---------------- BODY LAYOUT ---------------- */}
      <Box sx={{ flex: 1, display: "flex" }}>

        {/* ------------ LEFT BIG IMAGE (desktop only) ------------ */}
        {!isMobile && (
          <Box
            sx={{
              width: "38%",
              bgcolor: "#f9fbff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRight: "1px solid #e6e8ef"
            }}
          >
            <Box
              component="img"
              src="/logo.svg"
              alt="logo"
              sx={{ width: 260, mb: 3 }}
            />

            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 900,
                color: "#133a8f",
                maxWidth: 330,
                textAlign: "center"
              }}
            >
              Your Naukri Search Ends Here
            </Typography>
          </Box>
        )}

        {/* --------------------- FORM PANEL --------------------- */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", px: { xs: 2, md: 6 } }}>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 650,
              p: { xs: 3, md: 4 },
              mt: 3,
              border: "1px solid #eef0f4",
              borderRadius: 2,
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <Typography sx={{ fontSize: 26, fontWeight: 900, mb: 3 }}>
              Discover the job near you
            </Typography>

            {/* ---------------- SEARCH BOXES - EXACT SAME UI ---------------- */}
            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
              <Button
                fullWidth
                startIcon={<SearchIcon />}
                variant="outlined"
                onClick={handleCitySearch}
                sx={{
                  textTransform: "none",
                  borderColor: "#d6d9e0",
                  height: 42,
                }}
              >
                Search city
              </Button>

              <Button
                fullWidth
                startIcon={<MyLocationIcon />}
                variant="outlined"
                onClick={getCurrentLocation}
                sx={{
                  textTransform: "none",
                  borderColor: "#d6d9e0",
                  height: 42,
                }}
              >
                Pick Current location
              </Button>
            </Box>

            {/* ---------------- LOCATION BOX ---------------- */}
            <Typography sx={{ mb: 1, fontWeight: 600 }}>
              Your Current Location
            </Typography>

            <TextField
              size="small"
              placeholder="Address Line"
              fullWidth
              value={form.addressLine}
              onChange={(e) => handleChange("addressLine", e.target.value)}
              sx={{ mb: 2 }}
            />

            <Box
              sx={{
                display: "flex",
                border: "1px solid #d6d9e0",
                borderRadius: 1,
                alignItems: "center",
                px: 1,
                mb: 3,
              }}
            >
              <Select
                fullWidth
                value={form.currentCity}
                size="small"
                displayEmpty
                onChange={(e) => handleChange("currentCity", e.target.value)}
                sx={{ border: "none", "& fieldset": { border: "none" } }}
              >
                <MenuItem value="">
                  <em>Select a city you reside in</em>
                </MenuItem>
                {cities.map(city => (
                  <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
              </Select>

              <SearchIcon sx={{ fontSize: 21, color: "#6b7687" }} />
            </Box>

            {/* ---------------- JOB PREFERENCE ---------------- */}
            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Pick a job location
            </Typography>

            <RadioGroup
              value={form.jobPref}
              onChange={(e) => handleChange("jobPref", e.target.value)}
              sx={{ mb: 2 }}
            >
              <FormControlLabel value="same" control={<Radio />} label="Same as my current location" />
              <FormControlLabel value="other" control={<Radio />} label="Other than my current location" />
              <FormControlLabel value="pan" control={<Radio />} label="PAN India" />
            </RadioGroup>

            {form.jobPref === "other" && (
              <>
                <Typography sx={{ fontWeight: 600, mb: 1 }}>
                  Select a city for your Preferred Job Location
                </Typography>

                <Select
                  fullWidth
                  size="small"
                  displayEmpty
                  value={form.preferredCity}
                  onChange={(e) => handleChange("preferredCity", e.target.value)}
                  sx={{ mb: 3 }}
                >
                  <MenuItem value="">
                    <em>Select city</em>
                  </MenuItem>
                  {cities.map(city => (
                    <MenuItem key={city} value={city}>{city}</MenuItem>
                  ))}
                </Select>
              </>
            )}

            <Divider sx={{ my: 4 }} />

            {/* ---------------- ACTION BUTTONS ---------------- */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                sx={{
                  px: 4,
                  textTransform: "none",
                  borderColor: "#1a3c8b",
                  color: "#1a3c8b",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#1a3c8b", color: "#fff" },
                }}
                onClick={handleBack}
              >
                Previous
              </Button>

              <Button
                variant="contained"
                sx={{
                  px: 4,
                  bgcolor: "#1a3c8b",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#0e2e65" },
                }}
                onClick={handleNext}
              >
                Next
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          borderTop: "1px solid #e5e8ef",
          py: 2,
          textAlign: "center",
          fontSize: 13,
          color: "#707988",
        }}
      >
        © 2026 Naukri Chahiye. All rights reserved.
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}