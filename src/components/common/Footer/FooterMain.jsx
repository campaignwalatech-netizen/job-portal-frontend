import { Box, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function FooterMain() {
  return (
    <Box sx={{ background: "#0f0a37", color: "#fff", py: 8, mt: 8 }}>
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 6,
        }}
      >
        {/* LEFT */}
        <Box>
          <img src="/logo.svg" width={120} alt="logo" style={{ borderRadius: "30px" }} />
          <Typography sx={{ mt: 2, fontSize: "16px" }}>
            Follow us on social media
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <FacebookIcon sx={{ fontSize: 30, color: "#3b82f6", cursor: "pointer" }} />
            <LinkedInIcon sx={{ fontSize: 30, color: "#3b82f6", cursor: "pointer" }} />
            <TwitterIcon sx={{ fontSize: 30, color: "#3b82f6", cursor: "pointer" }} />
            <InstagramIcon sx={{ fontSize: 30, color: "#3b82f6", cursor: "pointer" }} />
            <YouTubeIcon sx={{ fontSize: 30, color: "#3b82f6", cursor: "pointer" }} />
          </Box>
        </Box>

        {/* RIGHT BOX */}
        {/* RIGHT BOX */}
<Box
  sx={{
    background: "#fff",
    color: "#000",
    px: 4,
    py: 4,
    borderRadius: "14px",
    width: { xs: "100%", sm: "auto" },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  }}
>
  {/* LEFT SIDE → TEXT + GOOGLE PLAY */}
  <Box>
    <Typography sx={{ fontWeight: 700, mb: 1, fontSize: "20px" }}>
      Apply on the go
    </Typography>

    <Typography sx={{ mb: 2, fontSize: "14px" }}>
      Get real-time job updates on our App
    </Typography>

    <img
      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
      width={150}
      alt="Google Play"
      style={{ cursor: "pointer" }}
    />
  </Box>

  {/* RIGHT SIDE → QR CODE */}
  <Box>
    <img
      src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=JobChaahiye"
      width={120}
      alt="QR"
      style={{ borderRadius: "8px" }}
    />
  </Box>
</Box>

      </Box>

      {/* COPYRIGHT */}
      <Typography sx={{ textAlign: "center", mt: 5, color: "#cbd5e1" }}>
        © 2024 Naukri Chaahiye | All rights reserved
      </Typography>
    </Box>
  );
}
