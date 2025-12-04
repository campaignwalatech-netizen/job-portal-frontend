import React, { useState, useEffect } from "react";
import { Box, Typography, Collapse, Divider } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import StorageIcon from "@mui/icons-material/Storage";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ReceiptIcon from "@mui/icons-material/Receipt";

export default function Navbar({ mobile = false, closeDrawer = () => {} }) {
  const location = useLocation();

  const [expandedParent, setExpandedParent] = useState(() => {
    return location.pathname.includes("/employer/dashboard/database")
      ? "database"
      : null;
  });

  useEffect(() => {
    if (location.pathname.includes("/employer/dashboard/database")) {
      setExpandedParent("database");
    } else if (expandedParent === "database") {
      setExpandedParent(null);
    }
  }, [location.pathname]);
  const parents = [
    {
      key: "jobs",
      label: "Jobs",
      icon: <WorkIcon />,
      path: "/employer/dashboard/job-listing",
    },
    {
      key: "database",
      label: "Database",
      icon: <StorageIcon />,
      path: null,
      children: [
        { label: "Search Candidates", path: "/employer/dashboard/database/search" },
        { label: "Unlocked Candidates", path: "/employer/dashboard/database/unlocked" },
      ],
    },
    {
      key: "credits",
      label: "Credits & Usage",
      icon: <CreditScoreIcon />,
      path: "/employer/dashboard/credits",
    },
    {
      key: "billing",
      label: "Billing",
      icon: <ReceiptIcon />,
      path: "/employer/dashboard/billing",
    },
  ];

  return (
    <Box
      sx={{
        width: "240px",
        position: "fixed",
        top: 72,
        left: 0,
        zIndex: 30,
        background: "#ffffff",
        pt: 2.5,
        display: mobile ? "block" : { xs: "none", md: "block" },
        borderRight: "1px solid rgba(15, 23, 42, 0.06)",
        minHeight: "calc(100vh - 72px)",
        overflowY: "auto",

        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-thumb": {
          background: "#cfd8e3",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-track": { background: "transparent" },
      }}
    >
      {parents.map((p) => {
        const isActiveParent =
          (p.path && location.pathname === p.path) ||
          (p.children && p.children.some((c) => location.pathname === c.path));

        const ParentRow = (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.8,
              px: 3,
              py: 1.4,
              cursor: p.path ? "pointer" : "default",
              borderLeft: isActiveParent
                ? "4px solid #3b82f6"
                : "4px solid transparent",
              background: isActiveParent ? "#f1f5f9" : "transparent",
              transition: "0.2s ease",

              "&:hover": p.path ? { background: "#f8fafc" } : {},
            }}
          >
            <Box sx={{ color: isActiveParent ? "#3b82f6" : "#475569" }}>
              {p.icon}
            </Box>

            <Typography
              sx={{
                color: isActiveParent ? "#0f172a" : "#475569",
                fontWeight: isActiveParent ? 600 : 500,
                fontSize: 15,
                flex: 1,
              }}
            >
              {p.label}
            </Typography>
          </Box>
        );

        return (
          <Box key={p.key}>
            {p.path ? (
              <NavLink
                to={p.path}
                onClick={() => {
                  closeDrawer();
                  setExpandedParent(null);
                }}
                style={{ textDecoration: "none" }}
              >
                {ParentRow}
              </NavLink>
            ) : (
              <Box
                onClick={() => {
                  if (expandedParent !== p.key) setExpandedParent(p.key);
                }}
              >
                {ParentRow}
              </Box>
            )}
            {p.children && (
              <Collapse
                in={expandedParent === p.key}
                timeout="auto"
                unmountOnExit
              >
                <Box
                  sx={{
                    pl: 4,
                    pr: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    mt: 0.5,
                  }}
                >
                  {p.children.map((child) => {
                    const active = location.pathname === child.path;
                    return (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        style={{ textDecoration: "none" }}
                        onClick={() => closeDrawer()}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            transition: "0.15s ease",

                            background: active ? "#f1f5f9" : "transparent",
                            color: active ? "#0f172a" : "#475569",

                            "&:hover": { background: "#f1f5f9" },
                          }}
                        >
                          <Typography sx={{ fontSize: 14 }}>
                            {child.label}
                          </Typography>
                        </Box>
                      </NavLink>
                    );
                  })}
                </Box>
              </Collapse>
            )}

            <Divider sx={{ my: 0.5, borderColor: "rgba(15,23,42,0.04)" }} />
          </Box>
        );
      })}
    </Box>
  );
}
