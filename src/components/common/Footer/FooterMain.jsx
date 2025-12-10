import { Box, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function FooterMain() {
  return (
    <Box
      sx={{
        background: "#0f0a37",
        color: "#fff",
        pt: { xs: 5, sm: 6 },
        pb: { xs: 5, sm: 6 },
        mt: 6,
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 3, sm: 4 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "flex-start" },
          gap: { xs: 4, md: 8 },
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "280px" } }}>
          <img
            src="/logo.svg"
            width={90}
            alt="logo"
            style={{ borderRadius: "14px" }}
          />

          <Typography sx={{ mt: 2, fontSize: "16px", fontWeight: 500 }}>
            Follow us on social media
          </Typography>

          <Box sx={{ display: "flex", gap: 2.2, mt: 2 }}>
            {[FacebookIcon, LinkedInIcon, TwitterIcon, InstagramIcon, YouTubeIcon].map(
              (Icon, i) => (
                <Icon
                  key={i}
                  sx={{
                    fontSize: 28,
                    opacity: 0.9,
                    cursor: "pointer",
                    transition: "0.25s",
                    "&:hover": { opacity: 1, transform: "scale(1.15)" },
                  }}
                />
              )
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: { xs: 3, md: 6 },
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
      <Typography
        sx={{
          textAlign: "center",
          color: "#cbd5e1",
          mt: 4,
          fontSize: "13px",
          opacity: 0.7,
        }}
      >
        © 2026 Naukri Chaahiye | All rights reserved
      </Typography>
    </Box>
  );
}

function FooterColumn({ title, items }) {
  return (
    <Box>
      <Typography
        sx={{ fontWeight: 700, fontSize: "17px", mb: 1.8, color: "#fff" }}
      >
        {title}
      </Typography>

      {items.map((el, i) => (
        <Typography
          key={i}
          sx={{
            color: "#d1d5db",
            fontSize: "15px",
            mb: 1.1,
            cursor: "pointer",
            transition: "0.2s ease",
            "&:hover": { color: "#fff" },
          }}
        >
          {el}
        </Typography>
      ))}
    </Box>
  );
}
