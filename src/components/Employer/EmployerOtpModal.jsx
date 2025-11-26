import { Box, Typography, TextField, Button } from "@mui/material";

export default function EmployerOtpModal({ phone, onClose, onSubmit }) {
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
      {/* OTP BOX */}
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
          OTP sent to <span style={{ fontWeight: 600 }}>{phone}</span>.{" "}
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

        {/* Countdown */}
        <Typography sx={{ color: "#2563eb", fontSize: "15px", mb: 2 }}>
          Resend OTP in 28 seconds
        </Typography>

        {/* Login Button */}
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
          onClick={onSubmit}
        >
          Verify & Continue
        </Button>
      </Box>
    </Box>
  );
}
