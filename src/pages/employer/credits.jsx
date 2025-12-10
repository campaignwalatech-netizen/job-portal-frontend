import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Chip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Credits() {
  const [tab, setTab] = useState("all");
  const [expandedRow, setExpandedRow] = useState(null);

  const transactions = [
    {
      type: "Credit Added",
      details: "Complimentary",
      credits: "+10 Credits",
      color: "success",
      date: "25/04/2023 10:47 PM",
      expiry: "27/12/2020",
      category: "added",
    },
    {
      type: "Credit Spent",
      details: "Posted Job #557894",
      credits: "-30 Credits",
      color: "error",
      date: "06/03/2024 07:34 AM",
      expiry: "12/12/2022",
      category: "spent",
    },
    {
      type: "Credit returned",
      details: "xyz reason",
      credits: "+40 Credits",
      color: "warning",
      date: "09/09/2020 12:20 AM",
      expiry: "12/12/2021",
      category: "returned",
    },
  ];

  const filtered =
    tab === "all"
      ? transactions
      : transactions.filter((t) => t.category === tab);

  return (
    <Box sx={{ width: "100%", pb: { xs: 4, md: 6 } }}>
      {/* PAGE TITLE */}
      <Typography
        sx={{
          fontSize: { xs: 22, sm: 24, md: 26 },
          fontWeight: 700,
          mb: { xs: 2.5, md: 4 },
          color: "#0f172a",
        }}
      >
        Credits and Usage
      </Typography>

      {/* TOP SECTION */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mb: { xs: 4, md: 6 },
        }}
      >
        {/* AVAILABLE CREDITS */}
        <Card
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 3,
            boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
          }}
        >
          <Typography sx={{ fontWeight: 600, mb: 1 }}>Available Credits</Typography>

          <Chip
            label="Low Credits"
            size="small"
            sx={{
              background: "#fee2e2",
              color: "#b91c1c",
              mb: 2,
              fontWeight: 600,
            }}
          />

          <Typography
            sx={{
              fontSize: { xs: 32, md: 40 },
              fontWeight: 700,
              color: "#2563eb",
            }}
          >
            200
          </Typography>

          <Typography sx={{ mt: 1, color: "#475569" }}>
            Expires on 15 Jan 2026
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 3,
              textTransform: "none",
              borderRadius: 2,
              paddingY: 1,
              alignSelf: "flex-start",
            }}
          >
            Buy More Credits
          </Button>
        </Card>

        {/* HOW CREDITS WORK */}
        <Card
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 3,
            boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 1 }}>
            How Credits Work
          </Typography>

          <Typography sx={{ color: "#475569", fontSize: 15 }}>
            Understand how your credits are utilized across the Naukri Chahiye Employer Panel to optimize your hiring process.
            <br />
            <br />
            <strong>Job Posting Credits:</strong> Charged when a new job is successfully published. 5 Credits per job
            <br />
            <br />
            <strong>Database Credits:</strong> Used to unlock candidate contact details...
            <br />
            <br />
            <strong>Expiry & Usage:</strong> All credits are non-refundable...
          </Typography>
        </Card>
      </Box>

      {/* TRANSACTION HISTORY */}
      <Typography
        sx={{
          fontSize: { xs: 20, md: 24 },
          fontWeight: 700,
          mb: 2,
          color: "#0f172a",
        }}
      >
        Transaction History
      </Typography>

      {/* TABS */}
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        sx={{ mb: 3 }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="All" value="all" />
        <Tab label="Credits Added" value="added" />
        <Tab label="Credits Spent" value="spent" />
        <Tab label="Credits Returned" value="returned" />
      </Tabs>

      {/* TABLE */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
        }}
      >
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              {/* Hidden on mobile */}
              <TableCell
                sx={{ fontWeight: 600, display: { xs: "none", md: "table-cell" } }}
              >
                Credit
              </TableCell>

              {/* Always Visible */}
              <TableCell sx={{ fontWeight: 600 }}>Transaction Details</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Credits</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>

              {/* Hidden on mobile */}
              <TableCell
                sx={{ fontWeight: 600, display: { xs: "none", md: "table-cell" } }}
              >
                Expiry
              </TableCell>

              {/* Expand for hidden columns on mobile */}
              <TableCell
                sx={{
                  width: 50,
                  display: { xs: "table-cell", md: "none" },
                }}
              />
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((row, i) => {
              const open = expandedRow === i;

              return (
                <>
                  <TableRow key={i}>
                    {/* Hidden on mobile */}
                    <TableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      {row.type}
                    </TableCell>

                    <TableCell>{row.details}</TableCell>

                    <TableCell>
                      <Chip
                        label={row.credits}
                        sx={{
                          fontWeight: 600,
                          color:
                            row.color === "success"
                              ? "#166534"
                              : row.color === "error"
                              ? "#b91c1c"
                              : "#92400e",
                          background:
                            row.color === "success"
                              ? "#dcfce7"
                              : row.color === "error"
                              ? "#fee2e2"
                              : "#fef3c7",
                        }}
                      />
                    </TableCell>

                    <TableCell>{row.date}</TableCell>

                    {/* Hidden on mobile */}
                    <TableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      {row.expiry}
                    </TableCell>

                    {/* Expand button */}
                    <TableCell
                      sx={{
                        display: { xs: "table-cell", md: "none" },
                      }}
                    >
                      <IconButton onClick={() => setExpandedRow(open ? null : i)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                  </TableRow>

                  {/* COLLAPSE SECTION (mobile only) */}
                  <TableRow
                    sx={{
                      display: { xs: "table-row", md: "none" },
                    }}
                  >
                    <TableCell colSpan={5} sx={{ p: 0 }}>
                      <Collapse in={open}>
                        <Box sx={{ p: 2, background: "#f8fafc" }}>
                          <Typography sx={{ fontSize: 13, mb: 1 }}>
                            <strong>Credit Type:</strong> {row.type}
                          </Typography>
                          <Typography sx={{ fontSize: 13 }}>
                            <strong>Expiry:</strong> {row.expiry}
                          </Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
