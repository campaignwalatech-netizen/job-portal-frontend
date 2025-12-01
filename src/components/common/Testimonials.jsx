import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function Testimonials({ testimonials }) {
  const GAP = 32;
  const CARD_WIDTH = 360;

  // Create 2 clones on each side
  const extended = [
    testimonials[testimonials.length - 2],
    testimonials[testimonials.length - 1],
    ...testimonials,
    testimonials[0],
    testimonials[1],
  ];

  // Index starts at 2 because first real card = extended[2]
  const [index, setIndex] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Loop handling
  useEffect(() => {
    // If we reach the right clones → jump back to real start
    if (index === extended.length - 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(2); // real card 0
        setTimeout(() => setIsTransitioning(true), 30);
      }, 700);
    }

    // If we reach left clones → jump to real end
    if (index === 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(extended.length - 3); // last real card
        setTimeout(() => setIsTransitioning(true), 30);
      }, 700);
    }
  }, [index, extended.length]);

  // Center active card
  const transformValue = `translateX(calc(-${
    index * (CARD_WIDTH + GAP)
  }px + 50% - ${CARD_WIDTH / 2}px))`;

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
          mt: 1,
          mb: 6,
        }}
      >
        Don't trust us right away, see what our customers have to say!
      </Typography>

      {/* OUTER WRAPPER — must not use flex */}
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* TRACK */}
        <Box
          sx={{
            display: "flex",
            gap: `${GAP}px`,
            transform: transformValue,
            transition: isTransitioning ? "transform 0.7s ease" : "none",
            willChange: "transform",
          }}
        >
          {extended.map((item, i) => {
            const isActive = i === index;

            return (
              <Box
                key={i}
                sx={{
                  width: `${CARD_WIDTH}px`,
                  flexShrink: 0,
                  background: "#ffffff",
                  padding: 4,
                  borderRadius: "16px",
                  opacity: isActive ? 1 : 0.45,
                  boxShadow: isActive
                    ? "0px 12px 30px rgba(30, 99, 214, 0.25)"
                    : "0px 6px 16px rgba(0,0,0,0.06)",
                  borderBottom: isActive
                    ? "4px solid #1e63d6"
                    : "4px solid transparent",
                  transition: "0.3s ease",
                  position: "relative",
                }}
              >
                {/* Quote icon */}
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
                <Typography
                  sx={{
                    fontSize: "19px",
                    fontWeight: 700,
                    color: "#1e63d6",
                  }}
                >
                  {item.title}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    mt: 2,
                    color: "#4b5563",
                    lineHeight: 1.65,
                  }}
                >
                  {item.text}
                </Typography>

                {/* User */}
                <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
                  <img
                    src={item.photo}
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
                    <Typography sx={{ fontWeight: 700 }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: "13px", color: "#6b7280" }}>
                      {item.role}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* DOTS */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1.3 }}>
        {testimonials.map((_, i) => {
          const active = index === i + 2;
          return (
            <Box
              key={i}
              onClick={() => setIndex(i + 2)}
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
