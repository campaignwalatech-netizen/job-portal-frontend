import { Box, Typography, Avatar } from "@mui/material";

const stories = [
  { name: "Rohit", text: "got job", img: "/user1.png" },
  { name: "Devendra Singh", text: "got job 2 hours ago", img: "/user2.png" },
  { name: "Jatin Bhardwaj", text: "got job 5 hours ago", img: "/user3.png" },
  { name: "Saloni Kondhalkar", text: "has fixed an interview", img: "/user4.png" },
  { name: "Suraj Pal", text: "has fixed an interview", img: "/user5.png" },
];

const loopStories = [...stories, ...stories];

export default function EmployeeSuccessStories() {
  return (
    <Box
      sx={{
        width: "100%",
        background: "transparent",
        overflow: "hidden",
        position: "relative",
        mt: 3,    
        mb: 6,     
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: { xs: 1.5, sm: 2 },
          width: "max-content",
          paddingX: { xs: 1, sm: 2 },
          animation: "scrollEmployeeStories 18s linear infinite",
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
              paddingX: { xs: 1.5, sm: 2 },
              paddingY: { xs: 1, sm: 1.3 },
              borderRadius: "30px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
              minWidth: { xs: "200px", sm: "230px", md: "260px" },
              maxWidth: { xs: "200px", sm: "230px", md: "260px" },
              flexShrink: 0,
            }}
          >
            <Avatar
              src={s.img}
              sx={{
                width: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: "13px", sm: "14px" },
                lineHeight: "1.3",
              }}
            >
              <strong>{s.name}</strong> {s.text}
            </Typography>
          </Box>
        ))}
      </Box>

      <style>
        {`
          @keyframes scrollEmployeeStories {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </Box>
  );
}
