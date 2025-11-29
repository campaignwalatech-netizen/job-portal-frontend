
import { useState } from "react";
import { Box, IconButton, TextField, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmployeeOtpModal from "./EmployeeOtpModal";
import { useNavigate } from "react-router-dom";


export default function EmployeeLoginModal({ open = true, onClose = () => {} }) {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState("phone"); // 'phone' | 'otp'
  const navigate = useNavigate();

  if (!open) return null;

  const handleContinue = () => {
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length !== 10) {
      alert("Enter a valid 10-digit phone number");
      return;
    }
    setStep("otp");
  };

  const handleVerified = () => {
    // on success, navigate to dashboard
    navigate("/employee/dashboard");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        // backdrop (doesn't close on click)
        background: "rgba(0,0,0,0.15)",
        backdropFilter: "blur(4px)",
        px: 2,
      }}
    >
      {/* centered card */}
      <Box
        sx={{
          width: { xs: "100%", sm: 520 },
          maxWidth: "100%",
          bgcolor: "#fff",
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
          position: "relative",
        }}
        // stopPropagation so clicks on card don't bubble to overlay (we don't use overlay click anyway)
        onClick={(e) => e.stopPropagation()}
      >
        {/* X button */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8, color: "#475569" }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        {/* content area (phone OR otp) */}
        <Box sx={{ mt: 1 }}>
          {step === "phone" && (
            <>
              <Typography sx={{ fontSize: 22, fontWeight: 700, mb: 2 }}>
                Employee Login / Sign up
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                <TextField value="+91" disabled sx={{ width: 84 }} />
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
                onClick={handleContinue}
                sx={{
                  textTransform: "none",
                  background: "#3B82F6",
                  "&:hover": { background: "#5A99FF" },
                  py: 1.1,
                  fontSize: 16,
                  borderRadius: 2,
                }}
              >
                Continue
              </Button>
            </>
          )}

          {step === "otp" && (
            <EmployeeOtpModal
              phone={phone}
              onBack={() => setStep("phone")}
              onVerified={handleVerified}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
