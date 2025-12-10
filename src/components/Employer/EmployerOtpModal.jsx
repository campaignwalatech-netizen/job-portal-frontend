import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function EmployerOtpModal({ phone, onClose, onSubmit }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);

  const STATIC_OTP = "1234";


  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value, index) => {
    if (value.length > 1) return;

    const copy = [...otp];
    copy[index] = value;
    setOtp(copy);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };


  const verifyOtp = () => {
    if (otp.join("") === STATIC_OTP) {
      onSubmit();
    } else {
      alert("Incorrect OTP");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(0,0,0,0.15)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          width: "420px",
          bgcolor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: "26px", fontWeight: 700, mb: 1 }}>
          Enter OTP
        </Typography>

        <Typography sx={{ mb: 2, color: "#475569" }}>
          OTP sent to <b>{phone}</b>
          <span
            onClick={onClose}
            style={{
              color: "#2563eb",
              cursor: "pointer",
              marginLeft: "6px",
              fontWeight: 600,
            }}
          >
            Edit
          </span>
        </Typography>

        {/* OTP INPUTS */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          {otp.map((digit, i) => (
            <TextField
              key={i}
              id={`otp-${i}`}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, i)}
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

        {/* TIMER */}
        <Typography sx={{ color: "#2563eb", fontSize: "15px", mb: 2 }}>
          {timer === 0 ? (
            <span onClick={() => setTimer(30)} style={{ cursor: "pointer" }}>
              Resend OTP
            </span>
          ) : (
            <>Resend OTP in {timer} seconds</>
          )}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{
            textTransform: "none",
            py: 1.2,
            fontSize: "16px",
            fontWeight: 600,
            borderRadius: "10px",
          }}
          onClick={verifyOtp}
        >
          Verify & Continue
        </Button>
      </Box>
    </Box>
  );
  
}
