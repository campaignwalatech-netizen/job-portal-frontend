import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function EmployerHero() {
  const [step, setStep] = useState("phone"); // "phone" or "otp"
  const [phone, setPhone] = useState("");

  const handlePhoneSubmit = () => {
    if (phone.length === 10) {
      setStep("otp"); // switch box to OTP UI
    } else {
      alert("Enter a valid number");
    }
  };

  const handleOtpVerify = () => {
    window.location.href = "/employer/dashboard";
  };

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        py: 10,
        px: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      {/* LEFT TEXT */}
      <Box sx={{ width: "50%" }}>
        <Typography sx={{ color: "#0f766e", fontWeight: 700, fontSize: "34px" }}>
          INDIA’S #1 HIRING PLATFORM
        </Typography>

        <Typography sx={{ fontWeight: 700, mt: 2, fontSize: "55px", lineHeight: 1.1 }}>
          Find the right candidate. Fast.
        </Typography>

        <Typography sx={{ mt: 2, fontSize: "18px", color: "#475569" }}>
          Trusted by 5 Cr+ Candidates | 7 Lakh+ Employers
        </Typography>
      </Box>

      {/* RIGHT LOGIN/OTP BOX */}
      <Box
        sx={{
          background: "#fff",
          width: "380px",
          p: 4,
          borderRadius: "14px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        {step === "phone" && (
          <>
            <Typography sx={{ fontWeight: 700, fontSize: "24px", mb: 3 }}>
              Employer Login/Sign Up
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              <TextField value="+91" sx={{ width: "70px" }} disabled />
              <TextField
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{ textTransform: "none", py: 1.2, fontSize: "16px", borderRadius: "10px" }}
              onClick={handlePhoneSubmit}
            >
              Login
            </Button>
          </>
        )}

        {step === "otp" && (
          <>
            <Typography sx={{ fontWeight: 700, fontSize: "24px", mb: 1 }}>
              Enter OTP
            </Typography>

            <Typography sx={{ mb: 2, color: "#475569" }}>
              OTP sent to{" "}
              <span style={{ fontWeight: 600 }}>{phone}</span>
              <span
                style={{
                  color: "#2563eb",
                  cursor: "pointer",
                  marginLeft: "5px",
                  fontWeight: 600,
                }}
                onClick={() => setStep("phone")}
              >
                Edit
              </span>
            </Typography>

            {/* OTP Inputs */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
              {[1, 2, 3, 4].map((_, i) => (
                <TextField
                  key={i}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      fontSize: "22px",
                      width: "40px",
                      height: "40px",
                    },
                  }}
                />
              ))}
            </Box>

            <Typography sx={{ color: "#2563eb", mb: 2, fontSize: "14px" }}>
              Resend OTP in 28 seconds
            </Typography>

            <Button
              variant="contained"
              fullWidth
              sx={{ textTransform: "none", py: 1.2, fontSize: "16px", borderRadius: "10px" }}
              onClick={handleOtpVerify}
            >
              Verify & Continue
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
