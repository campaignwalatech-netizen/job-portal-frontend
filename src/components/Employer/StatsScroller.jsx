import { Box, Typography } from "@mui/material";

const dataRow1 = [
  { number: "7 Lakh+", label: "Registered Employers", bg: "#E9FFF2" },
  { number: "5 Cr+", label: "Verified Candidates", bg: "#F3ECFF" },
  { number: "72%", label: "Faster Hiring Rate", bg: "#E9FFF2" },
  { number: "1.5 Cr+", label: "Active Candidate Profiles", bg: "#F3ECFF" },
  { number: "45 Lakh+", label: "Freshers Available", bg: "#E9FFF2" },
  { number: "80 Lakh+", label: "Experienced Candidates", bg: "#F3ECFF" },
  { number: "68%", label: "Relevant Profile Match", bg: "#F3ECFF" },
  { number: "28 Lakh+", label: "IT Candidates", bg: "#E9FFF2" },
  { number: "22 Lakh+", label: "Marketing Talent", bg: "#E9FFF2" },
  { number: "10 Lakh+", label: "WFH Ready Candidates", bg: "#F3ECFF" },
  { number: "90%", label: "Verified Company Accounts", bg: "#E9FFF2" },
  { number: "80 Lakh+", label: "Female Workforce", bg: "#E9FFF2" },
  { number: "1 Cr+", label: "Male Workforce", bg: "#F3ECFF" },
];
const dataRow2 = [
  { number: "3.8 Cr+", label: "Total Applications Received", bg: "#F3ECFF" },
  { number: "60 Lakh+", label: "Candidates Shortlisted", bg: "#E9FFF2" },
  { number: "18 Lakh+", label: "Interviews Conducted", bg: "#E9FFF2" },
  { number: "7 Lakh+", label: "Offers Released", bg: "#F3ECFF" },
  { number: "95 Lakh", label: "Hiring in New Delhi", bg: "#E9FFF2" },
  { number: "85 Lakh", label: "Hiring in Bangalore", bg: "#F3ECFF" },
  { number: "70 Lakh", label: "Hiring in Mumbai", bg: "#E9FFF2" },
  { number: "50 Lakh", label: "Hiring in Pune", bg: "#F3ECFF" },
  { number: "40 Lakh", label: "Hiring in Hyderabad", bg: "#E9FFF2" },
  { number: "28 Lakh", label: "Hiring in Chennai", bg: "#E9FFF2" },
  { number: "18 Lakh", label: "Hiring in Kolkata", bg: "#F3ECFF" },
  { number: "12 Lakh", label: "Hiring in Ahmedabad", bg: "#E9FFF2" },
  { number: "9 Lakh", label: "Hiring in Noida", bg: "#F3ECFF" },
  { number: "7 Lakh", label: "Hiring in Gurgaon", bg: "#E9FFF2" },
  { number: "5 Lakh", label: "Hiring in Jaipur", bg: "#F3ECFF" },
  { number: "3 Lakh", label: "Hiring in Bhopal", bg: "#E9FFF2" },
  { number: "2 Lakh", label: "Hiring in Surat", bg: "#F3ECFF" },
  { number: "1 Lakh", label: "Hiring in Indore", bg: "#E9FFF2" },
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
  }
};

const scrollRight = {
  display: "flex",
  animation: {
    xs: "scroll-right 6s linear infinite",
    md: "scroll-right 22s linear infinite",
  }
};

export default function StatsScroller() {
  return (
    <Box sx={{ mt: 10, overflow: "hidden" }}>

      
      <Typography sx={{ textAlign: "center", mt: 1, color: "#666", fontSize: "16px" }}>
        Our customers have gotten offers from awesome companies.
      </Typography>

      {/* -------- ROW 1 -------- */}
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
