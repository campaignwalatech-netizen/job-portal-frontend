import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployerRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    isConsultancy: false,
    agree: false,
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = () => {
    if (!form.fullName || !form.email || !form.company || !form.agree) {
      alert("Please fill all required fields.");
      return;
    }

    navigate("/employer");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 8,
      }}
    >
      {/* Logo + Name */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <img src="/logo.svg" width={60} alt="logo" />
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mt: 1, color: "#2563eb" }}
        >
          Naukri Chaahiye
        </Typography>
      </Box>

      {/* Form Card */}
      <Paper
        elevation={1}
        sx={{
          width: "420px",
          maxWidth: "95%",
          p: 4,
          borderRadius: "14px",
        }}
      >
        <Typography
          sx={{ fontSize: "22px", fontWeight: 700, textAlign: "center", mb: 1 }}
        >
          Create Your Employer Account
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
            mb: 3,
          }}
        >
          Join Naukri Chaahiye to streamline your hiring process.
        </Typography>

        {/* Full Name */}
        <TextField
          fullWidth
          label="Full Name"
          value={form.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Email */}
        <TextField
          fullWidth
          label="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Company Name */}
        <TextField
          fullWidth
          label="Company Name"
          value={form.company}
          onChange={(e) => handleChange("company", e.target.value)}
          sx={{ mb: 1 }}
        />

        {/* Checkboxes */}
        <FormControlLabel
          control={
            <Checkbox
              checked={form.isConsultancy}
              onChange={(e) =>
                handleChange("isConsultancy", e.target.checked)
              }
            />
          }
          label="This is a consultancy firm"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={form.agree}
              onChange={(e) => handleChange("agree", e.target.checked)}
            />
          }
          label="I agree to the Terms and Conditions"
        />

        {/* Register Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            py: 1.4,
            fontSize: "15px",
            textTransform: "none",
            borderRadius: "10px",
          }}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Typography
          sx={{
            textAlign: "center",
            mt: 2,
            fontSize: "14px",
            color: "#475569",
          }}
        >
          Already have an account?{" "}
          <span
            style={{ color: "#2563eb", cursor: "pointer" }}
            onClick={() => navigate("/employer-login")}
          >
            Sign In
          </span>
        </Typography>
      </Paper>

      <Typography sx={{ mt: 5, fontSize: "12px", color: "#94a3b8" }}>
        Made with 💙 by Afreeda Asad
      </Typography>
    </Box>
  );
}
