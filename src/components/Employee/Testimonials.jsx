import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const testimonials = [
  {
    title: "Landed My First Job in Just 12 Days",
    text: "I applied to 18 companies and got shortlisted by 9. The process was smooth, and the job recommendations were perfectly aligned with my skills.",
    name: "Aarti Sharma",
    role: "Software Developer",
    photo: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    title: "Best Platform for Freshers",
    text: "Being a fresher, interviews scared me. But this platform connected me with companies actively seeking new graduates.",
    name: "Rohit Verma",
    role: "UI/UX Intern",
    photo: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    title: "Got a WFH Job Within a Week",
    text: "I wanted a flexible remote job and found multiple openings instantly. The application tracking made it even easier.",
    name: "Nisha Patel",
    role: "Content Writer",
    photo: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    title: "Smooth Interview Process",
    text: "The interface helped me keep track of interview rounds and recruiter responses. Highly recommended.",
    name: "Farhan Siddiqui",
    role: "QA Analyst",
    photo: "https://randomuser.me/api/portraits/men/39.jpg"
  },
  {
    title: "Advanced Filters Saved My Time",
    text: "Searching for IT jobs became easier with role-based filters. Found exactly what I needed.",
    name: "Shruti Mehta",
    role: "Frontend Developer",
    photo: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    title: "Got Multiple Offers",
    text: "I received 3 offer letters within 20 days. This platform truly boosts visibility for active job seekers.",
    name: "Kunal Singh",
    role: "Marketing Executive",
    photo: "https://randomuser.me/api/portraits/men/52.jpg"
  },
  {
    title: "Helped Me Switch Careers",
    text: "Transitioning from sales to HR was challenging but the career suggestions made it easier.",
    name: "Maria Fernandes",
    role: "HR Coordinator",
    photo: "https://randomuser.me/api/portraits/women/56.jpg"
  },
  {
    title: "Instant Recruiter Response",
    text: "I started getting recruiter calls within hours. The platform is incredibly active.",
    name: "Raj Naik",
    role: "Backend Engineer",
    photo: "https://randomuser.me/api/portraits/men/76.jpg"
  },
  {
    title: "Seamless Profile Building",
    text: "The system automatically highlighted my strengths and presented my profile in a professional manner.",
    name: "Ishita Agarwal",
    role: "Data Analyst",
    photo: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    title: "Perfect for Experienced Candidates",
    text: "The job alerts matched my experience level precisely. Quick and reliable.",
    name: "Ankit Rana",
    role: "Senior Accountant",
    photo: "https://randomuser.me/api/portraits/men/28.jpg"
  }
];


const extended = [
  testimonials[testimonials.length - 1],
  ...testimonials,
  testimonials[0],
];


export default function Testimonials() {
  const [index, setIndex] = useState(1);


  // Auto slide
useEffect(() => {
  const timer = setInterval(() => {
    setIndex((prev) => prev + 1);
  }, 3500);
  return () => clearInterval(timer);
}, []);

useEffect(() => {
  if (index === extended.length - 1) {

    setTimeout(() => {
      setIndex(1);
    }, 700); // SAME as your transition time
  }

  if (index === 0) {
    // Reached cloned-last → jump to last real
    setTimeout(() => {
      setIndex(testimonials.length);
    }, 700);
  }
}, [index]);


  return (
    <Box sx={{ paddingY: 10, background: "#ffffff" }}>
      
      {/* Heading */}
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: "26px", md: "36px" },
          fontWeight: 700,
          color: "#1a2b48",
        }}
      >
        Testimonials From Our Customers
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          color: "#64748b",
          marginTop: 1,
          marginBottom: 6,
        }}
      >
        Don't trust us right away, see what our customers have to say!
      </Typography>


      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 4,
         
            transition: index === 1 || index === extended.length - 2 ? "none" : "transform 0.7s ease",
            transform: `translateX(calc( -${index * 360}px + 50% - 180px ))`,
          }}
        >
          {extended.map((t, i) => (
            <Box
              key={i}
              sx={{
                width: "360px",
                background: "#fff",
                padding: 4,
                borderRadius: "16px",
                boxShadow:
                  i === index
                    ? "0px 12px 30px rgba(30, 99, 214, 0.25)"
                    : "0px 6px 16px rgba(0,0,0,0.06)",
                borderBottom: i === index ? "4px solid #1e63d6" : "4px solid transparent",
                opacity: i === index ? 1 : 0.5,
                transition: "0.3s ease",
                position: "relative",
              }}
            >
 
              <Typography
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  fontSize: "40px",
                  color: "#e0e6f2",
                  fontWeight: 700,
                }}
              >
                ”
              </Typography>

              {/* Title */}
              <Typography sx={{ fontSize: "19px", fontWeight: 700, color: "#1e63d6" }}>
                {t.title}
              </Typography>

              {/* Text */}
              <Typography sx={{ marginTop: 2, color: "#4b5563", lineHeight: 1.65 }}>
                {t.text}
              </Typography>

              {/* USER */}
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 4 }}>
                <img
                  src={t.photo}
                  alt=""
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "16px",
                  }}
                />
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>{t.name}</Typography>
                  <Typography sx={{ fontSize: "13px", color: "#6b7280" }}>
                    {t.role}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* DOTS */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3, gap: 1.3 }}>
        {testimonials.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: i === index ? 14 : 8,
              height: 8,
              borderRadius: 10,
              background: i === index ? "#1e63d6" : "#d1d9e6",
              cursor: "pointer",
              transition: "0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
