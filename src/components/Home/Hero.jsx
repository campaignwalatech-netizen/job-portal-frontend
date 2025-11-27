
import { Box, Typography, TextField, Button } from "@mui/material";
import { ReactTyped } from "react-typed";

export default function Hero() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(to bottom right, #f7f9ff, #e6eeff)",
        paddingTop: { xs: 6, md: 10 },
        paddingBottom: { xs: 10, md: 14 },
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          justifyContent: "space-between",
          paddingX: { xs: 2, md: 0 },
        }}
      >
        {/* LEFT SIDE  ------------------------------------------------------- */}
        <Box sx={{ flex: 1, maxWidth: "580px" }}>
          {/* Subheading 1 */}
          <Typography
            sx={{
              fontSize: "17px",
              marginBottom: 1,
              color: "#4b5563",
            }}
          >
            Meticulously Handpicked{" "}
            <span style={{ color: "#1e63d6", fontWeight: 600 }}>
  <ReactTyped
    strings={[
      "Backend Developer",
      "UI/UX Designer",
      "Blockchain Engineer",
      "Python Developer",
      "Frontend Developer",
    ]}
    typeSpeed={50}
    backSpeed={30}
    loop
  />
</span>
{" "}
            Jobs
          </Typography>

          {/* Subheading 2 */}
          <Typography
            sx={{
              color: "#1e63d6",
              fontSize: "22px",
              fontWeight: 600,
              marginBottom: 2,
            }}
          >
            India's #1 Job Platform
          </Typography>

          {/* MAIN HEADING */}
          <Typography
            sx={{
              fontSize: { xs: "32px", md: "48px" },
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: "550px",
            }}
          >
            Your Job Search Ends{" "}
            <span style={{ color: "#1e63d6" }}>Here!</span>
          </Typography>

          {/* Subtext */}
          <Typography
            sx={{
              color: "#6b7280",
              marginTop: 2,
              marginBottom: 4,
              fontSize: "17px",
            }}
          >
            Find Jobs, Employment & Career Opportunities
          </Typography>

          {/* SEARCH BOX ------------------------------------------------ */}
          <Box
            sx={{
              background: "#fff",
              borderRadius: "14px",
              padding: 1.5,
              display: "flex",
              gap: 1,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Job title, keywords, or company"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />

            <TextField
              placeholder="City or postcode"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />

            <Button
  variant="contained"
  sx={{
    background: "#1e63d6",
    borderRadius: "10px",
    paddingX: 2.4,
    paddingY: 1,            // smaller height
    minHeight: "48px",      // same height as TextField
    fontSize: "15px",
    textTransform: "none",
    width: { xs: "100%", sm: "auto" },
    whiteSpace: "nowrap",
    "&:hover": { background: "#1856b8" },
  }}
>
  Find Jobs
</Button>

          </Box>
        </Box>

        {/* RIGHT SIDE – IMAGE -------------------------------------------- */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            marginTop: { xs: 4, md: 0 },
          }}
        >
          <img
            src="https://www.jobchaahiye.com/images/resource/banner-image.svg" // change to your hero image path
            alt="hero"
            style={{
              width: "100%",
              maxWidth: "440px",
              marginTop: "30px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
