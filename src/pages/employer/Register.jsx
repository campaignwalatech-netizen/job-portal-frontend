import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { completeEmployerRegister } from "../../api/auth";
export default function EmployerRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isConsultancy, setIsConsultancy] = useState(false);
  const [terms, setTerms] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [companySize, setCompanySize] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validate = () => {
    const e = {};
    if (!fullName) e.fullName = true;
    if (!email || !emailRegex.test(email)) e.email = true;
    if (!companyName) e.companyName = true;
    if (!terms) e.terms = true;
    if (!companySize) e.companySize = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };
const handleRegister = async () => {
  if (!validate()) return;
  setLoading(true);
  setToast(null);
  const token = localStorage.getItem("token");
  const payload = {
    fullName,
    email,
    companyName,
    employeeNumber: companySize,
    isConsultancy
  };
  try {
    const res = await completeEmployerRegister(payload, token);
    setLoading(false);
    // Success: 201 Created
    setToast({ message: "Registration Successful!" });

    setTimeout(() => {
      window.location.href = "/employer/post-job";
    }, 800);
  } catch (error) {
    setLoading(false);
    console.error(error);
    const status = error?.response?.status;
    if (status === 400) {
      setToast({ message: "Company already exists" });
    } else if (status === 401) {
      setToast({ message: "Not authorized. Please log in again." });
    } else if (status === 409) {
      setToast({ message: "Employer already exists" });
    } else {
      setToast({ message: "Registration failed. Please try again." });
    }
  }
};
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8faff",
        p: 2,
        position: "relative",
      }}
    >
      {/* SUCCESS TOAST */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "30px",
            right: "30px",
            background: "#12B76A",
            padding: "14px 20px",
            borderRadius: "10px",
            color: "white",
            fontSize: "15px",
            fontWeight: 600,
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            animation: "slideIn 0.4s ease-out",
          }}
        >
          {toast.message}
        </div>
      )}
      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      {/* CARD */}
      <Box
        sx={{
          width: "420px",
          background: "#fff",
          p: 5,
          borderRadius: "14px",
          boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        {/* LOGO */}
        <img src="/logo.svg" alt="logo" style={{ width: 48, margin: "0 auto 10px" }} />

        <Typography sx={{ fontSize: "24px", fontWeight: 700, mb: 1 }}>
          Create Your Employer Account
        </Typography>

        <Typography sx={{ color: "#6b7280", fontSize: "14px", mb: 4 }}>
          Join Naukri Chahiye to streamline your hiring process.
        </Typography>
        {/* FULL NAME */}
        <TextField
          label="Full Name"
          fullWidth
          sx={{ mb: 2 }}
          value={fullName}
          error={errors.fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            setErrors((prev) => ({ ...prev, fullName: false }));
          }}
        />
        {/* EMAIL */}
        <TextField
          label="Email"
          fullWidth
          sx={{ mb: 2 }}
          value={email}
          error={errors.email}
          helperText={errors.email ? "Enter a valid email" : ""}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: false }));
          }}
        />
        {/* COMPANY NAME */}
        <TextField
          label="Company Name"
          fullWidth
          sx={{ mb: 2 }}
          value={companyName}
          error={errors.companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
            setErrors((prev) => ({ ...prev, companyName: false }));
          }}
        />
        {/* COMPANY SIZE DROPDOWN */}
<TextField
  select
  label="Company Size"
  fullWidth
  InputLabelProps={{ shrink: true }}
  SelectProps={{ native: true, displayEmpty: true }}
  sx={{ mb: 2 }}
  value={companySize}
  error={errors.companySize}
  onChange={(e) => {
    setCompanySize(e.target.value);
    setErrors((prev) => ({ ...prev, companySize: false }));
  }}
>
 <option value="" disabled>Select Company Size</option>
  <option value="1-50">1–50 employees</option>
  <option value="50-200">50–200 employees</option>
  <option value="200-1000">200–1000 employees</option>
  <option value="1000+">1000+ employees</option>
</TextField>
        {/* CONSULTANCY CHECK */}
        <FormControlLabel
          control={
            <Checkbox
              checked={isConsultancy}
              onChange={(e) => setIsConsultancy(e.target.checked)}
            />
          }
          label="This is a consultancy firm"
          sx={{ width: "100%", mt: 1, mb: 1, justifyContent: "flex-start" }}
        />
        {/* TERMS CHECK */}
        <FormControlLabel
          control={
            <Checkbox
              checked={terms}
              onChange={(e) => {
                setTerms(e.target.checked);
                setErrors((prev) => ({ ...prev, terms: false }));
              }}
            />
          }
          label={
            <span style={{ color: errors.terms ? "#dc2626" : "#0b2236" }}>
              I agree to the Terms and Conditions
            </span>
          }
          sx={{ width: "100%", mt: 0, mb: 2, justifyContent: "flex-start" }}
        />
        {/* REGISTER BUTTON */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleRegister}
          disabled={loading}
          sx={{
            background: "#1e63d6",
            borderRadius: "10px",
            py: 1.3,
            fontSize: "16px",
            textTransform: "none",
            mt: 2,
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Register"}
        </Button>
        {/* SIGN IN */}
        <Typography sx={{ mt: 3, fontSize: "14px" }}>
          Already have an account?{" "}
          <a href="/employer" style={{ color: "#1e63d6", fontWeight: 600 }}>
            Sign In
          </a>
        </Typography>
      </Box>
    </Box>
  );
}
