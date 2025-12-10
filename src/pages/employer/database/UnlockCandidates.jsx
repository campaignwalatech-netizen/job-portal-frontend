import React, { useMemo, useState, useRef, useEffect } from "react";
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

const mockUnlockedCandidates = [
  {
    id: "u1",
    name: "Priya Sharma",
    avatar: "https://i.pravatar.cc/100?img=32",
    city: "Bengaluru",
    country: "India",
    education: "B.Tech in Computer Science",
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
    skills: ["Financial Modeling", "Data Analysis", "Excel"],
    languages: ["English", "Hindi"],
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
    education: "M.Sc Data Science",
    skills: ["Python", "Machine Learning", "SQL", "Tableau"],
    languages: ["English", "Hindi", "Telugu"],
    status: "Seeking New Role",
    phone: "+91 98765 22222",
    resume: "/resumes/sneha-reddy.pdf",
    cvAvailable: true,
    age: 26,
    lastActiveDays: 5,
  },
];

const PAGE_SIZE = 6;
const SIDEBAR_MIN = 220;
const SIDEBAR_MAX = 500;
const DEFAULT_WIDTH = 280;

export default function UnlockCandidates() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(DEFAULT_WIDTH);

  const startDrag = (e) => {
    if (!isMdUp) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startWidth.current = sidebarWidth;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    if (!isMdUp) return;

    const onMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - startX.current;
      let newW = startWidth.current + dx;
      newW = Math.max(SIDEBAR_MIN, Math.min(SIDEBAR_MAX, newW));
      setSidebarWidth(newW);
    };

    const onUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isMdUp]);

  const [activeDaysRange, setActiveDaysRange] = useState([0, 30]);
  const [cvAvailability, setCvAvailability] = useState("any");
  const [keywords, setKeywords] = useState("");
  const [education, setEducation] = useState("any");
  const [ageRange, setAgeRange] = useState([18, 60]);

  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredCandidates = useMemo(() => {
    let data = [...mockUnlockedCandidates];

    data = data.filter(
      (c) =>
        c.lastActiveDays >= activeDaysRange[0] &&
        c.lastActiveDays <= activeDaysRange[1]
    );

    if (cvAvailability === "available") data = data.filter((c) => c.cvAvailable);
    if (cvAvailability === "not_available")
      data = data.filter((c) => !c.cvAvailable);

    if (keywords.trim()) {
      const k = keywords.toLowerCase();
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(k) ||
          c.education.toLowerCase().includes(k) ||
          c.skills.join(" ").toLowerCase().includes(k)
      );
    }

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

    data = data.filter(
      (c) => c.age >= ageRange[0] && c.age <= ageRange[1]
    );

    return data;
  }, [activeDaysRange, cvAvailability, keywords, education, ageRange]);

  const total = filteredCandidates.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const paged = filteredCandidates.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleDownloadExcel = () => {
    const rows = filteredCandidates.map((c) => ({
      Name: c.name,
      Phone: c.phone,
      City: c.city,
      Country: c.country,
      Education: c.education,
      Skills: c.skills.join(", "),
      Languages: c.languages.join(", "),
      Status: c.status,
      Age: c.age,
      LastActiveDays: c.lastActiveDays,
    }));

    if (!rows.length) return;

    const header = Object.keys(rows[0]).join(",") + "\n";
    const csvRows = rows
      .map((r) => Object.values(r).map((v) => `"${v}"`).join(","))
      .join("\n");

    const blob = new Blob([header + csvRows], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "unlocked_candidates.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleViewResume = (c) => {
    if (c.resume) window.open(c.resume, "_blank", "noopener,noreferrer");
  };

  const handleDownloadResume = (c) => {
    if (!c.resume) return;
    const link = document.createElement("a");
    link.href = c.resume;
    link.download = `${c.name}-resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetFilters = () => {
    setActiveDaysRange([0, 30]);
    setCvAvailability("any");
    setKeywords("");
    setEducation("any");
    setAgeRange([18, 60]);
    setPage(1);
  };

  const FiltersContent = (
    <Box sx={{ p: 2 }}>
      <Typography sx={{ fontWeight: 700, mb: 2, fontSize: 17 }}>
        Filters
      </Typography>

      <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
        Active in (days)
      </Typography>
      <Slider
        value={activeDaysRange}
        onChange={(e, v) => setActiveDaysRange(v)}
        valueLabelDisplay="auto"
        min={0}
        max={90}
      />

      <Divider sx={{ my: 2 }} />

      <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
        CV Availability
      </Typography>
      <RadioGroup
        value={cvAvailability}
        onChange={(e) => setCvAvailability(e.target.value)}
      >
        <FormControlLabel value="available" control={<Radio size="small" />} label="Available" />
        <FormControlLabel value="not_available" control={<Radio size="small" />} label="Not Available" />
        <FormControlLabel value="any" control={<Radio size="small" />} label="Any" />
      </RadioGroup>

      <Divider sx={{ my: 2 }} />

      <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
        Keywords
      </Typography>
      <TextField
        size="small"
        fullWidth
        placeholder="React, Finance..."
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />

      <Divider sx={{ my: 2 }} />

      <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
        Education
      </Typography>
      <TextField
        size="small"
        select
        fullWidth
        value={education}
        onChange={(e) => setEducation(e.target.value)}
      >
        <MenuItem value="any">Any</MenuItem>
        <MenuItem value="bachelors">Bachelor’s</MenuItem>
        <MenuItem value="masters">Master’s</MenuItem>
        <MenuItem value="phd">PhD</MenuItem>
      </TextField>

      <Divider sx={{ my: 2 }} />

      <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
        Age Range
      </Typography>
      <Slider
        value={ageRange}
        onChange={(e, v) => setAgeRange(v)}
        valueLabelDisplay="auto"
        min={18}
        max={60}
      />

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button variant="outlined" size="small" onClick={resetFilters}>
          Reset
        </Button>
        <Button variant="contained" size="small" onClick={() => setPage(1)}>
          Apply
        </Button>
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ width: "100%", pb: 6 }}>
      {isSmDown && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: 22, fontWeight: 800 }}>
            Unlocked Candidates
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button variant="outlined" size="small" onClick={handleDownloadExcel}>
              Export
            </Button>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Stack>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, md: 3 },
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          overflow: "hidden",
        }}
      >
        {isMdUp && (
          <Box sx={{ display: "flex" }}>
            <Paper
              sx={{
                width: sidebarWidth,
                minWidth: SIDEBAR_MIN,
                maxWidth: SIDEBAR_MAX,
                height: "calc(100vh - 90px)",
                position: "sticky",
                top: 20,
                overflowY: "auto",
                borderRadius: 3,
                border: "1px solid rgba(0,0,0,0.08)",
                "&::-webkit-scrollbar": { width: "4px" },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(0,0,0,0.25)",
                  borderRadius: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
              }}
            >
              {FiltersContent}
            </Paper>

            <Box
              onMouseDown={startDrag}
              sx={{
                width: 6,
                cursor: "col-resize",
                "&:hover": { background: "rgba(0,0,0,0.05)" },
              }}
            />
          </Box>
        )}

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {isMdUp && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Typography sx={{ fontSize: 28, fontWeight: 800 }}>
                Unlocked Candidates
              </Typography>

              <Button variant="outlined" onClick={handleDownloadExcel}>
                Export to Excel
              </Button>
            </Box>
          )}

          <Grid
            container
            spacing={{ xs: 2, sm: 3 }}
            sx={{
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            {paged.length === 0 && (
              <Grid item xs={12}>
                <Paper sx={{ p: 6, textAlign: "center", borderRadius: 3 }}>
                  <Typography sx={{ fontWeight: 800, mb: 1 }}>
                    No unlocked candidates
                  </Typography>
                </Paper>
              </Grid>
            )}

            {paged.map((c) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={c.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Paper
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    p: { xs: 2, sm: 3 },
                    borderRadius: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid rgba(148,163,184,0.2)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                    transition: "0.15s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Avatar src={c.avatar} sx={{ width: 56, height: 56 }} />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: 17,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.name}
                      </Typography>

                      <Chip
                        label={c.status}
                        size="small"
                        sx={{
                          mt: 0.5,
                          fontSize: 11,
                          borderRadius: "999px",
                          background:
                            c.status === "Open to Offers"
                              ? "rgba(34,197,94,0.1)"
                              : c.status === "Seeking New Role"
                              ? "rgba(59,130,246,0.1)"
                              : "rgba(148,163,184,0.15)",
                          color:
                            c.status === "Open to Offers"
                              ? "#166534"
                              : c.status === "Seeking New Role"
                              ? "#1d4ed8"
                              : "#475569",
                        }}
                      />

                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <LocationOnIcon sx={{ fontSize: 16, color: "#64748b" }} />
                        <Typography sx={{ fontSize: 13, color: "#64748b" }}>
                          {c.city}, {c.country}
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                        <SchoolIcon sx={{ fontSize: 16, color: "#64748b" }} />
                        <Typography sx={{ fontSize: 13, color: "#64748b" }}>
                          {c.education}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                      Skills
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      sx={{ mt: 1, rowGap: "6px", columnGap: "6px" }}
                    >
                      {c.skills.map((s) => (
                        <Chip
                          key={s}
                          label={s}
                          size="small"
                          sx={{
                            background: "#f1f5f9",
                            fontSize: 11,
                            borderRadius: "999px",
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                      Languages
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      sx={{ mt: 1, rowGap: "6px", columnGap: "6px" }}
                    >
                      {c.languages.map((l) => (
                        <Chip
                          key={l}
                          label={l}
                          size="small"
                          sx={{
                            background: "#eff6ff",
                            fontSize: 11,
                            borderRadius: "999px",
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    alignItems="center"
                    sx={{ mt: 2 }}
                  >
                    <PhoneIcon sx={{ fontSize: 16, color: "#2563eb" }} />
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "#2563eb",
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {c.phone}
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      mt: "auto",
                      pt: 2,
                      borderTop: "1px solid rgba(226,232,240,0.9)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewResume(c)}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleDownloadResume(c)}
                      >
                        Download
                      </Button>
                    </Stack>

                    <Typography sx={{ fontSize: 12, color: "#64748b" }}>
                      Active {c.lastActiveDays}d ago
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {total > 0 && (
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>

              <Paper
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: "999px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>{page}</Typography>
              </Paper>

              <Button
                variant="outlined"
                size="small"
                disabled={page === pageCount}
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 300 } }}
      >
        <Box sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontWeight: 800, fontSize: 18 }}>Filters</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {FiltersContent}
        </Box>
      </Drawer>
    </Box>
  );
}
