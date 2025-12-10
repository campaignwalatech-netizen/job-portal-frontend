import { Box, Typography } from "@mui/material";

const companiesRow1 = [
  "/companies/amazon.png",
  "/companies/google.png",
  "/companies/microsoft.png",
  "/companies/blackrock.png", 
];

const companiesRow2 = [
  "/companies/consensys.png",
  "/companies/bloomberg.png",
  "/companies/meta.png",
  "/companies/twosigma.png",
];


const scrollLeft = {
  display: "flex",
  gap: 3,
  animation: {
    xs: "slide-left 4s linear infinite",  
    md: "slide-left 15s linear infinite",
  },
  "&:hover": { animationPlayState: "paused" },
};

const scrollRight = {
  display: "flex",
  gap: 3,
  animation: {
    xs: "slide-right 4s linear infinite", 
    md: "slide-right 15s linear infinite", 
  },
  "&:hover": { animationPlayState: "paused" },
};


export default function TopCompanies() {
  return (
    <Box sx={{ mt: 10 }}>
      
      {/* Heading */}
      <Typography
        sx={{
          fontSize: { xs: "28px", md: "36px" },
          fontWeight: 700,
          textAlign: "center",
          color: "#0f172a",
        }}
      >
        Top Company Hiring
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          color: "#64748b",
          mt: 1,
          mb: 6,
          fontSize: "16px"
        }}
      >
        Our customers have gotten offers from awesome companies.
      </Typography>

      {/* ROW 1 */}
      <Box sx={{ overflow: "hidden", position: "relative", mb: 4 }}>
        <Box sx={scrollLeft}>
          {[...companiesRow1, ...companiesRow1, ...companiesRow1].map((logo, i) => (
            <CompanyCard logo={logo} key={i} />
          ))}
        </Box>
      </Box>

      {/* ROW 2 */}
      <Box sx={{ overflow: "hidden", position: "relative" }}>
        <Box sx={scrollRight}>
          {[...companiesRow2, ...companiesRow2, ...companiesRow2].map((logo, i) => (
            <CompanyCard logo={logo} key={i} />
          ))}
        </Box>
      </Box>

      {/* KEYFRAME ANIMATIONS */}
      <style>
{`
  @keyframes slide-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-33.33%); }
  }

  @keyframes slide-right {
    0% { transform: translateX(-33.33%); }
    100% { transform: translateX(0); }
  }
`}
</style>
    </Box>
  );
}

/* SMALL COMPANY CARD */
function CompanyCard({ logo }) {
  return (
    <Box
      sx={{
        width: 190,
        height: 130,
        bgcolor: "#fff",
        borderRadius: "14px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mx: 2,
        flexShrink: 0,
      }}
    >
      <img
        src={logo}
        alt={logo}
        style={{
          width: "120px",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </Box>
  );
}

