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
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { AuthModals } from "../../contexts/AuthModals";

const JobPortalLanding = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { openAuthModal } = useAuth();
  const [jobSearch, setJobSearch] = useState("");
  const [location, setLocation] = useState("");
  const achieversContainerRef = useRef(null);
  // Add this state at the top of your component
  const [activeDepartment, setActiveDepartment] = useState("all");

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
    // Add more jobs for each department...
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

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Auth Modals */}
      <AuthModals />

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

              {/* Main Heading */}
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
                  }}
                >
                  Ends Here!
                </Box>
              </Typography>

              {/* Subheading */}
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

              {/* Search Section */}
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

              {/* Updated Job Achievers Section - Scrolling Strip */}
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
                  {[...jobAchievers, ...jobAchievers].map((achiever, index) => (
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
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Right Image */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ position: "relative", maxWidth: "500px" }}>
                <Box
                  component="img"
                  src="https://www.jobchaahiye.com/images/resource/banner-image.svg"
                  alt="Career Success"
                  sx={{
                    height: "auto",
                    borderRadius: 2,
                  }}
                />

                {/* Enhanced Floating Cards */}
                <Paper
                  sx={{
                    position: "absolute",
                    top: "10%",
                    right: "0%",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    color: "white",
                    borderRadius: 3,
                    p: 2,
                    boxShadow: "0 15px 30px rgba(16, 185, 129, 0.4)",
                    animation: "floatEnhanced 4s ease-in-out infinite",
                    zIndex: 3,
                    minWidth: "120px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mb: 1,
                    }}
                  >
                    <Verified sx={{ fontSize: 20 }} />
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 700, fontSize: "0.75rem" }}
                    >
                      Career Success
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, fontSize: "1.1rem", lineHeight: 1 }}
                  >
                    1M+ Jobs
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.9, fontSize: "0.7rem" }}
                  >
                    Posted This Year
                  </Typography>
                </Paper>

                <Paper
                  sx={{
                    position: "absolute",
                    bottom: "15%",
                    left: "0%",
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    color: "white",
                    borderRadius: 3,
                    p: 2,
                    boxShadow: "0 15px 30px rgba(245, 158, 11, 0.4)",
                    animation: "floatEnhanced 4s ease-in-out infinite 1s",
                    zIndex: 3,
                    minWidth: "120px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mb: 1,
                    }}
                  >
                    <BusinessCenter sx={{ fontSize: 20 }} />
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 700, fontSize: "0.75rem" }}
                    >
                      Top Companies
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, fontSize: "1.1rem", lineHeight: 1 }}
                  >
                    50K+
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.9, fontSize: "0.7rem" }}
                  >
                    Hiring Now
                  </Typography>
                </Paper>

                {/* New Floating Card */}
                <Paper
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "10%",
                    background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                    color: "white",
                    borderRadius: 3,
                    p: 2,
                    boxShadow: "0 15px 30px rgba(139, 92, 246, 0.4)",
                    animation: "floatEnhanced 4s ease-in-out infinite 2s",
                    zIndex: 3,
                    minWidth: "120px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mb: 1,
                    }}
                  >
                    <Star sx={{ fontSize: 20 }} />
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 700, fontSize: "0.75rem" }}
                    >
                      Success Rate
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, fontSize: "1.1rem", lineHeight: 1 }}
                  >
                    95%+
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.9, fontSize: "0.7rem" }}
                  >
                    Job Placement
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Container>

        {/* Animations */}
        <style jsx global>{`
          @keyframes floatEnhanced {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg) scale(1);
            }
            25% {
              transform: translateY(-12px) rotate(1deg) scale(1.02);
            }
            50% {
              transform: translateY(-8px) rotate(-1deg) scale(1.01);
            }
            75% {
              transform: translateY(-10px) rotate(0.5deg) scale(1.015);
            }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </Box>
      {/* Popular Searches Section */}
      <Box
        sx={{
          py: 8,
          bgcolor: "white",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container spacing={3}>
            {/* Main Title Card */}
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "2rem", md: "3rem" },
                  color: "#1a202c",
                  mb: 1,
                  lineHeight: 1.2,
                  textAlign: "center",
                }}
              >
                Popular Searches on
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    background:
                      "linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Job Chashiye
                </Box>
              </Typography>
            </Grid>

            {/* Part time Jobs - TRENDING AT #3 */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card
                sx={{
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  color: "#1a202c",
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    borderColor: "#cbd5e0",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Trend Badge */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: "white",
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <TrendingUp sx={{ fontSize: 18, color: "#dc2626" }} />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          color: "#1a202c",
                          letterSpacing: "0.5px",
                        }}
                      >
                        TRENDING AT #3
                      </Typography>
                    </Box>
                  </Box>

                  {/* Content Area */}
                  <Box
                    sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                  >
                    {/* Image */}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        minWidth: 250,
                        minHeight: 120,
                      }}
                    >
                      <img
                        src="https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/freshers-jobs.png"
                        alt="Part time Jobs"
                        style={{
                          width: "100%",
                          height: "100%",
                          maxHeight: 120,
                          objectFit: "contain",
                        }}
                      />
                    </Box>

                    {/* Title */}
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.4rem",
                        mb: 3,
                        color: "#1a202c",
                        textAlign: "center",
                        lineHeight: 1.3,
                      }}
                    >
                      Part time Jobs
                    </Typography>
                  </Box>

                  {/* View All Button */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pt: 3,
                      borderTop: "1px solid #e2e8f0",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "#4a5568",
                      }}
                    >
                      View all jobs
                    </Typography>
                    <IconButton
                      sx={{
                        color: "white",
                        bgcolor: "#3b82f6",
                        "&:hover": {
                          bgcolor: "#2563eb",
                          transform: "translateX(4px)",
                        },
                        transition: "all 0.2s ease",
                        width: 36,
                        height: 36,
                        boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      <ArrowForward sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Jobs for Freshers - TRENDING AT #1 */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card
                sx={{
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
                  color: "#1a202c",
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    borderColor: "#cbd5e0",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: "white",
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <TrendingUp sx={{ fontSize: 18, color: "#dc2626" }} />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          color: "#1a202c",
                          letterSpacing: "0.5px",
                        }}
                      >
                        TRENDING AT #1
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        minWidth: 250,
                        minHeight: 120,
                      }}
                    >
                      <img
                        src="https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/work-from-home-jobs.png"
                        alt="Jobs for Freshers"
                        style={{
                          width: "100%",
                          height: "100%",
                          maxHeight: 120,
                          objectFit: "contain",
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.4rem",
                        mb: 3,
                        color: "#1a202c",
                        textAlign: "center",
                        lineHeight: 1.3,
                      }}
                    >
                      Jobs for Freshers
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pt: 3,
                      borderTop: "1px solid #e2e8f0",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "#4a5568",
                      }}
                    >
                      View all jobs
                    </Typography>
                    <IconButton
                      sx={{
                        color: "white",
                        bgcolor: "#3b82f6",
                        "&:hover": {
                          bgcolor: "#2563eb",
                          transform: "translateX(4px)",
                        },
                        transition: "all 0.2s ease",
                        width: 36,
                        height: 36,
                        boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      <ArrowForward sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Jobs for Women - TRENDING AT #4 */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card
                sx={{
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%)",
                  color: "#1a202c",
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    borderColor: "#cbd5e0",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: "white",
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <TrendingUp sx={{ fontSize: 18, color: "#dc2626" }} />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          color: "#1a202c",
                          letterSpacing: "0.5px",
                        }}
                      >
                        TRENDING AT #4
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        minWidth: 250,
                        minHeight: 120,
                      }}
                    >
                      <img
                        src="https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/part-time-jobs.png"
                        alt="Jobs for Women"
                        style={{
                          width: "100%",
                          height: "100%",
                          maxHeight: 120,
                          objectFit: "contain",
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.4rem",
                        mb: 3,
                        color: "#1a202c",
                        textAlign: "center",
                        lineHeight: 1.3,
                      }}
                    >
                      Jobs for Women
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pt: 3,
                      borderTop: "1px solid #e2e8f0",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "#4a5568",
                      }}
                    >
                      View all jobs
                    </Typography>
                    <IconButton
                      sx={{
                        color: "white",
                        bgcolor: "#3b82f6",
                        "&:hover": {
                          bgcolor: "#2563eb",
                          transform: "translateX(4px)",
                        },
                        transition: "all 0.2s ease",
                        width: 36,
                        height: 36,
                        boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      <ArrowForward sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Work from home Jobs - TRENDING AT #2 */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card
                sx={{
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
                  color: "#1a202c",
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    borderColor: "#cbd5e0",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: "white",
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <TrendingUp sx={{ fontSize: 18, color: "#dc2626" }} />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          color: "#1a202c",
                          letterSpacing: "0.5px",
                        }}
                      >
                        TRENDING AT #2
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        minWidth: 250,
                        minHeight: 120,
                      }}
                    >
                      <img
                        src="https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/women-jobs.png"
                        alt="Work from home Jobs"
                        style={{
                          width: "100%",
                          height: "100%",
                          maxHeight: 120,
                          objectFit: "contain",
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.4rem",
                        mb: 3,
                        color: "#1a202c",
                        textAlign: "center",
                        lineHeight: 1.3,
                      }}
                    >
                      Work from home Jobs
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pt: 3,
                      borderTop: "1px solid #e2e8f0",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "#4a5568",
                      }}
                    >
                      View all jobs
                    </Typography>
                    <IconButton
                      sx={{
                        color: "white",
                        bgcolor: "#3b82f6",
                        "&:hover": {
                          bgcolor: "#2563eb",
                          transform: "translateX(4px)",
                        },
                        transition: "all 0.2s ease",
                        width: 36,
                        height: 36,
                        boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      <ArrowForward sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* International Jobs - TRENDING AT #5 */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Card
                sx={{
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)",
                  color: "#1a202c",
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    borderColor: "#cbd5e0",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: "white",
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <TrendingUp sx={{ fontSize: 18, color: "#dc2626" }} />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          color: "#1a202c",
                          letterSpacing: "0.5px",
                        }}
                      >
                        TRENDING AT #5
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        minWidth: 250,
                        minHeight: 120,
                      }}
                    >
                      <img
                        src="	https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/international-jobs.png"
                        alt="International Jobs"
                        style={{
                          width: "100%",
                          height: "100%",
                          maxHeight: 120,
                          objectFit: "contain",
                        }}
                      />
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.4rem",
                        mb: 3,
                        color: "#1a202c",
                        textAlign: "center",
                        lineHeight: 1.3,
                      }}
                    >
                      International Jobs
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pt: 3,
                      borderTop: "1px solid #e2e8f0",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: "#4a5568",
                      }}
                    >
                      View all jobs
                    </Typography>
                    <IconButton
                      sx={{
                        color: "white",
                        bgcolor: "#3b82f6",
                        "&:hover": {
                          bgcolor: "#2563eb",
                          transform: "translateX(4px)",
                        },
                        transition: "all 0.2s ease",
                        width: 36,
                        height: 36,
                        boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)",
                      }}
                    >
                      <ArrowForward sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Jobs Section */}
      <Box sx={{ py: 8, bgcolor: "#f8fafc" }}>
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
              Featured Jobs
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
              Discover your perfect role from thousands of opportunities across
              various industries
            </Typography>
          </Box>

          {/* Department Filter Buttons */}
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 2,
                mb: 4,
              }}
            >
              {[
                { id: "all", label: "All Departments" },
                { id: "tech", label: "Technology" },
                { id: "marketing", label: "Marketing" },
                { id: "sales", label: "Sales" },
                { id: "design", label: "Design" },
                { id: "finance", label: "Finance" },
                { id: "hr", label: "Human Resources" },
                { id: "operations", label: "Operations" },
              ].map((department) => (
                <Button
                  key={department.id}
                  variant={
                    activeDepartment === department.id
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => setActiveDepartment(department.id)}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "0.95rem",
                    border: "2px solid",
                    borderColor:
                      activeDepartment === department.id
                        ? "#3b82f6"
                        : "#e2e8f0",
                    backgroundColor:
                      activeDepartment === department.id
                        ? "#3b82f6"
                        : "transparent",
                    color:
                      activeDepartment === department.id ? "white" : "#64748b",
                    "&:hover": {
                      backgroundColor:
                        activeDepartment === department.id
                          ? "#2563eb"
                          : "#f1f5f9",
                      borderColor:
                        activeDepartment === department.id
                          ? "#2563eb"
                          : "#cbd5e1",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {department.label}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Job Cards Grid */}
          <Grid container spacing={3}>
            {filteredJobs.map((job, index) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <Card
                  sx={{
                    height: "100%",
                    background: "white",
                    borderRadius: 3,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: "1px solid #e2e8f0",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      borderColor: "#3b82f6",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Job Header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        mb: 3,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontSize: "1.2rem",
                            color: "#1a202c",
                            mb: 1,
                          }}
                        >
                          {job.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#64748b",
                            fontWeight: 500,
                          }}
                        >
                          {job.company}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: 2,
                          bgcolor: "#f1f5f9",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={job.logo}
                          alt={job.company}
                          style={{
                            width: "70%",
                            height: "70%",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Job Details */}
                    <Box sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <Place sx={{ fontSize: 18, color: "#64748b" }} />
                        <Typography
                          variant="body2"
                          sx={{ color: "#64748b", fontWeight: 500 }}
                        >
                          {job.location}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <BusinessCenter
                          sx={{ fontSize: 18, color: "#64748b" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "#64748b", fontWeight: 500 }}
                        >
                          {job.type}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <AttachMoney sx={{ fontSize: 18, color: "#64748b" }} />
                        <Typography
                          variant="body2"
                          sx={{ color: "#64748b", fontWeight: 500 }}
                        >
                          {job.salary}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Skills Tags */}
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}
                    >
                      {job.skills.map((skill, skillIndex) => (
                        <Box
                          key={skillIndex}
                          sx={{
                            bgcolor: "#f1f5f9",
                            borderRadius: 2,
                            px: 1.5,
                            py: 0.5,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 500,
                              color: "#475569",
                              fontSize: "0.75rem",
                            }}
                          >
                            {skill}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    {/* Job Footer */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#94a3b8",
                          fontWeight: 500,
                        }}
                      >
                        {job.posted}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          borderRadius: 2,
                          px: 3,
                          py: 1,
                          fontWeight: 600,
                          textTransform: "none",
                          fontSize: "0.85rem",
                          bgcolor: "#3b82f6",
                          "&:hover": {
                            bgcolor: "#2563eb",
                            transform: "translateY(-1px)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        Apply Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* View More Button */}
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: 3,
                px: 6,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem",
                border: "2px solid #3b82f6",
                color: "#3b82f6",
                "&:hover": {
                  backgroundColor: "#3b82f6",
                  color: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              View All Jobs
            </Button>
          </Box>
        </Container>
      </Box>
      {/* Popular Job Categories Section */}
<Box sx={{ py: 8, bgcolor: "white", overflow: "hidden" }}>
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
        Popular Job Categories
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
        Explore the most in-demand job categories with thousands of opportunities waiting for you
      </Typography>
    </Box>

    {/* Marquee Container */}
    <Box sx={{ position: "relative", mb: 4 }}>
      {/* First Row - Right to Left */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mb: 3,
          animation: "marqueeRightToLeft 30s linear infinite",
          "&:hover": {
            animationPlayState: "paused",
          },
          "@keyframes marqueeRightToLeft": {
            "0%": {
              transform: "translateX(0%)",
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
            title: "Software Development",
            jobs: "12,345 jobs",
            icon: "💻",
            color: "#3b82f6"
          },
          {
            id: 2,
            title: "Digital Marketing",
            jobs: "8,765 jobs",
            icon: "📱",
            color: "#10b981"
          },
          {
            id: 3,
            title: "Data Science",
            jobs: "5,432 jobs",
            icon: "📊",
            color: "#8b5cf6"
          },
          {
            id: 4,
            title: "Graphic Design",
            jobs: "3,210 jobs",
            icon: "🎨",
            color: "#f59e0b"
          },
          {
            id: 5,
            title: "Sales & Business",
            jobs: "9,876 jobs",
            icon: "💼",
            color: "#ef4444"
          },
          {
            id: 6,
            title: "Customer Support",
            jobs: "4,321 jobs",
            icon: "👥",
            color: "#06b6d4"
          },
        ].map((category) => (
          <Box
            key={category.id}
            sx={{
              flex: "0 0 300px",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: "1px solid #e2e8f0",
              borderRadius: 3,
              p: 3,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: category.color,
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  bgcolor: `${category.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                  fontSize: "1.5rem",
                }}
              >
                {category.icon}
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    color: "#1a202c",
                    mb: 0.5,
                  }}
                >
                  {category.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748b",
                    fontWeight: 500,
                  }}
                >
                  {category.jobs}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: 4,
                bgcolor: "#f1f5f9",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "70%",
                  height: "100%",
                  bgcolor: category.color,
                  borderRadius: 2,
                }}
              />
            </Box>
          </Box>
        ))}
        {/* Duplicate for seamless loop */}
        {[
          {
            id: 1,
            title: "Software Development",
            jobs: "12,345 jobs",
            icon: "💻",
            color: "#3b82f6"
          },
          {
            id: 2,
            title: "Digital Marketing",
            jobs: "8,765 jobs",
            icon: "📱",
            color: "#10b981"
          },
          {
            id: 3,
            title: "Data Science",
            jobs: "5,432 jobs",
            icon: "📊",
            color: "#8b5cf6"
          },
          {
            id: 4,
            title: "Graphic Design",
            jobs: "3,210 jobs",
            icon: "🎨",
            color: "#f59e0b"
          },
          {
            id: 5,
            title: "Sales & Business",
            jobs: "9,876 jobs",
            icon: "💼",
            color: "#ef4444"
          },
          {
            id: 6,
            title: "Customer Support",
            jobs: "4,321 jobs",
            icon: "👥",
            color: "#06b6d4"
          },
        ].map((category, index) => (
          <Box
            key={`duplicate-${category.id}-${index}`}
            sx={{
              flex: "0 0 300px",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: "1px solid #e2e8f0",
              borderRadius: 3,
              p: 3,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: category.color,
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  bgcolor: `${category.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                  fontSize: "1.5rem",
                }}
              >
                {category.icon}
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    color: "#1a202c",
                    mb: 0.5,
                  }}
                >
                  {category.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748b",
                    fontWeight: 500,
                  }}
                >
                  {category.jobs}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: 4,
                bgcolor: "#f1f5f9",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "70%",
                  height: "100%",
                  bgcolor: category.color,
                  borderRadius: 2,
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Second Row - Left to Right */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          animation: "marqueeLeftToRight 25s linear infinite",
          "&:hover": {
            animationPlayState: "paused",
          },
          "@keyframes marqueeLeftToRight": {
            "0%": {
              transform: "translateX(-50%)",
            },
            "100%": {
              transform: "translateX(0%)",
            },
          },
        }}
      >
        {[
          {
            id: 7,
            title: "Healthcare",
            jobs: "7,890 jobs",
            icon: "🏥",
            color: "#ec4899"
          },
          {
            id: 8,
            title: "Education",
            jobs: "3,456 jobs",
            icon: "📚",
            color: "#84cc16"
          },
          {
            id: 9,
            title: "Finance & Accounting",
            jobs: "6,543 jobs",
            icon: "💰",
            color: "#f97316"
          },
          {
            id: 10,
            title: "HR & Recruitment",
            jobs: "2,345 jobs",
            icon: "👔",
            color: "#6366f1"
          },
          {
            id: 11,
            title: "Product Management",
            jobs: "4,567 jobs",
            icon: "🎯",
            color: "#14b8a6"
          },
          {
            id: 12,
            title: "Content Writing",
            jobs: "3,210 jobs",
            icon: "✍️",
            color: "#d946ef"
          },
        ].map((category) => (
          <Box
            key={category.id}
            sx={{
              flex: "0 0 300px",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: "1px solid #e2e8f0",
              borderRadius: 3,
              p: 3,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: category.color,
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  bgcolor: `${category.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                  fontSize: "1.5rem",
                }}
              >
                {category.icon}
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    color: "#1a202c",
                    mb: 0.5,
                  }}
                >
                  {category.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748b",
                    fontWeight: 500,
                  }}
                >
                  {category.jobs}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: 4,
                bgcolor: "#f1f5f9",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "60%",
                  height: "100%",
                  bgcolor: category.color,
                  borderRadius: 2,
                }}
              />
            </Box>
          </Box>
        ))}
        {/* Duplicate for seamless loop */}
        {[
          {
            id: 7,
            title: "Healthcare",
            jobs: "7,890 jobs",
            icon: "🏥",
            color: "#ec4899"
          },
          {
            id: 8,
            title: "Education",
            jobs: "3,456 jobs",
            icon: "📚",
            color: "#84cc16"
          },
          {
            id: 9,
            title: "Finance & Accounting",
            jobs: "6,543 jobs",
            icon: "💰",
            color: "#f97316"
          },
          {
            id: 10,
            title: "HR & Recruitment",
            jobs: "2,345 jobs",
            icon: "👔",
            color: "#6366f1"
          },
          {
            id: 11,
            title: "Product Management",
            jobs: "4,567 jobs",
            icon: "🎯",
            color: "#14b8a6"
          },
          {
            id: 12,
            title: "Content Writing",
            jobs: "3,210 jobs",
            icon: "✍️",
            color: "#d946ef"
          },
        ].map((category, index) => (
          <Box
            key={`duplicate-${category.id}-${index}`}
            sx={{
              flex: "0 0 300px",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: "1px solid #e2e8f0",
              borderRadius: 3,
              p: 3,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: category.color,
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  bgcolor: `${category.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                  fontSize: "1.5rem",
                }}
              >
                {category.icon}
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    color: "#1a202c",
                    mb: 0.5,
                  }}
                >
                  {category.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748b",
                    fontWeight: 500,
                  }}
                >
                  {category.jobs}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: 4,
                bgcolor: "#f1f5f9",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "60%",
                  height: "100%",
                  bgcolor: category.color,
                  borderRadius: 2,
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>

    {/* View All Categories Button */}
    <Box sx={{ textAlign: "center", mt: 6 }}>
      <Button
        variant="contained"
        sx={{
          borderRadius: 3,
          px: 6,
          py: 1.5,
          fontWeight: 600,
          textTransform: "none",
          fontSize: "1rem",
          bgcolor: "#3b82f6",
          "&:hover": {
            bgcolor: "#2563eb",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
          },
          transition: "all 0.3s ease",
        }}
      >
        Browse All Categories
      </Button>
    </Box>
  </Container>
</Box>

{/* Testimonials Section */}
<Box sx={{ py: 8, bgcolor: "#f8fafc" }}>
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
        Testimonials From Our Customers
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
        Discover what job seekers and employers are saying about their experience with Job Chashiye
      </Typography>
    </Box>

    {/* Testimonials Slider */}
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          animation: "slideInfinite 60s linear infinite",
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
            name: "Priya Sharma",
            role: "Software Developer",
            company: "TechSolutions",
            rating: 5,
            text: "Job Chashiye helped me land my dream job at a top tech company. The platform is incredibly user-friendly and the job recommendations were spot on!",
            avatar: "👩‍💻"
          },
          {
            id: 2,
            name: "Rahul Kumar",
            role: "Marketing Manager",
            company: "GrowthHub",
            rating: 5,
            text: "As a hiring manager, I found the perfect candidates through Job Chashiye. The quality of applicants is exceptional and saved us so much time.",
            avatar: "👨‍💼"
          },
          {
            id: 3,
            name: "Anita Patel",
            role: "UX Designer",
            company: "DesignStudio",
            rating: 4,
            text: "The application process was seamless and I received multiple interview calls within a week. Highly recommended for creative professionals!",
            avatar: "👩‍🎨"
          },
          {
            id: 4,
            name: "Vikram Singh",
            role: "Data Scientist",
            company: "DataInsights",
            rating: 5,
            text: "Found my current role through Job Chashiye. The AI-powered job matching is incredibly accurate and the support team is very responsive.",
            avatar: "👨‍🔬"
          },
          {
            id: 5,
            name: "Sneha Reddy",
            role: "Product Manager",
            company: "ProductLabs",
            rating: 5,
            text: "After months of searching, Job Chashiye connected me with the perfect opportunity. The salary insights and company reviews were very helpful.",
            avatar: "👩‍💼"
          },
          {
            id: 6,
            name: "Amit Verma",
            role: "HR Director",
            company: "PeopleFirst",
            rating: 4,
            text: "We've hired over 50 employees through Job Chashiye. The platform makes recruitment efficient and cost-effective for growing companies.",
            avatar: "👨‍💻"
          },
        ].map((testimonial) => (
          <Card
            key={testimonial.id}
            sx={{
              flex: "0 0 400px",
              background: "white",
              borderRadius: 3,
              p: 3,
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: "#3b82f6",
              },
            }}
          >
            {/* Rating Stars */}
            <Box sx={{ display: "flex", gap: 0.5, mb: 3 }}>
              {[...Array(5)].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    color: index < testimonial.rating ? "#fbbf24" : "#e2e8f0",
                    fontSize: "1.2rem",
                  }}
                >
                  ★
                </Box>
              ))}
            </Box>

            {/* Testimonial Text */}
            <Typography
              variant="body1"
              sx={{
                color: "#475569",
                lineHeight: 1.7,
                mb: 3,
                fontStyle: "italic",
                fontSize: "0.95rem",
              }}
            >
              "{testimonial.text}"
            </Typography>

            {/* User Info */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  bgcolor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  flexShrink: 0,
                }}
              >
                {testimonial.avatar}
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1rem",
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
                    fontSize: "0.85rem",
                  }}
                >
                  {testimonial.role} at {testimonial.company}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
        
        {/* Duplicate for seamless loop */}
        {[
          {
            id: 1,
            name: "Priya Sharma",
            role: "Software Developer",
            company: "TechSolutions",
            rating: 5,
            text: "Job Chashiye helped me land my dream job at a top tech company. The platform is incredibly user-friendly and the job recommendations were spot on!",
            avatar: "👩‍💻"
          },
          {
            id: 2,
            name: "Rahul Kumar",
            role: "Marketing Manager",
            company: "GrowthHub",
            rating: 5,
            text: "As a hiring manager, I found the perfect candidates through Job Chashiye. The quality of applicants is exceptional and saved us so much time.",
            avatar: "👨‍💼"
          },
          {
            id: 3,
            name: "Anita Patel",
            role: "UX Designer",
            company: "DesignStudio",
            rating: 4,
            text: "The application process was seamless and I received multiple interview calls within a week. Highly recommended for creative professionals!",
            avatar: "👩‍🎨"
          },
          {
            id: 4,
            name: "Vikram Singh",
            role: "Data Scientist",
            company: "DataInsights",
            rating: 5,
            text: "Found my current role through Job Chashiye. The AI-powered job matching is incredibly accurate and the support team is very responsive.",
            avatar: "👨‍🔬"
          },
          {
            id: 5,
            name: "Sneha Reddy",
            role: "Product Manager",
            company: "ProductLabs",
            rating: 5,
            text: "After months of searching, Job Chashiye connected me with the perfect opportunity. The salary insights and company reviews were very helpful.",
            avatar: "👩‍💼"
          },
          {
            id: 6,
            name: "Amit Verma",
            role: "HR Director",
            company: "PeopleFirst",
            rating: 4,
            text: "We've hired over 50 employees through Job Chashiye. The platform makes recruitment efficient and cost-effective for growing companies.",
            avatar: "👨‍💻"
          },
        ].map((testimonial, index) => (
          <Card
            key={`duplicate-${testimonial.id}-${index}`}
            sx={{
              flex: "0 0 400px",
              background: "white",
              borderRadius: 3,
              p: 3,
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: "#3b82f6",
              },
            }}
          >
            {/* Rating Stars */}
            <Box sx={{ display: "flex", gap: 0.5, mb: 3 }}>
              {[...Array(5)].map((_, starIndex) => (
                <Box
                  key={starIndex}
                  sx={{
                    color: starIndex < testimonial.rating ? "#fbbf24" : "#e2e8f0",
                    fontSize: "1.2rem",
                  }}
                >
                  ★
                </Box>
              ))}
            </Box>

            {/* Testimonial Text */}
            <Typography
              variant="body1"
              sx={{
                color: "#475569",
                lineHeight: 1.7,
                mb: 3,
                fontStyle: "italic",
                fontSize: "0.95rem",
              }}
            >
              "{testimonial.text}"
            </Typography>

            {/* User Info */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  bgcolor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  flexShrink: 0,
                }}
              >
                {testimonial.avatar}
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: "1rem",
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
                    fontSize: "0.85rem",
                  }}
                >
                  {testimonial.role} at {testimonial.company}
                </Typography>
              </Box>
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
          background: "linear-gradient(90deg, #f8fafc 0%, transparent 100%)",
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
          background: "linear-gradient(270deg, #f8fafc 0%, transparent 100%)",
          zIndex: 2,
        }}
      />
    </Box>

    {/* Navigation Dots */}
    <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 4 }}>
      {[1, 2, 3, 4, 5, 6].map((dot) => (
        <Box
          key={dot}
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: dot === 1 ? "#3b82f6" : "#cbd5e1",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "#3b82f6",
              transform: "scale(1.2)",
            },
          }}
        />
      ))}
    </Box>

    {/* CTA Section */}
    <Box sx={{ textAlign: "center", mt: 6 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: "#1a202c",
          mb: 3,
        }}
      >
        Ready to start your journey?
      </Typography>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
        <Button
          variant="contained"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
            bgcolor: "#3b82f6",
            "&:hover": {
              bgcolor: "#2563eb",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Find Your Dream Job
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
            border: "2px solid #3b82f6",
            color: "#3b82f6",
            "&:hover": {
              backgroundColor: "#3b82f6",
              color: "white",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Post a Job
        </Button>
      </Box>
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
