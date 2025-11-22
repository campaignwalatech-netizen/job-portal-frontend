import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
  Paper,
  Avatar,
  Grid,
  Chip,
  IconButton,
  Fade,
  Slide,
  Grow,
  keyframes,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import {
  TrendingUp,
  People,
  BusinessCenter,
  School,
  CheckCircle,
  Work,
  Place,
  Verified,
  Star,
  ArrowForward,
  AttachMoney,
  Whatshot,
  TrendingFlat,
  EmojiEvents,
  Rocket,
  Security,
  AccessTime,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

// Enhanced Animations from reference
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

// Add these animations for company section
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

// Add this animation for statistics section
const slideStatsRightToLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.33%);
  }
`;

const JobPortalLanding = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { openAuthModal } = useAuth();
  const [jobSearch, setJobSearch] = useState("");
  const [location, setLocation] = useState("");
  const achieversContainerRef = useRef(null);
  const [activeDepartment, setActiveDepartment] = useState("all");

  // Authentication states
  const [authStep, setAuthStep] = useState("mobile"); // 'mobile', 'otp', 'loading'
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
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
      // API call to register/send OTP
      const response = await fetch(
        "http://72.60.223.124:4000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: mobileNumber,
            role: "employee",
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
    if (otpString.length !== 4) {
      showSnackbar("Please enter complete 4-digit OTP", "error");
      return;
    }

    setLoading(true);
    try {
      // API call to verify OTP
      const response = await fetch(
        "http://72.60.223.124:4000/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: mobileNumber,
            role: "employee",
            otp: otpString,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showSnackbar("Login successful! Redirecting...", "success");

        // Store token and user data (you can modify this based on your API response)
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));

        // Redirect to employee onboarding after a brief delay
        setTimeout(() => {
          window.location.href = "/employee-onboarding"; // Change this to your actual onboarding route
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
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are entered
    if (newOtp.every((digit) => digit !== "") && index === 3) {
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
            role: "employee",
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
    setOtp(["", "", "", ""]);
  };

  // Sample jobs data
  const jobsData = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹8L - ₹12L PA",
      skills: ["React", "JavaScript", "CSS"],
      posted: "2 days ago",
      department: "tech",
      logo: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      title: "Digital Marketing Manager",
      company: "GrowthHub",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹6L - ₹9L PA",
      skills: ["SEO", "Social Media", "Google Ads"],
      posted: "1 day ago",
      department: "marketing",
      logo: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      title: "Sales Executive",
      company: "SalesPro",
      location: "Delhi, India",
      type: "Full-time",
      salary: "₹5L - ₹8L PA",
      skills: ["B2B Sales", "CRM", "Negotiation"],
      posted: "3 days ago",
      department: "sales",
      logo: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "DesignStudio",
      location: "Remote",
      type: "Full-time",
      salary: "₹7L - ₹10L PA",
      skills: ["Figma", "Wireframing", "Prototyping"],
      posted: "5 days ago",
      department: "design",
      logo: "https://via.placeholder.com/50",
    },
    {
      id: 5,
      title: "Financial Analyst",
      company: "FinancePlus",
      location: "Hyderabad, India",
      type: "Full-time",
      salary: "₹9L - ₹13L PA",
      skills: ["Excel", "Financial Modeling", "Analysis"],
      posted: "1 week ago",
      department: "finance",
      logo: "https://via.placeholder.com/50",
    },
    {
      id: 6,
      title: "HR Manager",
      company: "PeopleFirst",
      location: "Chennai, India",
      type: "Full-time",
      salary: "₹6L - ₹9L PA",
      skills: ["Recruitment", "Employee Relations", "HRMS"],
      posted: "4 days ago",
      department: "hr",
      logo: "https://via.placeholder.com/50",
    },
  ];

  // Filter jobs based on active department
  const filteredJobs =
    activeDepartment === "all"
      ? jobsData.slice(0, 6)
      : jobsData
          .filter((job) => job.department === activeDepartment)
          .slice(0, 6);

  // Extended job achievers data
  const jobAchievers = [
    {
      name: "Sathash V",
      status: "got job",
      time: "5 hours ago",
      role: "Software Engineer",
    },
    {
      name: "Hasonur Piyada",
      status: "got job",
      time: "3 hours ago",
      role: "Data Analyst",
    },
    {
      name: "Kajal Mandibi",
      status: "has fixed an interview",
      time: "1 hour ago",
      role: "UX Designer",
    },
    {
      name: "Anil Kumar",
      status: "has fixed an interview",
      time: "45 minutes ago",
      role: "Product Manager",
    },
    {
      name: "MJkoheah",
      status: "has fixed an interview",
      time: "30 minutes ago",
      role: "Frontend Developer",
    },
    {
      name: "Priya Sharma",
      status: "got job",
      time: "2 hours ago",
      role: "Backend Developer",
    },
    {
      name: "Rahul Mehta",
      status: "got job",
      time: "4 hours ago",
      role: "DevOps Engineer",
    },
    {
      name: "Sneha Patel",
      status: "has fixed an interview",
      time: "15 minutes ago",
      role: "Full Stack Developer",
    },
  ];

  // Popular searches data
  const popularSearches = [
    {
      title: "Part time Jobs",
      trend: 3,
      count: "45K+",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: <BusinessCenter />,
    },
    {
      title: "Jobs for Freshers",
      trend: 1,
      count: "120K+",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: <School />,
    },
    {
      title: "Jobs for Women",
      trend: 4,
      count: "85K+",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: <People />,
    },
    {
      title: "Work from home Jobs",
      trend: 2,
      count: "95K+",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      icon: <TrendingUp />,
    },
    {
      title: "International Jobs",
      trend: 5,
      count: "35K+",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      icon: <Place />,
    },
  ];

  const [currentAchieverIndex, setCurrentAchieverIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAchieverIndex((prev) => (prev + 1) % jobAchievers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [jobAchievers.length]);

  // Animation for scrolling achievers strip
  useEffect(() => {
    const container = achieversContainerRef.current;
    if (!container) return;

    let animationFrame;
    let position = 0;
    const speed = 0.5;

    const animate = () => {
      position -= speed;

      // Reset position when scrolled completely
      if (Math.abs(position) >= container.scrollWidth / 2) {
        position = 0;
      }

      container.style.transform = `translateX(${position}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleSearch = () => {
    if (jobSearch.trim() || location.trim()) {
      openAuthModal("employee");
    }
  };

  const handlePopularSearchClick = (searchTitle) => {
    setJobSearch(searchTitle);
    openAuthModal("employee");
  };

  // Animated Counter Component from reference
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

  // Statistics data from the image
  const statisticsData = [
    // Row 1
    [
      { number: "2.9 Cr", label: "Male" },
      { number: "2.1 Cr", label: "Experience" },
      { number: "40 Lakh", label: "Post Graduate" },
      { number: "68 Lakh", label: "BFSI" },
      { number: "20%", label: "Connected Leads" },
      { number: "3 Cr", label: "0-4 years experienced" },
    ],
    // Row 2
    [
      { number: "5 Cr+", label: "Active job seekers" },
      { number: "57 Lakh+", label: "BPO Call-center" },
      { number: "2.3 Cr", label: "Candidates in T1 cities" },
      { number: "40%", label: "Economical than competitor" },
      { number: "2.9Cr", label: "Male" },
      { number: "40 Lakh", label: "Post Graduate" },
    ],
    // Row 3
    [
      { number: "2.1 Cr", label: "Experience" },
      { number: "68 Lakh", label: "BFSI" },
      { number: "7/10", label: "Freshers choose Job chashive" },
      { number: "70%", label: "Connected Leads" },
      { number: "5 Cr+", label: "Active job seekers" },
      { number: "57 Lakh+", label: "BPO Call-center" },
    ],
    // Row 4
    [
      { number: "40 Lakh", label: "Post Graduate" },
      { number: "2.3 Cr", label: "Candidates in T1 cities" },
      { number: "3 Cr", label: "0-4 years experienced" },
      { number: "20%", label: "Connected Leads" },
      { number: "68 Lakh", label: "BFSI" },
      { number: "2.9 Cr", label: "Male" },
    ],
  ];

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
                    India's #1 Job Platform
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
                  Your Job Search
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
                    Ends Here!
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
                  Find Jobs, Employment & Career Opportunities
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
                    <AnimatedCounter end={50} suffix="Cr+" />
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.9, fontWeight: 600 }}
                    >
                      Job Seekers
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <AnimatedCounter end={7} suffix="L+" />
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.9, fontWeight: 600 }}
                    >
                      Companies
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
                </Box>
              </Slide>

              {/* Search Section */}
              <Slide direction="up" in timeout={1600}>
                <Paper
                  sx={{
                    background: "white",
                    borderRadius: 2,
                    p: 2,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
                    mb: 3,
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    alignItems="center"
                  >
                    <TextField
                      fullWidth
                      placeholder="Job title, keywords, or company"
                      value={jobSearch}
                      onChange={(e) => setJobSearch(e.target.value)}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Work sx={{ color: "#1e3a8a", fontSize: 20 }} />
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 1,
                          background: "#f8fafc",
                          fontSize: "0.9rem",
                        },
                      }}
                      sx={{
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "transparent" },
                          "&:hover fieldset": { borderColor: "#1e3a8a" },
                          "&.Mui-focused fieldset": { borderColor: "#1e3a8a" },
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      placeholder="City or postcode"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Place sx={{ color: "#1e3a8a", fontSize: 20 }} />
                          </InputAdornment>
                        ),
                        sx: {
                          borderRadius: 1,
                          background: "#f8fafc",
                          fontSize: "0.9rem",
                        },
                      }}
                      sx={{
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "transparent" },
                          "&:hover fieldset": { borderColor: "#1e3a8a" },
                          "&.Mui-focused fieldset": { borderColor: "#1e3a8a" },
                        },
                      }}
                    />

                    <Button
                      variant="contained"
                      onClick={handleSearch}
                      sx={{
                        bgcolor: "#1e3a8a",
                        color: "white",
                        px: 3,
                        py: 1,
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        borderRadius: 1,
                        textTransform: "none",
                        minWidth: "120px",
                        minHeight: "40px",
                        animation:
                          jobSearch || location
                            ? `${gentlePulse} 2s ease-in-out infinite`
                            : "none",
                        "&:hover": {
                          bgcolor: "#1e40af",
                          transform: "translateY(-1px)",
                          boxShadow: "0 5px 15px rgba(30, 58, 138, 0.3)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Find Jobs
                    </Button>
                  </Stack>
                </Paper>
              </Slide>

              {/* Updated Job Achievers Section - Scrolling Strip */}
              <Slide direction="up" in timeout={1800}>
                <Box
                  sx={{
                    overflow: "hidden",
                    position: "relative",
                    "&::before, &::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      width: "50px",
                      zIndex: 2,
                    },
                    "&::before": {
                      left: 0,
                      background:
                        "linear-gradient(90deg, rgba(30, 58, 138, 0.8) 0%, transparent 100%)",
                    },
                    "&::after": {
                      right: 0,
                      background:
                        "linear-gradient(270deg, rgba(30, 58, 138, 0.8) 0%, transparent 100%)",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: "#fbbf24",
                      fontSize: "0.9rem",
                      textAlign: "center",
                    }}
                  >
                    Recent Success Stories
                  </Typography>

                  <Box
                    ref={achieversContainerRef}
                    sx={{
                      display: "flex",
                      gap: 2,
                      width: "max-content",
                      transition: "transform 0.1s linear",
                    }}
                  >
                    {[...jobAchievers, ...jobAchievers].map(
                      (achiever, index) => (
                        <Paper
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            background: "rgba(255, 255, 255, 0.1)",
                            borderRadius: 2,
                            p: 1.5,
                            minWidth: "280px",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            backdropFilter: "blur(10px)",
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: "#10b981",
                              fontWeight: 600,
                              fontSize: "1rem",
                            }}
                          >
                            {achiever.name.charAt(0)}
                          </Avatar>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color: "white",
                                fontSize: "0.85rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {achiever.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#10b981",
                                fontWeight: 500,
                                fontSize: "0.75rem",
                                display: "block",
                              }}
                            >
                              {achiever.status}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#cbd5e1",
                                fontSize: "0.7rem",
                                display: "block",
                              }}
                            >
                              {achiever.role} • {achiever.time}
                            </Typography>
                          </Box>
                          <Verified sx={{ color: "#10b981", fontSize: 20 }} />
                        </Paper>
                      )
                    )}
                  </Box>
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
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                mb: 4,
                                color: "text.primary",
                                textAlign: "center",
                              }}
                            >
                              Enter Mobile Number
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
                              placeholder="10-digit mobile number"
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
                              sx={{ mb: 4 }}
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
                                  "Get Started Now"
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
                                <ArrowForward
                                  sx={{ transform: "rotate(180deg)" }}
                                />
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

                            {/* OTP Input Fields */}
                            <Box
                              sx={{
                                display: "flex",
                                gap: 2,
                                justifyContent: "center",
                                mb: 4,
                              }}
                            >
                              {[0, 1, 2, 3].map((index) => (
                                <TextField
                                  key={index}
                                  inputRef={(ref) =>
                                    (otpRefs.current[index] = ref)
                                  }
                                  value={otp[index]}
                                  onChange={(e) =>
                                    handleOtpChange(index, e.target.value)
                                  }
                                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                  type="tel"
                                  inputProps={{
                                    maxLength: 1,
                                    style: {
                                      textAlign: "center",
                                      fontSize: "24px",
                                      fontWeight: "bold",
                                      padding: "12px",
                                    },
                                  }}
                                  sx={{
                                    width: "60px",
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 2,
                                      "& input": {
                                        textAlign: "center",
                                      },
                                    },
                                  }}
                                />
                              ))}
                            </Box>

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
                                  Resend OTP
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
                                      loading ||
                                      otp.some((digit) => digit === "")
                                        ? "none"
                                        : "0 12px 32px rgba(16, 185, 129, 0.5)",
                                    transform:
                                      loading ||
                                      otp.some((digit) => digit === "")
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

      {/* Top Companies Hiring Section */}
      <Box
        sx={{
          py: 8,
          bgcolor: "#f8fafc",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          {/* Section Header */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#1e293b",
                mb: 2,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Top Companies Hiring
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#64748b",
                fontWeight: 400,
                maxWidth: "600px",
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.2rem" },
              }}
            >
              Our customers have gotten offers from awesome companies.
            </Typography>
          </Box>

          {/* Animated Company Lists */}
          <Box sx={{ position: "relative" }}>
            {/* First Row - Moving from right to left */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                width: "max-content",
                animation: `${slideRightToLeft} 40s linear infinite`,
                mb: 3,
                "&:hover": {
                  animationPlayState: "paused",
                },
              }}
            >
              {[
                {
                  name: "BlackRock",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3b7d9f4b073deb6a9b74.png",
                },
                {
                  name: "Meta",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png",
                },
                {
                  name: "Apple",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
                },
                {
                  name: "Netflix",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
                },
                {
                  name: "Uber",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
                },
                {
                  name: "Airbnb",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/0384060dcbf73b6a707c.png",
                },
                {
                  name: "Spotify",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/f50ae7cbf6cc805bdadc.png",
                },
                {
                  name: "Salesforce",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/7ae42bac3b34999c0db3.png",
                },
              ].map((company, index) => (
                <Paper
                  key={`row1-${index}`}
                  sx={{
                    minWidth: 150,
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 3,
                    background: "white",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e2e8f0",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={company.logo}
                    alt={company.name}
                    sx={{
                      maxWidth: 120,
                      maxHeight: 40,
                      filter: "grayscale(30%)",
                      opacity: 0.8,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        filter: "grayscale(0%)",
                        opacity: 1,
                      },
                    }}
                  />
                </Paper>
              ))}

              {/* Duplicate for seamless loop */}
              {[
                {
                  name: "BlackRock",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3b7d9f4b073deb6a9b74.png",
                },
                {
                  name: "Meta",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png",
                },
                {
                  name: "Apple",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
                },
                {
                  name: "Netflix",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
                },
                {
                  name: "Uber",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
                },
                {
                  name: "Airbnb",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/0384060dcbf73b6a707c.png",
                },
                {
                  name: "Spotify",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/f50ae7cbf6cc805bdadc.png",
                },
                {
                  name: "Salesforce",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/7ae42bac3b34999c0db3.png",
                },
              ].map((company, index) => (
                <Paper
                  key={`row1-dup-${index}`}
                  sx={{
                    minWidth: 150,
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 3,
                    background: "white",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e2e8f0",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={company.logo}
                    alt={company.name}
                    sx={{
                      maxWidth: 120,
                      maxHeight: 40,
                      filter: "grayscale(30%)",
                      opacity: 0.8,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        filter: "grayscale(0%)",
                        opacity: 1,
                      },
                    }}
                  />
                </Paper>
              ))}
            </Box>

            {/* Second Row - Moving from left to right (reverse direction) */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                width: "max-content",
                animation: `${slideLeftToRight} 35s linear infinite`,
                "&:hover": {
                  animationPlayState: "paused",
                },
              }}
            >
              {[
                {
                  name: "BlackRock",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3b7d9f4b073deb6a9b74.png",
                },
                {
                  name: "Meta",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png",
                },
                {
                  name: "Apple",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
                },
                {
                  name: "Netflix",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
                },
                {
                  name: "Uber",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
                },
                {
                  name: "Airbnb",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/0384060dcbf73b6a707c.png",
                },
                {
                  name: "Spotify",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/f50ae7cbf6cc805bdadc.png",
                },
                {
                  name: "Salesforce",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/7ae42bac3b34999c0db3.png",
                },
              ].map((company, index) => (
                <Paper
                  key={`row2-${index}`}
                  sx={{
                    minWidth: 150,
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 3,
                    background: "white",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e2e8f0",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={company.logo}
                    alt={company.name}
                    sx={{
                      maxWidth: 120,
                      maxHeight: 40,
                      filter: "grayscale(30%)",
                      opacity: 0.8,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        filter: "grayscale(0%)",
                        opacity: 1,
                      },
                    }}
                  />
                </Paper>
              ))}

              {/* Duplicate for seamless loop */}
              {[
                {
                  name: "BlackRock",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3b7d9f4b073deb6a9b74.png",
                },
                {
                  name: "Meta",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png",
                },
                {
                  name: "Apple",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
                },
                {
                  name: "Netflix",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
                },
                {
                  name: "Uber",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6c585c33ca6c71c79bb7.png",
                },
                {
                  name: "Airbnb",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/0384060dcbf73b6a707c.png",
                },
                {
                  name: "Spotify",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/f50ae7cbf6cc805bdadc.png",
                },
                {
                  name: "Salesforce",
                  logo: "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/7ae42bac3b34999c0db3.png",
                },
              ].map((company, index) => (
                <Paper
                  key={`row2-dup-${index}`}
                  sx={{
                    minWidth: 150,
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 3,
                    background: "white",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e2e8f0",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={company.logo}
                    alt={company.name}
                    sx={{
                      maxWidth: 120,
                      maxHeight: 40,
                      filter: "grayscale(30%)",
                      opacity: 0.8,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        filter: "grayscale(0%)",
                        opacity: 1,
                      },
                    }}
                  />
                </Paper>
              ))}
            </Box>
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
                "linear-gradient(90deg, #f8fafc 0%, transparent 100%)",
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
                "linear-gradient(270deg, #f8fafc 0%, transparent 100%)",
              zIndex: 2,
            }}
          />
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
              Connecting millions of job seekers with their dream opportunities
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

   
 {/* What Employers Are Saying Section */}
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
        What Employers Are Saying
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
        Join thousands of companies that have transformed their hiring process
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
            name: "Rajesh Kumar",
            role: "HR Director",
            company: "TechMahindra",
            rating: 5,
            text: "The quality of candidates is outstanding! We filled 15 positions in just 2 weeks with perfect cultural fits.",
            avatar: "👨‍💼",
            highlight: "15 positions in 2 weeks"
          },
          {
            id: 2,
            name: "Priya Sharma",
            role: "Talent Acquisition Head",
            company: "Infosys",
            rating: 5,
            text: "Our hiring time reduced by 70%. The AI matching is incredibly accurate - every candidate was interview-ready!",
            avatar: "👩‍💼",
            highlight: "70% faster hiring"
          },
          {
            id: 3,
            name: "Amit Patel",
            role: "Startup Founder",
            company: "FinTech Innovations",
            rating: 5,
            text: "As a startup, every hire matters. This platform helped us find exceptional talent we couldn't find elsewhere.",
            avatar: "🚀",
            highlight: "Exceptional talent found"
          },
          {
            id: 4,
            name: "Neha Gupta",
            role: "HR Manager",
            company: "HDFC Bank",
            rating: 5,
            text: "The verified profiles saved us hundreds of screening hours. 9/10 candidates were perfect for the role!",
            avatar: "👩‍🎓",
            highlight: "9/10 perfect matches"
          },
          {
            id: 5,
            name: "Sanjay Mehta",
            role: "CTO",
            company: "EcomGiant",
            rating: 5,
            text: "Found senior developers in 3 days! The platform understands tech roles better than any other we've used.",
            avatar: "👨‍💻",
            highlight: "Senior hires in 3 days"
          },
          {
            id: 6,
            name: "Ananya Reddy",
            role: "VP Talent",
            company: "Global Solutions",
            rating: 5,
            text: "International hiring made easy! We sourced candidates from 5 different countries seamlessly through this platform.",
            avatar: "🌍",
            highlight: "Global hiring simplified"
          },
        ].map((testimonial) => (
          <Card
            key={testimonial.id}
            sx={{
              flex: "0 0 380px",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              borderRadius: 3,
              p: 4,
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                borderColor: "#1e3a8a",
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
                  bgcolor: "#f0f9ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  fontSize: "1.5rem",
                  color: "#1e3a8a",
                  border: "2px solid #e0f2fe",
                }}
              >
                "
              </Box>
            </Box>

            {/* Highlight Badge */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Chip
                label={testimonial.highlight}
                sx={{
                  bgcolor: "#dbeafe",
                  color: "#1e40af",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  py: 1,
                }}
              />
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
            <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, mb: 3 }}>
              {[...Array(5)].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    color: index < testimonial.rating ? "#fbbf24" : "#e2e8f0",
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
                  bgcolor: "#1e3a8a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                  fontSize: "1.5rem",
                  color: "white",
                  fontWeight: 600,
                  border: "3px solid #e0f2fe",
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
                  color: "#1e3a8a",
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
            name: "Rajesh Kumar",
            role: "HR Director",
            company: "TechMahindra",
            rating: 5,
            text: "The quality of candidates is outstanding! We filled 15 positions in just 2 weeks with perfect cultural fits.",
            avatar: "👨‍💼",
            highlight: "15 positions in 2 weeks"
          },
          {
            id: 2,
            name: "Priya Sharma",
            role: "Talent Acquisition Head",
            company: "Infosys",
            rating: 5,
            text: "Our hiring time reduced by 70%. The AI matching is incredibly accurate - every candidate was interview-ready!",
            avatar: "👩‍💼",
            highlight: "70% faster hiring"
          },
          {
            id: 3,
            name: "Amit Patel",
            role: "Startup Founder",
            company: "FinTech Innovations",
            rating: 5,
            text: "As a startup, every hire matters. This platform helped us find exceptional talent we couldn't find elsewhere.",
            avatar: "🚀",
            highlight: "Exceptional talent found"
          },
          {
            id: 4,
            name: "Neha Gupta",
            role: "HR Manager",
            company: "HDFC Bank",
            rating: 5,
            text: "The verified profiles saved us hundreds of screening hours. 9/10 candidates were perfect for the role!",
            avatar: "👩‍🎓",
            highlight: "9/10 perfect matches"
          },
          {
            id: 5,
            name: "Sanjay Mehta",
            role: "CTO",
            company: "EcomGiant",
            rating: 5,
            text: "Found senior developers in 3 days! The platform understands tech roles better than any other we've used.",
            avatar: "👨‍💻",
            highlight: "Senior hires in 3 days"
          },
          {
            id: 6,
            name: "Ananya Reddy",
            role: "VP Talent",
            company: "Global Solutions",
            rating: 5,
            text: "International hiring made easy! We sourced candidates from 5 different countries seamlessly through this platform.",
            avatar: "🌍",
            highlight: "Global hiring simplified"
          },
        ].map((testimonial, index) => (
          <Card
            key={`duplicate-${testimonial.id}-${index}`}
            sx={{
              flex: "0 0 380px",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              borderRadius: 3,
              p: 4,
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                borderColor: "#1e3a8a",
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
                  bgcolor: "#f0f9ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  fontSize: "1.5rem",
                  color: "#1e3a8a",
                  border: "2px solid #e0f2fe",
                }}
              >
                "
              </Box>
            </Box>

            {/* Highlight Badge */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Chip
                label={testimonial.highlight}
                sx={{
                  bgcolor: "#dbeafe",
                  color: "#1e40af",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  py: 1,
                }}
              />
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
            <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, mb: 3 }}>
              {[...Array(5)].map((_, starIndex) => (
                <Box
                  key={starIndex}
                  sx={{
                    color: starIndex < testimonial.rating ? "#fbbf24" : "#e2e8f0",
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
                  bgcolor: "#1e3a8a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                  fontSize: "1.5rem",
                  color: "white",
                  fontWeight: 600,
                  border: "3px solid #e0f2fe",
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
                  color: "#1e3a8a",
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
          background: "linear-gradient(90deg, white 0%, transparent 100%)",
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
          background: "linear-gradient(270deg, white 0%, transparent 100%)",
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
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
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
              Connecting talent with opportunity. Job Chashiye is India's leading job portal helping millions of job seekers find their dream careers and employers find the perfect candidates.
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
            Get the latest job alerts and career tips delivered to your inbox
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
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
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
            <Typography variant="body2" sx={{ color: "#cbd5e0", fontSize: "0.8rem" }}>
              Download on the
            </Typography>
            <Typography variant="h6" sx={{ color: "white", fontSize: "1.1rem", fontWeight: 600 }}>
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
            <Typography variant="body2" sx={{ color: "#cbd5e0", fontSize: "0.8rem" }}>
              Get it on
            </Typography>
            <Typography variant="h6" sx={{ color: "white", fontSize: "1.1rem", fontWeight: 600 }}>
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
      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 3, flexWrap: "wrap" }}>
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

export default JobPortalLanding;
