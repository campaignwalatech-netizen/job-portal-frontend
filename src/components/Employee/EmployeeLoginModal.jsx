import React, { useState } from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";
import EmployeeOtpModal from "./EmployeeOtpModal";

export default function EmployeeLoginModal({ open = false, onClose = () => {} }) {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState("phone"); // phone -> otp
  const [showOtpInline, setShowOtpInline] = useState(false);

  const startOtp = () => {
    if (phone.trim().length !== 10) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }
    setStep("otp");
    setShowOtpInline(true);
  };

  // inline verify handled inside EmployeeOtpModal (calls onSuccess callback)
  const onVerified = () => {
    onClose();
    window.location.href = "/employee/dashboard";
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1400,
        }}
      >
        <Box
          sx={{
            width: { xs: "92%", sm: 480 },
            bgcolor: "#fff",
            borderRadius: 2,
            boxShadow: "0 20px 60px rgba(3,18,64,0.16)",
            p: 4,
            textAlign: "center",
            transformOrigin: "center",
          }}
        >
          {step === "phone" && (
            <>
              <Typography sx={{ fontSize: 22, fontWeight: 700, mb: 1 }}>Enter Mobile Number</Typography>
              <Typography sx={{ color: "#6b7280", mb: 2 }}>
                We'll send an OTP to verify your number
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                <TextField value="+91" sx={{ width: "80px" }} disabled />
                <TextField
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  sx={{ flex: 1 }}
                />
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={startOtp}
                sx={{ textTransform: "none", py: 1.2, borderRadius: 1.5 }}
              >
                Get OTP
              </Button>
            </>
          )}

          {step === "otp" && showOtpInline && (
            <EmployeeOtpModal phone={phone} onClose={() => { setStep("phone"); setShowOtpInline(false); }} onVerified={onVerified}/>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
