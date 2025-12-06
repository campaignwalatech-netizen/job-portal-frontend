import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  TextField,
  Chip,
  Grid,
  Avatar,
  Slider,
  Divider,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";

// Mock unlocked candidates (you can later replace with API data)
const mockUnlockedCandidates = [
  {
    id: "u1",
    name: "Priya Sharma",
    avatar: "https://i.pravatar.cc/100?img=32",
    city: "Bengaluru",
    country: "India",
    education: "B. Tech in Computer Science",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    languages: ["English", "Hindi", "Kannada"],
    status: "Open to Offers",
    phone: "+91 98765 43210",
    resume: "/resumes/priya-sharma.pdf",
    cvAvailable: true,
    age: 28,
    lastActiveDays: 3,
  },
  {
    id: "u2",
    name: "Amit Singh",
    avatar: "https://i.pravatar.cc/100?img=47",
    city: "Mumbai",
    country: "India",
    education: "MBA in Finance",
    skills: ["Financial Modeling", "Data Analysis", "Excel", "SAP"],
    languages: ["English", "Hindi", "Marathi"],
    status: "Active",
    phone: "+91 98765 11111",
    resume: "/resumes/amit-singh.pdf",
    cvAvailable: true,
    age: 32,
    lastActiveDays: 1,
  },
  {
    id: "u3",
    name: "Sneha Reddy",
    avatar: "https://i.pravatar.cc/100?img=12",
    city: "Hyderabad",
    country: "India",
    education: "M.Sc. in Data Science",
    skills: ["Python", "Machine Learning", "SQL", "Tableau"],
    languages: ["English", "Telugu", "Hindi"],
    status: "Seeking New Role",
    phone: "+91 98765 22222",
    resume: "/resumes/sneha-reddy.pdf",
    cvAvailable: true,
    age: 26,
    lastActiveDays: 5,
  },
  {
    id: "u4",
    name: "Rahul Kumar",
    avatar: "https://i.pravatar.cc/100?img=22",
    city: "Delhi",
    country: "India",
    education: "B.E. in Mechanical Engineering",
    skills: ["AutoCAD", "SolidWorks", "Project Management", "Manufacturing"],
    languages: ["English", "Hindi"],
    status: "Currently Employed",
    phone: "+91 98765 33333",
    resume: "/resumes/rahul-kumar.pdf",
    cvAvailable: true,
    age: 30,
    lastActiveDays: 12,
  },
  {
    id: "u5",
    name: "Deepika Patel",
    avatar: "https://i.pravatar.cc/100?img=56",
    city: "Ahmedabad",
    country: "India",
    education: "B. Com in Accounting",
    skills: ["Tally", "GST Filing", "Auditing", "Financial Reporting"],
    languages: ["English", "Gujarati", "Hindi"],
    status: "Open to Offers",
    phone: "+91 98765 44444",
    resume: "/resumes/deepika-patel.pdf",
    cvAvailable: true,
    age: 29,
    lastActiveDays: 7,
  },
  {
    id: "u6",
    name: "Vikram Menon",
    avatar: "https://i.pravatar.cc/100?img=64",
    city: "Chennai",
    country: "India",
    education: "MCA in Software Development",
    skills: ["Java", "Spring Boot", "Microservices", "MongoDB"],
    languages: ["English", "Tamil", "Malayalam"],
    status: "Active",
    phone: "+91 98765 55555",
    resume: "/resumes/vikram-menon.pdf",
    cvAvailable: true,
    age: 31,
    lastActiveDays: 2,
  },
  {
    id: "u7",
    name: "Anjali Desai",
    avatar: "https://i.pravatar.cc/100?img=65",
    city: "Pune",
    country: "India",
    education: "B.Arch in Architecture",
    skills: ["Revit", "Sketchup", "Interior Design", "Project Coordination"],
    languages: ["English", "Marathi", "Hindi"],
    status: "Seeking New Role",
    phone: "+91 98765 66666",
    resume: "/resumes/anjali-desai.pdf",
    cvAvailable: true,
    age: 27,
    lastActiveDays: 9,
  },
  {
    id: "u8",
    name: "Rajesh Gupta",
    avatar: "https://i.pravatar.cc/100?img=49",
    city: "Kolkata",
    country: "India",
    education: "Ph.D in Chemistry",
    skills: [
      "Research & Development",
      "Quality Control",
      "Analytical Techniques",
      "Lab Management",
    ],
    languages: ["English", "Bengali", "Hindi"],
    status: "Currently Employed",
    phone: "+91 98765 77777",
    resume: "/resumes/rajesh-gupta.pdf",
    cvAvailable: false,
    age: 38,
    lastActiveDays: 20,
  },
];

const PAGE_SIZE = 6;

export default function UnlockCandidates() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  // Filters
  const [activeDaysRange, setActiveDaysRange] = useState([0, 30]);
  const [cvAvailability, setCvAvailability] = useState("any"); // 'any' | 'available' | 'not_available'
  const [keywords, setKeywords] = useState("");
  const [education, setEducation] = useState("any"); // 'any' | 'bachelors' | 'masters' | 'phd' etc.
  const [ageRange, setAgeRange] = useState([18, 60]);

  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredCandidates = useMemo(() => {
    let data = [...mockUnlockedCandidates];

    // Active days
    const [minActive, maxActive] = activeDaysRange;
    data = data.filter(
      (c) => c.lastActiveDays >= minActive && c.lastActiveDays <= maxActive
    );

    // CV availability
    if (cvAvailability === "available") {
      data = data.filter((c) => c.cvAvailable);
    } else if (cvAvailability === "not_available") {
      data = data.filter((c) => !c.cvAvailable);
    }

    // Keywords -> check skills + name + education
    if (keywords.trim()) {
      const k = keywords.toLowerCase();
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(k) ||
          c.education.toLowerCase().includes(k) ||
          c.skills.join(" ").toLowerCase().includes(k)
      );
    }

    // Education
    if (education !== "any") {
      const e = education;
      data = data.filter((c) => {
        const ed = c.education.toLowerCase();
        if (e === "bachelors") return ed.includes("b.") || ed.includes("btech");
        if (e === "masters") return ed.includes("m.") || ed.includes("msc");
        if (e === "phd") return ed.includes("phd");
        return true;
      });
    }

    // Age range
    const [minAge, maxAge] = ageRange;
    data = data.filter((c) => c.age >= minAge && c.age <= maxAge);

    return data;
  }, [activeDaysRange, cvAvailability, keywords, education, ageRange]);

  const total = filteredCandidates.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const paged = filteredCandidates.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const resetFilters = () => {
    setActiveDaysRange([0, 30]);
    setCvAvailability("any");
    setKeywords("");
    setEducation("any");
    setAgeRange([18, 60]);
    setPage(1);
  };

  const handleDownloadExcel = () => {
    // hook your real export logic/API here
    console.log("Download Excel for unlocked candidates");
  };

  const handleViewResume = (candidate) => {
    if (candidate.resume) {
      window.open(candidate.resume, "_blank", "noopener,noreferrer");
    }
  };

  const handleDownloadResume = (candidate) => {
    if (!candidate.resume) return;
    const link = document.createElement("a");
    link.href = candidate.resume;
    link.download = `${candidate.name}-resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const FiltersContent = (
    <Box sx={{ p: 2 }}>
      <Typography sx={{ fontWeight: 700, mb: 2 }}>Filter Candidates</Typography>

      {/* Active Days */}
      <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
        Active Days
      </Typography>
      <Box sx={{ px: 1, mb: 2 }}>
        <Slider
          value={activeDaysRange}
          onChange={(e, v) => {
            setActiveDaysRange(v);
            setPage(1);
          }}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}d`}
          step={1}
          min={0}
          max={90}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ fontSize: 12, color: "text.secondary" }}
        >
          <span>{activeDaysRange[0]}d</span>
          <span>{activeDaysRange[1]}d</span>
        </Stack>
        <Typography
          sx={{ fontSize: 12, color: "text.secondary", mt: 0.5 }}
        >
          Last 30 days
        </Typography>
      </Box>

      {/* CV Availability */}
      <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
        CV Availability
      </Typography>
      <RadioGroup
        value={cvAvailability}
        onChange={(e) => {
          setCvAvailability(e.target.value);
          setPage(1);
        }}
        sx={{ mb: 2 }}
      >
        <FormControlLabel
          value="available"
          control={<Radio size="small" />}
          label="Available"
        />
        <FormControlLabel
          value="not_available"
          control={<Radio size="small" />}
          label="Not Available"
        />
        <FormControlLabel
          value="any"
          control={<Radio size="small" />}
          label="Any"
        />
      </RadioGroup>

      {/* Keywords */}
      <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
        Keywords
      </Typography>
      <TextField
        size="small"
        placeholder="e.g., Senior Developer, Java"
        fullWidth
        value={keywords}
        onChange={(e) => {
          setKeywords(e.target.value);
          setPage(1);
        }}
        sx={{ mb: 2 }}
      />

      {/* Education */}
      <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
        Education
      </Typography>
      <TextField
        size="small"
        select
        fullWidth
        value={education}
        onChange={(e) => {
          setEducation(e.target.value);
          setPage(1);
        }}
        sx={{ mb: 2 }}
      >
        <MenuItem value="any">Any</MenuItem>
        <MenuItem value="bachelors">Bachelor's</MenuItem>
        <MenuItem value="masters">Master's</MenuItem>
        <MenuItem value="phd">PhD</MenuItem>
      </TextField>

      {/* Age Range */}
      <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
        Age Range
      </Typography>
      <Box sx={{ px: 1 }}>
        <Slider
          value={ageRange}
          onChange={(e, v) => {
            setAgeRange(v);
            setPage(1);
          }}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v} yrs`}
          step={1}
          min={18}
          max={60}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ fontSize: 12, color: "text.secondary" }}
        >
          <span>Min: {ageRange[0]} years</span>
          <span>Max: {ageRange[1]} years</span>
        </Stack>
      </Box>

      {/* Actions */}
      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 3, justifyContent: "flex-end" }}
      >
        <Button
          variant="outlined"
          onClick={resetFilters}
          sx={{ textTransform: "none" }}
        >
          Reset Filters
        </Button>
        <Button
          variant="contained"
          onClick={() => setPage(1)}
          sx={{ textTransform: "none" }}
        >
          Apply Filters
        </Button>
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ width: "100%", pb: 6 }}>
      {/* Mobile header */}
      {isSmDown && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 800 }}>
            Unlocked Candidates
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              sx={{ textTransform: "none", fontSize: 12 }}
              onClick={handleDownloadExcel}
            >
              Download Excel
            </Button>

            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Stack>
        </Box>
      )}

      <Box sx={{ display: "flex", gap: 3 }}>
        {/* Sidebar filters (desktop) */}
        {isMdUp && (
          <Paper
            sx={{
              width: 300,
              boxSizing: "border-box",
              position: "sticky",
              top: 20,
              alignSelf: "flex-start",
              maxHeight: "calc(100vh - 40px)",
              overflowY: "auto",
              borderRadius: 2,
              border: "1px solid rgba(15,23,42,0.06)",
              "&::-webkit-scrollbar": { width: 6 },
              "&::-webkit-scrollbar-thumb": {
                background: "#cbd5e1",
                borderRadius: 8,
              },
              "&::-webkit-scrollbar-track": { background: "transparent" },
            }}
          >
            {FiltersContent}
          </Paper>
        )}

        {/* Main content */}
        <Box sx={{ flex: 1 }}>
          {/* Title + actions (desktop) */}
          {isMdUp && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography sx={{ fontSize: 26, fontWeight: 800 }}>
                Unlocked Candidates
              </Typography>

              <Button
                variant="outlined"
                onClick={handleDownloadExcel}
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Download Excel
              </Button>
            </Box>
          )}

          {/* Cards grid */}
          <Grid container spacing={3}>
            {paged.length === 0 && (
              <Grid item xs={12}>
                <Paper sx={{ p: 6, textAlign: "center", borderRadius: 3 }}>
                  <Typography sx={{ fontWeight: 800, mb: 1 }}>
                    No unlocked candidates
                  </Typography>
                  <Typography sx={{ color: "#64748b" }}>
                    Try adjusting your filters or unlock candidates from the
                    search page.
                  </Typography>
                </Paper>
              </Grid>
            )}

            {paged.map((c) => (
              <Grid item key={c.id} xs={12} sm={6} md={4} sx={{ display: "flex" }}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    boxShadow: "0 8px 20px rgba(15,23,42,0.05)",
                    border: "1px solid rgba(148,163,184,0.25)",
                    transition:
                      "transform 0.15s ease-out, box-shadow 0.15s ease-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 16px 35px rgba(15,23,42,0.10)",
                    },
                  }}
                >
                  {/* Header row */}
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                    sx={{ mb: 1.5 }}
                  >
                    <Avatar src={c.avatar} sx={{ width: 56, height: 56 }} />
                    <Box sx={{ flex: 1 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={1}
                      >
                        <Box>
                          <Typography sx={{ fontWeight: 800 }}>
                            {c.name}
                          </Typography>
                        </Box>
                        <Chip
                          label={c.status}
                          size="small"
                          sx={{
                            fontSize: 11,
                            fontWeight: 600,
                            borderRadius: "999px",
                            background:
                              c.status === "Open to Offers"
                                ? "rgba(34,197,94,0.08)"
                                : c.status === "Seeking New Role"
                                ? "rgba(59,130,246,0.08)"
                                : "rgba(148,163,184,0.16)",
                            color:
                              c.status === "Open to Offers"
                                ? "#15803d"
                                : c.status === "Seeking New Role"
                                ? "#1d4ed8"
                                : "#475569",
                          }}
                        />
                      </Stack>

                      {/* Location */}
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ mt: 0.75 }}
                      >
                        <LocationOnIcon
                          sx={{ fontSize: 16, color: "#64748b" }}
                        />
                        <Typography sx={{ fontSize: 13, color: "#64748b" }}>
                          {c.city}, {c.country}
                        </Typography>
                      </Stack>

                      {/* Education */}
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ mt: 0.5 }}
                      >
                        <SchoolIcon sx={{ fontSize: 16, color: "#64748b" }} />
                        <Typography sx={{ fontSize: 13, color: "#64748b" }}>
                          {c.education}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  {/* Skills */}
                  <Box sx={{ mt: 1.5 }}>
                    <Typography
                      sx={{ fontSize: 13, fontWeight: 600, mb: 0.75 }}
                    >
                      Skills
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {c.skills.map((s) => (
                        <Chip
                          key={s}
                          label={s}
                          size="small"
                          sx={{
                            mr: 0.5,
                            mb: 0.5,
                            backgroundColor: "#f1f5f9",
                            borderRadius: "999px",
                            fontSize: 11,
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* Languages */}
                  <Box sx={{ mt: 1.5 }}>
                    <Typography
                      sx={{ fontSize: 13, fontWeight: 600, mb: 0.75 }}
                    >
                      Languages
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {c.languages.map((lang) => (
                        <Chip
                          key={lang}
                          label={lang}
                          size="small"
                          sx={{
                            mr: 0.5,
                            mb: 0.5,
                            backgroundColor: "#eff6ff",
                            borderRadius: "999px",
                            fontSize: 11,
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* Phone */}
                  <Box sx={{ mt: 1.5, display: "flex", alignItems: "center" }}>
                    <PhoneIcon sx={{ fontSize: 16, color: "#2563eb", mr: 0.75 }} />
                    <Typography
                      sx={{ fontSize: 13, color: "#2563eb", fontWeight: 600 }}
                    >
                      {c.phone}
                    </Typography>
                  </Box>

                  {/* Footer actions */}
                  <Box
                    sx={{
                      mt: 2,
                      pt: 1.5,
                      borderTop: "1px solid rgba(226,232,240,0.9)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewResume(c)}
                        sx={{ textTransform: "none", fontSize: 12 }}
                        disabled={!c.resume}
                      >
                        View Resume
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleDownloadResume(c)}
                        sx={{ textTransform: "none", fontSize: 12 }}
                        disabled={!c.resume}
                      >
                        Download Resume
                      </Button>
                    </Stack>

                    <Typography
                      sx={{ fontSize: 12, color: "#64748b", whiteSpace: "nowrap" }}
                    >
                      Active {c.lastActiveDays}d ago
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Pagination (Previous / Next) */}
          {total > 0 && (
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                size="small"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                sx={{ textTransform: "none" }}
              >
                Previous
              </Button>

              <Paper
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: 999,
                  minWidth: 40,
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                  {page}
                </Typography>
              </Paper>

              <Button
                variant="outlined"
                size="small"
                disabled={page === pageCount}
                onClick={() =>
                  setPage((p) => Math.min(pageCount, p + 1))
                }
                sx={{ textTransform: "none" }}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Mobile filter drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 320 } }}
      >
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Typography sx={{ fontWeight: 800 }}>Filters</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          {FiltersContent}
        </Box>
      </Drawer>
    </Box>
  );
}
