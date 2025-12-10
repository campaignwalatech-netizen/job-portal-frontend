import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const categories = ["All", "Trending", "Design", "Marketing", "Health"];

const jobs = [
  {
    title: "Recruiting Coordinator",
    company: "Catalyst",
    location: "London, UK",
    type1: "Full Time",
    type2: "Urgent",
    logo: "https://cdn-icons-png.flaticon.com/512/3473/3473486.png",
    category: "Trending",
  },
  {
    title: "Product Manager, Studio",
    company: "Invision",
    location: "London, UK",
    type1: "Part Time",
    type2: "Urgent",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    category: "Design",
  },
  {
    title: "Senior Product Designer",
    company: "Upwork",
    location: "London, UK",
    type1: "Temporary",
    type2: "Urgent",
    logo: "https://cdn-icons-png.flaticon.com/512/732/732244.png",
    category: "Design",
  },
  {
    title: "Product Manager, Risk",
    company: "Medium",
    location: "London, UK",
    type1: "Freelancer",
    type2: "Private",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968520.png",
    category: "Marketing",
  },
  {
    title: "Technical Architect",
    company: "Lively",
    location: "London, UK",
    type1: "Full Time",
    type2: "Private",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968700.png",
    category: "Trending",
  },
  {
    title: "Web Developer",
    company: "Udemy",
    location: "London, UK",
    type1: "Part Time",
    type2: "Urgent",
    logo: "https://cdn-icons-png.flaticon.com/512/732/732212.png",
    category: "Health",
  },
];

export default function FeaturedJobs() {
  const [activeCat, setActiveCat] = useState("All");

  const filteredJobs =
    activeCat === "All"
      ? jobs
      : jobs.filter((job) => job.category === activeCat);

  return (
    <Box sx={{ 
      background: "#e8f1ff", 
      padding: { xs: "40px 16px", sm: "60px 24px", md: "80px 32px" },
      marginTop: 0
    }}>
      <Box sx={{ 
        maxWidth: "1200px", 
        margin: "0 auto" 
      }}>
        
        {/* HEADING */}
        <Typography
          sx={{
            fontSize: { xs: "22px", sm: "28px", md: "38px" },
            fontWeight: 700,
            textAlign: "center",
            color: "#1a2b48",
            lineHeight: { xs: 1.2, md: 1.3 },
          }}
        >
          Featured Jobs
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#64748b",
            fontSize: { xs: "14px", sm: "16px" },
            marginTop: { xs: "8px", sm: "12px" },
            paddingX: { xs: 1, sm: 0 },
            lineHeight: 1.5,
          }}
        >
          Know your worth and find the job that qualifies your life
        </Typography>

        {/* CATEGORIES */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: { xs: 1, sm: 2 },
            marginTop: { xs: 3, sm: 4 },
            flexWrap: "wrap",
            paddingX: { xs: 1, sm: 0 },
          }}
        >
          {categories.map((cat) => {
            const active = activeCat === cat;
            return (
              <Box
                key={cat}
                onClick={() => setActiveCat(cat)}
                sx={{
                  padding: { xs: "6px 16px", sm: "8px 20px" },
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: { xs: "14px", sm: "15px" },
                  border: active ? "1px solid transparent" : "1px solid #c6d4ef",
                  background: active ? "#1e63d6" : "#fff",
                  color: active ? "#fff" : "#1a2b48",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    background: "#1e63d6",
                    color: "#fff",
                    borderColor: "#1e63d6",
                  },
                }}
              >
                {cat}
              </Box>
            );
          })}
        </Box>

        {/* JOB GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { 
              xs: "1fr", 
              sm: "repeat(2, 1fr)", 
              md: "repeat(3, 1fr)" 
            },
            gap: { xs: 3, sm: 4 },
            marginTop: { xs: 4, sm: 6 },
          }}
        >
          {filteredJobs.map((job, index) => (
            <Box
              key={index}
              sx={{
                background: "#fff",
                borderRadius: "12px",
                padding: { xs: "20px", sm: "24px" },
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all 0.3s ease",
                border: "1px solid transparent",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                  borderColor: "#d1d9f0",
                  transform: { xs: "none", sm: "translateY(-4px)" },
                },
              }}
            >
              <Box sx={{ 
                display: "flex", 
                alignItems: "flex-start", 
                gap: { xs: 2, sm: 3 } 
              }}>
                <Box
                  component="img"
                  src={job.logo}
                  alt={`${job.company} logo`}
                  sx={{ 
                    width: { xs: "48px", sm: "50px" }, 
                    height: { xs: "48px", sm: "50px" }, 
                    borderRadius: "50%",
                    objectFit: "contain",
                    backgroundColor: "#f8fafc",
                    padding: "6px",
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ 
                    fontWeight: 600, 
                    fontSize: { xs: "16px", sm: "17px" },
                    lineHeight: 1.3,
                    color: "#1a2b48",
                  }}>
                    {job.title}
                  </Typography>

                  <Typography sx={{ 
                    color: "#6b7280", 
                    fontSize: { xs: "13px", sm: "14px" },
                    marginTop: "4px",
                    lineHeight: 1.4,
                  }}>
                    {job.company} • {job.location}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ 
                display: "flex", 
                gap: { xs: 1.5, sm: 2 }, 
                marginTop: { xs: 2, sm: 2.5 },
                flexWrap: "wrap",
              }}>
                <Box
                  sx={{
                    background: "#dbeafe",
                    padding: { xs: "3px 12px", sm: "4px 14px" },
                    borderRadius: "20px",
                    fontSize: { xs: "12px", sm: "13px" },
                    fontWeight: 600,
                    color: "#2563eb",
                    lineHeight: 1.5,
                  }}
                >
                  {job.type1}
                </Box>

                <Box
                  sx={{
                    background: "#fef3c7",
                    padding: { xs: "3px 12px", sm: "4px 14px" },
                    borderRadius: "20px",
                    fontSize: { xs: "12px", sm: "13px" },
                    fontWeight: 600,
                    color: "#d97706",
                    lineHeight: 1.5,
                  }}
                >
                  {job.type2}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        
        {/* VIEW MORE BUTTON */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          marginTop: { xs: 5, sm: 6 } 
        }}>
          <Button
            variant="contained"
            sx={{
              background: "#1e63d6",
              padding: { xs: "10px 32px", sm: "12px 40px" },
              borderRadius: "10px",
              fontSize: { xs: "15px", sm: "16px" },
              fontWeight: 600,
              textTransform: "none",
              minWidth: { xs: "140px", sm: "160px" },
              "&:hover": { 
                background: "#1856b8",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 12px rgba(30, 99, 214, 0.2)",
              },
              transition: "all 0.3s ease",
            }}
          >
            View More
          </Button>
        </Box>
      </Box>
    </Box>
  );
}