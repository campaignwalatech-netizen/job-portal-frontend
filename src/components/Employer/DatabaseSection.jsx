import { Box, Typography, Button } from "@mui/material";

export default function DatabaseSection() {
  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: 12,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
      }}
    >
      {/* LEFT TEXT */}
      <Box sx={{ width: { xs: "100%", md: "48%" } }}>
        
        {/* Small Heading – SAME AS POST JOB SECTION */}
        <Typography
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: "24px",
            fontWeight: 600,
            color: "#363636",
            mb: 1,
          }}
        >
          HIRE FASTER, HIRE BETTER
        </Typography>

        {/* Main Heading – SAME STYLE */}
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
          Access the<br /> Job ChaaHiye<br /> Database
        </Typography>

        {/* Sub text – SAME STYLE */}
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
          Find candidates based on skills, experience, location and 
          salary expectations in seconds.
        </Typography>

        {/* Bullet List – SAME BULLET COMPONENT */}
        {[
          "5 Cr+ active job seekers",
          "One-click contact to candidates",
          "Bulk resume download",
          "40% better ROI than market",
        ].map((text, i) => (
          <Bullet key={i} text={text} />
        ))}

        {/* CTA Button – EXACT SAME DESIGN AS POSTJOBSECTION */}
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
          Explore Database
        </Button>

      </Box>

      {/* RIGHT FLOATING CARDS – MATCHING STYLE */}
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
          location="Narayana guda, Hyderabad"
          date="Nov 30, 2022"
        />

        <FloatingCard
          top="180px"
          left="50px"
          title="Executive Manager Operations"
          status="Under Review"
          statusColor="#d97706"
          location="Narayana guda, Hyderabad"
          date="Nov 30, 2022"
        />

        <FloatingCard
          top="330px"
          left="0px"
          title="Graphic Designer"
          status="Active"
          statusColor="#16a34a"
          location="Narayana guda, Hyderabad"
          date="Nov 30, 2022"
        />
      </Box>
    </Box>
  );
}

/* ===============================
   UNIFIED BULLET COMPONENT
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
   FLOATING CARD COMPONENT
=============================== */

function FloatingCard({
  top,
  left,
  title,
  status,
  statusColor,
  location,
  date,
}) {
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
      {/* Title + Status */}
      <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
        {title}
      </Typography>

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

      <Typography sx={{ fontSize: "14px", color: "#475569" }}>
        {location} | Posted on: {date}
      </Typography>
    </Box>
  );
}
