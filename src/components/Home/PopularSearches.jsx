import { Box, Typography } from "@mui/material";

const items = [
  {
    rank: "#1",
    title: "Jobs for Freshers",
    img: "https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/freshers-jobs.png",
    bgText: "Jobs for Freshers",
  },
  {
    rank: "#2",
    title: "Work from home Jobs",
    img: "https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/work-from-home-jobs.png",
    bgText: "Work from Home",
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
    bgText: "Women Jobs",
  },
  {
    rank: "#5",
    title: "Full Time Jobs",
    img: "https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/work-from-home-jobs.png",
    bgText: "Full Time",
  },
  {
    rank: "#6",
    title: "High Salary Jobs",
    img: "https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/women-jobs.png",
    bgText: "High Pay",
  },
];

export default function PopularSearches() {
  return (
    <Box 
      sx={{ 
        padding: { xs: "40px 16px", sm: "60px 24px", md: "80px 32px" },
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >

      {/* Heading */}
      <Typography
        sx={{
          fontSize: { xs: "22px", sm: "28px", md: "38px" },
          textAlign: "center",
          fontWeight: 700,
          marginBottom: { xs: 4, md: 6 },
          color: "#1a2b48",
          lineHeight: { xs: 1.2, md: 1.3 },
          letterSpacing: { xs: "-0.2px", md: "normal" },
        }}
      >
        Popular Searches on Naukri <br /> Chaahiye
      </Typography>

      {/* Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { 
            xs: "1fr", 
            sm: "repeat(2, 1fr)", 
            md: "repeat(3, 1fr)" 
          },
          gap: { xs: 3, md: 4 },
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              borderRadius: { xs: "16px", md: "20px" },
              border: "1px solid",
              borderColor: "#e5e7eb",
              padding: { xs: "20px", sm: "24px" },
              minHeight: { xs: "200px", sm: "220px", md: "250px" },
              overflow: "hidden",
              transition: "all 0.3s ease",
              cursor: "pointer",
              backgroundColor: "#fff",

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
                    : index === 4 
                    ? "#00897b"
                    : index === 5
                    ? "#76a3d3"
                    : "#0064d2",
                background:
                  index === 0
                    ? "rgba(216, 53, 0, 0.03)"
                    : index === 1
                    ? "rgba(107, 75, 255, 0.03)"    
                    : index === 2
                    ? "rgba(204, 26, 26, 0.03)"
                    : index === 3
                    ? "rgba(0, 86, 255, 0.03)"
                    : index === 4 
                    ? "rgba(0, 137, 123, 0.03)"
                    : index === 5
                    ? "rgba(115, 110, 173, 0.03)"
                    : "rgba(0, 100, 210, 0.03)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                transform: { xs: "none", md: "translateY(-4px)" },
              },

              "&:hover .bgText": {
                transform: "translateX(8px)",
                opacity: 1,
                letterSpacing: "0.5px"
              },

              "&:hover .viewBtn": {
                background:
                  index === 0
                    ? "#d83500"
                    : index === 1
                    ? "#6b4bff"
                    : index === 2
                    ? "#cc1a1a"
                    : index === 3
                    ? "#0056ff"
                    : index === 4
                    ? "#00897b"
                    : index === 5
                    ? "#76a3d3"
                    : "#0064d2",
                color: "#fff",
              },

              "&:hover img": {
                transform: "scale(1.06)",
              },
            }}
          >
            {/* TRENDING */}
            <Typography sx={{ 
              fontSize: { xs: "12px", sm: "13px" }, 
              color: "#666",
              fontWeight: 500 
            }}>
              TRENDING AT {item.rank}
            </Typography>

            {/* TITLE */}
            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "17px", md: "18px" },
                fontWeight: 600,
                color: "#1e63d6",
                marginTop: { xs: "8px", md: "12px" },
                lineHeight: 1.3,
              }}
            >
              {item.title}
            </Typography>

            {/* BACKGROUND LIGHT TEXT */}
            <Typography
              className="bgText"
              sx={{
                position: "absolute",
                bottom: { xs: 70, sm: 75, md: 85 },
                left: { xs: 16, md: 25 },
                fontSize: { xs: "24px", sm: "28px", md: "36px" },
                fontWeight: 800,
                color: "#f5f5f5",
                pointerEvents: "none",
                userSelect: "none",
                transition: "all 0.4s ease",
                opacity: 0.9,
                lineHeight: 1,
                zIndex: 1,
              }}
            >
              {item.bgText}
            </Typography>

            {/* IMAGE */}
            <Box
              component="img"
              src={item.img}
              alt={item.title}
              sx={{
                position: "absolute",
                bottom: { xs: 10, md: 10 },
                right: { xs: 10, md: 10 },
                width: { xs: "100px", sm: "110px", md: "120px" },
                height: "auto",
                transition: "transform 0.3s ease",
                zIndex: 2,
              }}
            />

            {/* VIEW ALL BUTTON */}
            <Typography
              className="viewBtn"
              sx={{
                position: "absolute",
                bottom: { xs: 16, md: 20 },
                left: { xs: 16, md: 25 },
                fontSize: { xs: "15px", md: "16px" },
                fontWeight: 600,
                background: "transparent",
                color: "#1e63d6",
                cursor: "pointer",
                padding: { xs: "5px 14px", md: "6px 18px" },
                borderRadius: "8px",
                transition: "all 0.3s ease",
                zIndex: 2,
                whiteSpace: "nowrap",
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