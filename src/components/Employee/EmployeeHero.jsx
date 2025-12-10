import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import SuccessStories from "../Employee/EmployeeSuccessStories";
import { sendOtp, verifyOtpAPI } from "../../api/auth";
import EmployeeOtpModal from "./EmployeeOtpModal";

export default function EmployeeHero() {
  const [loginStep, setLoginStep] = useState("phone"); // "phone" or "otp"
  const [phone, setPhone] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState({
    seekers: 0,
    companies: 0,
    success: 0,
  });

  // Counter animation
  useEffect(() => {
    const targets = { seekers: 39000000, companies: 600000, success: 74 };
    let frame = 0;
    const totalFrames = 70;

    const animate = setInterval(() => {
      frame++;
      setCount({
        seekers: Math.floor((targets.seekers / totalFrames) * frame),
        companies: Math.floor((targets.companies / totalFrames) * frame),
        success: Math.floor((targets.success / totalFrames) * frame),
      });
      if (frame === totalFrames) clearInterval(animate);
    }, 15);

    return () => clearInterval(animate);
  }, []);

  // Handle phone number submission
  const handleGetStarted = async () => {
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    try {
      await sendOtp(phone, "employee");
      setLoginStep("otp");
      setTimer(30);
      setShowOtpModal(true);
    } catch (error) {
      alert(error.response?.data?.message || "Error sending OTP. Please try again.");
      console.error("OTP send error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification success
  const handleOtpVerified = (data) => {
    const token = data.token;
    const user = data.user;
    const isNew = !user.profileCompleted;

    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    localStorage.setItem("phone", user.phone);

    if (isNew) {
      window.location.href = "/employee/register";
    } else {
      window.location.href = "/employee/dashboard";
    }
  };

  // Handle OTP verification
  const verifyOtp = async (otpCode) => {
    try {
      const res = await verifyOtpAPI(phone, "employee", otpCode);
      handleOtpVerified(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Invalid or expired OTP");
      console.error("OTP verification error:", error);
      throw error;
    }
  };

  // Go back to phone input
  const handleEditPhone = () => {
    setLoginStep("phone");
    setShowOtpModal(false);
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await sendOtp(phone, "employee");
      setTimer(30);
      alert("OTP resent successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error resending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        pt: 16,
        pb: -8,
        px: { xs: 2, md: 4 },
        background: "linear-gradient(90deg,#e7efff 0%,#f5f8ff 50%,#ffffff 100%)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {/* ROW: LEFT + LOGIN BOX */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* LEFT SECTION */}
        <Box sx={{ width: { xs: "100%", md: "55%" } }}>
          <Typography sx={{ fontSize: "22px", fontWeight: 700, color: "#155bd5" }}>
            India's #1 Naukri Platform
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
            Your Naukri Search <br />
            <span style={{ color: "#1e63d6" }}>Ends Here!</span>
          </Typography>

          <Typography sx={{ mt: 2, fontSize: "18px", color: "#475569" }}>
            Find Jobs, Explore Opportunities & Build Your Career
          </Typography>

          {/* COUNTERS */}
          <Box sx={{ display: "flex", gap: 6, mt: 4 }}>
            <Box>
              <Typography sx={{ fontSize: "32px", fontWeight: 800 }}>
                {(count.seekers / 10000000).toFixed(0)}Cr+
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#475569" }}>
                Job Seekers
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: "32px", fontWeight: 800 }}>
                {(count.companies / 100000).toFixed(0)}L+
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#475569" }}>
                Companies
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: "32px", fontWeight: 800 }}>
                {count.success}%+
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#475569" }}>
                Success Rate
              </Typography>
            </Box>
          </Box>

          {/* SEARCH BAR */}
          <Box
            sx={{
              background: "#fff",
              mt: 5,
              p: 2,
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <TextField placeholder="Job title, keyword" sx={{ flex: 1 }} />
            <TextField placeholder="City or postcode" sx={{ flex: 1 }} />
            <Button
              variant="contained"
              sx={{
                background: "#1e63d6",
                borderRadius: "12px",
                px: 4,
                textTransform: "none",
                whiteSpace: "nowrap",
              }}
            >
              Find Jobs
            </Button>
          </Box>
        </Box>

        {/* LOGIN / OTP CARD */}
        <Box
          sx={{
            width: { xs: "100%", md: "480px" },
            height: { xs: "auto", md: "420px" },
            background: "#fff",
            p: 5,
            borderRadius: "20px",
            boxShadow: "0 12px 45px rgba(0,0,0,0.12)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
          }}
        >
          {/* PHONE INPUT STEP */}
          {loginStep === "phone" && (
            <>
              <Typography sx={{ fontWeight: 700, fontSize: "28px", mb: 3 }}>
                Enter Mobile Number
              </Typography>

              <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                <TextField value="+91" sx={{ width: "80px" }} disabled />
                <TextField
                  fullWidth
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  inputProps={{ maxLength: 10 }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleGetStarted();
                    }
                  }}
                />
              </Box>

              <Button
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  background: "#1e63d6",
                  borderRadius: "10px",
                  fontSize: "16px",
                  py: 1.4,
                  textTransform: "none",
                  "&:disabled": {
                    backgroundColor: "#cccccc",
                  },
                }}
                onClick={handleGetStarted}
              >
                {loading ? "Sending..." : "Get Started Now"}
              </Button>
            </>
          )}

          {/* OTP INPUT STEP - Shows EmployeeOtpModal inline */}
          {loginStep === "otp" && showOtpModal && (
            <EmployeeOtpModal
              phone={phone}
              onClose={handleEditPhone}
              onVerified={verifyOtp}
              onResend={handleResendOtp}
              timer={timer}
            />
          )}
        </Box>
      </Box>

      {/* FULL WIDTH SUCCESS STORIES */}
      <Box sx={{ width: "100%", mt: -2 }}>
        <SuccessStories />
      </Box>

      <style>{`
        @keyframes zoomInOut {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
      `}</style>
    </Box>
  );
}