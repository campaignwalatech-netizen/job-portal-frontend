import { Box, Typography, Avatar } from "@mui/material";

const stories = [
  { name: "Rohit", text: "got job", img: "/user1.png" },
  { name: "Devendra Singh", text: "got job 2 hours ago", img: "/user2.png" },
  { name: "Jatin Bhardwaj", text: "got job 5 hours ago", img: "/user3.png" },
  { name: "Saloni Kondhalkar", text: "has fixed an interview", img: "/user4.png" },
  { name: "Suraj Pal", text: "has fixed an interview", img: "/user5.png" },
];

// duplicate list for seamless infinite sliding
const loopStories = [...stories, ...stories];

export default function SuccessStories() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(to right, #dce7ff, #f1f5ff)",
        paddingY: 3,
        overflow: "hidden", // IMPORTANT: hides overflow for smooth loop
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: "max-content",
          paddingX: 2,
          animation: "scrollStories 18s linear infinite", // animation applied here
        }}
      >
        {loopStories.map((s, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              background: "#fff",
              paddingX: 2,
              paddingY: 1.3,
              borderRadius: "30px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
              minWidth: "250px",
              maxWidth: "250px",
              whiteSpace: "normal",
              flexShrink: 0,
            }}
          >
            <Avatar src={s.img} sx={{ width: 32, height: 32 }} />
            <Typography sx={{ fontSize: "14px" }}>
              <strong>{s.name}</strong> {s.text}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* KEYFRAMES */}
      <style>
        {`
          @keyframes scrollStories {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </Box>
  );
}
