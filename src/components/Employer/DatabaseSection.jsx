import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function DatabaseSection() {
  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: 10,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 6,
      }}
    >
      {/* LEFT SIDE TEXT */}
      <Box sx={{ width: { xs: "100%", md: "55%" } }}>
        {/* Section label */}
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: 600,
            color: "#374151",
            mb: 1,
          }}
        >
          HIRE FASTER, HIRE BETTER
        </Typography>

        {/* Main heading */}
        <Typography
          sx={{
            fontSize: { xs: "40px", md: "56px" },
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#1f2937",
            mb: 2,
          }}
        >
          Introducing Job <br /> ChaaHiye <br /> Database
        </Typography>

        {/* Paragraph */}
        <Typography
          sx={{
            fontSize: "20px",
            color: "#6b7280",
            lineHeight: 1.6,
            maxWidth: "90%",
            mb: 4,
          }}
        >
          Find candidates based on location, skills and salary preferences
          from India’s fastest growing talent pool.
        </Typography>

        {/* Bullet list */}
        <Box sx={{ mb: 4 }}>
          {[
            "5 Cr+ active job seekers",
            "One click contact",
            "Bulk download of profiles",
            "40% better ROI than market",
          ].map((text, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <CheckCircleIcon sx={{ color: "#16a34a", fontSize: "22px" }} />
              <Typography sx={{ fontSize: "18px", color: "#374151" }}>
                {text}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Button */}
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            background: "#2563eb",
            fontSize: "16px",
            fontWeight: 600,
            px: 4,
            py: 1,
            borderRadius: "8px",
            "&:hover": { background: "#1d4ed8" },
          }}
        >
          Post a job now
        </Button>
      </Box>

      {/* RIGHT SIDE FLOATING CARDS */}
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", md: "45%" },
          height: "520px",
        }}
      >
        {/* Background panel */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            background: "#f3f4f6",
            borderRadius: "20px",
          }}
        />

        {/* Floating cards */}
        <FloatingCard
          title="Graphic designer"
          status="Active"
          location="Narayana guda, Hyderabad"
          date="Nov 30, 2022"
          sx={{ top: "40px", right: "10px" }}
        />

        <FloatingCard
          title="Executive manager operations"
          status="Under review"
          statusColor="#fbbf24"
          location="Narayana guda, Hyderabad"
          date="Nov 30, 2022"
          sx={{ top: "180px", right: "80px" }}
        />

        <FloatingCard
          title="Graphic designer"
          status="Active"
          location="Narayana guda, Hyderabad"
          date="Nov 30, 2022"
          sx={{ top: "330px", right: "20px" }}
        />
      </Box>
    </Box>
  );
}

/* ===============================
   FLOATING CARD COMPONENT
=============================== */

function FloatingCard({ title, status, statusColor = "#22c55e", location, date, sx }) {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "300px",
        background: "#fff",
        boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
        borderRadius: "12px",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        ...sx,
      }}
    >
      {/* Title + Status Badge */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
          {title}
        </Typography>

        <Box
          sx={{
            background: statusColor,
            color: "#fff",
            px: 1,
            py: 0.3,
            borderRadius: "8px",
            fontSize: "11px",
            fontWeight: 600,
          }}
        >
          {status}
        </Box>
      </Box>

      {/* Location + Date */}
      <Typography sx={{ fontSize: "14px", color: "#6b7280" }}>
        {location} | Posted on: {date}
      </Typography>
    </Box>
  );
}
