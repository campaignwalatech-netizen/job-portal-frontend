import { Box, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function FooterMain() {
  return (
    <Box sx={{ background: "#0f0a37", color: "#fff", pt: 5, pb: 4, mt: 6 }}>
      
      {/* WRAPPER */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "flex-start" },
          gap: 6,
        }}
      >
        {/* ---------------- LEFT SECTION ---------------- */}
        <Box sx={{ width: { xs: "100%", md: "260px" } }}>
          <img
            src="/logo.svg"
            width={115}
            alt="logo"
            style={{ borderRadius: "14px" }}
          />

          <Typography sx={{ mt: 2, fontSize: "15px" }}>
            Follow us on social media
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <FacebookIcon sx={{ fontSize: 26 }} />
            <LinkedInIcon sx={{ fontSize: 26 }} />
            <TwitterIcon sx={{ fontSize: 26 }} />
            <InstagramIcon sx={{ fontSize: 26 }} />
            <YouTubeIcon sx={{ fontSize: 26 }} />
          </Box>
        </Box>

        {/* ---------------- RIGHT LINKS SECTION ---------------- */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 4,
            flexGrow: 1,
          }}
        >
          <FooterColumn
            title="Company"
            items={["About Us", "Careers", "Contact", "Blog"]}
          />

          <FooterColumn
            title="Job Categories"
            items={["IT Jobs", "Sales Jobs", "Marketing Jobs", "HR Jobs"]}
          />

          <FooterColumn
            title="Support"
            items={["Help Center", "FAQs", "Privacy Policy", "Terms"]}
          />
        </Box>
      </Box>

      {/* COPYRIGHT */}
      <Typography
        sx={{ textAlign: "center", color: "#cbd5e1", mt: 4, fontSize: "13px" }}
      >
        © 2026 Naukri Chaahiye | All rights reserved
      </Typography>
    </Box>
  );
}

/* ---------- REUSABLE COLUMN COMPONENT ---------- */

function FooterColumn({ title, items }) {
  return (
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: "16px", mb: 1.5 }}>
        {title}
      </Typography>

      {items.map((el, i) => (
        <Typography
          key={i}
          sx={{
            color: "#d1d5db",
            fontSize: "14px",
            mb: 1,
            cursor: "pointer",
            "&:hover": { color: "#ffffff" },
          }}
        >
          {el}
        </Typography>
      ))}
    </Box>
  );
}
