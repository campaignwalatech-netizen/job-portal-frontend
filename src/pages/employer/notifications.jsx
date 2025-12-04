import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Stack,
  Avatar,
  Paper,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PaymentIcon from "@mui/icons-material/Payment";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

const now = new Date();

const initialMockNotifications = [
  {
    id: "n1",
    title: "Payment Confirmed: Basic Job Plan",
    body: "Your payment for the Basic Job Plan of ₹999 has been successfully processed.",
    type: "payment",
    createdAt: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: "n2",
    title: "New Application for Senior Software Engineer",
    body: "Rohan Sharma has applied for the Senior Software Engineer position. Review their profile now.",
    type: "applications",
    createdAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: "n3",
    title: 'Job Post "Marketing Executive" is Live!',
    body: "Your job posting for Marketing Executive is now active and visible to candidates.",
    type: "jobs",
    createdAt: new Date(now.getTime() - 60 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: "n4",
    title: "Candidate Matches for Data Scientist",
    body: "We found 5 new candidates matching your Data Scientist job requirements.",
    type: "candidates",
    createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: "n5",
    title: "Interview Details Updated for Full Stack Developer",
    body: "The interview schedule for the Full Stack Developer position has been updated.",
    type: "jobs",
    createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: "n6",
    title: "Credits Added: Database Access Pack",
    body: "You have successfully purchased and added 50 database credits to your account.",
    type: "payment",
    createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
  {
    id: "n7",
    title: "Application Withdrawn: Junior UI Designer",
    body: "Priya Singh has withdrawn her application for the Junior UI Designer role.",
    type: "applications",
    createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
  {
    id: "n8",
    title: 'Job Post "HR Manager" is Expiring Soon',
    body: "Your HR Manager job post will expire in 3 days. Consider renewing it.",
    type: "jobs",
    createdAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
  {
    id: "n9",
    title: "Profile Viewed: Akash Kumar (Software Engineer)",
    body: "A candidate matching your criteria, Akash Kumar, viewed your company profile.",
    type: "candidates",
    createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
];

const types = [
  { key: "all", label: "All", icon: <AccessTimeIcon /> },
  { key: "payment", label: "Payment", icon: <PaymentIcon /> },
  { key: "jobs", label: "Jobs", icon: <WorkOutlineIcon /> },
  { key: "applications", label: "Applications", icon: <DescriptionOutlinedIcon /> },
  { key: "candidates", label: "Candidates", icon: <AccountCircleIcon /> },
];

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 7 * 86400) return `${Math.floor(diff / 86400)}d`;
  return `${Math.floor(diff / (86400 * 7))}w`;
}

function groupByTime(items) {
  const today = [];
  const thisWeek = [];
  const earlier = [];
  const nowDate = new Date();
  for (const it of items) {
    const d = new Date(it.createdAt);
    const isToday =
      d.getFullYear() === nowDate.getFullYear() &&
      d.getMonth() === nowDate.getMonth() &&
      d.getDate() === nowDate.getDate();
    const daysDiff = Math.floor((nowDate - d) / (1000 * 60 * 60 * 24));
    if (isToday) today.push(it);
    else if (daysDiff <= 7) thisWeek.push(it);
    else earlier.push(it);
  }
  return { today, thisWeek, earlier };
}

function TypeAvatar({ t }) {
  const size = 42;
  if (t === "payment")
    return (
      <Avatar sx={{ width: size, height: size, bgcolor: "#eef2ff", color: "#1e40af" }}>
        <PaymentIcon />
      </Avatar>
    );
  if (t === "jobs")
    return (
      <Avatar sx={{ width: size, height: size, bgcolor: "#eefdf7", color: "#065f46" }}>
        <WorkOutlineIcon />
      </Avatar>
    );
  if (t === "applications")
    return (
      <Avatar sx={{ width: size, height: size, bgcolor: "#fff7ed", color: "#c2410c" }}>
        <DescriptionOutlinedIcon />
      </Avatar>
    );
  return (
    <Avatar sx={{ width: size, height: size, bgcolor: "#f0f9ff", color: "#0369a1" }}>
      <AccountCircleIcon />
    </Avatar>
  );
}
export default function Notifications() {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeType, setActiveType] = useState("all");
  const [data, setData] = useState(initialMockNotifications);
  useEffect(() => {
    setData((prev) =>
      prev.map((n) =>
        n.isRead ? n : { ...n, _pulse: true }
      )
    );
    const t = setTimeout(() => {
      setData((prev) => prev.map((n) => ({ ...n, _pulse: false })));
    }, 900);

    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    if (activeType === "all") return [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return data.filter((n) => n.type === activeType).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [data, activeType]);

  const groups = useMemo(() => groupByTime(filtered), [filtered]);

  const unreadCount = useMemo(() => data.filter((d) => !d.isRead).length, [data]);

  const markRead = (id) => {
    setData((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true, _pulse: false } : n)));
  };

  const markAllRead = () => {
    setData((prev) => prev.map((n) => ({ ...n, isRead: true, _pulse: false })));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 3, alignItems: "center", mb: 3 }}>
        <Typography sx={{ fontSize: 26, fontWeight: 800 }}>Notifications</Typography>

        <Box sx={{ flex: 1 }} />

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            Unread: <strong>{unreadCount}</strong>
          </Typography>

          <Button
            variant="contained"
            startIcon={<MarkEmailReadIcon />}
            onClick={markAllRead}
            sx={{ textTransform: "none" }}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </Stack>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Tabs
          value={activeType}
          onChange={(e, v) => setActiveType(v)}
          variant={isSmDown ? "scrollable" : "standard"}
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-flexContainer": {
              gap: 1,
            },
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          {types.map((t) => (
            <Tab
              key={t.key}
              value={t.key}
              label={
                <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 1.4 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>{t.icon}</Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{t.label}</Typography>
                </Stack>
              }
              disableRipple
              sx={(theme) => ({
                textTransform: "none",
                minHeight: 40,
                borderRadius: 999,
                px: 0.5,
                py: 0.3,
                mr: 0.5,
                "&.Mui-selected": {
                  background: theme.palette.mode === "light" ? "#1e40af" : "#2563eb",
                  color: "#fff",
                  boxShadow: "0 6px 20px rgba(30,64,175,0.12)",
                },
                "&:not(.Mui-selected)": {
                  background: "transparent",
                  border: "1px solid rgba(15,23,42,0.06)",
                  color: "text.primary",
                },
              })}
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
      
        <Box sx={{ flex: 1 }}>
          {["today", "thisWeek", "earlier"].map((sectionKey) => {
            const label = sectionKey === "today" ? "Today" : sectionKey === "thisWeek" ? "This Week" : "Earlier";
            const list = sectionKey === "today" ? groups.today : sectionKey === "thisWeek" ? groups.thisWeek : groups.earlier;
            if (!list || list.length === 0) return null;
            return (
              <Box key={sectionKey} sx={{ mb: 4 }}>
                <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 2 }}>{label}</Typography>

                <Stack spacing={2}>
                  {list.map((n) => (
                    <Paper
                      key={n.id}
                      sx={{
                        p: 2.2,
                        borderRadius: 2,
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                        border: "1px solid rgba(15,23,42,0.04)",
                        boxShadow: "0 6px 18px rgba(12,18,46,0.02)",

                        ...(n._pulse
                          ? {
                              "@keyframes notifPulse": {
                                "0%": { boxShadow: "0 0 0 0 rgba(59,130,246,0.12)" },
                                "70%": { boxShadow: "0 0 20px 6px rgba(59,130,246,0.06)" },
                                "100%": { boxShadow: "0 6px 18px rgba(12,18,46,0.02)" },
                              },
                              animation: "notifPulse 0.9s ease",
                            }
                          : {}),

                        backgroundColor: n.isRead ? "transparent" : "rgba(59,130,246,0.02)",
                        transition: "background-color .28s ease, box-shadow .28s ease",
                      }}
                    >
                      <Box sx={{ position: "relative" }}>
                        {!n.isRead && (
                          <Box
                            onClick={() => markRead(n.id)}
                            title="Mark as read"
                            sx={{
                              width: 10,
                              height: 10,
                              bgcolor: "#3b82f6",
                              borderRadius: "50%",
                              position: "absolute",
                              top: -6,
                              right: -6,
                              cursor: "pointer",
                              transition: "transform .18s ease, opacity .2s",
                              "&:hover": { transform: "scale(1.35)" },
                            }}
                          />
                        )}

                        <TypeAvatar t={n.type} />
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, alignItems: "flex-start" }}>
                          <Box>
                            <Typography sx={{ fontWeight: 700 }}>{n.title}</Typography>
                            <Typography sx={{ color: "text.secondary", mt: 0.6 }}>{n.body}</Typography>

                            <Button size="small" sx={{ mt: 1, textTransform: "none", px: 0 }}>
                              View Details
                            </Button>
                          </Box>

                          <Stack alignItems="flex-end" spacing={1}>
                            <Typography sx={{ color: "text.secondary", fontSize: 13 }}>{timeAgo(n.createdAt)}</Typography>

                            {!n.isRead && (
                              <IconButton
                                size="small"
                                onClick={() => markRead(n.id)}
                                sx={{
                                  bgcolor: "transparent",
                                  "&:hover": { bgcolor: "rgba(59,130,246,0.08)" },
                                }}
                                title="Mark as read"
                              >
                                <DoneIcon sx={{ fontSize: 18, color: "#2563eb" }} />
                              </IconButton>
                            )}
                            {n.isRead && (
                              <Box sx={{ color: "text.secondary", fontSize: 12, display: "flex", alignItems: "center", gap: 0.5 }}>
                                <DoneIcon sx={{ fontSize: 14 }} /> <Typography sx={{ fontSize: 12 }}>Read</Typography>
                              </Box>
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            );
          })}
          {filtered.length === 0 && (
            <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
              <Typography sx={{ fontWeight: 700 }}>No notifications</Typography>
              <Typography sx={{ color: "text.secondary", mt: 1 }}>Try a different filter</Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
}
