import { Box, Typography } from "@mui/material";

const items = [
  {
    rank: "#1",
    title: "Jobs for Freshers",
    img: "https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/freshers-jobs.png",
    bgText: "Jobs for",
  },
  {
    rank: "#2",
    title: "Work from home Jobs",
    img: "https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/work-from-home-jobs.png",
    bgText: "Work to",
  },
  {
    rank: "#3",
    title: "Part time Jobs",
    img: "https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/part-time-jobs.png",
    bgText: "Part time",
  },
  {
    rank: "#4",
    title: "Jobs for Women",
    img: "https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/women-jobs.png",
    bgText: "Jobs for",
  },
  {
    rank: "#5",
    title: "International Jobs",
    img: "https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/international-jobs.png",
    bgText: "International",
  },
];

export default function PopularSearches() {
  return (
    <Box sx={{ paddingY: 25, maxWidth: "1200px", margin: "0 auto", paddingX: 2 }}>

      {/* Heading */}
      <Typography
        sx={{
          fontSize: { xs: "26px", md: "38px" },
          textAlign: "center",
          fontWeight: 700,
          marginBottom: 6,
          color: "#1a2b48",
          lineHeight: 1.3,
        }}
      >
        Popular Searches on Naukri <br /> Chaahiye
      </Typography>

      {/* Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: 4,
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              borderRadius: "20px",
              border: "1px solid #e5e7eb",
              padding: 3,
              minHeight: "250px",
              overflow: "hidden",
              transition: "0.3s ease",
              cursor: "pointer",

              "&:hover": {
                borderColor:
                  index === 0
                    ? "#d83500"
                    : index === 1
                    ? "#6b4bff"
                    : index === 2
                    ? "#cc1a1a"
                    : index === 3
                    ? "#0056ff"
                    : "#0064d2",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              },

              "&:hover img": {
                transform: "scale(1.06)",
              },
            }}
          >
            {/* TRENDING TEXT */}
            <Typography sx={{ fontSize: "13px", color: "#666" }}>
              TRENDING AT {item.rank}
            </Typography>

            {/* TITLE */}
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#1e63d6",
                marginTop: 1,
              }}
            >
              {item.title}
            </Typography>

            {/* BACKGROUND LIGHT TEXT */}
            <Typography
              sx={{
                position: "absolute",
                bottom: 70,
                left: 25,
                fontSize: "42px",
                fontWeight: 800,
                color: "#f2f2f2",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {item.bgText}
            </Typography>

            {/* IMAGE */}
            <img
              src={item.img}
              alt=""
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                width: "130px",
                transition: "0.3s ease",
              }}
            />

            {/* VIEW ALL BUTTON */}
            <Typography
              sx={{
                position: "absolute",
                bottom: 20,
                left: 25,
                fontSize: "14px",
                fontWeight: 600,
                color: "#1e63d6",
                cursor: "pointer",
                padding: "6px 18px",
                borderRadius: "10px",
                transition: "0.3s ease",

                "&:hover": {
                  background:
                    index === 0
                      ? "#d83500"
                      : index === 1
                      ? "#6b4bff"
                      : index === 2
                      ? "#cc1a1a"
                      : index === 3
                      ? "#0056ff"
                      : "#0064d2",
                  color: "#fff",
                },
              }}
            >
              View all
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
