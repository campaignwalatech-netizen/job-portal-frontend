import { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CodeIcon from "@mui/icons-material/Code";
import PeopleIcon from "@mui/icons-material/People";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonIcon from "@mui/icons-material/Person";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SchoolIcon from "@mui/icons-material/School";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ConstructionIcon from "@mui/icons-material/Construction";

const categories = [
  { 
    title: 'Development', 
    positions: 12, 
    Icon: CodeIcon, 
    bg: 'bg-blue-50', 
    color: 'text-blue-600' 
  },
  { 
    title: 'Human Resource', 
    positions: 55, 
    Icon: PeopleIcon, 
    bg: 'bg-blue-50', 
    color: 'text-blue-600' 
  },
  { 
    title: 'Automotive Jobs', 
    positions: 2, 
    Icon: RocketLaunchIcon, 
    bg: 'bg-blue-50', 
    color: 'text-blue-600' 
  },
  { 
    title: 'Customer Service', 
    positions: 2, 
    Icon: HeadphonesIcon, 
    bg: 'bg-blue-50', 
    color: 'text-blue-600' 
  },
  { 
    title: 'Health and Care', 
    positions: 25, 
    Icon: BusinessCenterIcon, 
    bg: 'bg-blue-50', 
    color: 'text-blue-600' 
  },
  { 
    title: 'Project Management', 
    positions: 92, 
    Icon: PersonIcon, 
    bg: 'bg-blue-50', 
    color: 'text-blue-600' 
  },
  { 
    title: 'Marketing', 
    positions: 18, 
    Icon: BusinessCenterIcon, 
    bg: 'bg-blue-50', 
    color: 'text-blue-600' 
  },
  { 
    title: 'Design', 
    positions: 42, 
    Icon: DesignServicesIcon, 
    bg: 'bg-blue-50', 
    color: 'text-blue-600' 
  },
  { 
    title: 'Sales', 
    positions: 15, 
    Icon: BusinessCenterIcon, 
    bg: 'bg-blue-50', 
    color: 'text-blue-600' 
  },
  { 
    title: 'Finance', 
    positions: 8, 
    Icon: AttachMoneyIcon, 
    bg: 'bg-blue-50', 
    color: 'text-blue-600' 
  },
  { 
    title: 'Engineering', 
    positions: 34, 
    Icon: EngineeringIcon, 
    bg: 'bg-blue-50', 
    color: 'text-blue-600' 
  },
  { 
    title: 'Teaching', 
    positions: 12, 
    Icon: SchoolIcon, 
    bg: 'bg-blue-50', 
    color: 'text-blue-600' 
  },
  { 
    title: 'Medical', 
    positions: 45, 
    Icon: MedicalServicesIcon, 
    bg: 'bg-blue-50', 
    color: 'text-blue-600' 
  },
  { 
    title: 'Construction', 
    positions: 7, 
    Icon: ConstructionIcon, 
    bg: 'bg-blue-50', 
    color: 'text-blue-600' 
  },
];

// Create marquee rows (first 7 categories duplicated for first row, next 7 duplicated for second row)
const firstRowCategories = [...categories.slice(0, 7), ...categories.slice(0, 7)];
const secondRowCategories = [...categories.slice(7, 14), ...categories.slice(7, 14)];

export default function PopularJobCategories() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <Box 
      sx={{ 
        py: { xs: 6, sm: 10, md: 12, lg: 16, xl: 20 },
        backgroundColor: "#fff",
        overflow: "hidden",
        opacity: 1,
        width: "100%",
      }}
    >
      {/* Inline CSS for animations */}
      <style>
        {`
          @keyframes marquee-slow {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          @keyframes marquee-reverse-slow {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }
          
          .animate-marquee-slow {
            animation: marquee-slow 60s linear infinite;
          }
          
          .animate-marquee-reverse-slow {
            animation: marquee-reverse-slow 60s linear infinite;
          }
          
          .animate-marquee-slow:hover,
          .animate-marquee-reverse-slow:hover {
            animation-play-state: paused;
          }
          
          /* Responsive animation speeds */
          @media (max-width: 480px) {
            .animate-marquee-slow {
              animation: marquee-slow 120s linear infinite;
            }
            
            .animate-marquee-reverse-slow {
              animation: marquee-reverse-slow 120s linear infinite;
            }
          }
          
          @media (min-width: 481px) and (max-width: 768px) {
            .animate-marquee-slow {
              animation: marquee-slow 100s linear infinite;
            }
            
            .animate-marquee-reverse-slow {
              animation: marquee-reverse-slow 100s linear infinite;
            }
          }
          
          @media (min-width: 769px) and (max-width: 1024px) {
            .animate-marquee-slow {
              animation: marquee-slow 80s linear infinite;
            }
            
            .animate-marquee-reverse-slow {
              animation: marquee-reverse-slow 80s linear infinite;
            }
          }
          
          @media (min-width: 1025px) and (max-width: 1440px) {
            .animate-marquee-slow {
              animation: marquee-slow 70s linear infinite;
            }
            
            .animate-marquee-reverse-slow {
              animation: marquee-reverse-slow 70s linear infinite;
            }
          }
          
          @media (min-width: 1441px) {
            .animate-marquee-slow {
              animation: marquee-slow 60s linear infinite;
            }
            
            .animate-marquee-reverse-slow {
              animation: marquee-reverse-slow 60s linear infinite;
            }
          }
        `}
      </style>
      
      <Box 
        sx={{ 
          maxWidth: { xs: "100%", sm: "640px", md: "768px", lg: "1024px", xl: "1200px", xxl: "1400px" },
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
        }}
      >
        {/* HEADER */}
        <Box sx={{ 
          textAlign: "center", 
          mb: { xs: 6, sm: 8, md: 10, lg: 12 } 
        }}>
          <Typography
            sx={{
              fontSize: { 
                xs: "1.25rem",    // Mobile: text-xl
                sm: "1.5rem",     // Small: text-2xl
                md: "1.875rem",   // Medium: text-3xl
                lg: "2.25rem",    // Large: text-4xl
                xl: "2.5rem",     // Extra large: text-5xl
              },
              fontWeight: { xs: 600, sm: 700 },
              color: "#1a2b48",
              mb: { xs: 1, sm: 1.5, md: 2, lg: 2.5 },
              lineHeight: { xs: 1.3, sm: 1.2 },
              px: { xs: 1, sm: 0 },
            }}
          >
            Popular Job Categories
          </Typography>
          
          <Typography
            sx={{
              fontSize: { 
                xs: "0.75rem",    // Mobile: text-xs
                sm: "0.875rem",   // Small: text-sm
                md: "1rem",       // Medium: text-base
              },
              color: "#6b7280",
              lineHeight: 1.5,
              px: { xs: 1, sm: 0 },
            }}
          >
            2020 jobs live - 293 added today.
          </Typography>
        </Box>
      </Box>

      {/* MARQUEE CONTAINER */}
      <Box 
        sx={{ 
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, sm: 3, md: 4, lg: 5 },
          width: "100%",
          mb: { xs: 6, sm: 8, md: 10, lg: 12 },
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* FIRST ROW - Right to Left */}
        <Box 
          className="animate-marquee-slow"
          sx={{
            display: "flex",
            gap: { 
              xs: 2,    // Mobile
              sm: 3,    // Small tablet
              md: 4,    // Tablet
              lg: 5,    // Desktop
              xl: 6,    // Large desktop
            },
            width: "max-content",
            minWidth: "100%",
            "&:hover": {
              animationPlayState: "paused",
            },
          }}
        >
          {firstRowCategories.map((cat, index) => (
            <Box
              key={index}
              sx={{
                width: { 
                  xs: 200,   // Mobile
                  sm: 240,   // Small tablet
                  md: 280,   // Tablet
                  lg: 300,   // Desktop
                  xl: 320,   // Large desktop
                  xxl: 340,  // Extra large desktop
                },
                backgroundColor: "#fff",
                border: "1px solid",
                borderColor: "#dbeafe",
                borderRadius: { xs: "0.5rem", sm: "0.625rem", md: "0.75rem" }, // rounded-lg to rounded-xl
                p: { 
                  xs: 2,     // Mobile
                  sm: 2.5,   // Small tablet
                  md: 3,     // Tablet
                  lg: 3.5,   // Desktop
                  xl: 4,     // Large desktop
                },
                display: "flex",
                alignItems: "center",
                gap: { 
                  xs: 1.5,   // Mobile
                  sm: 2,     // Small tablet
                  md: 2.5,   // Tablet
                  lg: 3,     // Desktop
                },
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: { 
                    xs: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    sm: "0 20px 25px -5px rgba(0,0,0,0.1)",
                  },
                  borderColor: "#93c5fd",
                  transform: { xs: "scale(1.01)", sm: "scale(1.02)" },
                },
                "&:active": {
                  transform: "scale(1)",
                },
              }}
            >
              {/* ICON CONTAINER */}
              <Box
                sx={{
                  width: { 
                    xs: 48,   // Mobile
                    sm: 52,   // Small tablet
                    md: 56,   // Tablet
                    lg: 60,   // Desktop
                    xl: 64,   // Large desktop
                  },
                  height: { 
                    xs: 48,
                    sm: 52,
                    md: 56,
                    lg: 60,
                    xl: 64,
                  },
                  borderRadius: { xs: "0.375rem", sm: "0.5rem" }, // rounded-md to rounded-lg
                  backgroundColor: "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2563eb",
                  flexShrink: 0,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#2563eb",
                    color: "#fff",
                  },
                }}
              >
                <cat.Icon 
                  sx={{ 
                    width: { 
                      xs: 20,   // Mobile
                      sm: 24,   // Small tablet
                      md: 26,   // Tablet
                      lg: 28,   // Desktop
                      xl: 32,   // Large desktop
                    },
                    height: { 
                      xs: 20,
                      sm: 24,
                      md: 26,
                      lg: 28,
                      xl: 32,
                    },
                  }} 
                />
              </Box>

              {/* TEXT CONTENT */}
              <Box sx={{ 
                flex: 1, 
                minWidth: 0,
                overflow: "hidden",
              }}>
                <Typography
                  sx={{
                    fontSize: { 
                      xs: "0.875rem",   // Mobile: text-sm
                      sm: "0.9375rem",  // Small tablet: text-sm-lg
                      md: "1rem",       // Tablet: text-base
                      lg: "1.125rem",   // Desktop: text-lg
                      xl: "1.25rem",    // Large desktop: text-xl
                    },
                    fontWeight: { xs: 600, sm: 700 },
                    color: "#1a2b48",
                    mb: { xs: 0.25, sm: 0.5 },
                    lineHeight: 1.3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { 
                      xs: "0.6875rem",  // Mobile: text-xs-sm
                      sm: "0.75rem",    // Small tablet: text-xs
                      md: "0.8125rem",  // Tablet: text-sm-sm
                      lg: "0.875rem",   // Desktop: text-sm
                    },
                    color: "#6b7280",
                    lineHeight: 1.4,
                  }}
                >
                  ({cat.positions} open positions)
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* SECOND ROW - Left to Right */}
        <Box 
          className="animate-marquee-reverse-slow"
          sx={{
            display: "flex",
            gap: { 
              xs: 2,
              sm: 3,
              md: 4,
              lg: 5,
              xl: 6,
            },
            width: "max-content",
            minWidth: "100%",
            "&:hover": {
              animationPlayState: "paused",
            },
          }}
        >
          {secondRowCategories.map((cat, index) => (
            <Box
              key={index}
              sx={{
                width: { 
                  xs: 200,
                  sm: 240,
                  md: 280,
                  lg: 300,
                  xl: 320,
                  xxl: 340,
                },
                backgroundColor: "#fff",
                border: "1px solid",
                borderColor: "#dbeafe",
                borderRadius: { xs: "0.5rem", sm: "0.625rem", md: "0.75rem" },
                p: { 
                  xs: 2,
                  sm: 2.5,
                  md: 3,
                  lg: 3.5,
                  xl: 4,
                },
                display: "flex",
                alignItems: "center",
                gap: { 
                  xs: 1.5,
                  sm: 2,
                  md: 2.5,
                  lg: 3,
                },
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: { 
                    xs: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    sm: "0 20px 25px -5px rgba(0,0,0,0.1)",
                  },
                  borderColor: "#93c5fd",
                  transform: { xs: "scale(1.01)", sm: "scale(1.02)" },
                },
                "&:active": {
                  transform: "scale(1)",
                },
              }}
            >
              {/* ICON CONTAINER */}
              <Box
                sx={{
                  width: { 
                    xs: 48,
                    sm: 52,
                    md: 56,
                    lg: 60,
                    xl: 64,
                  },
                  height: { 
                    xs: 48,
                    sm: 52,
                    md: 56,
                    lg: 60,
                    xl: 64,
                  },
                  borderRadius: { xs: "0.375rem", sm: "0.5rem" },
                  backgroundColor: "#eff6ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2563eb",
                  flexShrink: 0,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#2563eb",
                    color: "#fff",
                  },
                }}
              >
                <cat.Icon 
                  sx={{ 
                    width: { 
                      xs: 20,
                      sm: 24,
                      md: 26,
                      lg: 28,
                      xl: 32,
                    },
                    height: { 
                      xs: 20,
                      sm: 24,
                      md: 26,
                      lg: 28,
                      xl: 32,
                    },
                  }} 
                />
              </Box>

              {/* TEXT CONTENT */}
              <Box sx={{ 
                flex: 1, 
                minWidth: 0,
                overflow: "hidden",
              }}>
                <Typography
                  sx={{
                    fontSize: { 
                      xs: "0.875rem",
                      sm: "0.9375rem",
                      md: "1rem",
                      lg: "1.125rem",
                      xl: "1.25rem",
                    },
                    fontWeight: { xs: 600, sm: 700 },
                    color: "#1a2b48",
                    mb: { xs: 0.25, sm: 0.5 },
                    lineHeight: 1.3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { 
                      xs: "0.6875rem",
                      sm: "0.75rem",
                      md: "0.8125rem",
                      lg: "0.875rem",
                    },
                    color: "#6b7280",
                    lineHeight: 1.4,
                  }}
                >
                  ({cat.positions} open positions)
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* VIEW ALL BUTTON */}
      <Box 
        sx={{ 
          maxWidth: { xs: "100%", sm: "640px", md: "768px", lg: "1024px", xl: "1200px", xxl: "1400px" },
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
        }}
      >
        <Box sx={{ 
          textAlign: "center",
          px: { xs: 1, sm: 0 },
        }}>
          <Button
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1e63d6",
              fontWeight: { xs: 600, sm: 700 },
              border: "1px solid",
              borderColor: "#bfdbfe",
              px: { 
                xs: 3,    // Mobile
                sm: 4,    // Small tablet
                md: 5,    // Tablet
                lg: 6,    // Desktop
              },
              py: { 
                xs: 1.5,  // Mobile
                sm: 2,    // Small tablet
                md: 2.25, // Tablet
                lg: 2.5,  // Desktop
              },
              borderRadius: { xs: "0.375rem", sm: "0.5rem" }, // rounded-md to rounded-lg
              textTransform: "none",
              fontSize: { 
                xs: "0.8125rem",  // Mobile: text-sm-sm
                sm: "0.875rem",   // Small tablet: text-sm
                md: "0.9375rem",  // Tablet: text-base-sm
                lg: "1rem",       // Desktop: text-base
              },
              backgroundColor: "transparent",
              minWidth: { xs: "140px", sm: "160px" },
              "&:hover": {
                backgroundColor: "#eff6ff",
                borderColor: "#93c5fd",
              },
              "&:active": {
                backgroundColor: "#dbeafe",
              },
              transition: "all 0.3s ease",
            }}
          >
            View All 
            <ChevronRightIcon 
              sx={{ 
                width: { xs: 14, sm: 16, md: 18 },
                height: { xs: 14, sm: 16, md: 18 },
                ml: { xs: 0.5, sm: 1 },
                transform: "rotate(-90deg)",
              }} 
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}