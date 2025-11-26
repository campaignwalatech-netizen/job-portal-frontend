import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function EmployerHeader() {
  return (
    <Box
      sx={{
        width: "100%",
        py: 2,
        px: 4,
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        background: "#fff",
        zIndex: 50,
      }}
    >
      {/* LEFT: LOGO */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img
          src="/logo.svg"
          alt="logo"
          style={{ width: "65px", borderRadius: "14px" }}
        />
      </Box>

      {/* RIGHT: Link */}
      <Typography
        sx={{
          fontSize: "16px",
          color: "#2563eb",
          cursor: "pointer",
          fontWeight: 500,
          "&:hover": { textDecoration: "underline" },
        }}
        onClick={() => (window.location.href = "/")}
      >
        Looking for a job?
      </Typography>
    </Box>
  );
}
