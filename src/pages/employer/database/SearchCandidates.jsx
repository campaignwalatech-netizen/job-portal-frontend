import React, { useMemo, useState, useEffect, useRef } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Skeleton,
  Pagination,
  useTheme,
  useMediaQuery,
  Drawer,
  IconButton,
  Slider,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

/* Mock Data */
const mockCandidates = [
  {
    id: "c1",
    name: "Aditi Sharma",
    avatar: "https://i.pravatar.cc/100?img=32",
    education: "Bachelor's Degree in Computer Science",
    experienceYears: 5,
    location: "Bengaluru, India",
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    lastActiveDays: 2,
  },
  {
    id: "c2",
    name: "Priya Singh",
    avatar: "https://i.pravatar.cc/100?img=47",
    education: "Master's Degree in Data Science",
    experienceYears: 8,
    location: "Mumbai, India",
    skills: ["Python", "Machine Learning", "SQL", "Tableau"],
    lastActiveDays: 10,
  },
  {
    id: "c3",
    name: "Amit Kumar",
    avatar: "https://i.pravatar.cc/100?img=12",
    education: "Bachelor's Degree in Electrical Engineering",
    experienceYears: 6,
    location: "Delhi, India",
    skills: ["Embedded Systems", "C++", "RTOS"],
    lastActiveDays: 30,
  },
  {
    id: "c4",
    name: "Deepika Reddy",
    avatar: "https://i.pravatar.cc/100?img=22",
    education: "Bachelor's Degree in Business Administration",
    experienceYears: 4,
    location: "Hyderabad, India",
    skills: ["Digital Marketing", "SEO", "Content Strategy"],
    lastActiveDays: 4,
  },
  {
    id: "c5",
    name: "Vivek Gupta",
    avatar: "https://i.pravatar.cc/100?img=56",
    education: "PhD in Artificial Intelligence",
    experienceYears: 10,
    location: "Chennai, India",
    skills: ["Deep Learning", "TensorFlow", "NLP", "Computer Vision"],
    lastActiveDays: 1,
  },
];

const PAGE_SIZE = 6;

export default function SearchCandidates() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [experienceFrom, setExperienceFrom] = useState("");
  const [experienceTo, setExperienceTo] = useState("");
  const [city, setCity] = useState("");
  const [keywords, setKeywords] = useState("");
  const [education, setEducation] = useState({
    highschool: false,
    bachelors: false,
    masters: false,
    phd: false,
  });
  const [activeDaysRange, setActiveDaysRange] = useState([0, 30]);

  const [openProfile, setOpenProfile] = useState(false);
  const [activeCandidate, setActiveCandidate] = useState(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(PAGE_SIZE);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const SIDEBAR_MIN = 220;
  const SIDEBAR_MAX = 520;
  const defaultWidth = 280;
  const [sidebarWidth, setSidebarWidth] = useState(defaultWidth);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(defaultWidth);

  const containerRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isMdUp) return;

    const onMove = (e) => {
      if (!isDragging.current) return;
      const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
      const dx = clientX - startX.current;
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
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isMdUp]);

  const startDrag = (e) => {
    if (!isMdUp) return;
    isDragging.current = true;
    startX.current = e.clientX ?? (e.touches && e.touches[0].clientX);
    startWidth.current = sidebarWidth;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const filtered = useMemo(() => {
    let data = [...mockCandidates];

    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.skills.join(" ").toLowerCase().includes(q) ||
          c.education.toLowerCase().includes(q)
      );
    }

    if (experienceFrom)
      data = data.filter((c) => c.experienceYears >= Number(experienceFrom));
    if (experienceTo)
      data = data.filter((c) => c.experienceYears <= Number(experienceTo));

    if (city.trim())
      data = data.filter((c) =>
        c.location.toLowerCase().includes(city.toLowerCase())
      );

    if (keywords.trim()) {
      const k = keywords.toLowerCase();
      data = data.filter((c) => c.skills.join(" ").toLowerCase().includes(k));
    }

    const eduSelected = Object.entries(education).filter(([, v]) => v);
    if (eduSelected.length > 0) {
      data = data.filter((c) => {
        const ed = c.education.toLowerCase();
        if (education.highschool && ed.includes("high school")) return true;
        if (education.bachelors && ed.includes("bachelor")) return true;
        if (education.masters && ed.includes("master")) return true;
        if (education.phd && ed.includes("phd")) return true;
        return false;
      });
    }

    const [minD, maxD] = activeDaysRange;
    data = data.filter(
      (c) => c.lastActiveDays >= minD && c.lastActiveDays <= maxD
    );

    return data;
  }, [
    query,
    experienceFrom,
    experienceTo,
    city,
    keywords,
    education,
    activeDaysRange,
  ]);

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / limit));
  const paged = filtered.slice((page - 1) * limit, page * limit);

  const openCandidateModal = (c) => {
    setActiveCandidate(c);
    setOpenProfile(true);
  };
  const closeCandidateModal = () => {
    setOpenProfile(false);
    setActiveCandidate(null);
  };

  const resetFilters = () => {
    setQuery("");
    setExperienceFrom("");
    setExperienceTo("");
    setCity("");
    setKeywords("");
    setEducation({
      highschool: false,
      bachelors: false,
      masters: false,
      phd: false,
    });
    setActiveDaysRange([0, 30]);
    setPage(1);
  };

  const formatDays = (v) => (v === 0 ? "0" : `${v}d`);

  const handleUnlock = () => {
    console.log("Unlocked", activeCandidate);
    closeCandidateModal();
  };

  return (
    <Box sx={{ width: "100%", pb: 6 }} ref={containerRef}>
      {isSmDown && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 800 }}>
            Search Candidates
          </Typography>

          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
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
        {isMdUp ? (
          <Box sx={{ display: "flex", alignItems: "stretch" }}>
            <Box
              sx={{
                width: sidebarWidth,
                minWidth: SIDEBAR_MIN,
                maxWidth: SIDEBAR_MAX,
                boxSizing: "border-box",
                position: "sticky",
                top: 20,
                alignSelf: "flex-start",
                maxHeight: "calc(100vh - 40px)",
                overflowY: "auto",
                pr: 1,
                background: "#fff",
                borderRadius: 3,
                border: "1px solid rgba(15,23,42,0.08)",
                "&::-webkit-scrollbar": { width: "4px" },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(0,0,0,0.25)",
                  borderRadius: "8px",
                },
                "&::-webkit-scrollbar-track": { background: "transparent" },
                px: 2,
                py: 1.5,
              }}
            >
              <Typography sx={{ fontWeight: 700, mb: 1 }}>Filters</Typography>

              <Paper sx={{ p: 2, borderRadius: 2, boxShadow: "none" }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
                  Search
                </Typography>
                <TextField
                  size="small"
                  placeholder="Name / Skill / Education"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  fullWidth
                />

                <Divider sx={{ my: 2 }} />

                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
                  Experience (Years)
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <TextField
                    size="small"
                    placeholder="From"
                    value={experienceFrom}
                    onChange={(e) => setExperienceFrom(e.target.value)}
                  />
                  <TextField
                    size="small"
                    placeholder="To"
                    value={experienceTo}
                    onChange={(e) => setExperienceTo(e.target.value)}
                  />
                </Stack>

                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
                  Active in (days)
                </Typography>
                <Box sx={{ px: 1, mb: 1 }}>
                  <Slider
                    value={activeDaysRange}
                    onChange={(e, v) => setActiveDaysRange(v)}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(v) => `${v}d`}
                    step={1}
                    min={0}
                    max={90}
                  />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ color: "text.secondary", fontSize: 12 }}
                  >
                    <span>{formatDays(activeDaysRange[0])}</span>
                    <span>{formatDays(activeDaysRange[1])}</span>
                  </Stack>
                </Box>

                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
                  Location
                </Typography>
                <TextField
                  size="small"
                  placeholder="City / Region"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  fullWidth
                />

                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1, mt: 2 }}>
                  Keywords
                </Typography>
                <TextField
                  size="small"
                  placeholder="React, Python..."
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  fullWidth
                />

                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1, mt: 2 }}>
                  Education
                </Typography>
                <Stack>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={education.highschool}
                        onChange={(e) =>
                          setEducation((p) => ({
                            ...p,
                            highschool: e.target.checked,
                          }))
                        }
                      />
                    }
                    label="High School"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={education.bachelors}
                        onChange={(e) =>
                          setEducation((p) => ({
                            ...p,
                            bachelors: e.target.checked,
                          }))
                        }
                      />
                    }
                    label="Bachelor's Degree"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={education.masters}
                        onChange={(e) =>
                          setEducation((p) => ({
                            ...p,
                            masters: e.target.checked,
                          }))
                        }
                      />
                    }
                    label="Master's Degree"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={education.phd}
                        onChange={(e) =>
                          setEducation((p) => ({
                            ...p,
                            phd: e.target.checked,
                          }))
                        }
                      />
                    }
                    label="PhD"
                  />
                </Stack>

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
                    Reset
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setPage(1)}
                    sx={{ textTransform: "none" }}
                  >
                    Apply
                  </Button>
                </Stack>
              </Paper>
            </Box>

            <Box
              onMouseDown={startDrag}
              onTouchStart={startDrag}
              sx={{
                width: "8px",
                cursor: "col-resize",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": { background: "rgba(15,23,42,0.02)" },
              }}
              aria-hidden
            >
              <Box
                sx={{
                  width: 2,
                  height: 40,
                  background: "rgba(15,23,42,0.08)",
                  borderRadius: 1,
                }}
              />
            </Box>
          </Box>
        ) : (
          <Box sx={{ width: { xs: "100%" } }} />
        )}

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {isMdUp && (
            <Typography sx={{ fontSize: 26, fontWeight: 800, mb: 2 }}>
              Search Candidates
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "flex-end" },
              mb: 2,
              gap: 1.5,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Save Search
            </Button>
          </Box>

          <Grid
            container
            spacing={{ xs: 2, sm: 3 }}
            sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
          >
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <Grid
                  item
                  key={i}
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Paper
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      p: { xs: 2, sm: 3 },
                      borderRadius: 3,
                      minHeight: 260,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Skeleton variant="circular" width={56} height={56} />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton width="60%" />
                        <Skeleton width="35%" />
                      </Box>
                    </Stack>
                    <Box sx={{ mt: 2 }}>
                      <Skeleton width="40%" />
                      <Skeleton width="70%" />
                    </Box>
                  </Paper>
                </Grid>
              ))}

            {!loading && paged.length === 0 && (
              <Grid item xs={12}>
                <Paper sx={{ p: 6, textAlign: "center", borderRadius: 3 }}>
                  <Typography sx={{ fontWeight: 800, mb: 1 }}>
                    No candidates found
                  </Typography>
                  <Typography sx={{ color: "#64748b", mb: 2 }}>
                    Try adjusting your filters.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={resetFilters}
                    sx={{ textTransform: "none" }}
                  >
                    Reset Filters
                  </Button>
                </Paper>
              </Grid>
            )}

            {!loading &&
              paged.map((c) => (
                <Grid
                  item
                  key={c.id}
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Paper
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      p: { xs: 2, sm: 3 },
                      borderRadius: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      minHeight: 260,
                      border: "1px solid rgba(148,163,184,0.2)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                      transition:
                        "transform .18s ease, box-shadow .18s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                      },
                    }}
                  >
                    <Box>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={c.avatar} sx={{ width: 64, height: 64 }} />
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontWeight: 800,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {c.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 13,
                              color: "#64748b",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {c.education}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Typography sx={{ fontSize: 13, color: "#475569" }}>
                          <strong>Exp:</strong> {c.experienceYears} yrs
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 13,
                            color: "#475569",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <strong>Location:</strong> {c.location}
                        </Typography>
                      </Stack>

                      <Box sx={{ mt: 2 }}>
                        <Typography
                          sx={{ fontSize: 13, color: "#64748b", mb: 1 }}
                        >
                          Skills
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          sx={{ rowGap: "6px", columnGap: "6px" }}
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
                    </Box>

                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      <Button
                        variant="text"
                        onClick={() => openCandidateModal(c)}
                        sx={{
                          textTransform: "none",
                          color: "#2563eb",
                          fontWeight: 700,
                        }}
                      >
                        View Profile
                      </Button>

                      <Typography sx={{ fontSize: 12, color: "#64748b" }}>
                        {c.lastActiveDays}d
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              flexWrap: "wrap",
            }}
          >
            <Pagination
              count={pageCount}
              page={page}
              onChange={(e, v) => setPage(v)}
              color="primary"
            />
          </Box>
        </Box>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 300 } }}
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

          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
              Search
            </Typography>
            <TextField
              size="small"
              placeholder="Name / Skill / Education"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              fullWidth
            />

            <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1, mt: 2 }}>
              Experience (Years)
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <TextField
                size="small"
                placeholder="From"
                value={experienceFrom}
                onChange={(e) => setExperienceFrom(e.target.value)}
              />
              <TextField
                size="small"
                placeholder="To"
                value={experienceTo}
                onChange={(e) => setExperienceTo(e.target.value)}
              />
            </Stack>

            <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1 }}>
              Active in (days)
            </Typography>
            <Box sx={{ px: 1, mb: 1 }}>
              <Slider
                value={activeDaysRange}
                onChange={(e, v) => setActiveDaysRange(v)}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${v}d`}
                step={1}
                min={0}
                max={90}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ color: "text.secondary", fontSize: 12 }}
              >
                <span>{formatDays(activeDaysRange[0])}</span>
                <span>{formatDays(activeDaysRange[1])}</span>
              </Stack>
            </Box>

            <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1, mt: 2 }}>
              Location
            </Typography>
            <TextField
              size="small"
              placeholder="City / Region"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
            />

            <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 1, mt: 2 }}>
              Education
            </Typography>
            <Stack>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={education.highschool}
                    onChange={(e) =>
                      setEducation((p) => ({
                        ...p,
                        highschool: e.target.checked,
                      }))
                    }
                  />
                }
                label="High School"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={education.bachelors}
                    onChange={(e) =>
                      setEducation((p) => ({
                        ...p,
                        bachelors: e.target.checked,
                      }))
                    }
                  />
                }
                label="Bachelor's Degree"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={education.masters}
                    onChange={(e) =>
                      setEducation((p) => ({
                        ...p,
                        masters: e.target.checked,
                      }))
                    }
                  />
                }
                label="Master's Degree"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={education.phd}
                    onChange={(e) =>
                      setEducation((p) => ({
                        ...p,
                        phd: e.target.checked,
                      }))
                    }
                  />
                }
                label="PhD"
              />
            </Stack>

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
                Reset
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setPage(1);
                  setDrawerOpen(false);
                }}
                sx={{ textTransform: "none" }}
              >
                Apply
              </Button>
            </Stack>
          </Box>
        </Box>
      </Drawer>

      <Dialog
        open={openProfile}
        onClose={closeCandidateModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 800 }}>
          {activeCandidate?.name}
        </DialogTitle>

        <DialogContent dividers>
          {activeCandidate ? (
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={activeCandidate.avatar}
                  sx={{ width: 80, height: 80 }}
                />
                <Box>
                  <Typography sx={{ fontWeight: 800 }}>
                    {activeCandidate.name}
                  </Typography>
                  <Typography sx={{ color: "#64748b", fontSize: 13 }}>
                    {activeCandidate.education}
                  </Typography>
                  <Typography sx={{ color: "#64748b", fontSize: 13 }}>
                    Experience: {activeCandidate.experienceYears} years
                  </Typography>
                  <Typography sx={{ color: "#64748b", fontSize: 13 }}>
                    Location: {activeCandidate.location}
                  </Typography>
                </Box>
              </Stack>

              <Box>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>Skills</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {activeCandidate.skills.map((s) => (
                    <Chip
                      key={s}
                      label={s}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>
                  Last Active
                </Typography>
                <Typography sx={{ color: "#64748b" }}>
                  {activeCandidate.lastActiveDays} days ago
                </Typography>
              </Box>
            </Stack>
          ) : (
            <Skeleton />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeCandidateModal} sx={{ textTransform: "none" }}>
            Close
          </Button>

          <Button
            variant="contained"
            onClick={handleUnlock}
            sx={{ textTransform: "none" }}
          >
            Unlock Candidate
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
