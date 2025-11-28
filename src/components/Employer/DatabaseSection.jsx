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
      {/* LEFT TEXT BLOCK */}
      <Box sx={{ width: { xs: "100%", md: "55%" } }}>
        {/* SMALL TITLE */}
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

        {/* MAIN LARGE HEADING */}
        <Typography
          sx={{
            fontSize: { xs: "40px", md: "56px" },
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#1f2937",
            mb: 2,
          }}
        >
          Introducing Job <br />
          ChaaHiye <br />
          Database
        </Typography>

        {/* PARAGRAPH */}
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

        {/* BULLET LIST */}
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

        {/* BUTTON */}
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

      {/* RIGHT SIDE IMAGE PART (your floating cards) */}
      <Box
        sx={{
          width: { xs: "100%", md: "45%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Drop your JOB CARDS component or images here */}
        {/** e.g., <JobCardsPreview /> */}
      </Box>
    </Box>
  );
}
