import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { jsPDF } from "jspdf";


export default function Billing() {
  const [editOpen, setEditOpen] = useState(false);

  const [details, setDetails] = useState({
    gstin: "22ABCDE1234F1Z5",
    office: "Office No. 405, Tech Park",
    street: "Mahindra World City",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600000",
  });

  const [form, setForm] = useState(details);

  const billingRows = [
    {
      date: "2023-11-15",
      plan: "Premium Job Post",
      expiry: "2024-11-14",
      amount: "₹ 2,500",
      status: "Success",
    },
    {
      date: "2023-10-20",
      plan: "Database Access (3 Months)",
      expiry: "2024-01-19",
      amount: "₹ 5,000",
      status: "Success",
    },
    {
      date: "2023-09-01",
      plan: "Basic Job Post",
      expiry: "2024-08-31",
      amount: "₹ 1,000",
      status: "Success",
    },
    {
      date: "2023-08-05",
      plan: "All Calling Credits (500)",
      expiry: "N/A",
      amount: "₹ 1,200",
      status: "Pending",
    },
    {
      date: "2023-07-10",
      plan: "Premium Job Post",
      expiry: "2024-07-09",
      amount: "₹ 2,500",
      status: "Failed",
    },
  ];

  const handleOpenEdit = () => {
    setForm(details);
    setEditOpen(true);
  };

  const handleSaveEdit = () => {
    setDetails(form);
    setEditOpen(false);
  };

  const renderStatusChip = (status) => {
    if (status === "Success") {
      return (
        <Chip
          label="Success"
          size="small"
          sx={{
            backgroundColor: "#dcfce7",
            color: "#166534",
            fontWeight: 600,
          }}
        />
      );
    }
    if (status === "Pending") {
      return (
        <Chip
          label="Pending"
          size="small"
          sx={{
            backgroundColor: "#fef3c7",
            color: "#92400e",
            fontWeight: 600,
          }}
        />
      );
    }
    return (
      <Chip
        label="Failed"
        size="small"
        sx={{
          backgroundColor: "#fee2e2",
          color: "#b91c1c",
          fontWeight: 600,
        }}
      />
    );
  };

  const addressLines = [
    details.office,
    details.street,
    `${details.city}, ${details.state} -${details.pincode}`,
  ];

const downloadInvoice = async (row) => {
  const doc = new jsPDF("p", "mm", "a4");

  // --- Convert SVG Logo to PNG ---
  const svgUrl = "/logo.svg";
  const img = new Image();
  img.src = svgUrl;
  await new Promise((res) => (img.onload = res));

  const canvas = document.createElement("canvas");
  canvas.width = img.width * 4;
  canvas.height = img.height * 4;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const logo = canvas.toDataURL("image/png");

  // ----------------- Helpers -----------------
  const parse = (val) => Number(val.replace(/[^\d.]/g, "")) || 0;
  const format = (n) => `₹ ${n.toLocaleString("en-IN")}`;

  const right = (txt, xRight, y) => {
    const w = doc.getTextWidth(txt);
    doc.text(txt, xRight - w, y);
  };

  const base = parse(row.amount);
  const gst = Math.round(base * 0.18);
  const total = base + gst;

  const statusColors = {
    Success: { bg: "#dcfce7", txt: "#166534" },
    Pending: { bg: "#fef3c7", txt: "#92400e" },
    Failed: { bg: "#fee2e2", txt: "#b91c1c" },
  };
  const sc = statusColors[row.status] || statusColors.Success;

  const hex = (h) => {
    h = h.replace("#", "");
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };

  // ----------------- HEADER -----------------
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, 210, 45, "F");

  doc.addImage(logo, "PNG", 15, 10, 26, 26);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("Naukri Chahiye", 48, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Employer Billing Invoice", 48, 28);

  // Invoice Meta
  doc.setFontSize(10);
  doc.text("Invoice No:", 150, 12);
  doc.text("Invoice Date:", 150, 18);
  doc.text("Status:", 150, 24);

  doc.setFont("helvetica", "bold");
  doc.text("INV-2025-0001", 175, 12);
  doc.text(row.date, 175, 18);

  // Status Pill
  const [r, g, b] = hex(sc.bg);
  doc.setFillColor(r, g, b);
  doc.roundedRect(168, 20, 34, 10, 2, 2, "F");

  const [r2, g2, b2] = hex(sc.txt);
  doc.setTextColor(r2, g2, b2);
  doc.text(row.status, 185, 27, { align: "center" });

  doc.setTextColor(0, 0, 0);

  // ----------------- BILLED FROM / BILLED TO -----------------
  let y = 60;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Billed From", 15, y);
  doc.text("Billed To", 115, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  y += 7;
  doc.text("Naukri Chahiye Pvt. Ltd.", 15, y);
  doc.text("GSTIN: 22AAAAA0000A1Z5", 15, y + 5);
  doc.text("4th Floor, Tech Park", 15, y + 10);
  doc.text("Chennai, Tamil Nadu - 600000", 15, y + 15);

  doc.text("Registered Employer", 115, y);
  doc.text(`GSTIN: ${details.gstin}`, 115, y + 5);
  doc.text(details.office, 115, y + 10);
  doc.text(details.street, 115, y + 15);
  doc.text(
    `${details.city}, ${details.state} - ${details.pincode}`,
    115,
    y + 20
  );

  // ----------------- ITEM TABLE -----------------
  const tableTop = 110;

  doc.setFillColor(248, 250, 255);
  doc.rect(15, tableTop, 180, 10, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);

  doc.text("Description", 20, tableTop + 7);
  doc.text("Qty", 110, tableTop + 7);
  doc.text("Price", 140, tableTop + 7);
  doc.text("Amount", 170, tableTop + 7);

  // Row
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const rowY = tableTop + 17;
  doc.text(row.plan, 20, rowY);
  right("1", 115, rowY);
  right(format(base), 150, rowY);
  right(format(base), 190, rowY);

  // Border
  doc.rect(15, tableTop, 180, 20);

  // ----------------- TOTAL SUMMARY BOX -----------------
  const sumTop = tableTop + 30;

  doc.setFillColor(248, 250, 255);
  doc.roundedRect(115, sumTop, 80, 35, 3, 3, "F");
  doc.setLineWidth(0.3);
  doc.roundedRect(115, sumTop, 80, 35, 3, 3);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text("Subtotal:", 120, sumTop + 10);
  doc.text("GST (18%):", 120, sumTop + 18);

  doc.setFont("helvetica", "bold");
  doc.text("Total:", 120, sumTop + 26);

  // PERFECT RIGHT ALIGNMENT
  right(format(base), 190, sumTop + 10);
  right(format(gst), 190, sumTop + 18);
  doc.setFont("helvetica", "bold");
  right(format(total), 190, sumTop + 26);

  // ----------------- TERMS -----------------
  const termsTop = sumTop + 55;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Terms & Conditions", 15, termsTop);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  const terms =
    "1. Billing will follow Naukri Chahiye's employer policies.\n" +
    "2. Payments made are non-refundable unless required by law.\n" +
    "3. For clarifications, contact support within 7 days.";

  doc.text(doc.splitTextToSize(terms, 180), 15, termsTop + 6);

  // Signature
  const sigTop = 260;
  doc.line(150, sigTop, 195, sigTop);
  doc.text("Authorised Signatory", 172.5, sigTop + 5, { align: "center" });

  // Footer
  doc.setFontSize(8);
  doc.text(
    "This is a system-generated invoice from Naukri Chahiye.",
    15,
    290
  );

  doc.save(`invoice-${row.date.replaceAll("-", "")}.pdf`);
};




  return (
    <Box>
      <Typography
        sx={{
          fontSize: 26,
          fontWeight: 700,
          mb: 4,
          color: "#0f172a",
        }}
      >
        Billing Overview
      </Typography>

      <Card
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            mb: 3,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
              GSTIN and Registered Address
            </Typography>
            <Typography sx={{ color: "#64748b", fontSize: 14, mb: 2 }}>
              Manage your company&apos;s tax and registered address details.
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <DescriptionIcon
                sx={{ fontSize: 20, mr: 1, color: "#94a3b8" }}
              />
              <Typography
                sx={{ fontSize: 14, color: "#64748b", fontWeight: 500 }}
              >
                GSTIN Status
              </Typography>
            </Box>

            <Typography sx={{ fontSize: 14, color: "#0f172a" }}>
              Registered:{" "}
              <span style={{ fontWeight: 600 }}>{details.gstin}</span>
            </Typography>
          </Box>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <DescriptionIcon
                sx={{ fontSize: 20, mr: 1, color: "#94a3b8" }}
              />
              <Typography
                sx={{ fontSize: 14, color: "#64748b", fontWeight: 500 }}
              >
                Registered Address
              </Typography>
            </Box>

            {addressLines.map((line, idx) => (
              <Typography
                key={idx}
                sx={{ fontSize: 14, color: "#0f172a", lineHeight: 1.5 }}
              >
                {line}
              </Typography>
            ))}
          </Box>
        </Box>

        <Button
          variant="outlined"
          onClick={handleOpenEdit}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            py: 0.7,
          }}
        >
          Update Details
        </Button>
      </Card>

      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
        }}
      >
        <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
          Billing History
        </Typography>
        <Typography sx={{ color: "#64748b", fontSize: 14, mb: 2 }}>
          Review your past transactions and payment statuses.
        </Typography>

        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, fontSize: 14 }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 14 }}>
                  Plan
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 14 }}>
                  Expiry
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 14 }}>
                  Amount
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 14 }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 14 }}>
                  Invoice
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {billingRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: 14, color: "#0f172a" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <EventNoteIcon
                        sx={{ fontSize: 18, mr: 1, color: "#94a3b8" }}
                      />
                      {row.date}
                    </Box>
                  </TableCell>

                  <TableCell sx={{ fontSize: 14, color: "#0f172a" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <DescriptionIcon
                        sx={{ fontSize: 18, mr: 1, color: "#94a3b8" }}
                      />
                      {row.plan}
                    </Box>
                  </TableCell>

                  <TableCell sx={{ fontSize: 14, color: "#0f172a" }}>
                    {row.expiry}
                  </TableCell>

                  <TableCell sx={{ fontSize: 14, color: "#0f172a" }}>
                    {row.amount}
                  </TableCell>

                  <TableCell>{renderStatusChip(row.status)}</TableCell>

                  <TableCell>
                    <Button
  variant="outlined"
  size="small"
  sx={{
    textTransform: "none",
    borderRadius: 2,
    minWidth: 40,
    px: 1.5,
  }}
  endIcon={<DownloadOutlinedIcon sx={{ fontSize: 18 }} />}
  onClick={() => downloadInvoice(row)}
>
  Invoice
</Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Update Details</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                label="GSTIN"
                fullWidth
                value={form.gstin}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, gstin: e.target.value }))
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Office / Building"
                fullWidth
                value={form.office}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, office: e.target.value }))
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Street / Area"
                fullWidth
                value={form.street}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, street: e.target.value }))
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="City"
                fullWidth
                value={form.city}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, city: e.target.value }))
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="State"
                fullWidth
                value={form.state}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, state: e.target.value }))
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Pincode"
                fullWidth
                value={form.pincode}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, pincode: e.target.value }))
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={() => setEditOpen(false)}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveEdit}
            sx={{ textTransform: "none" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
