import { Box, Typography } from "@mui/material";

const dataRow1 = [
  { number: "50 Lakh+", label: "Jobs Available", bg: "#E9FFF2" },
  { number: "6 Lakh+", label: "Companies Hiring", bg: "#F3ECFF" },
  { number: "85%", label: "Profile Match Accuracy", bg: "#E9FFF2" },
  { number: "1.8 Cr+", label: "Active Job Seekers", bg: "#F3ECFF" },
  { number: "40 Lakh+", label: "Freshers", bg: "#E9FFF2" },
  { number: "70 Lakh+", label: "Experienced", bg: "#F3ECFF" },
  { number: "65%", label: "Interview Conversion", bg: "#F3ECFF" },
  { number: "30 Lakh+", label: "IT Sector Jobs", bg: "#E9FFF2" },
  { number: "25 Lakh+", label: "Marketing Jobs", bg: "#E9FFF2" },
  { number: "12 Lakh+", label: "Work From Home", bg: "#F3ECFF" },
  { number: "85%", label: "Verified Recruiters", bg: "#E9FFF2" },
  { number: "1.2 Cr+", label: "Female Job Seekers", bg: "#E9FFF2" },
  { number: "90 Lakh+", label: "Male Job Seekers", bg: "#F3ECFF" },
];

const dataRow2 = [
  { number: "4.5 Cr+", label: "Total Applications", bg: "#F3ECFF" },
  { number: "70 Lakh+", label: "Shortlisted", bg: "#E9FFF2" },
  { number: "22 Lakh+", label: "Interviews Scheduled", bg: "#E9FFF2" },
  { number: "8 Lakh+", label: "Offer Letters", bg: "#F3ECFF" },
  { number: "1.2 Cr", label: "New Delhi", bg: "#E9FFF2" },
  { number: "90 Lakh", label: "Bangalore", bg: "#F3ECFF" },
  { number: "75 Lakh", label: "Mumbai", bg: "#E9FFF2" },
  { number: "60 Lakh", label: "Pune", bg: "#F3ECFF" },
  { number: "45 Lakh", label: "Hyderabad", bg: "#E9FFF2" },
  { number: "30 Lakh", label: "Chennai", bg: "#E9FFF2" },
  { number: "20 Lakh", label: "Kolkata", bg: "#F3ECFF" },
  { number: "15 Lakh", label: "Ahmedabad", bg: "#E9FFF2" },
  { number: "10 Lakh", label: "Noida", bg: "#F3ECFF" },
  { number: "8 Lakh", label: "Gurgaon", bg: "#E9FFF2" },
  { number: "5 Lakh", label: "Jaipur", bg: "#F3ECFF" },
  { number: "3 Lakh", label: "Bhopal", bg: "#E9FFF2" },
  { number: "2 Lakh", label: "Surat", bg: "#F3ECFF" },
  { number: "1 Lakh", label: "Indore", bg: "#E9FFF2" },
];

const boxStyle = {
  minWidth: "240px",
  height: "140px",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  mx: 1,
  flexShrink: 0,
};

const scrollLeft = {
  display: "flex",
  animation: {
    xs: "scroll-left 6s linear infinite",  
    md: "scroll-left 22s linear infinite",  
  },
};

const scrollRight = {
  display: "flex",
  animation: {
    xs: "scroll-right 6s linear infinite",
    md: "scroll-right 22s linear infinite", 
  },
};

export default function StatsScroller() {
  return (
    <Box sx={{ mt: 10, overflow: "hidden" }}>

      
      <Typography sx={{ textAlign: "center", mt: 1, color: "#666", fontSize: "16px" }}>
        Our customers have gotten offers from awesome companies.
      </Typography>

      <Box sx={{ mt: 5, whiteSpace: "nowrap", overflow: "hidden" }}>
        <Box sx={scrollLeft}>
          {[...dataRow1, ...dataRow1].map((box, i) => (
            <Box key={i} sx={{ ...boxStyle, background: box.bg }}>
              <Typography sx={{ fontSize: "26px", fontWeight: 700, color: "#009066" }}>
                {box.number}
              </Typography>
              <Typography sx={{ mt: 1, color: "#463F5F", fontSize: "15px" }}>
                {box.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* -------- ROW 2 -------- */}
      <Box sx={{ mt: 3, whiteSpace: "nowrap", overflow: "hidden" }}>
        <Box sx={scrollRight}>
          {[...dataRow2, ...dataRow2].map((box, i) => (
            <Box key={i} sx={{ ...boxStyle, background: box.bg }}>
              <Typography sx={{ fontSize: "26px", fontWeight: 700, color: "#009066" }}>
                {box.number}
              </Typography>
              <Typography sx={{ mt: 1, color: "#463F5F", fontSize: "15px" }}>
                {box.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* KEYFRAMES */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        /* Pause animation on hover */
        div:hover {
          animation-play-state: paused;
        }
      `}</style>
    </Box>
  );
}
