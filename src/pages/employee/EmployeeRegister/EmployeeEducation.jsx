import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Divider,
  IconButton,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function EducationDetails() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pursuing: "no",
    educationLevel: "",
    collegeName: "",
    degree: "",
    specialization: "",
    completionMonth: "",
    completionYear: "",
    schoolMedium: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [isMobile, setIsMobile] = useState(false);

  const educationLevels = [
    "10th or below 10th",
    "12th pass",
    "Diploma",
    "ITI",
    "Graduate",
    "Post Graduate",
  ];

  const degrees = [
    "B.Tech",
    "BCA",
    "BBA",
    "BA",
    "MBA",
    "M.Tech",
    "Diploma",
    "ITI",
    "Other",
  ];

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const years = Array.from({ length: 12 }, (_, i) => 2018 + i);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (!form.educationLevel) {
      return setSnackbar({
        open: true,
        message: "Please select your highest education level",
        severity: "error",
      });
    }

    if (!form.collegeName.trim()) {
      return setSnackbar({
        open: true,
        message: "Please enter college name",
        severity: "error",
      });
    }

    if (!form.degree) {
      return setSnackbar({
        open: true,
        message: "Please select degree",
        severity: "error",
      });
    }

    setSnackbar({
      open: true,
      message: "Education details saved successfully!",
      severity: "success",
    });

    setTimeout(() => {
      navigate("/employee/register/experience");
    }, 800);
  };

  const handlePrevious = () => {
    navigate("/employee/register/location");
  };

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "#fff" }}>
      
      <AppBar
        position="static"
        elevation={0}
        color="transparent"
        sx={{ borderBottom: "1px solid #e6e8ef" }}
      >
        <Toolbar sx={{ minHeight: 60 }}>
          {/* Back Button */}
          <IconButton edge="start" onClick={handlePrevious}>
            
          </IconButton>

          {/* Mobile Logo - Now on LEFT side after back button */}
          {isMobile && (
            <Box 
              component="img" 
              src="/logo.svg" 
              alt="logo" 
              sx={{ 
                height: 40,
                ml: 2, // Spacing from back button
              }} 
            />
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flex: 1 }}>
        
        {!isMobile && (
          <Box
            sx={{
              width: "38%",
              bgcolor: "#f9fbff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRight: "1px solid #e6e8ef",
              gap: 2,
              py: 0,
            }}
          >
            <Box component="img" src="/logo.svg" alt="logo" sx={{ width: 240, mb: 2 }} />

            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 900,
                color: "#133a8f",
                maxWidth: 330,
                textAlign: "center",
              }}
            >
              Build Your Profile With Education Details
            </Typography>
          </Box>
        )}

        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", px: { xs: 2, md: 6 } }}>
          
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 650,
              p: { xs: 3, md: 4 },
              border: "1px solid #eef0f4",
              borderRadius: 2,
              overflowY: "auto",
              maxHeight: "80vh",
            }}
          >
            <Typography sx={{ fontSize: 26, fontWeight: 900, mb: 2 }}>
              Education Details
            </Typography>

            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Currently pursuing education?
            </Typography>

            <RadioGroup
              row
              value={form.pursuing}
              onChange={(e) => handleChange("pursuing", e.target.value)}
              sx={{ mb: 3 }}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>

            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Highest education level
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.3, mb: 3 }}>
              {educationLevels.map((lvl) => (
                <Button
                  key={lvl}
                  variant={form.educationLevel === lvl ? "contained" : "outlined"}
                  onClick={() => handleChange("educationLevel", lvl)}
                  sx={{
                    textTransform: "none",
                    borderRadius: 50,
                    px: 2.5,
                  }}
                >
                  {lvl}
                </Button>
              ))}
            </Box>

            <TextField
              label="College Name"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              value={form.collegeName}
              onChange={(e) => handleChange("collegeName", e.target.value)}
            />

            <Select
              size="small"
              fullWidth
              displayEmpty
              sx={{ mb: 2 }}
              value={form.degree}
              onChange={(e) => handleChange("degree", e.target.value)}
            >
              <MenuItem value="">Select Degree</MenuItem>
              {degrees.map((d, i) => (
                <MenuItem key={i} value={d}>{d}</MenuItem>
              ))}
            </Select>

            <TextField
              label="Specialization"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              value={form.specialization}
              onChange={(e) => handleChange("specialization", e.target.value)}
            />

            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Completion Month & Year
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              <Select
                size="small"
                fullWidth
                displayEmpty
                value={form.completionMonth}
                onChange={(e) => handleChange("completionMonth", e.target.value)}
              >
                <MenuItem value="">Month</MenuItem>
                {months.map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </Select>

              <Select
                size="small"
                fullWidth
                displayEmpty
                value={form.completionYear}
                onChange={(e) => handleChange("completionYear", e.target.value)}
              >
                <MenuItem value="">Year</MenuItem>
                {years.map((yr) => (
                  <MenuItem key={yr} value={yr}>{yr}</MenuItem>
                ))}
              </Select>
            </Box>

            <TextField
              label="School Medium"
              placeholder="e.g. English, Hindi"
              size="small"
              fullWidth
              sx={{ mb: 4 }}
              value={form.schoolMedium}
              onChange={(e) => handleChange("schoolMedium", e.target.value)}
            />

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                sx={{
                  px: 4,
                  textTransform: "none",
                  borderColor: "#1a3c8b",
                  color: "#1a3c8b",
                  "&:hover": {
                    bgcolor: "#1a3c8b",
                    color: "#fff",
                  },
                }}
                onClick={handlePrevious}
              >
                Previous
              </Button>

              <Button
                variant="contained"
                sx={{
                  px: 4,
                  bgcolor: "#1a3c8b",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#0e2e6a",
                  },
                }}
                onClick={handleNext}
              >
                Next
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Box
        sx={{
          borderTop: "1px solid #e6e8ef",
          py: 2,
          textAlign: "center",
          fontSize: 13,
          color: "#707988",
        }}
      >
        © 2026 Naukri Chahiye. All rights reserved.
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}