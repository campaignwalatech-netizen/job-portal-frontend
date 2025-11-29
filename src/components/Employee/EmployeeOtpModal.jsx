import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

/**
 * Inline OTP panel used inside EmployeeLoginModal.
 * Props:
 * - phone (string)
 * - onClose() -> go back to phone view
 * - onVerified() -> success callback
 */

export default function EmployeeOtpModal({ phone = "", onClose = () => {}, onVerified = () => {} }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const STATIC_OTP = "1234";

  useEffect(() => {
    setTimer(30);
    const t = setInterval(() => setTimer((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const handleChange = (v, i) => {
    if (v.length > 1) return;
    const copy = [...otp];
    copy[i] = v.replace(/\D/g, "");
    setOtp(copy);
    if (v && i < 3) {
      const next = document.getElementById(`emp-otp-${i + 1}`);
      if (next) next.focus();
    }
  };

  const verify = () => {
    if (otp.join("") === STATIC_OTP) {
      onVerified();
    } else {
      alert("Incorrect OTP. Try 1234 for now.");
    }
  };

  return (
    <Box>
      <Typography sx={{ fontSize: 22, fontWeight: 700, mb: 1 }}>Enter OTP</Typography>
      <Typography sx={{ color: "#6b7280", mb: 2 }}>
        OTP sent to <strong>{phone || "your number"}</strong>
        <span style={{ marginLeft: 12, color: "#2563eb", cursor: "pointer" }} onClick={onClose}>Edit</span>
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, mb: 2 }}>
        {otp.map((d, i) => (
          <TextField
            key={i}
            id={`emp-otp-${i}`}
            value={d}
            onChange={(e) => handleChange(e.target.value.slice(-1), i)}
            inputProps={{ maxLength: 1, style: { textAlign: "center", width: 48, height: 48, fontSize: 18 } }}
          />
        ))}
      </Box>

      <Typography sx={{ color: "#2563eb", mb: 2, fontSize: 14 }}>
        {timer === 0 ? (
          <span style={{ cursor: "pointer" }} onClick={() => setTimer(30)}>Resend OTP</span>
        ) : (
          <>Resend OTP in {timer}s</>
        )}
      </Typography>

      <Button variant="contained" fullWidth onClick={verify} sx={{ py: 1.2, borderRadius: 1.2 }}>
        Verify & Continue
      </Button>
    </Box>
  );
}
