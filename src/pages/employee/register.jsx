import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

export default function EmployeeRegister() {
  const [fullName, setFullName] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState({});

  const validate = () => {
    const e = {};
    if (!fullName) e.fullName = true;
    if (!terms) e.terms = true;
    setError(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    window.location.href = "/employee/dashboard";
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#f8faff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "420px",
          background: "#fff",
          p: 5,
          borderRadius: "14px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: 700, mb: 3 }}>
          Complete Your Profile
        </Typography>

        <TextField
          label="Full Name"
          fullWidth
          sx={{ mb: 3 }}
          value={fullName}
          error={error.fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            setError((prev) => ({ ...prev, fullName: false }));
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={terms}
              onChange={(e) => {
                setTerms(e.target.checked);
                setError((prev) => ({ ...prev, terms: false }));
              }}
            />
          }
          label={
            <span style={{ color: error.terms ? "#dc2626" : "#334155" }}>
              I agree to the Terms & Conditions
            </span>
          }
          sx={{ width: "100%", mb: 2, justifyContent: "flex-start" }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            background: "#1e63d6",
            py: 1.3,
            borderRadius: "10px",
            textTransform: "none",
            fontSize: "16px",
          }}
          onClick={handleSubmit}
        >
          Save & Continue
        </Button>
      </Box>
    </Box>
  );
}
