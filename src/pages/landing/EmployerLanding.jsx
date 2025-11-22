import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
  Paper,
  Avatar,
  Grid,
  IconButton,
  Fade,
  Slide,
  keyframes,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import {
  CheckCircle,
  Security,
  Send,
  ArrowBack,
  Refresh,
  VerifiedUser,
  AutoAwesome,
  Groups,
  Speed,
  SupportAgent,
  Analytics,
  PriceCheck,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

// Enhanced Animations
const float = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg) scale(1); 
  }
  33% { 
    transform: translateY(-10px) rotate(1deg) scale(1.02); 
  }
  66% { 
    transform: translateY(-5px) rotate(-1deg) scale(1.01); 
  }
`;

const gentlePulse = keyframes`
  0%, 100% { 
    transform: scale(1); 
    opacity: 1;
  }
  50% { 
    transform: scale(1.03); 
    opacity: 0.9;
  }
`;

const slideInFromLeft = keyframes`
  from { 
    transform: translateX(-50px); 
    opacity: 0; 
  }
  to { 
    transform: translateX(0); 
    opacity: 1; 
  }
`;

const slideInFromRight = keyframes`
  from { 
    transform: translateX(50px); 
    opacity: 0; 
  }
  to { 
    transform: translateX(0); 
    opacity: 1; 
  }
`;

const slideInFromBottom = keyframes`
  from { 
    transform: translateY(30px); 
    opacity: 0; 
  }
  to { 
    transform: translateY(0); 
    opacity: 1; 
  }
`;

const bounceGentle = keyframes`
  0%, 20%, 50%, 80%, 100% { 
    transform: translateY(0); 
  }
  40% { 
    transform: translateY(-8px); 
  }
  60% { 
    transform: translateY(-4px); 
  }
`;

const countdownAnimation = keyframes`
  0% { 
    transform: scale(1);
    opacity: 1;
  }
  50% { 
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% { 
    transform: scale(1);
    opacity: 1;
  }
`;

// Company section animations
const slideRightToLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const slideLeftToRight = keyframes`
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
`;

// Statistics section animation
const slideStatsRightToLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.33%);
  }
`;

// Custom OTP Input Component
const CustomOtpInput = ({ value, onChange, inputRefs }) => {
  const handleInputChange = (val, index) => {
    if (/^\d?$/.test(val)) {
      onChange(val, index);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", mb: 3 }}>
      {[...Array(4)].map((_, index) => (
        <Box
          key={index}
          sx={{
            width: 48,
            height: 56,
            border: 2,
            borderColor: value[index] ? "primary.main" : "grey.300",
            borderRadius: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.paper",
            transition: "all 0.2s ease",
            "&:focus-within": {
              borderColor: "primary.main",
              boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
              transform: "scale(1.05)",
            },
          }}
        >
          <input
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={value[index]}
            onChange={(e) => handleInputChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              background: "transparent",
              textAlign: "center",
              fontSize: "18px",
              fontWeight: 600,
              outline: "none",
              color: "#333",
            }}
            maxLength={1}
          />
        </Box>
      ))}
    </Box>
  );
};

const EmployerLanding = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { openAuthModal } = useAuth();

  // Authentication states
  const [authStep, setAuthStep] = useState("mobile"); // 'mobile', 'otp', 'loading'
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // OTP input refs
  const otpRefs = useRef([]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handle mobile number submission
  const handleMobileSubmit = async () => {
    if (!mobileNumber.match(/^[6-9]\d{9}$/)) {
      showSnackbar("Please enter a valid 10-digit mobile number", "error");
      return;
    }

    setLoading(true);
    try {
      // API call to register/send OTP - Changed role to "employer"
      const response = await fetch(
        "http://72.60.223.124:4000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: mobileNumber,
            role: "employer", // Changed from "employee" to "employer"
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAuthStep("otp");
        setCountdown(30); // 30 seconds countdown
        showSnackbar("OTP sent successfully to your mobile", "success");
      } else {
        showSnackbar(data.message || "Failed to send OTP", "error");
      }
    } catch (error) {
      showSnackbar("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      showSnackbar("Please enter complete 6-digit OTP", "error");
      return;
    }

    setLoading(true);
    try {
      // API call to verify OTP - Changed role to "employer"
      const response = await fetch(
        "http://72.60.223.124:4000/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: mobileNumber,
            role: "employer", // Changed from "employee" to "employer"
            otp: otpString,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showSnackbar("Login successful! Redirecting...", "success");

        // Store token and user data
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));

        // Redirect to employer dashboard/onboarding after a brief delay
        setTimeout(() => {
          window.location.href = "/employer-dashboard"; // Changed to employer dashboard
        }, 1500);
      } else {
        showSnackbar(data.message || "Invalid OTP", "error");
      }
    } catch (error) {
      showSnackbar("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are entered
    if (newOtp.every((digit) => digit !== "") && index === 5) {
      handleOtpSubmit();
    }
  };

  // Handle OTP key down for backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return;

    setLoading(true);
    try {
      const response = await fetch(
        "http://72.60.223.124:4000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: mobileNumber,
            role: "employer", // Changed from "employee" to "employer"
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCountdown(30);
        showSnackbar("OTP resent successfully", "success");
      } else {
        showSnackbar(data.message || "Failed to resend OTP", "error");
      }
    } catch (error) {
      showSnackbar("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Show snackbar notification
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Reset auth flow
  const handleBackToMobile = () => {
    setAuthStep("mobile");
    setOtp(["", "", "", "", "", ""]);
  };

  // Sample companies data
  const topCompanies = [
    { name: "Google", logo: "G", hires: "2.5K+ hires" },
    { name: "Microsoft", logo: "M", hires: "1.8K+ hires" },
    { name: "Amazon", logo: "A", hires: "3.2K+ hires" },
    { name: "Infosys", logo: "I", hires: "5.7K+ hires" },
    { name: "TCS", logo: "T", hires: "4.9K+ hires" },
    { name: "Wipro", logo: "W", hires: "3.8K+ hires" },
  ];

  // Statistics data for employers
  const statisticsData = [
    // Row 1
    [
      { number: "5 Cr+", label: "Active Candidates" },
      { number: "95%", label: "Success Rate" },
      { number: "70%", label: "Faster Hiring" },
      { number: "2.3 Cr", label: "Tier 1 City Talent" },
      { number: "40%", label: "Cost Effective" },
      { number: "3 Cr", label: "0-4 Years Experience" },
    ],
    // Row 2
    [
      { number: "57 Lakh+", label: "Tech Talent" },
      { number: "68 Lakh", label: "BFSI Experts" },
      { number: "2.9 Cr", label: "Verified Profiles" },
      { number: "85%", label: "Response Rate" },
      { number: "45 Lakh", label: "Women Professionals" },
      { number: "1.2 Cr", label: "Engineering Grads" },
    ],
    // Row 3
    [
      { number: "7/10", label: "Hiring Success" },
      { number: "50%", label: "Time Saved" },
      { number: "4.8/5", label: "Employer Rating" },
      { number: "24 Hrs", label: "Avg First Response" },
      { number: "10K+", label: "Active Companies" },
      { number: "3x", label: "More Interviews" },
    ],
    // Row 4
    [
      { number: "40 Lakh", label: "Post Graduates" },
      { number: "2.1 Cr", label: "Experienced Pros" },
      { number: "35%", label: "Better Retention" },
      { number: "15 Min", label: "Job Post Setup" },
      { number: "5 Star", label: "Platform Rating" },
      { number: "99.9%", label: "Uptime" },
    ],
  ];

  // Animated Counter Component
  const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!isVisible) return;

      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [end, duration, isVisible]);

    return (
      <Box ref={ref}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#fbbf24",
            animation: isVisible ? `${gentlePulse} 2s ease-in-out` : "none",
          }}
        >
          {count}
          {suffix}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section - Single Frame */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "15%",
            left: "8%",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
            animation: `${float} 8s ease-in-out infinite`,
            filter: "blur(20px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "65%",
            right: "12%",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
            animation: `${float} 10s ease-in-out infinite 2s`,
            filter: "blur(25px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "20%",
            left: "15%",
            width: 100,
            height: 100,
            borderRadius: "30%",
            background:
              "linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)",
            animation: `${float} 7s ease-in-out infinite 1s`,
            filter: "blur(15px)",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 4,
              height: "100%",
            }}
          >
            {/* Left Content */}
            <Box sx={{ flex: 1, maxWidth: { md: "500px" } }}>
              {/* Badge */}
              <Slide direction="left" in timeout={800}>
                <Paper
                  sx={{
                    display: "inline-block",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 20,
                    px: 2,
                    py: 0.5,
                    mb: 2,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    animation: `${gentlePulse} 2s ease-in-out infinite`,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: "#fbbf24",
                      textAlign: "center",
                      fontSize: "0.8rem",
                    }}
                  >
                    FOR EMPLOYERS
                  </Typography>
                </Paper>
              </Slide>

              {/* Main Heading */}
              <Slide direction="left" in timeout={1000}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3rem", lg: "3.5rem" },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    mb: 2,
                  }}
                >
                  Hire the Best
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      background: "linear-gradient(45deg, #fbbf24, #f59e0b)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      animation: `${gentlePulse} 2s ease-in-out infinite`,
                    }}
                  >
                    Talent. Fast.
                  </Box>
                </Typography>
              </Slide>

              {/* Subheading */}
              <Slide direction="left" in timeout={1200}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    opacity: 0.9,
                    fontSize: { xs: "1rem", md: "1.2rem" },
                    lineHeight: 1.5,
                    fontWeight: 400,
                    color: "#e2e8f0",
                  }}
                >
                  Access 5Cr+ Verified Candidates | 95% Success Rate | 70%
                  Faster Hiring
                </Typography>
              </Slide>

              {/* Animated Stats */}
              <Slide direction="up" in timeout={1400}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 6,
                    mb: 6,
                    flexWrap: "wrap",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <AnimatedCounter end={5} suffix="Cr+" />
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.9, fontWeight: 600 }}
                    >
                      Candidates
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <AnimatedCounter end={95} suffix="%+" />
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.9, fontWeight: 600 }}
                    >
                      Success Rate
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <AnimatedCounter end={70} suffix="%" />
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.9, fontWeight: 600 }}
                    >
                      Faster Hiring
                    </Typography>
                  </Box>
                </Box>
              </Slide>

              {/* Trusted Companies Section */}
              <Slide direction="up" in timeout={1600}>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      color: "white",
                      fontSize: "1.1rem",
                    }}
                  >
                    Trusted by Top Companies
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      opacity: 0.9,
                      fontSize: "0.9rem",
                    }}
                  >
                    Join thousands of companies hiring with us.
                  </Typography>

                  <Grid container spacing={2}>
                    {topCompanies.map((company, index) => (
                      <Grid item xs={4} sm={2} key={company.name}>
                        <Box sx={{ textAlign: "center" }}>
                          <Avatar
                            sx={{
                              width: 60,
                              height: 60,
                              bgcolor: "rgba(255, 255, 255, 0.2)",
                              color: "white",
                              fontWeight: 700,
                              fontSize: "1.2rem",
                              margin: "0 auto 8px",
                              border: "2px solid rgba(255, 255, 255, 0.3)",
                              animation: `${gentlePulse} 3s ease-in-out infinite ${
                                index * 0.2
                              }s`,
                            }}
                          >
                            {company.logo}
                          </Avatar>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "white",
                              fontWeight: 600,
                              display: "block",
                              fontSize: "0.7rem",
                            }}
                          >
                            {company.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "rgba(255, 255, 255, 0.7)",
                              display: "block",
                              fontSize: "0.6rem",
                            }}
                          >
                            {company.hires}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Slide>
            </Box>

            {/* Right Side - Authentication Form */}
            <Slide direction="right" in timeout={1000}>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Paper
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 32px 64px rgba(0, 0, 0, 0.2)",
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                    minHeight: "200px",
                    width: "100%",
                    maxWidth: "450px",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    "&:hover": {
                      boxShadow: "0 40px 80px rgba(0, 0, 0, 0.25)",
                      transform: "translateY(-8px)",
                    },
                  }}
                >
                  {/* Form Content */}
                  <Box
                    sx={{
                      p: 4,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Fade in timeout={600}>
                      <Box
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* Mobile Number Step */}
                        {authStep === "mobile" && (
                          <>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 600,
                                mb: 3,
                                color: "text.primary",
                              }}
                            >
                              Employer Login
                            </Typography>

                            <TextField
                              fullWidth
                              type="tel"
                              value={mobileNumber}
                              onChange={(e) =>
                                setMobileNumber(
                                  e.target.value.replace(/\D/g, "")
                                )
                              }
                              placeholder="Enter mobile number"
                              variant="outlined"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        backgroundColor: "#f1f5f9",
                                        borderRadius: 2,
                                        px: 2,
                                        py: 1.5,
                                        border: "1px solid #e2e8f0",
                                        mr: 2,
                                      }}
                                    >
                                      <Typography
                                        variant="body1"
                                        sx={{
                                          fontWeight: 700,
                                          fontSize: "1.1rem",
                                        }}
                                      >
                                        🇮🇳
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{
                                          fontWeight: 700,
                                          color: "text.primary",
                                        }}
                                      >
                                        +91
                                      </Typography>
                                    </Box>
                                  </InputAdornment>
                                ),
                                sx: {
                                  py: 1.75,
                                  fontSize: "16px",
                                  borderRadius: 2,
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e2e8f0",
                                    borderWidth: 2,
                                  },
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#1e3a8a",
                                  },
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      borderColor: "#1e3a8a",
                                      borderWidth: 2,
                                    },
                                },
                              }}
                              inputProps={{
                                maxLength: 10,
                                style: {
                                  fontSize: "18px",
                                  fontWeight: 500,
                                },
                              }}
                              sx={{ mb: 3 }}
                            />

                            <Alert
                              severity="info"
                              sx={{
                                mb: 4,
                                borderRadius: 2,
                                backgroundColor: "#f0f9ff",
                                border: "1px solid #bae6fd",
                                animation: `${slideInFromBottom} 0.6s ease-out`,
                              }}
                              icon={<Security sx={{ color: "#0369a1" }} />}
                            >
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: 500, color: "#0369a1" }}
                              >
                                Your number is secure with end-to-end encryption
                              </Typography>
                            </Alert>

                            <Box sx={{ mt: "auto" }}>
                              <Button
                                variant="contained"
                                fullWidth
                                onClick={handleMobileSubmit}
                                disabled={loading || mobileNumber.length !== 10}
                                startIcon={<Send />}
                                sx={{
                                  py: 2,
                                  borderRadius: 3,
                                  background:
                                    loading || mobileNumber.length !== 10
                                      ? "#9ca3af"
                                      : "linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)",
                                  boxShadow:
                                    loading || mobileNumber.length !== 10
                                      ? "none"
                                      : "0 8px 24px rgba(30, 58, 138, 0.4)",
                                  fontSize: "17px",
                                  fontWeight: 600,
                                  textTransform: "none",
                                  transition: "all 0.3s ease",
                                  animation:
                                    mobileNumber.length === 10 && !loading
                                      ? `${gentlePulse} 2s ease-in-out infinite`
                                      : "none",
                                  "&:hover": {
                                    boxShadow:
                                      loading || mobileNumber.length !== 10
                                        ? "none"
                                        : "0 12px 32px rgba(30, 58, 138, 0.5)",
                                    transform:
                                      loading || mobileNumber.length !== 10
                                        ? "none"
                                        : "translateY(-2px)",
                                  },
                                }}
                              >
                                {loading ? (
                                  <CircularProgress size={24} color="inherit" />
                                ) : (
                                  "Send Verification Code"
                                )}
                              </Button>
                            </Box>
                          </>
                        )}

                       {/* OTP Verification Step */}
{authStep === "otp" && (
  <>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
      }}
    >
      <IconButton
        onClick={handleBackToMobile}
        sx={{ mr: 1, color: "text.secondary" }}
      >
        <ArrowBack />
      </IconButton>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: "text.primary" }}
      >
        Verify OTP
      </Typography>
    </Box>

    <Typography
      variant="body2"
      sx={{
        mb: 3,
        color: "text.secondary",
        textAlign: "center",
      }}
    >
      Enter the 4-digit code sent to
      <br />
      <strong>+91 {mobileNumber}</strong>
    </Typography>

    {/* OTP Input Fields - 4 digits */}
    <CustomOtpInput
      length={4} // Add this prop to specify 4 digits
      value={otp}
      onChange={handleOtpChange}
      inputRefs={otpRefs}
    />

    {/* Resend OTP */}
    <Box sx={{ textAlign: "center", mb: 4 }}>
      {countdown > 0 ? (
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
        >
          Resend OTP in{" "}
          <Box
            component="span"
            sx={{
              color: "#1e3a8a",
              fontWeight: 600,
              animation: `${countdownAnimation} 1s ease-in-out infinite`,
            }}
          >
            {countdown}s
          </Box>
        </Typography>
      ) : (
        <Button
          onClick={handleResendOtp}
          disabled={loading}
          startIcon={<Refresh />}
          sx={{
            color: "#1e3a8a",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          Resend Code
        </Button>
      )}
    </Box>

    <Box sx={{ mt: "auto" }}>
      <Button
        variant="contained"
        fullWidth
        onClick={handleOtpSubmit}
        disabled={
          loading || otp.some((digit) => digit === "")
        }
        startIcon={<VerifiedUser />}
        sx={{
          py: 2,
          borderRadius: 3,
          background:
            loading || otp.some((digit) => digit === "")
              ? "#9ca3af"
              : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          boxShadow:
            loading || otp.some((digit) => digit === "")
              ? "none"
              : "0 8px 24px rgba(16, 185, 129, 0.4)",
          fontSize: "17px",
          fontWeight: 600,
          textTransform: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow:
              loading || otp.some((digit) => digit === "")
                ? "none"
                : "0 12px 32px rgba(16, 185, 129, 0.5)",
            transform:
              loading || otp.some((digit) => digit === "")
                ? "none"
                : "translateY(-2px)",
          },
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Verify & Continue"
        )}
      </Button>
    </Box>
  </>
)}
                      </Box>
                    </Fade>
                  </Box>
                </Paper>
              </Box>
            </Slide>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ background: "white", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 6,
              color: "#1a202c",
            }}
          >
            Why Employers Choose Us?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <AutoAwesome sx={{ fontSize: 40 }} />,
                title: "Smart Matching",
                description:
                  "AI-powered candidate matching for perfect role fits",
              },
              {
                icon: <Groups sx={{ fontSize: 40 }} />,
                title: "5Cr+ Talent Pool",
                description:
                  "Access to India's largest verified candidate database",
              },
              {
                icon: <Speed sx={{ fontSize: 40 }} />,
                title: "Fast Hiring",
                description: "Average hiring time reduced by 70%",
              },
              {
                icon: <VerifiedUser sx={{ fontSize: 40 }} />,
                title: "Verified Profiles",
                description:
                  "All candidates are thoroughly verified and screened",
              },
              {
                icon: <SupportAgent sx={{ fontSize: 40 }} />,
                title: "Dedicated Support",
                description:
                  "Personalized recruitment consultant for your needs",
              },
              {
                icon: <Analytics sx={{ fontSize: 40 }} />,
                title: "Data Insights",
                description: "Comprehensive analytics on hiring metrics",
              },
              {
                icon: <Security sx={{ fontSize: 40 }} />,
                title: "Secure Platform",
                description: "Enterprise-grade security for your data",
              },
              {
                icon: <PriceCheck sx={{ fontSize: 40 }} />,
                title: "Cost Effective",
                description: "Save up to 60% on recruitment costs",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    textAlign: "center",
                    p: 3,
                    height: "100%",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Box sx={{ color: "#1e3a8a", mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Statistics Section */}
      <Box
        sx={{
          py: 8,
          bgcolor: "#1e293b",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "white",
                mb: 2,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Our Impact in Numbers
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#cbd5e1",
                fontWeight: 400,
                maxWidth: "600px",
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.2rem" },
              }}
            >
              Empowering thousands of companies to hire better and faster
            </Typography>
          </Box>

          {/* Animated Statistics Rows */}
          <Box sx={{ position: "relative" }}>
            {statisticsData.map((row, rowIndex) => (
              <Box
                key={rowIndex}
                sx={{
                  display: "flex",
                  gap: 2,
                  width: "max-content",
                  animation: `${slideStatsRightToLeft} ${
                    30 + rowIndex * 5
                  }s linear infinite`,
                  mb: 2,
                  "&:hover": {
                    animationPlayState: "paused",
                  },
                }}
              >
                {/* Original items */}
                {row.map((stat, index) => (
                  <Paper
                    key={`row${rowIndex}-${index}`}
                    sx={{
                      minWidth: 180,
                      height: 100,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #334155 0%, #475569 100%)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                      border: "1px solid #475569",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
                        background:
                          "linear-gradient(135deg, #475569 0%, #4b5563 100%)",
                      },
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        color: "#fbbf24",
                        fontSize: { xs: "1.5rem", md: "1.75rem" },
                        lineHeight: 1.2,
                        mb: 0.5,
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#e2e8f0",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        textAlign: "center",
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Paper>
                ))}

                {/* Duplicate for seamless loop */}
                {row.map((stat, index) => (
                  <Paper
                    key={`row${rowIndex}-dup-${index}`}
                    sx={{
                      minWidth: 180,
                      height: 100,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #334155 0%, #475569 100%)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                      border: "1px solid #475569",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
                        background:
                          "linear-gradient(135deg, #475569 0%, #4b5563 100%)",
                      },
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        color: "#fbbf24",
                        fontSize: { xs: "1.5rem", md: "1.75rem" },
                        lineHeight: 1.2,
                        mb: 0.5,
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#e2e8f0",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        textAlign: "center",
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            ))}
          </Box>

          {/* Gradient Overlays */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "100px",
              background:
                "linear-gradient(90deg, #1e293b 0%, transparent 100%)",
              zIndex: 2,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "100px",
              background:
                "linear-gradient(270deg, #1e293b 0%, transparent 100%)",
              zIndex: 2,
            }}
          />
        </Container>
      </Box>

      {/* Get Started Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  minHeight: "500px",
                }}
              >
                <Box
                  component="img"
                  src="https://framerusercontent.com/images/1uIlwEEpRUpZTa12rq7s48QsQu0.png"
                  alt="Employer Dashboard"
                  sx={{
                    width: "100%",
                    maxWidth: "500px",
                    height: "auto",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Paper
                  sx={{
                    background:
                      "linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)",
                    color: "white",
                    borderRadius: 3,
                    p: 4,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    GET STARTED WITH JOB CHAAHIYE
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      opacity: 0.9,
                    }}
                  >
                    Post a job in minutes
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      opacity: 0.8,
                      maxWidth: "500px",
                      mx: "auto",
                    }}
                  >
                    Revolutionize your hiring with our AI-powered algorithm.
                  </Typography>

                  {/* Features List */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      mb: 4,
                      maxWidth: "400px",
                      mx: "auto",
                    }}
                  >
                    {[
                      "Get unlimited applications",
                      "10x higher relevancy",
                      "Simplified job posting",
                      "40% better ROI than market",
                    ].map((feature, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <CheckCircle sx={{ color: "#10b981", fontSize: 24 }} />
                        <Typography sx={{ fontWeight: 500 }}>
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#fbbf24",
                      color: "#1e293b",
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 700,
                      fontSize: "1rem",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#f59e0b",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(251, 191, 36, 0.3)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Post a job now
                  </Button>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      {/* What People Are Saying Section */}
      <Box sx={{ py: 8, bgcolor: "white" }}>
        <Container maxWidth="lg">
          {/* Section Header */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "2.5rem" },
                color: "#1a202c",
                mb: 2,
              }}
            >
              What People Are Saying
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#64748b",
                fontWeight: 400,
                fontSize: "1.1rem",
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Consectetur adipisicing elit, sed do eiusmod temp
            </Typography>
          </Box>

          {/* Testimonials Slider */}
          <Box sx={{ position: "relative", overflow: "hidden" }}>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                animation: "slideInfinite 40s linear infinite",
                "&:hover": {
                  animationPlayState: "paused",
                },
                "@keyframes slideInfinite": {
                  "0%": {
                    transform: "translateX(0)",
                  },
                  "100%": {
                    transform: "translateX(-50%)",
                  },
                },
              }}
            >
              {[
                {
                  id: 1,
                  name: "Sarah Johnson",
                  role: "Product Designer",
                  company: "TechInnovate",
                  rating: 5,
                  text: "The platform completely transformed my job search experience. Found my dream role in just 2 weeks!",
                  avatar: "👩‍💼",
                },
                {
                  id: 2,
                  name: "Michael Chen",
                  role: "Full Stack Developer",
                  company: "CodeCraft",
                  rating: 5,
                  text: "As a developer, I appreciate the clean interface and relevant job matches. Highly recommended!",
                  avatar: "👨‍💻",
                },
                {
                  id: 3,
                  name: "Emily Rodriguez",
                  role: "Marketing Director",
                  company: "GrowthGenius",
                  rating: 4,
                  text: "The quality of candidates we found through this platform exceeded our expectations.",
                  avatar: "👩‍🎓",
                },
                {
                  id: 4,
                  name: "David Park",
                  role: "Data Scientist",
                  company: "DataDriven",
                  rating: 5,
                  text: "Finally a job portal that understands what tech professionals are looking for.",
                  avatar: "👨‍🔬",
                },
                {
                  id: 5,
                  name: "Lisa Thompson",
                  role: "HR Manager",
                  company: "TalentFirst",
                  rating: 5,
                  text: "Streamlined our hiring process and helped us find perfect cultural fits.",
                  avatar: "👩‍💼",
                },
                {
                  id: 6,
                  name: "Alex Kumar",
                  role: "UX Researcher",
                  company: "DesignHub",
                  rating: 4,
                  text: "The application process is so smooth. Received multiple interview calls quickly.",
                  avatar: "👨‍🎨",
                },
              ].map((testimonial) => (
                <Card
                  key={testimonial.id}
                  sx={{
                    flex: "0 0 380px",
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                    borderRadius: 3,
                    p: 4,
                    border: "1px solid #e2e8f0",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      borderColor: "#3b82f6",
                    },
                  }}
                >
                  {/* Quote Icon */}
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        bgcolor: "#f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        fontSize: "1.5rem",
                        color: "#3b82f6",
                      }}
                    >
                      "
                    </Box>
                  </Box>

                  {/* Testimonial Text */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#475569",
                      lineHeight: 1.7,
                      mb: 4,
                      textAlign: "center",
                      fontStyle: "italic",
                      fontSize: "1rem",
                      minHeight: "120px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>

                  {/* Rating Stars */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 0.5,
                      mb: 3,
                    }}
                  >
                    {[...Array(5)].map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          color:
                            index < testimonial.rating ? "#fbbf24" : "#e2e8f0",
                          fontSize: "1.5rem",
                        }}
                      >
                        ★
                      </Box>
                    ))}
                  </Box>

                  {/* User Info */}
                  <Box sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        bgcolor: "#3b82f6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                        fontSize: "1.5rem",
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      {testimonial.avatar}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        color: "#1a202c",
                        mb: 0.5,
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748b",
                        fontWeight: 500,
                        fontSize: "0.9rem",
                      }}
                    >
                      {testimonial.role}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#3b82f6",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                      }}
                    >
                      {testimonial.company}
                    </Typography>
                  </Box>
                </Card>
              ))}

              {/* Duplicate for seamless loop */}
              {[
                {
                  id: 1,
                  name: "Sarah Johnson",
                  role: "Product Designer",
                  company: "TechInnovate",
                  rating: 5,
                  text: "The platform completely transformed my job search experience. Found my dream role in just 2 weeks!",
                  avatar: "👩‍💼",
                },
                {
                  id: 2,
                  name: "Michael Chen",
                  role: "Full Stack Developer",
                  company: "CodeCraft",
                  rating: 5,
                  text: "As a developer, I appreciate the clean interface and relevant job matches. Highly recommended!",
                  avatar: "👨‍💻",
                },
                {
                  id: 3,
                  name: "Emily Rodriguez",
                  role: "Marketing Director",
                  company: "GrowthGenius",
                  rating: 4,
                  text: "The quality of candidates we found through this platform exceeded our expectations.",
                  avatar: "👩‍🎓",
                },
                {
                  id: 4,
                  name: "David Park",
                  role: "Data Scientist",
                  company: "DataDriven",
                  rating: 5,
                  text: "Finally a job portal that understands what tech professionals are looking for.",
                  avatar: "👨‍🔬",
                },
                {
                  id: 5,
                  name: "Lisa Thompson",
                  role: "HR Manager",
                  company: "TalentFirst",
                  rating: 5,
                  text: "Streamlined our hiring process and helped us find perfect cultural fits.",
                  avatar: "👩‍💼",
                },
                {
                  id: 6,
                  name: "Alex Kumar",
                  role: "UX Researcher",
                  company: "DesignHub",
                  rating: 4,
                  text: "The application process is so smooth. Received multiple interview calls quickly.",
                  avatar: "👨‍🎨",
                },
              ].map((testimonial, index) => (
                <Card
                  key={`duplicate-${testimonial.id}-${index}`}
                  sx={{
                    flex: "0 0 380px",
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                    borderRadius: 3,
                    p: 4,
                    border: "1px solid #e2e8f0",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      borderColor: "#3b82f6",
                    },
                  }}
                >
                  {/* Quote Icon */}
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        bgcolor: "#f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        fontSize: "1.5rem",
                        color: "#3b82f6",
                      }}
                    >
                      "
                    </Box>
                  </Box>

                  {/* Testimonial Text */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#475569",
                      lineHeight: 1.7,
                      mb: 4,
                      textAlign: "center",
                      fontStyle: "italic",
                      fontSize: "1rem",
                      minHeight: "120px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>

                  {/* Rating Stars */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 0.5,
                      mb: 3,
                    }}
                  >
                    {[...Array(5)].map((_, starIndex) => (
                      <Box
                        key={starIndex}
                        sx={{
                          color:
                            starIndex < testimonial.rating
                              ? "#fbbf24"
                              : "#e2e8f0",
                          fontSize: "1.5rem",
                        }}
                      >
                        ★
                      </Box>
                    ))}
                  </Box>

                  {/* User Info */}
                  <Box sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        bgcolor: "#3b82f6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                        fontSize: "1.5rem",
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      {testimonial.avatar}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        color: "#1a202c",
                        mb: 0.5,
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748b",
                        fontWeight: 500,
                        fontSize: "0.9rem",
                      }}
                    >
                      {testimonial.role}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#3b82f6",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                      }}
                    >
                      {testimonial.company}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Box>

            {/* Gradient Overlays for Better UX */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100px",
                height: "100%",
                background:
                  "linear-gradient(90deg, white 0%, transparent 100%)",
                zIndex: 2,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "100px",
                height: "100%",
                background:
                  "linear-gradient(270deg, white 0%, transparent 100%)",
                zIndex: 2,
              }}
            />
          </Box>

        </Container>
      </Box>

      {/* Footer Section */}
      <Box sx={{ bgcolor: "#1a202c", color: "white" }}>
        <Container maxWidth="lg">
          {/* Main Footer Content */}
          <Box sx={{ py: 8 }}>
            <Grid container spacing={6}>
              {/* Company Info */}
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.8rem",
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      mb: 2,
                    }}
                  >
                    Job Chashiye
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#cbd5e0",
                      lineHeight: 1.6,
                      mb: 3,
                    }}
                  >
                    Connecting talent with opportunity. Job Chashiye is India's
                    leading job portal helping millions of job seekers find
                    their dream careers and employers find the perfect
                    candidates.
                  </Typography>
                </Box>

                {/* Social Links */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  {[
                    { icon: "📘", label: "Facebook", color: "#1877f2" },
                    { icon: "🐦", label: "Twitter", color: "#1da1f2" },
                    { icon: "💼", label: "LinkedIn", color: "#0077b5" },
                    { icon: "📷", label: "Instagram", color: "#e4405f" },
                  ].map((social) => (
                    <Box
                      key={social.label}
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        bgcolor: "#2d3748",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        fontSize: "1.2rem",
                        "&:hover": {
                          bgcolor: social.color,
                          transform: "translateY(-2px)",
                          boxShadow: `0 4px 12px ${social.color}40`,
                        },
                      }}
                    >
                      {social.icon}
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Quick Links */}
              <Grid item xs={12} sm={6} md={2}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    color: "white",
                    mb: 3,
                  }}
                >
                  Job Seekers
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[
                    "Browse Jobs",
                    "Create Resume",
                    "Career Advice",
                    "Job Alerts",
                    "Saved Jobs",
                    "Application History",
                  ].map((link) => (
                    <Typography
                      key={link}
                      variant="body2"
                      sx={{
                        color: "#cbd5e0",
                        cursor: "pointer",
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: "#3b82f6",
                        },
                      }}
                    >
                      {link}
                    </Typography>
                  ))}
                </Box>
              </Grid>

              {/* Employers */}
              <Grid item xs={12} sm={6} md={2}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    color: "white",
                    mb: 3,
                  }}
                >
                  Employers
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[
                    "Post a Job",
                    "Browse Candidates",
                    "Pricing Plans",
                    "Employer Login",
                    "HR Solutions",
                    "Recruitment Services",
                  ].map((link) => (
                    <Typography
                      key={link}
                      variant="body2"
                      sx={{
                        color: "#cbd5e0",
                        cursor: "pointer",
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: "#3b82f6",
                        },
                      }}
                    >
                      {link}
                    </Typography>
                  ))}
                </Box>
              </Grid>

              {/* Resources */}
              <Grid item xs={12} sm={6} md={2}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    color: "white",
                    mb: 3,
                  }}
                >
                  Resources
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[
                    "Career Blog",
                    "Resume Templates",
                    "Interview Tips",
                    "Salary Guide",
                    "Company Reviews",
                    "Webinars",
                  ].map((link) => (
                    <Typography
                      key={link}
                      variant="body2"
                      sx={{
                        color: "#cbd5e0",
                        cursor: "pointer",
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: "#3b82f6",
                        },
                      }}
                    >
                      {link}
                    </Typography>
                  ))}
                </Box>
              </Grid>

              {/* Support */}
              <Grid item xs={12} sm={6} md={2}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    color: "white",
                    mb: 3,
                  }}
                >
                  Support
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[
                    "Help Center",
                    "Contact Us",
                    "FAQ",
                    "Privacy Policy",
                    "Terms of Service",
                    "Cookie Policy",
                  ].map((link) => (
                    <Typography
                      key={link}
                      variant="body2"
                      sx={{
                        color: "#cbd5e0",
                        cursor: "pointer",
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: "#3b82f6",
                        },
                      }}
                    >
                      {link}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Newsletter Subscription */}
          <Box
            sx={{
              py: 4,
              borderTop: "1px solid #2d3748",
              borderBottom: "1px solid #2d3748",
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: "white",
                    mb: 1,
                  }}
                >
                  Stay Updated
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#cbd5e0",
                  }}
                >
                  Get the latest job alerts and career tips delivered to your
                  inbox
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Box
                    component="input"
                    placeholder="Enter your email address"
                    sx={{
                      flex: 1,
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      border: "1px solid #4a5568",
                      bgcolor: "#2d3748",
                      color: "white",
                      fontSize: "0.95rem",
                      "&::placeholder": {
                        color: "#a0aec0",
                      },
                      "&:focus": {
                        outline: "none",
                        borderColor: "#3b82f6",
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: "0.95rem",
                      bgcolor: "#3b82f6",
                      "&:hover": {
                        bgcolor: "#2563eb",
                        transform: "translateY(-1px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Mobile Apps */}
          <Box sx={{ py: 6 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "white",
                mb: 3,
                textAlign: "center",
              }}
            >
              Download Our Mobile App
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  bgcolor: "#2d3748",
                  borderRadius: 3,
                  px: 3,
                  py: 2,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "#3b82f6",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box sx={{ fontSize: "2rem" }}>📱</Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#cbd5e0", fontSize: "0.8rem" }}
                  >
                    Download on the
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "white", fontSize: "1.1rem", fontWeight: 600 }}
                  >
                    App Store
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  bgcolor: "#2d3748",
                  borderRadius: 3,
                  px: 3,
                  py: 2,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "#3b82f6",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box sx={{ fontSize: "2rem" }}>🤖</Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#cbd5e0", fontSize: "0.8rem" }}
                  >
                    Get it on
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "white", fontSize: "1.1rem", fontWeight: 600 }}
                  >
                    Google Play
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Bottom Footer */}
          <Box
            sx={{
              py: 4,
              borderTop: "1px solid #2d3748",
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#a0aec0",
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  © 2024 Job Chashiye. All rights reserved.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    justifyContent: { xs: "center", md: "flex-end" },
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    "Privacy Policy",
                    "Terms of Service",
                    "Cookie Policy",
                    "Sitemap",
                    "Accessibility",
                  ].map((link) => (
                    <Typography
                      key={link}
                      variant="body2"
                      sx={{
                        color: "#a0aec0",
                        cursor: "pointer",
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: "#3b82f6",
                        },
                      }}
                    >
                      {link}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            </Grid>

            {/* Trust Badges */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 4,
                mt: 3,
                flexWrap: "wrap",
              }}
            >
              {[
                { text: "🔒 SSL Secured", label: "Secure" },
                { text: "✅ Trusted by 10K+ Companies", label: "Trusted" },
                { text: "⭐ 4.8/5 Rating", label: "Rated" },
              ].map((badge) => (
                <Box
                  key={badge.label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#a0aec0",
                    fontSize: "0.9rem",
                  }}
                >
                  {badge.text}
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default EmployerLanding;
