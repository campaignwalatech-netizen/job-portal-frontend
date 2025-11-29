// EmployeeOtpModal.jsx
import { useEffect, useRef, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function EmployeeOtpModal({ phone, onBack, onVerified }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [seconds, setSeconds] = useState(30);
  const inputsRef = useRef([]);

  const STATIC_OTP = "1234";

  useEffect(() => {
    // start countdown when component mounts
    setSeconds(30);
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // autofocus first empty input when OTP view loads
    const firstEmpty = otp.findIndex((d) => d === "");
    const idx = firstEmpty === -1 ? 3 : firstEmpty;
    inputsRef.current[idx]?.focus();
  }, []); // run once on mount

  const handleChange = (val, idx) => {
    if (val.length > 1) val = val.slice(-1);
    const next = [...otp];
    next[idx] = val.replace(/\D/g, ""); // keep digits only
    setOtp(next);

    if (val && idx < 3) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const verify = () => {
    if (otp.join("") === STATIC_OTP) {
      onVerified();
    } else {
      alert("Incorrect OTP");
    }
  };

  return (
    <Box>
      <Typography sx={{ fontSize: 24, fontWeight: 700, mb: 1 }}>
        Enter OTP
      </Typography>

      <Typography sx={{ mb: 2, color: "#475569" }}>
        OTP sent to <b>{phone}</b>{" "}
        <span
          onClick={onBack}
          style={{ color: "#2563eb", cursor: "pointer", marginLeft: 6, fontWeight: 600 }}
        >
          Edit
        </span>
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
        {otp.map((d, i) => (
          <TextField
            key={i}
            inputRef={(el) => (inputsRef.current[i] = el)}
            value={d}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            inputProps={{
              maxLength: 1,
              style: { textAlign: "center", fontSize: 20, width: 44, height: 44 },
            }}
          />
        ))}
      </Box>

      <Typography sx={{ color: "#2563eb", fontSize: 14, mb: 2 }}>
        {seconds === 0 ? (
          <span style={{ cursor: "pointer" }} onClick={() => setSeconds(30)}>
            Resend OTP
          </span>
        ) : (
          <>Resend OTP in {seconds}s</>
        )}
      </Typography>

      <Button
        variant="contained"
        fullWidth
        onClick={verify}
        sx={{ textTransform: "none", py: 1.2, fontSize: 16, borderRadius: 10 }}
      >
        Verify & Continue
      </Button>
    </Box>
  );
}
