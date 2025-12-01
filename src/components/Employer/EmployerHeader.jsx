import { Box, Typography } from "@mui/material";

export default function EmployerHeader() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "70px",
        px: { xs: 2, md: 12 },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "#fff",
        zIndex: 2000,
      }}
    >
      {/* LEFT: LOGO */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img
          src="/logo.svg"
          alt="logo"
          style={{ width: "55px", borderRadius: "10px" }}
        />
      </Box>

      {/* RIGHT: LINK */}
      <Typography
        sx={{
          fontSize: "16px",
          color: "#1d4ed8",
          cursor: "pointer",
          fontWeight: 500,
          "&:hover": { textDecoration: "underline" },
        }}
        onClick={() => (window.location.href = "/employee")}
      >
        Looking for a Naukri?
      </Typography>
    </Box>
  );
}
