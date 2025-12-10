import { Box, Typography, Button } from "@mui/material";

export default function PostJobSection() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "1200px",
        mx: "auto",
        mt: 12,
        px: { xs: 2, md: 4 },
        gap: 8,
      }}
    >
      {/* LEFT — FLOATING CARDS */}
      <JobCardsLeft />

      {/* RIGHT — TEXT */}
      <Box sx={{ width: { xs: "100%", md: "48%" } }}>

        {/* Small Heading — SAME AS DATABASE SECTION */}
        <Typography
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: "24px",
            fontWeight: 600,
            color: "#363636",
            mb: 1,
          }}
        >
          GET STARTED WITH NAUKRI CHAAHIYE
        </Typography>

        {/* Big Heading — SAME STYLE */}
        <Typography
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: { xs: "36px", md: "60px" },
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#363636",
            mb: 2,
          }}
        >
          Post a job in minutes
        </Typography>

        {/* Sub text — SAME STYLE */}
        <Typography
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: "24px",
            fontWeight: 400,
            color: "#696969",
            mb: 2,
            maxWidth: "90%",
          }}
        >
          Revolutionize your hiring with our AI-powered algorithm.
        </Typography>

        {/* Bullet points — SAME COMPONENT */}
        <Bullet text="Get unlimited applications" />
        <Bullet text="10x higher relevancy" />
        <Bullet text="Simplified job posting" />
        <Bullet text="40% better ROI than market" />

        {/* CTA Button — EXACT MATCH */}
        <Button
          variant="contained"
          sx={{
            background: "#3B82F6",
            textTransform: "none",
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            fontWeight: 700,
            px: 3,
            py: 1.5,
            mt: 4,
            borderRadius: "8px",
            "&:hover": { background: "#5A99FF" },
          }}
        >
          Post a job now
        </Button>
      </Box>
    </Box>
  );
}

/* ===============================
   BULLET COMPONENT — SAME AS DATABASE
=============================== */
function Bullet({ text }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 0.5, ml: 4 }}>
      <span
        style={{
          color: "#22C55E",
          fontSize: "18px",
          marginRight: "10px",
        }}
      >
        ✔
      </span>

      <Typography
        sx={{
          fontFamily: "Inter, sans-serif",
          fontSize: "16px",
          color: "#363636",
          fontWeight: 400,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

/* ===============================
   LEFT — FLOATING CARD COLUMN
=============================== */

function JobCardsLeft() {
  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "100%", md: "48%" },
        height: "520px",
        background: "#E5E7EB",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <FloatingCard
        top="40px"
        left="-20px"
        title="Graphic Designer"
        status="Active"
        statusColor="#16a34a"
        date="Nov 30, 2022"
      />

      <FloatingCard
        top="170px"
        left="50px"
        title="Executive Manager Operations"
        status="Under Review"
        statusColor="#d97706"
        date="Nov 30, 2022"
      />

      <FloatingCard
        top="330px"
        left="0px"
        title="Graphic Designer"
        status="Active"
        statusColor="#16a34a"
        date="Nov 30, 2022"
      />
    </Box>
  );
}

/* ===============================
   FLOATING CARD — SAME STYLE AS DATABASE
=============================== */

function FloatingCard({ top, left, title, status, statusColor, date }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top,
        left,
        width: "330px",
        bgcolor: "#fff",
        borderRadius: "16px",
        p: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Title */}
      <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
        {title}
      </Typography>

      {/* Status Badge */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          bgcolor: "#ecfdf5",
          color: statusColor,
          px: 1,
          py: "2px",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: 600,
          mb: 1,
        }}
      >
        {status}
      </Box>

      {/* Location */}
      <Typography
        sx={{
          fontSize: "14px",
          color: "#475569",
        }}
      >
        Narayana guda, Hyderabad | Posted on: {date}
      </Typography>
    </Box>
  );
}
