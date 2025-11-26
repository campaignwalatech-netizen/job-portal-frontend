import { Box, Typography, Button } from "@mui/material";

export default function WantToHire() {
  return (
    <Box sx={{ paddingY: 10, paddingX: 2 }}>
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "#e8f1ff",
          borderRadius: "24px",
          padding: { xs: 4, md: 8 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 4, md: 2 },
        }}
      >
        {/* LEFT IMAGE */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="https://www.jobchaahiye.com/images/cta/bg-cta.png"
            alt="Hire"
            style={{
              width: "100%",
              maxWidth: "420px",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* RIGHT CONTENT */}
        <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
          <Typography
            sx={{
              fontSize: { xs: "26px", md: "34px" },
              fontWeight: 700,
              color: "#1a2b48",
              marginBottom: 2,
            }}
          >
            Want To Hire
          </Typography>

          <Typography
            sx={{
              fontSize: "17px",
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: 4,
              maxWidth: "430px",
            }}
          >
            Advertise your jobs to millions of monthly users and search
            15.8 million CVs in our database.
          </Typography>

          <Button
            variant="contained"
            sx={{
              background: "#1e63d6",
              paddingY: 1.3,
              paddingX: 5,
              borderRadius: "12px",
              fontSize: "16px",
              textTransform: "none",
              "&:hover": {
                background: "#1856b8",
              },
            }}
          >
            Post a Job
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
