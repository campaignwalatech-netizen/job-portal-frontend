import { Box, Typography, TextField, Button } from "@mui/material";
import { ReactTyped } from "react-typed";

export default function Hero() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(to bottom right, #f7f9ff, #e6eeff)",
        paddingTop: { xs: 4, md: 10 },
        paddingBottom: { xs: 6, md: 14 },
      }}
    >
      <Box
        sx={{
          maxWidth: "1500px",
          overflow: "hidden",
          margin: "0 auto",
          padding: { xs: "20px", md: "60px 60px 0 60px" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >

        {/* LEFT SIDE ------------------------------------------------ */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "0 0 780px", lg: "0 0 820px" },
            width: "100%",
          }}
        >

          {/* Line 1 */}
          <Typography
            sx={{
              fontSize: { xs: "20px", sm: "22px", md: "27px" },
              fontWeight: 500,
              marginBottom: 1,
              color: "#202124",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              lineHeight: "1.4",
              fontFamily: "Poppins",
              flexWrap: "wrap",
            }}
          >
            Meticulously Handpicked
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
            </span>
            Jobs
          </Typography>

          {/* Line 2 */}
          <Typography
            sx={{
              color: "#1e63d6",
              fontSize: { xs: "20px", sm: "22px", md: "24px" },
              fontWeight: 600,
              marginBottom: 3,
              fontFamily: "Poppins",
            }}
          >
            India’s #1 Job Platform
          </Typography>

          {/* Main Heading */}
          <Typography
            sx={{
              fontSize: { xs: "32px", sm: "38px", md: "46px" },
              fontWeight: 700,
              lineHeight: "1.2",
              maxWidth: "550px",
              marginBottom: 1,
              fontFamily: "Poppins",
            }}
          >
            Your Job Search Ends{" "}
            <span style={{ color: "#1e63d6" }}>Here!</span>
          </Typography>

          {/* Subtext */}
          <Typography
            sx={{
              color: "#696969",
              marginTop: 1,
              marginBottom: 4,
              fontSize: { xs: "16px", sm: "17px", md: "18px" },
              fontFamily: "Poppins",
            }}
          >
            Find Jobs, Employment & Career Opportunities
          </Typography>

          {/* SEARCH BOX ------------------------------------------------ */}
          {/* SEARCH BOX ------------------------------------------------ */}
<Box
  sx={{
    background: "#fff",
    borderRadius: "14px",
    padding: "20px 20px 20px 30px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
    width: "fit-content",
    flexWrap: "wrap",
  }}
>
  {/* INPUT 1 */}
  <Box
    sx={{
      position: "relative",
      flex: "1 1 auto",
      minWidth: "200px",
    }}
  >
    <TextField
      placeholder="Job title, keywords, or company"
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          height: "50px",
          padding: "15px 0px 15px 40px",
        },
        "& input": {
          fontSize: "15px",
          fontFamily: "Poppins",
        },
      }}
    />
  </Box>

  {/* INPUT 2 */}
  <Box
    sx={{
      position: "relative",
      flex: "1 1 auto",
      minWidth: "200px",
    }}
  >
    <TextField
      placeholder="City or postcode"
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          height: "50px",
          padding: "15px 0px 15px 40px",
        },
        "& input": {
          fontSize: "15px",
          fontFamily: "Poppins",
        },
      }}
    />
  </Box>

  {/* BUTTON */}
  <Button
    variant="contained"
    sx={{
      background: "#1e63d6",
      borderRadius: "12px",
      padding: "18px 35px 15px",
      height: "50px",
      fontSize: "15px",
      fontFamily: "Poppins",
      textTransform: "none",
      "&:hover": { background: "#1856b8" },
    }}
  >
    Find Jobs
  </Button>
</Box>

        </Box>

        {/* RIGHT SIDE IMAGE -------------------------------------------- */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: { xs: "40px", md: "0" },
          }}
        >
          <img
            src="https://www.jobchaahiye.com/images/resource/banner-image.svg"
            alt="hero"
            style={{
              width: "170%",
              maxWidth: "1050px",
              objectFit: "contain",
              marginTop: "60px",
              marginRight: "-180px",
            }}
          />
        </Box>

      </Box>
    </Box>
  );
}
