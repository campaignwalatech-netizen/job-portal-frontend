// EmployeeDashboard.jsx
import { Box, Typography } from "@mui/material";

export default function EmployeeDashboard() {
  return (
    <Box sx={{ p: 6 }}>
      <Typography sx={{ fontSize: 28, fontWeight: 700, mb: 2 }}>
        Employee Dashboard
      </Typography>

      <Typography sx={{ color: "#475569" }}>
        Dummy content — replace with real dashboard pages. You're successfully
        logged in (or the static OTP flow redirected you here).
      </Typography>
    </Box>
  );
}
