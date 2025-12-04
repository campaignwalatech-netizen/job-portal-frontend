import { Box, Typography, Button } from "@mui/material";

export default function Footer(){
  return (
    <>

      <Box sx={{ paddingY: 6, background: "#fff" }}>
        <Box sx={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, paddingX: 2 }}>
          <Box>  ... </Box>
          <Box>  ... </Box>
          <Box>  ... </Box>
        </Box>
      </Box>


      <Box sx={{ background: "#140826", color: "#fff", paddingY: 6 }}>
        <Box sx={{ maxWidth: 1200, margin:"0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingX:2 }}>
          <Box> {/* logo + follow text + icons */}</Box>
          <Box sx={{ background: "#fff", color:"#000", padding:3, borderRadius:3 }}>

          </Box>
        </Box>
      </Box>
    </>
  );
}
