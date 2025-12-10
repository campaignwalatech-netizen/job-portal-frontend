import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  Divider,
  IconButton,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDetails() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: null,
    gender: "",
    email: "",
    whatsappUpdates: false,
  });

  const [isMobile, setIsMobile] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // NEXT BTN VALIDATION HANDLE
  const handleNext = () => {
    if (!formData.fullName.trim()) {
      setSnackbar({
        open: true,
        message: "Full name is required",
        severity: "error",
      });
      return;
    }

    if (!formData.dateOfBirth) {
      setSnackbar({
        open: true,
        message: "Please select your date of birth",
        severity: "error",
      });
      return;
    }

    if (!formData.gender) {
      setSnackbar({
        open: true,
        message: "Please select your gender",
        severity: "error",
      });
      return;
    }

    if (!formData.email.trim()) {
      setSnackbar({
        open: true,
        message: "Email address cannot be empty",
        severity: "error",
      });
      return;
    }

    // SUCCESS MESSAGE
    setSnackbar({
      open: true,
      message: "Basic Details saved successfully!",
      severity: "success",
    });

    setTimeout(() => {
      navigate("/employee/register/location");
    }, 800);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff",
        }}
      >
        {/* Header */}
        <AppBar
          position="static"
          elevation={0}
          color="transparent"
          sx={{
            borderBottom: "1px solid #e6e8ef",
          }}
        >
          <Toolbar sx={{ minHeight: 60 }}>
            <IconButton edge="start" onClick={() => navigate(-1)}></IconButton>
            {isMobile && (
              <Box
                component="img"
                src="/logo.svg"
                alt="logo"
                sx={{ height: 40, ml: 2, objectFit: "contain" }}
              />
            )}
          </Toolbar>
        </AppBar>

        {/* Body */}
        <Box sx={{ display: "flex", flex: 1 }}>
          {/* Left Side */}
          {!isMobile && (
            <Box
              sx={{
                width: { xs: "100%", md: "38%" },
                bgcolor: "#f9fbff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRight: { md: "1px solid #e6eaf1" },
                gap: 2,
                py: 0,
              }}
            >
              <Box
                component="img"
                src="/logo.svg"
                alt="logo"
                sx={{
                  width: { xs: 140, sm: 200, md: 260 },
                  objectFit: "contain",
                }}
              />

              <Typography
                sx={{
                  fontSize: { xs: 20, sm: 26, md: 32 },
                  fontWeight: 900,
                  color: "#133a8f",
                  maxWidth: 300,
                  textAlign: "center",
                }}
              >
                Your Naukri Search Ends Here
              </Typography>
            </Box>
          )}

          {/* Right Form Area */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: { xs: 2, md: 6 },
            }}
          >
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
              <Typography sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 900 }}>
                Basic Details
              </Typography>

              <Typography sx={{ fontSize: 14, mb: 4, color: "#707988" }}>
                Please provide your personal information.
              </Typography>

              {/* Full Name */}
              <Typography sx={{ fontWeight: 600, mb: 1, fontSize: 15 }}>
                Full Name
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                sx={{ mb: 3 }}
              />

              {/* DOB */}
              <Typography sx={{ fontWeight: 600, mb: 1, fontSize: 15 }}>
                Date of Birth
              </Typography>
              <DatePicker
                value={formData.dateOfBirth}
                onChange={(val) => handleChange("dateOfBirth", val)}
                renderInput={(props) => (
                  <TextField fullWidth size="small" {...props} />
                )}
              />
              <Box sx={{ mb: 3 }} />

              {/* Gender */}
              <Typography sx={{ fontWeight: 600, mb: 1, fontSize: 15 }}>
                Gender
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  displayEmpty
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                >
                  <MenuItem value="">Select gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ mb: 3 }} />

              {/* Email */}
              <Typography sx={{ fontWeight: 600, mb: 1, fontSize: 15 }}>
                Email Address
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />

              <FormControlLabel
                sx={{ mt: 2 }}
                control={
                  <Checkbox
                    checked={formData.whatsappUpdates}
                    onChange={(e) =>
                      handleChange("whatsappUpdates", e.target.checked)
                    }
                  />
                }
                label="Send updates on WhatsApp"
              />

              <Divider sx={{ my: 4 }} />

              {/* Buttons */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 1,
                    px: 4,
                    py: 1,
                    textTransform: "none",
                    borderColor: "#1a3c8b",
                    color: "#1a3c8b",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "#1a3c8b", color: "#fff" },
                  }}
                  onClick={() => navigate(-1)}
                >
                  Previous
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 1,
                    px: 4,
                    py: 1,
                    textTransform: "none",
                    bgcolor: "#1a3c8b",
                    fontWeight: 600,
                    "&:hover": { bgcolor: "#0e2e6a" },
                  }}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Footer */}
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

        {/* Snackbar */}
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
    </LocalizationProvider>
  );
}
