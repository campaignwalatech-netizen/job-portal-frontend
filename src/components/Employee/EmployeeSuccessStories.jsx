import { Box, Typography, Avatar } from "@mui/material";

const stories = [
  {
    name: "Amit Verma",
    text: "got a job as Frontend Developer",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sneha Patil",
    text: "received an interview call 1 hour ago",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Rakesh Yadav",
    text: "secured a Software Engineer role",
    img: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    name: "Pooja Kulkarni",
    text: "cleared the HR round today",
    img: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "Aditya Chauhan",
    text: "fixed an interview for Java Developer",
    img: "https://randomuser.me/api/portraits/men/41.jpg",
  },
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
          px: { xs: 1, sm: 2 },
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
              px: { xs: 1.5, sm: 2 },
              py: { xs: 1, sm: 1.3 },
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
                width: { xs: 32, sm: 36 },
                height: { xs: 32, sm: 36 },
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: "13px", sm: "14px" },
                lineHeight: 1.3,
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
