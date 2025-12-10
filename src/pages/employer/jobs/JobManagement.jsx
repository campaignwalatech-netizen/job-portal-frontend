import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Pagination,
  Stack,
  Chip,
  Tooltip,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import CloseIcon from "@mui/icons-material/Close";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import { format } from "date-fns";

/* =========================
   Minimal important comments:
   - Single-file, production-ready UI
   - Replace mockJobs with API when ready
   - `useNavigate()` used for internal navigation
   ========================= */

/* ------------------ MOCK DATA ------------------ */
/* Replace this with API fetch later (keep shapes same) */
const mockJobs = [
  { id: "1", jobId: "JC-1001", title: "Frontend Developer (React)", company: "Bluewave Tech", location: "Hyderabad, IN", type: "Full-time", applications: 24, matches: 8, status: "active", createdAt: "2025-11-10T08:30:00Z" },
  { id: "2", jobId: "JC-1002", title: "Backend Engineer (Node.js)", company: "Grid Labs", location: "Bengaluru, IN", type: "Full-time", applications: 12, matches: 3, status: "under_review", createdAt: "2025-10-21T10:20:00Z" },
  { id: "3", jobId: "JC-1003", title: "Product Designer", company: "PixelCraft", location: "Remote", type: "Contract", applications: 5, matches: 0, status: "draft", createdAt: "2025-09-30T12:00:00Z" },
  { id: "4", jobId: "JC-1004", title: "DevOps Engineer", company: "Cloudify", location: "Mumbai, IN", type: "Full-time", applications: 52, matches: 25, status: "expired", createdAt: "2025-07-12T07:45:00Z" },
  { id: "5", jobId: "JC-1005", title: "QA Engineer", company: "TestPro", location: "Chennai, IN", type: "Full-time", applications: 2, matches: 0, status: "select_plan", createdAt: "2025-11-01T09:00:00Z" },
  { id: "6", jobId: "JC-1006", title: "Security Analyst", company: "SafeNet", location: "Delhi, IN", type: "Full-time", applications: 14, matches: 6, status: "active", createdAt: "2025-11-15T09:30:00Z" },
  { id: "7", jobId: "JC-1007", title: "Mobile Developer (iOS)", company: "AppMakers", location: "Bengaluru, IN", type: "Full-time", applications: 9, matches: 1, status: "active", createdAt: "2025-11-19T11:10:00Z" },
  { id: "8", jobId: "JC-1008", title: "Data Scientist", company: "InsightsAI", location: "Pune, IN", type: "Full-time", applications: 32, matches: 12, status: "under_review", createdAt: "2025-10-05T06:00:00Z" },
  { id: "9", jobId: "JC-1009", title: "Technical Writer", company: "DocsCo", location: "Remote", type: "Contract", applications: 3, matches: 0, status: "draft", createdAt: "2025-08-22T14:30:00Z" },
  { id: "10", jobId: "JC-1010", title: "Site Reliability Engineer", company: "ScaleUp", location: "Hyderabad, IN", type: "Full-time", applications: 40, matches: 10, status: "expired", createdAt: "2025-06-01T05:15:00Z" },
];

/* ------------------ CONSTANTS ------------------ */
const PAGE_SIZE = 8;
const TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "under_review", label: "Under Review" },
  { key: "expired", label: "Expired" },
  { key: "select_plan", label: "Select Plan" },
  { key: "draft", label: "Drafts" },
];

/* ------------------ COMPONENT ------------------ */
export default function JobManagement() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  /* UI + state */
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(PAGE_SIZE);

  /* Bulk selection */
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);

  /* Filters object (easy to send to API later) */
  const [filters, setFilters] = useState({
    status: "",
    location: "",
    minApplications: "",
    dateFrom: "",
    dateTo: "",
    hasMatches: null,
  });

  /* long-press ref for mobile selection */
  const longPressTimer = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600); 
    return () => clearTimeout(t);
  }, []);

  /* ---- menu handlers ---- */
  const openMenu = (e, job) => {
    setAnchorEl(e.currentTarget);
    setSelectedJob(job);
  };
  const closeMenu = () => {
    setAnchorEl(null);
    setSelectedJob(null);
  };

  /* ---- selection helpers ---- */
  const toggleSelectId = (id) => setSelectedIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const selectAllOnPage = (checked) => {
    if (checked) {
      const ids = pagedJobs.map((j) => j.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...ids])));
    } else {
      const ids = pagedJobs.map((j) => j.id);
      setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    }
  };
  const clearSelection = () => {
    setSelectedIds([]);
    setSelectionMode(false);
  };

  /* ---- bulk actions (placeholder) ---- */
  const bulkDelete = () => {
    if (!selectedIds.length) return alert("Select jobs first.");
    alert(`Bulk delete: ${selectedIds.length} jobs (implement API)`);
    clearSelection();
  };
  const bulkMoveToDraft = () => {
    if (!selectedIds.length) return alert("Select jobs first.");
    alert(`Move to Draft: ${selectedIds.length} jobs (implement API)`);
    clearSelection();
  };

  /* ---- filters ---- */
  const resetFilters = () => setFilters({ status: "", location: "", minApplications: "", dateFrom: "", dateTo: "", hasMatches: null });
  const applyFilters = () => {
    setFiltersOpen(false);
    setPage(1);
  };

  /* ---- filtering (client-side) ---- */
  const filteredJobs = useMemo(() => {
    let jobs = [...mockJobs];
    if (activeTab !== "all") jobs = jobs.filter((j) => j.status === activeTab);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      jobs = jobs.filter((j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.jobId.toLowerCase().includes(q));
    }
    if (filters.status) jobs = jobs.filter((j) => j.status === filters.status);
    if (filters.location) jobs = jobs.filter((j) => j.location.toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.minApplications) jobs = jobs.filter((j) => j.applications >= Number(filters.minApplications));
    if (filters.hasMatches !== null) jobs = jobs.filter((j) => Boolean(j.matches) === Boolean(filters.hasMatches));
    if (filters.dateFrom) jobs = jobs.filter((j) => new Date(j.createdAt) >= new Date(filters.dateFrom));
    if (filters.dateTo) jobs = jobs.filter((j) => new Date(j.createdAt) <= new Date(filters.dateTo));
    return jobs;
  }, [activeTab, query, filters]);

  const total = filteredJobs.length;
  const pageCount = Math.max(1, Math.ceil(total / limit));
  const pagedJobs = filteredJobs.slice((page - 1) * limit, page * limit);
  const isAllSelectedOnPage = pagedJobs.length > 0 && pagedJobs.every((j) => selectedIds.includes(j.id));

  /* ---- mobile long-press handlers ---- */
  const handleTouchStart = (job) => {
    if (!isSmDown) return;
    longPressTimer.current = setTimeout(() => {
      setSelectionMode(true);
      setSelectedIds((prev) => (prev.includes(job.id) ? prev : [...prev, job.id]));
    }, 600);
  };
  const handleTouchEnd = () => {
    if (!isSmDown) return;
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  /* ---- navigation helper (uses react-router) ---- */
  const goTo = (path) => navigate(path);

  /* ------------------ RENDER ------------------ */
  return (
    <Box sx={{ width: "100%", pb: 6 }}>
      {/* Header / actions */}
      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 3, justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800, letterSpacing: "-0.5px", color: "#0f172a" }}>Jobs</Typography>

        <Stack direction="row" spacing={1.5} sx={{ width: { xs: "100%", sm: "auto" } }} justifyContent={{ xs: "space-between", sm: "flex-end" }}>
          <TextField
            size="small"
            placeholder="Search jobs, company, job ID..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: "grey.500" }} />,
              sx: { borderRadius: "10px", background: "#fff", width: { xs: "100%", sm: 300, md: 380 } },
            }}
          />

          <Button variant="outlined" startIcon={<FilterListIcon />} onClick={() => setFiltersOpen(true)} sx={{ textTransform: "none", borderRadius: "10px", px: 2 }}>
            Filters
          </Button>

          <Button variant="contained" onClick={() => goTo("/employer/dashboard/jobs/create")} sx={{ textTransform: "none", borderRadius: "10px", px: 3, fontWeight: 600 }}>
            Create Job
          </Button>

          {/* Mobile select toggle */}
          {isSmDown && (
            <Button
              variant={selectionMode ? "contained" : "outlined"}
              color={selectionMode ? "primary" : "inherit"}
              onClick={() => {
                if (selectionMode) clearSelection();
                else setSelectionMode(true);
              }}
              sx={{ ml: 1, display: { xs: "inline-flex", sm: "none" }, textTransform: "none", borderRadius: "8px" }}
            >
              {selectionMode ? <CloseIcon sx={{ mr: 0.5 }} /> : <SelectAllIcon sx={{ mr: 0.5 }} />} {selectionMode ? "Done" : "Select"}
            </Button>
          )}
        </Stack>
      </Box>

      {/* Tabs */}
      <Box sx={{ display: "flex", gap: 1.25, mb: 3, flexWrap: "wrap" }}>
        {TABS.map((t) => {
          const active = t.key === activeTab;
          return (
            <Chip
              key={t.key}
              label={t.label}
              onClick={() => {
                setActiveTab(t.key);
                setPage(1);
              }}
              clickable
              sx={{
                px: 2.2,
                py: 0.9,
                fontWeight: 600,
                fontSize: 14,
                borderRadius: "10px",
                cursor: "pointer",
                background: active ? "linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%)" : "#f1f5f9",
                color: active ? "#ffffff" : "#475569",
                border: active ? "1px solid rgba(37,99,235,0.4)" : "1px solid rgba(15,23,42,0.08)",
                "&:hover": { background: active ? "linear-gradient(90deg, #1d4ed8 0%, #3b82f6 100%)" : "#e2e8f0" },
                transition: "0.25s ease",
                boxShadow: active ? "0 3px 12px rgba(37,99,235,0.22)" : "none",
              }}
            />
          );
        })}
      </Box>

      {/* Bulk actions bar */}
      {(selectedIds.length > 0 || selectionMode) && (
        <Paper elevation={1} sx={{ p: 1, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(90deg, rgba(234,242,255,0.8), rgba(245,249,255,0.9))", borderRadius: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontWeight: 700 }}>{selectedIds.length || 0} selected</Typography>
            <Button size="small" startIcon={<PlaylistAddCheckIcon />} onClick={bulkMoveToDraft} sx={{ textTransform: "none" }}>
              Move to Draft
            </Button>
            <Button size="small" startIcon={<DeleteOutlineIcon />} onClick={bulkDelete} sx={{ textTransform: "none", color: "#b91c1c" }}>
              Delete
            </Button>
          </Box>

          <Box>
            <Button variant="text" size="small" onClick={clearSelection} sx={{ textTransform: "none" }}>
              Clear
            </Button>
          </Box>
        </Paper>
      )}

      {/* Table */}
      <Paper elevation={3} sx={{ borderRadius: 3, p: 0, boxShadow: "0 12px 36px rgba(14, 42, 100, 0.06)" }}>
        <TableContainer sx={{borderRadius: 3 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ "& th": { background: "linear-gradient(180deg, #f8fafc 0%, #eef2f6 100%)", fontWeight: 800, color: "#1e293b", fontSize: 14, letterSpacing: "-0.2px", borderBottom: "1px solid #e6eef8" } }}>
                <TableCell sx={{ width: 56 }}>
                  {isMdUp ? (
                    <Checkbox checked={isAllSelectedOnPage} indeterminate={selectedIds.length > 0 && !isAllSelectedOnPage} onChange={(e) => selectAllOnPage(e.target.checked)} />
                  ) : (
                    <Box />
                  )}
                </TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Applications</TableCell>
                <TableCell>Matches</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* Loading skeleton */}
              {loading &&
                Array.from({ length: Math.min(6, limit) }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton variant="rectangular" width={24} height={24} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="70%" />
                      <Skeleton width="45%" height={16} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="80%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="50%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="40%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="40%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="60%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="60px" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton width={36} height={36} />
                    </TableCell>
                  </TableRow>
                ))}

              {/* No results */}
              {!loading && pagedJobs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} sx={{ py: 10 }}>
                    <Box sx={{ textAlign: "center" }}>
                      <Box sx={{ display: "inline-block", mb: 3 }}>
                        <svg width="190" height="140" viewBox="0 0 190 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="10" y="24" width="138" height="92" rx="10" fill="#eef2ff" />
                          <path d="M26 46H128" stroke="#cfe4ff" strokeWidth="3" strokeLinecap="round" />
                          <path d="M26 68H128" stroke="#cfe4ff" strokeWidth="3" strokeLinecap="round" />
                          <circle cx="166" cy="40" r="22" fill="#dbeafe" />
                          <path d="M158 36L174 52" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
                          <path d="M174 36L158 52" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </Box>

                      <Typography sx={{ fontWeight: 800, fontSize: 18, mb: 1 }}>No jobs found</Typography>
                      <Typography sx={{ color: "#64748b", mb: 2 }}>Adjust your filters or create a new job post to get started.</Typography>
                      <Button variant="contained" onClick={() => goTo("/employer/dashboard/jobs/create")} sx={{ textTransform: "none", borderRadius: 2 }}>
                        Create Job
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )}

              {/* Rows */}
              {!loading &&
                pagedJobs.map((job) => {
                  const selected = selectedIds.includes(job.id);
                  return (
                    <TableRow
                      key={job.id}
                      hover
                      onTouchStart={() => handleTouchStart(job)}
                      onTouchEnd={() => handleTouchEnd()}
                      sx={{
                        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 24px rgba(37,99,235,0.12)", background: "rgba(37,99,235,0.03)" },
                        background: selected ? "rgba(11,92,204,0.04)" : "transparent",
                      }}
                    >
                      <TableCell>
                        {isMdUp ? (
                          <Checkbox checked={selected} onChange={() => toggleSelectId(job.id)} />
                        ) : selectionMode ? (
                          <Checkbox checked={selected} onChange={() => toggleSelectId(job.id)} />
                        ) : (
                          <Box sx={{ width: 24 }} />
                        )}
                      </TableCell>

                      <TableCell>
                        <Typography sx={{ fontWeight: 800, fontSize: 15, color: "#0f172a" }}>{job.title}</Typography>
                        <Typography sx={{ fontSize: 12, color: "#64748b", mt: 0.4 }}>ID: {job.jobId} • {job.type}</Typography>
                      </TableCell>

                      <TableCell>{job.company}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.applications}</TableCell>
                      <TableCell>{job.matches ?? 0}</TableCell>
                      <TableCell>{format(new Date(job.createdAt), "dd MMM yyyy")}</TableCell>

                      <TableCell>
                        <Chip
                          label={job.status.replace("_", " ")}
                          size="small"
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: 700,
                            borderRadius: "8px",
                            px: 1.2,
                            fontSize: 13,
                            background:
                              job.status === "active"
                                ? "rgba(37,99,235,0.15)"
                                : job.status === "expired"
                                ? "rgba(220,38,38,0.12)"
                                : job.status === "draft"
                                ? "rgba(100,116,139,0.16)"
                                : job.status === "select_plan"
                                ? "rgba(234,179,8,0.12)"
                                : job.status === "under_review"
                                ? "rgba(79,70,229,0.12)"
                                : "#e2e8f0",
                            color:
                              job.status === "active"
                                ? "#1e40af"
                                : job.status === "expired"
                                ? "#b91c1c"
                                : job.status === "draft"
                                ? "#475569"
                                : job.status === "select_plan"
                                ? "#92400e"
                                : job.status === "under_review"
                                ? "#060325ff"
                                : "#334155",
                          }}
                        />
                      </TableCell>

                      <TableCell align="right">
                        <Tooltip title="More actions">
                          <IconButton onClick={(e) => openMenu(e, job)} sx={{ "&:hover": { background: "rgba(11,92,204,0.06)" }, borderRadius: 1 }}>
                            <MoreVertIcon sx={{ color: "#334155" }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", p: 3 }}>
          <Typography sx={{ fontSize: 13, color: "#64748b" }}>
            Showing {total === 0 ? 0 : (page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
          </Typography>

          <Pagination count={pageCount} page={page} onChange={(e, v) => setPage(v)} color="primary" shape="rounded" size="medium" />
        </Box>
      </Paper>

      {/* Actions menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem onClick={() => { closeMenu(); goTo(`/employer/dashboard/jobs/view/${selectedJob?.id}`); }}>View</MenuItem>
        <MenuItem onClick={() => { closeMenu(); goTo(`/employer/dashboard/jobs/edit/${selectedJob?.id}`); }}>Edit</MenuItem>
        <MenuItem onClick={() => { closeMenu(); alert("Duplicate job - implement API"); }}>Duplicate</MenuItem>
        <MenuItem onClick={() => { closeMenu(); alert("Move to draft - implement API"); }}>Move to Draft</MenuItem>
      </Menu>

      {/* Filters dialog */}
      <Dialog open={filtersOpen} onClose={() => setFiltersOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800 }}>All Filters</DialogTitle>
        <DialogContent dividers sx={{ background: "#f8fafc", p: 3 }}>
          <Stack spacing={2.5} mt={1}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select native value={filters.status} onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}>
                <option value=""></option>
                <option value="active">Active</option>
                <option value="under_review">Under Review</option>
                <option value="expired">Expired</option>
                <option value="select_plan">Select Plan</option>
                <option value="draft">Draft</option>
              </Select>
            </FormControl>

            <TextField label="Location" size="small" value={filters.location} onChange={(e) => setFilters((p) => ({ ...p, location: e.target.value }))} fullWidth />

            <TextField label="Min Applications" size="small" type="number" value={filters.minApplications} onChange={(e) => setFilters((p) => ({ ...p, minApplications: e.target.value }))} />

            <Stack direction="row" spacing={2}>
              <TextField label="Date From" type="date" size="small" InputLabelProps={{ shrink: true }} value={filters.dateFrom} onChange={(e) => setFilters((p) => ({ ...p, dateFrom: e.target.value }))} fullWidth />
              <TextField label="Date To" type="date" size="small" InputLabelProps={{ shrink: true }} value={filters.dateTo} onChange={(e) => setFilters((p) => ({ ...p, dateTo: e.target.value }))} fullWidth />
            </Stack>

            <FormControlLabel control={<Checkbox checked={filters.hasMatches === true} onChange={(e) => setFilters((p) => ({ ...p, hasMatches: e.target.checked ? true : null }))} />} label="Has Matches" />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, gap: 1.5 }}>
          <Button onClick={resetFilters} sx={{ textTransform: "none", borderRadius: "8px", px: 2 }}>Reset</Button>
          <Button variant="contained" onClick={applyFilters} sx={{ textTransform: "none", borderRadius: "8px", px: 3, fontWeight: 700 }}>Apply</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
