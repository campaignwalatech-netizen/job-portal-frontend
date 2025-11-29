import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function EmployerHero() {
  const [step, setStep] = useState("phone");  
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const STATIC_OTP = "1234";

  // TIMER
  useEffect(() => {
    if (step !== "otp") return;
    if (timer === 0) return;

    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

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
      window.location.href = "/employer/dashboard";
    } else {
      alert("Incorrect OTP");
    }
  };

  return (
    <>
      {/* MAIN CONTAINER */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          py: 8,
          px: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: { xs: 4, md: 0 },
        }}
      >
        {/* LEFT TEXT */}
        <Box
          sx={{
            width: { xs: "100%", md: "55%" },
            pr: { md: 4 },
            animation: "smoothSlideFromRight 0.7s ease-out",
            animationFillMode: "forwards",
          }}
        >
          <Typography
            sx={{
              color: "#1F8268",
              fontWeight: 700,
              fontSize: { xs: "26px", md: "36px" },
            }}
          >
            INDIA’S #1 HIRING PLATFORM
          </Typography>

          <Typography
            sx={{
              color: "#363636",
              fontWeight: 800,
              mt: 2,
              fontSize: { xs: "38px", md: "60px" },
              lineHeight: 1.1,
            }}
          >
            Find the right candidate. Fast.
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontSize: "18px",
              color: "#5B5E76",
              fontWeight: 500,
            }}
          >
            Trusted by 5 Cr+ Candidates | 7 Lakh+ Employers
          </Typography>
        </Box>

        {/* RIGHT BOX */}
        <Box
          sx={{
            background: "#fff",
            width: { xs: "100%", sm: "448px" },
            p: "48px 20px",
            borderRadius: "14px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            textAlign: "center",
            animation: "smoothSlideFromLeft 0.7s ease-out",
            animationFillMode: "forwards",
          }}
        >
          {/* PHONE STEP */}
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
                onClick={() => {
                  if (phone.length === 10) {
                    setStep("otp");
                    setTimer(30);
                  } else {
                    alert("Enter valid number");
                  }
                }}
                sx={{
                  backgroundColor: "#3B82F6",
                  "&:hover": { backgroundColor: "#5A99FF" },
                  textTransform: "none",
                  py: 1.2,
                  fontSize: "16px",
                  borderRadius: "10px",
                }}
              >
                Login
              </Button>
            </>
          )}

          {/* OTP STEP */}
          {step === "otp" && (
            <>
              <Typography sx={{ fontWeight: 700, fontSize: "24px", mb: 1 }}>
                Enter OTP
              </Typography>

              <Typography sx={{ mb: 2, color: "#475569" }}>
                OTP sent to <b>{phone}</b>
                <span
                  onClick={() => setStep("phone")}
                  style={{
                    color: "#2563eb",
                    cursor: "pointer",
                    marginLeft: "5px",
                    fontWeight: 600,
                  }}
                >
                  Edit
                </span>
              </Typography>

              <Box
                sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}
              >
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

              <Typography sx={{ color: "#2563eb", mb: 2, fontSize: "14px" }}>
                {timer === 0 ? (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => setTimer(30)}
                  >
                    Resend OTP
                  </span>
                ) : (
                  <>Resend OTP in {timer}s</>
                )}
              </Typography>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  textTransform: "none",
                  py: 1.2,
                  fontSize: "16px",
                  borderRadius: "10px",
                }}
                onClick={verifyOtp}
              >
                Verify & Continue
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* KEYFRAME ANIMATIONS */}
<style>
{`
@keyframes smoothSlideFromRight {
  0% {
    opacity: 0;
    transform: translateX(60px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes smoothSlideFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-60px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
`}
</style>

    </>
  );
}
