import { Box, Typography, Button } from "@mui/material";

export default function WantToHire() {
  return (
    <Box 
  sx={{ 
    paddingY: 10, 
    display: "flex",
    justifyContent: "center"
  }}
>

<Box
  sx={{
    width: "999px",
    height: "500px",
    background: "#e8f1ff",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden"
  }}
>

        {/* LEFT IMAGE */}
<Box
  sx={{
    width: "495px",
    height: "500px",
    display: "flex",
    alignItems: "center",
    padding: 0,
    margin: 0
  }}
>
  <img
    src="https://www.jobchaahiye.com/images/cta/bg-cta.png"
    alt="Hire"
    style={{
      width: "495px",
      height: "500px",
      objectFit: "cover",
      display: "block",
      padding: 0,
      margin: 0
    }}
  />
</Box>


        {/* RIGHT CONTENT */}
        <Box
  sx={{
    width: "408px",
    height: "264px",
    paddingLeft: "40px",
    paddingRight: "100px",   // you said 0 right padding
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }}
>


          <Typography
  sx={{
    width: "235px",
    height: "64px",
    fontSize: "34px",
    fontWeight: 700,
    color: "#1967d2",   // updated color
    marginBottom: "16px"
  }}
>
  Want To Hire
</Typography>


          <Typography
            sx={{
              fontSize: "17px",
              color: "#475569",
              lineHeight: 1.7,
              marginBottom: 4,
              maxWidth: "430px",
            }}
          >
            Advertise your jobs to millions of monthly users and search
            15.8 million CVs in our database.
          </Typography>

          <Button
  variant="contained"
  onClick={() => window.open("/employer", "_blank")}
  sx={{
    background: "#1e63d6",
    textTransform: "none",
    px: 4,
    py: 1.5,
    borderRadius: "12px",
    fontSize: "18px",
    "&:hover": { background: "#1856b8" },
  }}
>
  Post a Job
</Button>

        </Box>
      </Box>
    </Box>
  );
}
