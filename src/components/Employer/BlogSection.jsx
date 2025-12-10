import { Box, Typography, Button } from "@mui/material";

const articles = [
  {
    img: "https://cdn.apna.co/employerDashboard_FE/jobs-success.jpeg",
    title:
      "SMBs emerge as the leading job creators in India: Naukri chaahiye.co",
  },
  {
    img: "https://cdn.apna.co/employerDashboard_FE/handshake.webp",
    title:
      "Jobchaahiye.co, DGR partner to provide hyperlocal career opportunities for ex-servicemen",
  },
  {
    img: "https://cdn.apna.co/employerDashboard_FE/empowerment.webp",
    title:
      "Unlocking India’s potential through women workforce",
  },
];

export default function BlogSection() {
  return (
    <Box sx={{ py: 10, px: { xs: 2, md: 8 }, background: "#fff" }}>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {articles.map((item, i) => (
          <Box
            key={i}
            sx={{
              width: { xs: "100%", sm: "45%", md: "360px" },
              borderRadius: "12px",
              overflow: "hidden",
              background: "#fff",
              border: "1px solid #eee",
            }}
          >
            {/* IMAGE */}
            <img
              src={item.img}
              alt="article"
              style={{
                width: "100%",
                height: "260px",
                objectFit: "cover",
              }}
            />

            {/* CONTENT */}
            <Box sx={{ p: 2.5 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "17px",
                  color: "#0f172a",
                  minHeight: "70px",
                }}
              >
                {item.title}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  background: "#3B82F6",
                  textTransform: "none",
                  borderRadius: "6px",
                  px: 3,
                  "&:hover": { background: "#2563eb" },
                }}
              >
                Read More
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
