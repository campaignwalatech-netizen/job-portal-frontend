import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";


export default function EmployerHero() {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const STATIC_OTP = "1234";

  const [count, setCount] = useState({
    candidates: 0,
    employers: 0,
    speed: 0,
  });

  useEffect(() => {
    const targets = { candidates: 50000000, employers: 700000, speed: 72 };
    let frame = 0;
    const totalFrames = 70;

    const animate = setInterval(() => {
      frame++;
      setCount({
        candidates: Math.floor((targets.candidates / totalFrames) * frame),
        employers: Math.floor((targets.employers / totalFrames) * frame),
        speed: Math.floor((targets.speed / totalFrames) * frame),
      });
      if (frame === totalFrames) clearInterval(animate);
    }, 15);

    return () => clearInterval(animate);
  }, []);


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
      const el = document.getElementById(`otp-${index + 1}`);
      if (el) el.focus();
    }
  };

  const verifyOtp = () => {
    if (otp.join("") === STATIC_OTP) {
      window.location.href = "/employer/post-job";
    } else {
      alert("Incorrect OTP");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        pt: 16,
        pb: 8,
        px: { xs: 2, md: 4 },
        background: "linear-gradient(90deg,#e7efff 0%,#f5f8ff 50%,#ffffff 100%)",
        display: "flex",
        justifyContent: { xs: "flex-start", md: "center" },
        alignItems: "flex-start",
        flexDirection: { xs: "column", md: "row" },
        gap: 6,
      }}
    >
      {/* LEFT SECTION */}
      <Box className="slide-left" sx={{ width: { xs: "100%", md: "55%" } }}>
        <Typography sx={{ fontSize: "22px", fontWeight: 700, color: "#155bd5" }}>
          India’s #1 Hiring Platform
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "40px", md: "65px" },
            fontWeight: 800,
            lineHeight: 1.1,
            mt: 2,
            animation: "zoomInOut 5s infinite ease-in-out",
          }}
        >
          Your Candidate Search <br />
          <span style={{ color: "#1e63d6" }}>Ends Here!</span>
        </Typography>

        <Typography sx={{ mt: 2, fontSize: "18px", color: "#475569" }}>
          Hire Smarter, Faster & Better Talent
        </Typography>

        {/* COUNTERS */}
        <Box sx={{ display: "flex", gap: 6, mt: 4 }}>
          <Box>
            <Typography sx={{ fontSize: "32px", fontWeight: 800 }}>
              {(count.candidates / 10000000).toFixed(0)}Cr+
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#475569" }}>
              Verified Candidates
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ fontSize: "32px", fontWeight: 800 }}>
              {(count.employers / 100000).toFixed(0)}L+
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#475569" }}>
              Employers
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ fontSize: "32px", fontWeight: 800 }}>
              {count.speed}%+
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#475569" }}>
              Faster Hiring
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* RIGHT BOX (LOGIN CARD) */}
      <Box
        className="slide-right"
        sx={{
          width: { xs: "100%", md: "480px" },
          background: "#fff",
          p: 5,
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.10)",
          textAlign: "center",
        }}
      >
        {step === "phone" && (
          <>
            <Typography sx={{ fontWeight: 700, fontSize: "22px", mb: 3 }}>
              Enter Mobile Number
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
                background: "#1e63d6",
                borderRadius: "10px",
                fontSize: "16px",
                py: 1.4,
                textTransform: "none",
              }}
            >
              Login
            </Button>
          </>
        )}

        {step === "otp" && (
          <>
            <Typography sx={{ fontWeight: 700, fontSize: "22px", mb: 1 }}>
              Enter OTP
            </Typography>

            <Typography sx={{ mb: 2, color: "#475569" }}>
              OTP sent to <b>{phone}</b>{" "}
              <span
                style={{ color: "#1e63d6", cursor: "pointer", fontWeight: 600, marginLeft: 6 }}
                onClick={() => setStep("phone")}
              >
                Edit
              </span>
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
              {otp.map((digit, i) => (
                <TextField
                  key={i}
                  id={`otp-${i}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: "center", fontSize: "22px" },
                  }}
                  sx={{ width: "45px" }}
                />
              ))}
            </Box>

            <Typography sx={{ mb: 2 }}>
              {timer === 0 ? (
                <span onClick={() => setTimer(30)} style={{ color: "#1e63d6", cursor: "pointer" }}>
                  Resend OTP
                </span>
              ) : (
                <span style={{ color: "#1e63d6" }}>Resend OTP in {timer}s</span>
              )}
            </Typography>

            <Button
              variant="contained"
              fullWidth
              onClick={verifyOtp}
              sx={{
                background: "#1e63d6",
                borderRadius: "10px",
                py: 1.4,
                fontSize: "16px",
                textTransform: "none",
              }}
            >
              Verify & Continue
            </Button>
          </>
        )}
      </Box>

      <style>{`
        @keyframes zoomInOut {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }

        .slide-left {
          opacity: 0;
          transform: translateX(-60px);
          animation: slideInLeft 0.8s forwards ease-out;
        }

        @keyframes slideInLeft {
          to { opacity: 1; transform: translateX(0); }
        }

        .slide-right {
          opacity: 0;
          transform: translateX(60px);
          animation: slideInRight 0.8s forwards ease-out;
        }

        @keyframes slideInRight {
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </Box>
  );
}
