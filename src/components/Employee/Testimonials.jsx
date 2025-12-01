import { useState, useEffect, useRef } from "react";
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

export default function Testimonials() {
  const GAP = 32;
  const CARD_WIDTH = 360;

  const extended = [
    testimonials[testimonials.length - 1],
    ...testimonials,
    testimonials[0],
  ];

  const [index, setIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // autoplay
  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => p + 1), 3500);
    return () => clearInterval(timer);
  }, []);

  // infinite loop fix
  useEffect(() => {
    if (index === extended.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(1);
        setTimeout(() => setIsTransitioning(true), 30);
      }, 700);
    }

    if (index === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(testimonials.length);
        setTimeout(() => setIsTransitioning(true), 30);
      }, 700);
    }
  }, [index]);

  // centered transform
  const transformValue = `translateX(calc(-${index * (CARD_WIDTH + GAP)}px + 50% - ${CARD_WIDTH /
    2}px))`;

  return (
    <Box sx={{ paddingY: 10, background: "#ffffff" }}>
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
          mt: 1,
          mb: 6,
        }}
      >
        Don't trust us right away, see what our customers have to say!
      </Typography>

      {/* Slider */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: `${GAP}px`,
            transform: transformValue,
            transition: isTransitioning ? "transform 0.7s ease" : "none",
          }}
        >
          {extended.map((t, i) => {
            const isActive = i === index;

            return (
              <Box
                key={i}
                sx={{
                  width: `${CARD_WIDTH}px`,
                  background: "#fff",
                  padding: 4,
                  borderRadius: "16px",
                  boxShadow: isActive
                    ? "0px 12px 30px rgba(30,99,214,0.25)"
                    : "0px 6px 16px rgba(0,0,0,0.06)",
                  borderBottom: isActive ? "4px solid #1e63d6" : "4px solid transparent",
                  opacity: isActive ? 1 : 0.5,
                  transition: "0.3s ease",
                  position: "relative",
                  flexShrink: 0,
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

                <Typography sx={{ fontSize: "19px", fontWeight: 700, color: "#1e63d6" }}>
                  {t.title}
                </Typography>

                <Typography sx={{ mt: 2, color: "#4b5563", lineHeight: 1.65 }}>
                  {t.text}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
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
            );
          })}
        </Box>
      </Box>

      {/* Dots */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1.3 }}>
        {testimonials.map((_, i) => {
          const active = index === i + 1;
          return (
            <Box
              key={i}
              onClick={() => setIndex(i + 1)}
              sx={{
                width: active ? 14 : 8,
                height: 8,
                borderRadius: 10,
                background: active ? "#1e63d6" : "#d1d9e6",
                cursor: "pointer",
                transition: "0.3s ease",
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
