import { Box, Typography } from "@mui/material";
import { useState } from "react";

const sectionStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 16px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
  gap: 2,
};

export default function FooterTop() {
  return (
    <Box sx={{ background: "#fff", mt: 10 }}>
      <FooterSection
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

      <FooterSection
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

      <FooterSection
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
          "Jobs in Ahmednagar",
          "Jobs in Amritsar",
          "Jobs in Bareilly",
          "Jobs in Bhavnagar",
        ]}
      />

      <Separator />

      <FooterSection
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
          "Hire in Ahmednagar",
          "Hire in Amritsar",
          "Hire in Bareilly",
          "Hire in Bhavnagar",
        ]}
      />
    </Box>
  );
}

/* -------------------- REUSABLE SECTION -------------------- */

function FooterSection({ title, items }) {
  const [expanded, setExpanded] = useState(false);

  // Show only 6 items by default (2 rows * 3 columns)
  const displayedItems = expanded ? items : items.slice(0, 6);

  return (
    <Box sx={sectionStyle}>
      <Typography sx={{ fontSize: "20px", fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>

      <Box sx={gridStyle}>
        {displayedItems.map((text, i) => (
          <Item key={i} text={text} />
        ))}
      </Box>

      <Typography
        onClick={() => setExpanded(!expanded)}
        sx={{
          mt: 2,
          color: "#1e63d6",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        {expanded ? "View Less ▲" : "View More ▼"}
      </Typography>
    </Box>
  );
}

/* -------------------- SMALL COMPONENTS -------------------- */

function Item({ text }) {
  return (
    <Typography sx={{ color: "#1e3a8a", cursor: "pointer", mb: 1 }}>
      {text}
    </Typography>
  );
}

function Separator() {
  return <Box sx={{ borderBottom: "1px solid #e5e7eb", my: 5 }} />;
}
