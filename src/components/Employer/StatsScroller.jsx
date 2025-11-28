import { Box, Typography } from "@mui/material";

const dataRow1 = [
  { number: "2.9 Cr", label: "Male", bg: "#E9FFF2" },
  { number: "2.1 Cr", label: "Experience", bg: "#F3ECFF" },
  { number: "70%", label: "Connected Leads", bg: "#E9FFF2" },
  { number: "5 Cr+", label: "Active job seekers", bg: "#F3ECFF" },
  { number: "2.3 Cr", label: "Candidates in T1 cities", bg: "#E9FFF2" },
  { number: "1.2 Cr", label: "Graduates", bg: "#F3ECFF" },
  { number: "40 Lakh", label: "Post Graduate", bg: "#F3ECFF" },
  { number: "68 Lakh", label: "BFSI", bg: "#E9FFF2" },
  { number: "57 Lakh+", label: "BPO Call-center", bg: "#E9FFF2" },
  { number: "2", label: "Experience", bg: "#F3ECFF" },
  { number: "70%", label: "Connected Leads", bg: "#E9FFF2" },
  { number: "2.3 Cr", label: "Candidates in T1 cities", bg: "#E9FFF2" },
  { number: "1.2 Cr", label: "Graduates", bg: "#F3ECFF" },
  
];

const dataRow2 = [
  { number: "40 Lakh", label: "Post Graduate", bg: "#F3ECFF" },
  { number: "68 Lakh", label: "BFSI", bg: "#E9FFF2" },
  { number: "57 Lakh+", label: "BPO Call-center", bg: "#E9FFF2" },
  { number: "5 Cr+", label: "Active job seekers", bg: "#F3ECFF" },
  { number: "2.9 Cr", label: "Male", bg: "#E9FFF2" },
  { number: "2", label: "Experience", bg: "#F3ECFF" },
  { number: "70%", label: "Connected Leads", bg: "#E9FFF2" },
  { number: "2.3 Cr", label: "Candidates in T1 cities", bg: "#E9FFF2" },
  { number: "1.2 Cr", label: "Graduates", bg: "#F3ECFF" },
  { number: "40 Lakh", label: "Post Graduate", bg: "#F3ECFF" },
  { number: "68 Lakh", label: "BFSI", bg: "#E9FFF2" },
  { number: "57 Lakh+", label: "BPO Call-center", bg: "#E9FFF2" },
  
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
  animation: "scroll-left 22s linear infinite",
};

const scrollRight = {
  display: "flex",
  animation: "scroll-right 22s linear infinite",
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
