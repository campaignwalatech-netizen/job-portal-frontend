import { Box, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import WorkIcon from "@mui/icons-material/Work";
import DeleteIcon from "@mui/icons-material/Delete";
import DraftsIcon from "@mui/icons-material/Drafts";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import PeopleIcon from "@mui/icons-material/People";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function EmployerDashboardHome() {
  const navigate = useNavigate();


  const jobStats = [
    {
      title: "All Jobs",
      value: 56,
      subtitle: "View all jobs ever created",
      icon: <FolderOpenIcon sx={{ fontSize: 38 }} />,
      link: "/employer/dashboard/jobs/all",
    },
    {
      title: "Live Job Posts",
      value: 5,
      subtitle: "Currently active and receiving applications",
      icon: <WorkIcon sx={{ fontSize: 38, color: "#0b8125ff"}} />,
      link: "/employer/dashboard/jobs/live",
    },
    {
      title: "Draft Job Posts",
      value: 23,
      subtitle: "Complete the details to post",
      icon: <DraftsIcon sx={{ fontSize: 38, color: "#e7eb06ff"}} />,
      link: "/employer/dashboard/jobs/drafts",
    },
    {
      title: "Expired Job Posts",
      value: 44,
      subtitle: "Currently inactive",
      icon: <DeleteIcon sx={{ fontSize: 38, color: "#ef4444"}} />,
      link: "/employer/dashboard/jobs/expired",
    },
    
    ,
  ];

  const candidateStats = [
    {
      title: "All Candidates",
      value: 789,
      subtitle: "Candidates who submitted data",
      icon: <PeopleIcon sx={{ fontSize: 38 }} />,
      link: "/employer/dashboard/candidates/all",
    },
    {
      title: "Shortlisted Candidates",
      value: 15,
      subtitle: "Contact details accessed",
      icon: <LockOpenIcon sx={{ fontSize: 38 }} />,
      link: "/employer/dashboard/candidates/shortlisted",
    },
    {
      title: "Pending Candidates",
      value: 120,
      subtitle: "Awaiting review",
      icon: <PendingActionsIcon sx={{ fontSize: 38 }} />,
      link: "/employer/dashboard/candidates/pending",
    },
    {
      title: "Rejected Candidates",
      value: 120,
      subtitle: "For live job posts",
      icon: <HighlightOffIcon sx={{ fontSize: 38, color: "#ef4444" }} />,
      link: "/employer/dashboard/candidates/rejected",
    },
    
    {
      title: "Saved Candidates",
      value: 789,
      subtitle: "Saved by employer",
      icon: <BookmarkIcon sx={{ fontSize: 38 }} />,
      link: "/employer/dashboard/candidates/saved",
    },
  ];

  const Card = ({ title, value, subtitle, icon, link }) => (
    <Paper
      onClick={() => navigate(link)}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: "14px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        width: "100%",
        minHeight: "150px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        transition: "0.25s",
        "&:hover": {
          boxShadow: "0 6px 28px rgba(0,0,0,0.12)",
          background: "rgba(59, 130, 246, 0.06)", 
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: "#374151" }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 34, fontWeight: 800, mt: 1 }}>
          {value}
        </Typography>
        <Typography sx={{ color: "#6b7280", fontSize: 14, mt: 0.5 }}>
          {subtitle}
        </Typography>
      </Box>

      <Box sx={{ fontSize: 40, color: "#3b82f6" }}>{icon}</Box>
    </Paper>
  );

  return (
    <Box sx={{ width: "100%", pb: 5 }}>
      {/* Welcome */}
      <Typography
        sx={{
          fontSize: { xs: 24, md: 30 },
          fontWeight: 700,
          mb: { xs: 3, md: 4 },
        }}
      >
        Welcome, $User
      </Typography>

      {/* Jobs heading & button */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 700 }}>
          Jobs
        </Typography>

        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            background: "#3b82f6",
            borderRadius: "10px",
            px: { xs: 2, md: 3 },
            py: 1,
            fontWeight: 600,
            fontSize: { xs: 14, md: 16 },
          }}
        >
          Create New Job
        </Button>
      </Box>

      {/* JOB CARDS */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: { xs: 2, md: 3 },
          mb: 6,
        }}
      >
        {jobStats.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </Box>

      {/* CANDIDATES SECTION */}
      <Typography
        sx={{
          fontSize: { xs: 18, md: 22 },
          fontWeight: 700,
          mb: 3,
        }}
      >
        Candidates
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: { xs: 2, md: 3 },
        }}
      >
        {candidateStats.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </Box>
    </Box>
  );
}
