import { Box, Typography, Button } from "@mui/material";

const categoriesRow1 = [
  { title: "Marketing", positions: 86, icon: "https://cdn-icons-png.flaticon.com/512/5829/5829020.png" },
  { title: "Design", positions: 43, icon: "https://cdn-icons-png.flaticon.com/512/1998/1998611.png" },
  { title: "Development", positions: 12, icon: "https://cdn-icons-png.flaticon.com/512/906/906324.png" },
  { title: "Human Resource", positions: 55, icon: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png" },
];

const categoriesRow2 = [
  { title: "Automotive Jobs", positions: 2, icon: "https://cdn-icons-png.flaticon.com/512/854/854929.png" },
  { title: "Customer Service", positions: 2, icon: "https://cdn-icons-png.flaticon.com/512/1250/1250594.png" },
  { title: "Health and Care", positions: 25, icon: "https://cdn-icons-png.flaticon.com/512/2966/2966480.png" },
  { title: "Project Management", positions: 92, icon: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
];

const animationLeft = {
  display: "flex",
  gap: 3,
  animation: "scroll-left 14s linear infinite",
  "&:hover": { animationPlayState: "paused" },
};

const animationRight = {
  display: "flex",
  gap: 3,
  animation: "scroll-right 18s linear infinite",
  "&:hover": { animationPlayState: "paused" },
};



export default function PopularJobCategories() {
  return (
    <Box sx={{ paddingY: 10, maxWidth: "1200px", margin: "0 auto", paddingX: 2 }}>
      
      {/* HEADING */}
      <Typography
        sx={{
          fontSize: { xs: "28px", md: "38px" },
          textAlign: "center",
          fontWeight: 700,
          marginBottom: 1,
          color: "#1a2b48",
        }}
      >
        Popular Job Categories
      </Typography>

      <Typography sx={{ textAlign: "center", color: "#64748b", marginBottom: 6 }}>
        2020 jobs live – 293 added today.
      </Typography>

      {/* ROW 1 */}
      <Box sx={{ overflow: "hidden", marginBottom: 4 }}>
        <Box sx={animationLeft}>
          {[...categoriesRow1, ...categoriesRow1].map((cat, index) => (
            <Card key={index} {...cat} index={index} />
          ))}
        </Box>
      </Box>

      {/* ROW 2 */}
      <Box sx={{ overflow: "hidden", marginBottom: 6 }}>
        <Box sx={animationRight}>
          {[...categoriesRow2, ...categoriesRow2].map((cat, index) => (
            <Card key={index} {...cat} index={index} />
          ))}
        </Box>
      </Box>

      {/* VIEW ALL BUTTON */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          sx={{
            borderRadius: "10px",
            paddingX: 4,
            paddingY: 1,
            textTransform: "none",
            fontSize: "16px",
            borderColor: "#1e63d6",
            color: "#1e63d6",
            "&:hover": {
              background: "#1e63d6",
              color: "#fff",
            },
          }}
        >
          View All 
        </Button>
      </Box>

      {/* KEYFRAMES */}
      <style>
        {`
          @keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scroll-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

        `}
      </style>
    </Box>
  );
}

/* CARD COMPONENT */
function Card({ title, positions, icon }) {
  return (
<Box
  sx={{
    display: "flex",              // ← IMPORTANT
    alignItems: "center",         // vertical alignment
    gap: 2,                       // space between icon + text
    padding: 2.2,
    minWidth: "300px",
    minHeight: "80px",
    borderRadius: "12px",
    border: "2px solid #e5e7eb",
    background: "#fff",
    transition: "0.3s ease",
    cursor: "pointer",

    "&:hover": {
      borderColor: "#1e63d6",
      boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
    },
  }}
>
  <img
    src={icon}
    alt=""
    style={{
      width: "36px",
      opacity: 0.8,
      marginBottom: 8,
    }}
  />

<Box>
  <Typography sx={{ fontSize: "20px", fontWeight: 600, color: "#1a2b48" }}>
    {title}
  </Typography>

  <Typography sx={{ fontSize: "16px", color: "#6b7280", marginTop: 0.3 }}>
    {positions} open positions
  </Typography>
</Box>
</Box>

  );
}
