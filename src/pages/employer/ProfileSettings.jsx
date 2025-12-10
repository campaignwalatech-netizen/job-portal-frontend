import React, { useState, useEffect } from "react";
import { updateEmployer, updateEmployerCompany } from "../../api/auth";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  Avatar,
  Skeleton,
} from "@mui/material";

export default function ProfileSettings() {
  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gstin, setGstin] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [logoPreview, setLogoPreview] = useState("/logo.svg");

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Mock initial load
  useEffect(() => {
    setTimeout(() => {
      setFullName("Aarav Sharma");
      setEmail("aarav.sharma@naukri.com");
      setRole("Hiring Manager");
      setCompanyName("Talent Bridge Solutions");
      setCompanySize("51–100 Employees");
      setLoading(false);
    }, 600);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Enter a valid email";
    if (!role.trim()) newErrors.role = "Role is required";
    if (!companyName.trim()) newErrors.companyName = "Company name is required";
    if (!companySize.trim()) newErrors.companySize = "Select company size";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      await updateEmployer({ fullName, email }, token);
      // Also update company details with available fields
      await updateEmployerCompany(
        {
          companyName,
          numOfEmployees: companySize,
          // Optional fields not present in UI yet
          industry: undefined,
          location: undefined,
          about: undefined,
          website: undefined,
          founded: undefined,
          logoUrl: undefined,
        },
        token
      );
      setSnackbarOpen(true); // 200 success
    } catch (error) {
      const status = error?.response?.status;
      if (status === 400) {
        // Missing fields
        setErrors((prev) => ({ ...prev, form: "Missing required fields" }));
      } else if (status === 409) {
        // Not updated
        setErrors((prev) => ({ ...prev, form: "Update failed. Try again." }));
      } else {
        setErrors((prev) => ({ ...prev, form: "Unexpected error occurred" }));
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography sx={{ fontSize: 28, fontWeight: 800, mb: 3 }}>
        Profile Settings
      </Typography>

      {/* SKELETON LOADING */}
      {loading ? (
        <>
          <Skeleton variant="rounded" height={180} sx={{ mb: 3 }} />
          <Skeleton variant="rounded" height={240} sx={{ mb: 3 }} />
        </>
      ) : (
        <>
          {/* PERSONAL DETAILS */}
          <Paper
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
              Personal Details
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 3, mt: 0.5 }}>
              Manage your personal profile information.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Full Name"
                fullWidth
                size="medium"
                value={fullName}
                error={!!errors.fullName}
                helperText={errors.fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <TextField
                label="Email Address"
                fullWidth
                size="medium"
                value={email}
                error={!!errors.email}
                helperText={errors.email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Your Role"
                fullWidth
                size="medium"
                value={role}
                error={!!errors.role}
                helperText={errors.role}
                onChange={(e) => setRole(e.target.value)}
              />
            </Box>
          </Paper>

          {/* COMPANY DETAILS */}
          <Paper
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
              Company Details
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 3, mt: 0.5 }}>
              Manage your company settings and information.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Company Name"
                fullWidth
                size="medium"
                value={companyName}
                error={!!errors.companyName}
                helperText={errors.companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <TextField
                label="GSTIN (Optional)"
                fullWidth
                size="medium"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
              />

              <TextField
                label="Company Size"
                fullWidth
                size="medium"
                select
                SelectProps={{ native: true }}
                value={companySize}
                error={!!errors.companySize}
                helperText={errors.companySize}
                onChange={(e) => setCompanySize(e.target.value)}
              >
                <option value=""></option>
                <option value="1–10 Employees">1–10 Employees</option>
                <option value="11–50 Employees">11–50 Employees</option>
                <option value="51–100 Employees">51–100 Employees</option>
                <option value="101–500 Employees">101–500 Employees</option>
                <option value="500–1000 Employees">500–1000 Employees</option>
                <option value="1000+ Employees">1000+ Employees</option>
              </TextField>
            </Box>

            {/* COMPANY LOGO */}
            <Box sx={{ mt: 4 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 1 }}>
                Company Logo
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  variant="rounded"
                  src={logoPreview}
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    background: "#f8fafc",
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                />

                <Button
                  variant="outlined"
                  component="label"
                  sx={{ textTransform: "none" }}
                >
                  Upload Logo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* SAVE BUTTON */}
          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            sx={{
              textTransform: "none",
              px: 3.5,
              py: 1.1,
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          {errors.form && (
            <Typography sx={{ mt: 2 }} color="error">
              {errors.form}
            </Typography>
          )}
        </>
      )}

      {/* SUCCESS SNACKBAR */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
