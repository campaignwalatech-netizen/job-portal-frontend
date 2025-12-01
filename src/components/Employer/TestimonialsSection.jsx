import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

const testimonials = [
  {
    title: "Hired 5 Developers in Under Two Weeks",
    text: "The candidate pool is extremely strong. Shortlisting and scheduling interviews was effortless.",
    name: "Pooja Deshmukh",
    role: "HR Manager, TechWorld",
    photo: "https://randomuser.me/api/portraits/women/21.jpg"
  },
  {
    title: "Excellent For Bulk Hiring",
    text: "We hired 40 freshers for our customer support team quickly and smoothly.",
    name: "Arun Prakash",
    role: "Recruitment Lead, VoxTel",
    photo: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    title: "Verified Profiles Made Our Work Faster",
    text: "Most candidates were pre-verified, saving our screening time by 60%.",
    name: "Nikita Kapoor",
    role: "Senior HR Partner, FinSign",
    photo: "https://randomuser.me/api/portraits/women/35.jpg"
  },
  {
    title: "Smart Matching Tools Are Impressive",
    text: "The AI match accuracy was surprisingly good. Found highly relevant resumes instantly.",
    name: "Manish Reddy",
    role: "Talent Acquisition, CloudCorp",
    photo: "https://randomuser.me/api/portraits/men/53.jpg"
  },
  {
    title: "Hiring Turnaround Reduced Significantly",
    text: "We brought down our hiring time from 30 days to just 10 days.",
    name: "Shalini Iyer",
    role: "HR Business Partner",
    photo: "https://randomuser.me/api/portraits/women/25.jpg"
  },
  {
    title: "Perfect for Startup Hiring",
    text: "As a startup, we needed quality talent fast. This platform delivered.",
    name: "Rohan Mehta",
    role: "Founder, GrowAxis",
    photo: "https://randomuser.me/api/portraits/men/27.jpg"
  },
  {
    title: "Great Experience Across All Job Roles",
    text: "We hire for marketing, design, tech — and the results have been consistently excellent.",
    name: "Sonam Gupta",
    role: "Recruiter, BrightWorks",
    photo: "https://randomuser.me/api/portraits/women/48.jpg"
  },
  {
    title: "Best Candidate Quality in the Market",
    text: "Compared to other job portals, we've found the highest response rate here.",
    name: "Aman Verma",
    role: "Hiring Manager, NexaPay",
    photo: "https://randomuser.me/api/portraits/men/63.jpg"
  },
  {
    title: "Simple and Organized Hiring Dashboard",
    text: "Everything from posting jobs to shortlisting is well structured and easy.",
    name: "Krupa Shah",
    role: "HR Executive, LogiPlus",
    photo: "https://randomuser.me/api/portraits/women/62.jpg"
  },
  {
    title: "Excellent Support Team",
    text: "Their support team was super quick and helped us set up our account in no time.",
    name: "Vikram Chauhan",
    role: "HR Manager, UnitySoft",
    photo: "https://randomuser.me/api/portraits/men/45.jpg"
  }
];

export default function Testimonials() {
  const GAP = 32;
  const AUTOPLAY_MS = 2500;

  const extended = [
    testimonials[testimonials.length - 1],
    ...testimonials,
    testimonials[0],
  ];

  const [index, setIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [cardWidth, setCardWidth] = useState(360);

  const cardRef = useRef(null);
  const autoplayRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      } else {
        setCardWidth(360);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => setIndex((p) => p + 1), AUTOPLAY_MS);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

 
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

  const handleDotClick = (i) => {
    setIsTransitioning(true);
    setIndex(i + 1); 
    resetAutoplay();
  };


  const transformValue = `translateX(calc(-${index * (cardWidth + GAP)}px + 50% - ${
    cardWidth / 2
  }px))`;

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
          marginTop: 1,
          marginBottom: 6,
        }}
      >
        Don't trust us right away, see what our customers have to say!
      </Typography>

     
      <Box
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: `${GAP}px`,
            transform: transformValue,
            transition: isTransitioning
              ? {
                  xs: "transform 0.5s ease-out",
                  md: "transform 0.7s ease",
                }
              : "none",
            willChange: "transform",
          }}
        >
          {extended.map((t, i) => {
            const isActive = i === index;
            const attachRef = i === index ? cardRef : null;

            return (
              <Box
                key={i}
                ref={attachRef}
                sx={{
                  width: { xs: "85vw", sm: "360px" },
                  maxWidth: "360px",
                  background: "#fff",
                  padding: 4,
                  borderRadius: "16px",
                  boxShadow: isActive
                    ? "0px 12px 30px rgba(30,99,214,0.25)"
                    : "0px 6px 16px rgba(0,0,0,0.06)",
                  borderBottom: isActive
                    ? "4px solid #1e63d6"
                    : "4px solid transparent",
                  opacity: isActive ? 1 : 0.5,
                  transition: "opacity 0.3s ease, box-shadow 0.3s ease",
                  flexShrink: 0,
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

                <Typography sx={{ fontSize: "19px", fontWeight: 700, color: "#1e63d6" }}>
                  {t.title}
                </Typography>

                <Typography sx={{ marginTop: 2, color: "#4b5563", lineHeight: 1.65 }}>
                  {t.text}
                </Typography>

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
            );
          })}
        </Box>
      </Box>

     
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
          gap: 1.3,
        }}
      >
        {testimonials.map((_, i) => {
          const active = index === i + 1; 
          return (
            <Box
              key={i}
              onClick={() => handleDotClick(i)}
              sx={{
                width: active ? 14 : 8,
                height: 8,
                borderRadius: 10,
                background: active ? "#1e63d6" : "#d1d9e6",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
