import React from "react";
import { Box, Typography, IconButton, Avatar, Badge } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function DashboardHeader() {
  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: "1px solid #E6EEF8",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: { xs: 2, md: 4 },
        py: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <img src="/logo.svg" alt="logo" style={{ width: 44 }} />
        <Typography sx={{ fontWeight: 700, color: "#1e63d6", fontSize: 20 }}>
          Naukri Chahiye
        </Typography>
      </Box>

      <Box sx={{ flex: 1 }} />

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton aria-label="notifications" size="large">
          <Badge variant="dot" color="error" overlap="circular">
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>

        <Typography sx={{ fontSize: 14, color: "#1e63d6" }}>Credits:120</Typography>

        <Avatar
          alt="user"
          src="https://i.pravatar.cc/40"
          sx={{ width: 36, height: 36, border: "2px solid #e6f2ff" }}
        />
      </Box>
    </Box>
  );
}
