
import { Box, Button, Typography } from "@mui/material";

export default function WantToHire() {
  return (
    <Box sx={{ py: { xs: 12, sm: 16, md: 20 }, backgroundColor: "#fff" }}>
      <Box sx={{ width: "90%", maxWidth: "90%", mx: "auto" }}>
        <Box sx={{ 
          backgroundColor: "#e9f2ff", 
          borderRadius: { xs: "1rem", sm: "1.5rem", md: "1.75rem" },
          overflow: "hidden",
          width: "100%"
        }}>
          
          {/* Mobile Layout: Content Above, Image Below */}
          <Box sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column" }}>
            {/* Content First on Mobile */}
            <Box sx={{ p: { xs: 4, sm: 5 }, textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: { xs: "1.5rem", sm: "1.875rem" },
                  fontWeight: 700,
                  color: "#2563eb",
                  mb: { xs: 2, sm: 3 },
                }}
              >
                Want To Hire?
              </Typography>
              <Typography
                sx={{
                  color: "#4b5563",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  mb: { xs: 3, sm: 4 },
                  lineHeight: 1.6,
                }}
              >
                Advertise your jobs to millions of monthly users and search 15.8 million CVs in our database.
              </Typography>
              <Box sx={{ mt: { xs: 3, sm: 4 } }}>
                <Button
                  sx={{
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    px: 6,
                    py: 2,
                    borderRadius: "999px",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    minHeight: "44px",
                    width: { xs: "100%", sm: "auto" },
                    boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.1), 0 4px 6px -4px rgba(37, 99, 235, 0.1)",
                    "&:hover": {
                      backgroundColor: "#1d4ed8",
                      boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.1), 0 8px 10px -6px rgba(37, 99, 235, 0.1)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => window.open("/employer", "_blank")}
                >
                  Post a Job
                </Button>
              </Box>
            </Box>
            
            {/* Image Below on Mobile - with spacing */}
            <Box sx={{ height: { xs: "250px", sm: "300px" }, position: "relative", mt: 3 }}>
              <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                <Box
                  component="img"
                  src="https://www.jobchaahiye.com/images/cta/bg-cta.png"
                  alt="Professionals"
                  sx={{
                    width: "80%",
                    height: "90%",
                    objectFit: "contain",
                    objectPosition: "bottom",
                  }}
                  loading="lazy"
                />
              </Box>
            </Box>
          </Box>

          {/* Desktop Layout: Image Left, Content Right - FULL WIDTH */}
          <Box sx={{ 
            display: { xs: "none", md: "flex" }, 
            gap:5,
            flexDirection: "row", 
            alignItems: "center", 
            minHeight: "500px",
            width: "100%"
          }}>
            {/* Image on LEFT side - FULL HEIGHT */}
            <Box sx={{ 
              width: "50%", 
              height: "100%",
              minHeight: "500px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              pr: { md: 2, lg: 4, xl: 6 }
            }}>
              <Box
                component="img"
                src="WantToHire.png"
                alt="Professionals"
                sx={{
                  width: "110%",
                  maxWidth: "750px",
                  height: "auto",
                  maxHeight: "700px",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
                loading="lazy"
              />
            </Box>

            {/* Content on RIGHT side - ADJUSTED SPACING */}
            <Box sx={{ 
              width: "50%", 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              pl: { md: 4, lg: 6, xl: 8 },
              pr: { md: 8, lg: 10, xl: 12 }
            }}>
              <Typography
                sx={{
                  fontSize: { md: "2.25rem", lg: "2.75rem", xl: "3.25rem" },
                  fontWeight: 700,
                  color: "#2563eb",
                  mb: { md: 3, lg: 4 },
                  lineHeight: 1.1,
                }}
              >
                Want To Hire?
              </Typography>
              <Typography
                sx={{
                  color: "#4b5563",
                  fontSize: { md: "1.125rem", lg: "1.25rem", xl: "1.375rem" },
                  mb: { md: 4, lg: 5 },
                  maxWidth: "500px",
                  lineHeight: 1.7,
                  fontWeight: 400,
                }}
              >
                Advertise your jobs to millions of monthly users and search 15.8 million CVs in our database.
              </Typography>
              <Box sx={{ mt: { md: 5, lg: 6 } }}>
                <Button
                  sx={{
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    px: { md: 6, lg: 8 },
                    py: { md: 2, lg: 2.5 },
                    borderRadius: "999px",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: { md: "1rem", lg: "1.125rem" },
                    minWidth: "180px",
                    height: "52px",
                    boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.1), 0 4px 6px -4px rgba(37, 99, 235, 0.1)",
                    "&:hover": {
                      backgroundColor: "#1d4ed8",
                      boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.1), 0 8px 10px -6px rgba(37, 99, 235, 0.1)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => window.open("/employer", "_blank")}
                >
                  Post a Job
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}