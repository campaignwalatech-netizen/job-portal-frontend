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
    <Box sx={{ background: "#e8f1ff", paddingY: 5, marginTop: -20 }}>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", paddingX: 2 }}>
        
        {/* HEADING */}
        <Typography
          sx={{
            fontSize: { xs: "28px", md: "38px" },
            fontWeight: 700,
            textAlign: "center",
            color: "#1a2b48",
          }}
        >
          Featured Jobs
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "16px",
            marginTop: 1,
          }}
        >
          Know your worth and find the job that qualify your life
        </Typography>

        {/* CATEGORIES */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            marginTop: 4,
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => {
            const active = activeCat === cat;
            return (
              <Box
                key={cat}
                onClick={() => setActiveCat(cat)}
                sx={{
                  padding: "8px 20px",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontWeight: 600,
                  border: active ? "1px solid transparent" : "1px solid #c6d4ef",
                  background: active ? "#1e63d6" : "#fff",
                  color: active ? "#fff" : "#1a2b48",
                  transition: "0.3s ease",
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
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 4,
            marginTop: 6,
          }}
        >
          {filteredJobs.map((job, index) => (
            <Box
              key={index}
              sx={{
                background: "#fff",
                borderRadius: "14px",
                padding: 3,
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                transition: "0.3s ease",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <img
                  src={job.logo}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: "17px" }}>
                    {job.title}
                  </Typography>

                  <Typography sx={{ color: "#6b7280", fontSize: "14px" }}>
                    {job.company} • {job.location}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                <Box
                  sx={{
                    background: "#dbeafe",
                    padding: "4px 14px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#2563eb",
                  }}
                >
                  {job.type1}
                </Box>

                <Box
                  sx={{
                    background: "#fef3c7",
                    padding: "4px 14px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#d97706",
                  }}
                >
                  {job.type2}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
  <Button
    variant="contained"
    sx={{
      background: "#1e63d6",
      paddingX: 5,
      paddingY: 1.5,
      borderRadius: "10px",
      fontSize: "16px",
      textTransform: "none",
      "&:hover": { background: "#1856b8" },
    }}
  >
    View More
  </Button>
  </Box>
      </Box>
    </Box>
  );
}
