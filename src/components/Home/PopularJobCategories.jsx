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
  gap: 4,
  animation: "scroll-left 16s linear infinite",
  "&:hover": { animationPlayState: "paused" },
};

const animationRight = {
  display: "flex",
  gap: 4,
  animation: "scroll-right 18s linear infinite",
  "&:hover": { animationPlayState: "paused" },
};

export default function PopularJobCategories() {
  return (
    <Box sx={{ paddingY: 10, maxWidth: "1200px", margin: "0 auto", paddingX: { xs: 2, md: 0 } }}>

      <Typography
        sx={{
          fontSize: { xs: "26px", md: "36px" },
          textAlign: "center",
          fontWeight: 700,
          marginBottom: 1,
          color: "#1a2b48",
          fontFamily: "Poppins",
        }}
      >
        Popular Job Categories
      </Typography>

      <Typography sx={{ textAlign: "center", color: "#64748b", marginBottom: 6, fontFamily: "Poppins" }}>
        2020 jobs live – 293 added today.
      </Typography>

      {/* ROW 1 */}
      <Box sx={{ overflow: "hidden", marginBottom: 4 }}>
        <Box sx={animationLeft}>
          {[...categoriesRow1, ...categoriesRow1].map((cat, index) => (
            <Card key={index} {...cat} />
          ))}
        </Box>
      </Box>

      {/* ROW 2 */}
      <Box sx={{ overflow: "hidden", marginBottom: 6 }}>
        <Box sx={animationRight}>
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
      padding: "8px 64px",      // exact spacing on live site
      textTransform: "none",
      fontSize: "16px",
      fontWeight: 600,

      // TEXT COLOR when not hovered (EXACT: #21286A)
      color: "#21286A",

      // BORDER COLOR (EXACT: #1967D2)
      borderColor: "#72a9f7ff",
      borderWidth: "3px",

      "&:hover": {
        background: "#1967D2",
        color: "#fff", },

      // RESPONSIVE
      minWidth: { xs: "160px", md: "210px" },
      height: { xs: "44px", md: "48px" },
    }}
  >
    View All
  </Button>
</Box>


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

function Card({ title, positions, icon }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2.2,
        padding: "20px 22px",
        minWidth: "320px",
        height: "110px",
        borderRadius: "14px",
        border: "2px solid #e5e7eb",
        background: "#fff",
        transition: "0.3s ease",
        cursor: "pointer",
        flexShrink: 0,

        "&:hover": {
          borderColor: "#1e63d6",
          background: "#e9f2ff",
        },
      }}
    >
      <img
        src={icon}
        alt=""
        style={{
          width: "40px",
          opacity: 0.9,
        }}
      />

      <Box>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#1a2b48",
            fontFamily: "Poppins",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#696969",
            marginTop: "4px",
            fontFamily: "Poppins",
          }}
        >
          {positions} open positions
        </Typography>
      </Box>
    </Box>
  );
}
