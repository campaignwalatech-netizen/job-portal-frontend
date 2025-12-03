import { Box, Typography, Paper } from "@mui/material";

const Card = ({ title, value, subtitle, icon }) => (
  <Paper
    sx={{
      p: 2.5,
      borderRadius: "14px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
      width: "100%",
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box>
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{title}</Typography>
        <Typography sx={{ fontSize: 32, fontWeight: 800, mt: 1 }}>
          {value}
        </Typography>
        <Typography sx={{ color: "#64748b", fontSize: 14 }}>{subtitle}</Typography>
      </Box>
      {icon}
    </Box>
  </Paper>
);

export default function EmployerDashboardHome() {
  return (
    <Box>
      <Typography sx={{ fontSize: 28, fontWeight: 700, mb: 3 }}>
        Welcome, $User
      </Typography>

      {/* JOBS SECTION */}
      <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 2 }}>
        Jobs
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
          gap: 2.5,
          mb: 5,
        }}
      >
        <Card title="Live Job Posts" value="5" subtitle="Currently active and receiving applications" />
        <Card title="Expired Job Posts" value="44" subtitle="Currently inactive" />
        <Card title="Draft Job Posts" value="23" subtitle="Complete the details to post" />
        <Card title="All Jobs" value="56" subtitle="View all job ever created" />
      </Box>

      {/* CANDIDATES SECTION */}
      <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 2 }}>
        Candidates
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 2.5,
        }}
      >
        <Card title="All Candidates" value="789" subtitle="Candidates who submitted data for any job" />
        <Card title="Shortlisted Candidates" value="15" subtitle="Contact details accessed" />
        <Card title="Rejected Candidates" value="120" subtitle="For live job posts" />
        <Card title="Pending Candidates" value="120" subtitle="For live job posts" />
        <Card title="Saved Candidates" value="789" subtitle="Candidates who submitted data" />
      </Box>
    </Box>
  );
}
