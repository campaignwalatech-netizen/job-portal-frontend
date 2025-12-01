import { Box, Typography, Button } from "@mui/material";

const categoriesRow1 = [
  { title: "Marketing", positions: 86, icon: "https://cdn-icons-png.flaticon.com/512/5829/5829020.png" },
  { title: "Design", positions: 43, icon: "https://cdn-icons-png.flaticon.com/512/1998/1998611.png" },
  { title: "Development", positions: 12, icon: "https://cdn-icons-png.flaticon.com/512/906/906324.png" },
  { title: "Human Resource", positions: 55, icon: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png" },
  { title: "Finance", positions: 89, icon: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png" },
  { title: "Sales & Business", positions: 74, icon: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png" },
  { title: "Data & Analytics", positions: 32, icon: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png" },
  { title: "Content Writing", positions: 27, icon: "https://cdn-icons-png.flaticon.com/512/3135/3135679.png" },
];

const categoriesRow2 = [
  { title: "Automotive Jobs", positions: 2, icon: "https://cdn-icons-png.flaticon.com/512/854/854929.png" },
  { title: "Customer Service", positions: 2, icon: "https://cdn-icons-png.flaticon.com/512/1250/1250594.png" },
  { title: "Health and Care", positions: 25, icon: "https://cdn-icons-png.flaticon.com/512/2966/2966480.png" },
  { title: "Project Management", positions: 92, icon: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
  { title: "Teaching & Training", positions: 18, icon: "https://cdn-icons-png.flaticon.com/512/3135/3135765.png" },
  { title: "Logistics & Supply", positions: 21, icon: "https://cdn-icons-png.flaticon.com/512/7434/7434578.png" },
  { title: "IT Support", positions: 47, icon: "https://cdn-icons-png.flaticon.com/512/911/911282.png" },
  { title: "Hospitality", positions: 16, icon: "https://cdn-icons-png.flaticon.com/512/3170/3170733.png" },
];

export default function PopularJobCategories() {
  return (
    <Box sx={{ paddingY: 10, maxWidth: "1200px", margin: "0 auto", paddingX: { xs: 2, md: 0 } }}>
      
      <Typography sx={{ fontSize: { xs: "26px", md: "36px" }, textAlign: "center", fontWeight: 700, mb: 1, color: "#1a2b48" }}>
        Popular Job Categories
      </Typography>

      <Typography sx={{ textAlign: "center", color: "#64748b", mb: 6 }}>
        2020 jobs live – 293 added today.
      </Typography>

      {/* ROW 1 — LEFT */}
      <Box sx={{ overflow: "hidden", mb: 4 }}>
        <Box className="slider-row left">
          {[...categoriesRow1, ...categoriesRow1].map((cat, index) => (
            <Card key={index} {...cat} />
          ))}
        </Box>
      </Box>

      {/* ROW 2 — RIGHT */}
      <Box sx={{ overflow: "hidden", mb: 6 }}>
        <Box className="slider-row right">
          {[...categoriesRow2, ...categoriesRow2].map((cat, index) => (
            <Card key={index} {...cat} />
          ))}
        </Box>
      </Box>

      {/* VIEW ALL */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="outlined"
          sx={{
            borderRadius: "10px",
            padding: "8px 64px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
            color: "#21286A",
            borderColor: "#72a9f7ff",
            borderWidth: "3px",
            "&:hover": { background: "#1967D2", color: "#fff" },
          }}
        >
          View All
        </Button>
      </Box>

      {/* REAL SMOOTH ANIMATIONS */}
      <style>
        {`
          .slider-row {
            display: flex;
            gap: 16px;
            width: max-content;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }

          .left {
            animation: scrollLeft 24s linear infinite;
          }

          .right {
            animation: scrollRight 26s linear infinite;
          }

          /* Mobile speed faster */
          @media (max-width: 600px) {
            .left {
              animation-duration: 22s !important;
            }
            .right {
              animation-duration: 24s !important;
            }
          }

          @keyframes scrollLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }

          @keyframes scrollRight {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }
        `}
      </style>
    </Box>
  );
}

function Card({ title, positions, icon }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "20px 22px",
        minWidth: "320px",
        height: "110px",
        borderRadius: "14px",
        border: "2px solid #e5e7eb",
        background: "#fff",
        cursor: "pointer",
        flexShrink: 0,
        transition: "0.3s",
        "&:hover": { borderColor: "#1e63d6", background: "#e9f2ff" },
      }}
    >
      <img src={icon} style={{ width: 40 }} />
      <Box>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>{title}</Typography>
        <Typography sx={{ fontSize: "14px", color: "#696969", mt: "4px" }}>
          {positions} open positions
        </Typography>
      </Box>
    </Box>
  );
}
