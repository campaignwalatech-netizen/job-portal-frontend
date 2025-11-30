import { Box, Typography } from "@mui/material";
import { useState } from "react";

export default function FooterTop() {
  return (
    <Box sx={{ background: "#fff", pt: 8 }}>
      <FooterBlock
        title="Popular Jobs"
        items={[
          "Delivery Person Jobs",
          "Human Resource",
          "Telecaller / BPO",
          "Full Time Jobs",
          "Accounts / Finance Jobs",
          "Backoffice Jobs",
          "Work from Home Jobs",
          "Night Shift Jobs",
          "Sales (Field Work)",
          "Business Development",
          "Part Time Jobs",
          "Freshers Jobs",
        ]}
      />

      <Separator />

      <FooterBlock
        title="Jobs by Department"
        items={[
          "Admin / Back Office / Computer Operator Jobs",
          "Banking / Insurance Jobs",
          "Consulting Jobs",
          "Customer Support Jobs",
          "Advertising / Communication Jobs",
          "Beauty, Fitness & Personal Care Jobs",
          "Content, Editorial & Journalism",
          "Data Science & Analytics Jobs",
          "Aviation & Aerospace Jobs",
          "Construction Jobs",
          "CSR & Social Service Jobs",
          "Driver / Logistics Jobs",
        ]}
      />

      <Separator />

      <FooterBlock
        title="Find Jobs"
        items={[
          "Jobs in Agra",
          "Jobs in Ajmer",
          "Jobs in Asansol",
          "Jobs in Belagavi",
          "Jobs in Ahmedabad",
          "Jobs in Aligarh",
          "Jobs in Aurangabad",
          "Jobs in Bengaluru",
          "Jobs in Bhopal",
          "Jobs in Bareilly",
          "Jobs in Bhavnagar",
        ]}
      />

      <Separator />

      <FooterBlock
        title="Start Hiring"
        items={[
          "Hire in Agra",
          "Hire in Ajmer",
          "Hire in Asansol",
          "Hire in Belagavi",
          "Hire in Ahmedabad",
          "Hire in Aligarh",
          "Hire in Aurangabad",
          "Hire in Bengaluru",
          "Hire in Bhopal",
          "Hire in Bareilly",
          "Hire in Bhavnagar",
        ]}
      />
    </Box>
  );
}

function FooterBlock({ title, items }) {
  const [expanded, setExpanded] = useState(false);


  const visibleCount = expanded ? items.length : 9;
  const showItems = items.slice(0, visibleCount);

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        px: 2,
        pb: 6,
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 700,
          mb: 3,
          color: "#21286A",
        }}
      >
        {title}
      </Typography>


      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
          rowGap: 1,
          columnGap: 4,
        }}
      >
        {showItems.map((t, i) => (
          <Typography
            key={i}
            sx={{
              fontSize: "15px",
              color: "#696969",
              cursor: "pointer",
              "&:hover": { color: "#1e63d6" },
            }}
          >
            {t}
          </Typography>
        ))}
      </Box>
      {items.length > 9 && (
        <Typography
          onClick={() => setExpanded(!expanded)}
          sx={{
            mt: 3,
            color: "#1e63d6",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          {expanded ? "View Less ▲" : "View More ▼"}
        </Typography>
      )}
    </Box>
  );
}

function Separator() {
  return (
    <Box
      sx={{
        borderBottom: "1px solid #e5e7eb",
        maxWidth: "1200px",
        mx: "auto",
        my: 2,
      }}
    />
  );
}
