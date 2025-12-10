import { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { ReactTyped } from "react-typed";
import { keyframes } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InputAdornment from "@mui/material/InputAdornment";

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(100px); }
  to { opacity: 1; transform: translateX(0); }
`;

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function Hero() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(to bottom, #ffffff, #bbcef8ff)",
        pt: { xs: 8, sm: 10, md: 12 }, // Increased mobile padding
        pb: { xs: 14, md: 20 },
        mt: "-2px",
        position: "relative",
        overflow: "hidden",        
      }}
    >
      <Box
        sx={{
          maxWidth: "1500px",
          mx: "auto",
          px: { xs: 2.5, sm: 4, md: 6 }, // Increased mobile padding
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 4, md: 2 },
        }}
      >
        {/* LEFT CONTENT */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            animation: `${slideInLeft} 0.9s ease-out`,
            pb: { xs: 0, sm: 0, md: 0 },
          }}
        >
          <Typography
            component="div"
            sx={{
              fontSize: { xs: 20, sm: 22, md: 27 },
              fontWeight: 500,
              mb: 1,
              color: "#202124",
              lineHeight: 1.4,
              fontFamily: "Poppins",
            }}
          >
            {/* DESKTOP VERSION (same layout) */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
              Deliberately chosen{" "}
              <span
                style={{
                  color: "#1e63d6",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "Poppins",
                }}
              >
                <ReactTyped
                  strings={[
                    "Backend Developer",
                    "UI/UX Designer",
                    "Blockchain Engineer",
                    "Python Developer",
                    "Frontend Developer",
                  ]}
                  typeSpeed={45}
                  backSpeed={30}
                  loop
                />
              </span>{" "}
              Jobs
            </Box>

            {/* MOBILE VERSION - FIXED TEXT OVERFLOW */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              Deliberately chosen{" "}
              <Box 
                component="span"
                sx={{ 
                  display: "inline-flex", 
                  alignItems: "center",
                  color: "#1e63d6",
                  fontWeight: 600,
                  maxWidth: "100%",
                  overflow: "visible",
                  verticalAlign: "bottom",
                  height: "28px" // Fixed height to prevent layout shift
                }}
              >
                <ReactTyped
                  strings={[
                    "Backend Developer",
                    "UI/UX Designer",
                    "Blockchain Engineer",
                    "Python Developer",
                    "Frontend Developer",
                  ]}
                  typeSpeed={45}
                  backSpeed={30}
                  loop
                  style={{
                    display: "inline-block",
                    minWidth: "120px", // Minimum width to prevent collapse
                    fontFamily: "Poppins",
                  }}
                />
              </Box>{" "}
              Jobs
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "#1e63d6",
              fontSize: { xs: 20, sm: 22, md: 24 },
              fontWeight: 600,
              mb: { xs: 2, md: 3 }, // Adjusted mobile margin
              fontFamily: "Poppins",
            }}
          >
            India's #1 Naukri Platform
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 32, sm: 38, md: 46 },
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: "550px",
              mb: 1,
              fontFamily: "Poppins",
            }}
          >
            Your Naukri Search Ends{" "}
            <span style={{ color: "#1e63d6" }}>Here!</span>
          </Typography>

          <Typography
            sx={{
              color: "#696969",
              mt: 1,
              mb: { xs: 3, md: 4 }, // Adjusted mobile margin
              fontSize: { xs: 16, sm: 17, md: 18 },
              fontFamily: "Poppins",
            }}
          >
            Find Jobs, Employment & Career Opportunities
          </Typography>

          {/* SEARCH BOX */}
          <Box
            sx={{
              background: "#fff",
              borderRadius: "14px",
              py: "20px",
              pl: { xs: "16px", md: "20px" }, // Adjusted mobile padding
              pr: { xs: "20px", md: "30px" }, // Adjusted mobile padding
              height: { xs: "auto", md: "112px" },
              display: "flex",
              flexWrap: { xs: "wrap", md: "nowrap" },
              alignItems: "center",
              gap: 2,
              boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
              width: "100%",
              maxWidth: "650px", 
            }}
          >
            {/* FIELD 1 */}
            <TextField
              placeholder="Job title, keywords, or company"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#8a8a8a", fontSize: "20px" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: 1,
                minWidth: { xs: "100%", sm: "200px", md: "200px" }, // Better mobile handling
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  height: "50px",
                  background: "#fff",
                  pl: "10px", 
                  border: "none",
                  boxShadow: "none",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& input": {
                  fontSize: { xs: "14px", md: "15px" }, // Adjusted mobile font
                  fontFamily: "Poppins",
                },
              }}
            />

            <TextField
              placeholder="City or postcode"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon sx={{ color: "#8a8a8a", fontSize: "20px" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: 1,
                minWidth: { xs: "100%", sm: "180px", md: "180px" }, // Better mobile handling
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  height: "50px",
                  background: "#fff",
                  pl: "10px",
                  border: "none",
                  boxShadow: "none",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& input": {
                  fontSize: { xs: "14px", md: "15px" }, // Adjusted mobile font
                  fontFamily: "Poppins",
                },
              }}
            />

            {/* BUTTON */}
            <Button
              variant="contained"
              sx={{
                background: "#1e63d6",
                borderRadius: "12px",
                px: 4,
                height: "50px",
                width: { xs: "100%", sm: "auto", md: "auto" }, // Better responsive width
                mt: { xs: 0, md: 0 },
                fontSize: "15px",
                fontFamily: "Poppins",
                textTransform: "none",
                alignSelf: "center", 
                display: "flex",
                alignItems: "center",
                "&:hover": { background: "#1856b8" },
              }}
            >
              Find Jobs
            </Button>
          </Box>
        </Box>

        {/* RIGHT IMAGE FIXED TO RIGHT */}
        <Box
          sx={{
            position: { xs: "relative", md: "absolute" },
            right: { md: "-40px" },
            bottom: { md: 0 },
            mt: { xs: -2, md: 0 }, // Reduced negative margin on mobile
            width: { xs: "100%", md: "50%" },
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Box
            component="img"
            src="/banner-image.webp"
            alt="hero"
            sx={{
              width: { xs: "85%", sm: "50%", md: "75%" }, // Adjusted mobile width
              marginRight: {xs: 0, sm: 0, md: -18, lg: -10},
              maxWidth: "750px",
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>

      {/* Recent Interview Ticker - Full Width */}
      <Box
        sx={{
          position: "absolute",
          bottom: 4,
          left: 0,
          right: 0,
          width: "100%",
          overflow: "hidden",
          zIndex: 30,
          animation: `${slideUp} 0.5s ease-out 0.4s both`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { xs: 4, md: 6 },
            animation: `${marquee} 15s linear infinite`,
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {[
            { name: 'Devendra Singh', text: 'got job 2 hours ago', img: 'https://randomuser.me/api/portraits/men/11.jpg' },
            { name: 'Jatin Bhardwaj', text: 'got job 5 hours ago', img: 'https://randomuser.me/api/portraits/men/33.jpg' },
            { name: 'Saloni Kondhalkar', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
            { name: 'Suraj Pal', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
            { name: 'Mohit', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/men/22.jpg' },
            { name: 'Manoj Gupta', text: 'got job 2 hours ago', img: 'https://randomuser.me/api/portraits/men/55.jpg' },
            { name: 'Dipti Mandal', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/women/28.jpg' },
            { name: 'Priya Sharma', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/women/22.jpg' }
          ].concat([
            { name: 'Devendra Singh', text: 'got job 2 hours ago', img: 'https://randomuser.me/api/portraits/men/11.jpg' },
            { name: 'Jatin Bhardwaj', text: 'got job 5 hours ago', img: 'https://randomuser.me/api/portraits/men/33.jpg' },
            { name: 'Saloni Kondhalkar', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
            { name: 'Suraj Pal', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
            { name: 'Mohit', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/men/22.jpg' },
            { name: 'Manoj Gupta', text: 'got job 2 hours ago', img: 'https://randomuser.me/api/portraits/men/55.jpg' },
            { name: 'Dipti Mandal', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/women/28.jpg' },
            { name: 'Priya Sharma', text: 'has fixed an interview', img: 'https://randomuser.me/api/portraits/women/22.jpg' }
          ]).map((person, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: 'white',
                borderRadius: '50px',
                px: 2,
                py: 1.5,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid',
                borderColor: 'grey.100',
                display: 'inline-flex',
                alignItems: 'center',
                flexShrink: 0,
                width: { xs: '220px', md: '260px' },
                height: { xs: '68px', md: '76px' },
                ml: index === 0 ? 2 : 0,
              }}
            >
              <Box
                component="img"
                src={person.img}
                alt="User"
                sx={{
                  width: { xs: 36, md: 40 },
                  height: { xs: 36, md: 40 },
                  borderRadius: '50%',
                  mr: { xs: 1.5, md: 2 },
                  border: '2px solid',
                  borderColor: 'success.light',
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '13px', md: '14px' },
                    color: 'grey.900',
                    fontWeight: 700,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    fontFamily: 'Poppins',
                  }}
                >
                  {person.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '11px', md: '12px' },
                    color: 'grey.600',
                    fontWeight: 500,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    fontFamily: 'Poppins',
                  }}
                >
                  {person.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}