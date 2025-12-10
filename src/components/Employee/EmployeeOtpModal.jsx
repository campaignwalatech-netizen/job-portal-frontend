import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function EmployeeOtpModal({ 
  phone = "", 
  onClose = () => {}, 
  onVerified = () => {},
  onResend = () => {},
  timer = 30 
}) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [localTimer, setLocalTimer] = useState(timer);

  // Sync with parent timer
  useEffect(() => {
    setLocalTimer(timer);
  }, [timer]);

  // Timer countdown
  useEffect(() => {
    if (localTimer <= 0) return;
    
    const interval = setInterval(() => {
      setLocalTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [localTimer]);

  const handleOtpChange = (value, index) => {
    if (value.length > 1) return;
    
    // Allow only numbers
    const numericValue = value.replace(/\D/g, "");
    
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    // Auto-focus next input
    if (numericValue && index < 3) {
      const nextInput = document.getElementById(`hero-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    if (pastedData.length === 4 && /^\d+$/.test(pastedData)) {
      const pastedOtp = pastedData.split('');
      setOtp(pastedOtp);
      
      // Focus on the last input
      document.getElementById(`hero-otp-3`)?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    
    if (otpCode.length !== 4) {
      alert("Please enter a valid 4-digit OTP");
      return;
    }

    setLoading(true);
    try {
      await onVerified(otpCode);
    } catch (error) {
      // Error is handled in parent component
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (localTimer > 0) return;
    
    setLoading(true);
    try {
      await onResend();
      setLocalTimer(30);
    } catch (error) {
      // Error is handled in parent component
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ fontWeight: 700, fontSize: "22px", mb: 1 }}>
        Enter OTP
      </Typography>

      <Typography sx={{ mb: 2, color: "#475569" }}>
        OTP sent to <b>+91 {phone}</b>{" "}
        <span
          style={{ color: "#1e63d6", cursor: "pointer", fontWeight: 600 }}
          onClick={onClose}
        >
          Edit
        </span>
      </Typography>

      {/* OTP Input Boxes */}
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: 2, 
          mb: 2,
          "& .MuiTextField-root": {
            width: "60px",
            "& input": {
              textAlign: "center",
              fontSize: "22px",
              fontWeight: 600,
              height: "60px",
            }
          }
        }}
      >
        {otp.map((digit, index) => (
          <TextField
            key={index}
            id={`hero-otp-${index}`}
            value={digit}
            onChange={(e) => handleOtpChange(e.target.value, index)}
            onPaste={handlePaste}
            inputProps={{
              maxLength: 1,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            variant="outlined"
          />
        ))}
      </Box>

      {/* Timer and Resend */}
      <Typography sx={{ mb: 2, color: "#475569" }}>
        {localTimer === 0 ? (
          <span 
            onClick={handleResendOtp}
            style={{ 
              color: "#1e63d6", 
              cursor: "pointer",
              fontWeight: 600,
              textDecoration: "underline"
            }}
          >
            {loading ? "Sending..." : "Resend OTP"}
          </span>
        ) : (
          <span style={{ color: "#1e63d6" }}>
            Resend OTP in {localTimer}s
          </span>
        )}
      </Typography>

      {/* Verify Button */}
      <Button
        fullWidth
        variant="contained"
        disabled={loading || otp.join("").length !== 4}
        onClick={handleVerify}
        sx={{
          background: "#1e63d6",
          borderRadius: "10px",
          py: 1.4,
          fontSize: "16px",
          textTransform: "none",
          "&:disabled": {
            backgroundColor: "#cccccc",
          },
          "&:hover": {
            backgroundColor: "#1554b8",
          }
        }}
      >
        {loading ? "Verifying..." : "Verify & Continue"}
      </Button>
    </Box>
  );
}