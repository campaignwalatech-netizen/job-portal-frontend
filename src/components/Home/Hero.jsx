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

export default function Hero() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(to bottom, #ffffff, #bbcef8ff)",
        pt: { xs: 4, md: 10 },
        pb: { xs: 10, md: 14 }, // ⬅️ more bottom so cards stay lower
        mt: "-2px",
        position: "relative",
        overflow: "hidden",        
      }}
    >
      <Box
        sx={{
          maxWidth: "1500px",
          mx: "auto",
          px: { xs: 2, sm: 4, md: 6 },
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
          }}
        >
          {/* Typography same */}
          <Typography
            sx={{
              fontSize: { xs: 20, sm: 22, md: 27 },
              fontWeight: 500,
              mb: 1,
              color: "#202124",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "6px",
              lineHeight: 1.4,
              fontFamily: "Poppins",
            }}
          >
            Meticulously Handpicked{" "}
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
          </Typography>

          <Typography
            sx={{
              color: "#1e63d6",
              fontSize: { xs: 20, sm: 22, md: 24 },
              fontWeight: 600,
              mb: 3,
              fontFamily: "Poppins",
            }}
          >
            India’s #1 Job Platform
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
            Your Job Search Ends{" "}
            <span style={{ color: "#1e63d6" }}>Here!</span>
          </Typography>

          <Typography
            sx={{
              color: "#696969",
              mt: 1,
              mb: 4,
              fontSize: { xs: 16, sm: 17, md: 18 },
              fontFamily: "Poppins",
            }}
          >
            Find Jobs, Employment & Career Opportunities
          </Typography>

          {/* ---------------------------------- SEARCH BOX ---------------------------------- */}
          <Box
            sx={{
              background: "#fff",
              borderRadius: "14px",
              py: "20px",
              pl: "20px",
              pr: "30px",
              height: "112px",
              display: "flex",
              alignItems: "center",
              gap: 2,
              boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
              width: "100%",
              maxWidth: "650px", // ⬅️ EXACT width of live site
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
    minWidth: "200px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      height: "50px",
      background: "#fff",
      pl: "10px", // icon spacing
      border: "none",
      boxShadow: "none",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& input": {
      fontSize: "15px",
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
    minWidth: "180px",
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
      fontSize: "15px",
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
                fontSize: "15px",
                fontFamily: "Poppins",
                textTransform: "none",
                alignSelf: "center", // ⬅️ FIXED PERFECT BASELINE ALIGNMENT
                display: "flex",
                alignItems: "center",
                "&:hover": { background: "#1856b8" },
              }}
            >
              Find Jobs
            </Button>
          </Box>
        </Box>

        {/* ---------------------------------- RIGHT IMAGE ---------------------------------- */}
{/* RIGHT IMAGE FIXED TO RIGHT */}
<Box
  sx={{
    position: "absolute",      // ⭐ FIXED POSITION
    right: "-40px",            // ⭐ MATCHES LIVE SITE OFFSET
    bottom: "0",               // ⭐ TOUCHES BOTTOM OF HERO so cards go on top
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "50%",              // ⭐ KEEPS IMAGE RESPONSIVE
    pointerEvents: "none",     // ⭐ Prevents blocking clicks
  }}
>
  <Box
    component="img"
    src="/banner-image.svg"
    alt="hero"
    sx={{
      width: "100%",
      maxWidth: "750px",       // ⭐ LITTLE BIGGER, LIKE LIVE SITE
      objectFit: "contain",
    }}
  />
</Box>

      </Box>
    </Box>
  );
}
