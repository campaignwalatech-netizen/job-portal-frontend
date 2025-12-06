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
  const doc = new jsPDF("p", "mm", "a4"); // 210 x 297mm

  // --- Load & convert logo (SVG -> high-res PNG) ---
  const svgUrl = "/logo.svg";
  const img = new Image();
  img.src = svgUrl;
  await new Promise((resolve) => (img.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = img.width * 4;
  canvas.height = img.height * 4;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const pngLogo = canvas.toDataURL("image/png");

  // Helpers
  const parseAmount = (str) => {
    const num = parseFloat(str.replace(/[^\d.]/g, ""));
    return Number.isNaN(num) ? 0 : num;
  };

  const formatAmount = (num) => `₹ ${num.toLocaleString("en-IN")}`;

  const baseAmount = parseAmount(row.amount);
  const gstAmount = Math.round(baseAmount * 0.18);
  const totalAmount = baseAmount + gstAmount;

  const statusColors = {
    Success: { r: 22, g: 101, b: 52, br: 220, bg: 252, bb: 231 },
    Pending: { r: 146, g: 64, b: 14, br: 254, bg: 243, bb: 199 },
    Failed: { r: 185, g: 28, b: 28, br: 254, bg: 226, bb: 226 },
  };
  const sc = statusColors[row.status] || statusColors.Success;

  // ================= HEADER =================
  doc.addImage(pngLogo, "PNG", 16, 14, 26, 26);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Naukri Chahiye", 48, 24);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Employer Billing Invoice", 48, 31);

  // Invoice meta box (right top)
  doc.setLineWidth(0.3);
  doc.roundedRect(135, 14, 60, 28, 3, 3);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Invoice No.:", 140, 21);
  doc.setFont("helvetica", "bold");
  doc.text("INV-2025-0001", 162, 21);

  doc.setFont("helvetica", "normal");
  doc.text("Invoice Date:", 140, 28);
  doc.text(row.date, 162, 28);

  doc.text("Status:", 140, 35);

  // Status badge
  doc.setFillColor(sc.br, sc.bg, sc.bb);
  doc.roundedRect(160, 30, 30, 10, 2, 2, "F");
  doc.setTextColor(sc.r, sc.g, sc.b);
  doc.setFont("helvetica", "bold");
  doc.text(row.status, 175, 37, { align: "center" });
  doc.setTextColor(0, 0, 0);

  // Separator
  doc.setLineWidth(0.3);
  doc.line(15, 48, 195, 48);

  // ================= BILLING BLOCKS =================
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Billed From", 15, 58);
  doc.text("Billed To", 115, 58);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  // Company (placeholder)
  let y = 64;
  doc.text("Naukri Chahiye Pvt. Ltd.", 15, y);
  y += 5;
  doc.text("4th Floor, Tech Park", 15, y);
  y += 5;
  doc.text("Chennai, Tamil Nadu - 600000", 15, y);
  y += 5;
  doc.text("India", 15, y);
  y += 5;
  doc.text("GSTIN: 22AAAAA0000A1Z5", 15, y);
  y += 5;
  doc.text("support@naukrichahiye.com | +91-98765 43210", 15, y);

  // Billed To: from your billing details state
  let y2 = 64;
  doc.text("Registered Employer", 115, y2);
  y2 += 5;
  doc.text(`GSTIN: ${details.gstin}`, 115, y2);
  y2 += 5;
  doc.text(details.office, 115, y2);
  y2 += 5;
  doc.text(details.street, 115, y2);
  y2 += 5;
  doc.text(
    `${details.city}, ${details.state} - ${details.pincode}`,
    115,
    y2
  );

  // ================= ITEM TABLE =================
  const tableTop = 100;
  const colX = { desc: 15, qty: 120, price: 145, amount: 175 };

  // Header row background
  doc.setFillColor(248, 250, 252);
  doc.rect(15, tableTop, 180, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Description", colX.desc, tableTop + 5);
  doc.text("Qty", colX.qty, tableTop + 5);
  doc.text("Price", colX.price, tableTop + 5);
  doc.text("Amount", colX.amount, tableTop + 5);

  // Item row
  const rowTop = tableTop + 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // Description (wrap if long)
  const planLines = doc.splitTextToSize(row.plan, 100);
  doc.text(planLines, colX.desc, rowTop + 4);

  doc.text("1", colX.qty, rowTop + 4);
  doc.text(formatAmount(baseAmount), colX.price, rowTop + 4);
  doc.text(formatAmount(baseAmount), colX.amount, rowTop + 4);

  // Table borders
  doc.setLineWidth(0.2);
  doc.rect(15, tableTop, 180, 10 + planLines.length * 5);

  // ================= SUMMARY BOX =================
  const sumTop = rowTop + 20;
  const sumHeight = 26;
  const sumLeft = 125;
  const sumWidth = 70;

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(sumLeft, sumTop, sumWidth, sumHeight, 2, 2, "F");
  doc.setLineWidth(0.3);
  doc.roundedRect(sumLeft, sumTop, sumWidth, sumHeight, 2, 2);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text("Subtotal:", sumLeft + 5, sumTop + 8);
  doc.text(formatAmount(baseAmount), sumLeft + sumWidth - 5, sumTop + 8, {
    align: "right",
  });

  doc.text("GST (18%):", sumLeft + 5, sumTop + 14);
  doc.text(formatAmount(gstAmount), sumLeft + sumWidth - 5, sumTop + 14, {
    align: "right",
  });

  doc.setFont("helvetica", "bold");
  doc.text("Total:", sumLeft + 5, sumTop + 21);
  doc.text(formatAmount(totalAmount), sumLeft + sumWidth - 5, sumTop + 21, {
    align: "right",
  });

  // ================= TERMS & SIGNATURE =================
  const termsTop = sumTop + sumHeight + 15;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Terms & Conditions", 15, termsTop);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  const termsText =
    "1. This invoice is generated based on your Naukri Chahiye subscription.\n" +
    "2. Payments once made are non-refundable as per platform policy.\n" +
    "3. For any disputes or clarifications, please contact support within 7 days of invoice date.";
  const wrapped = doc.splitTextToSize(termsText, 180);
  doc.text(wrapped, 15, termsTop + 6);

  // Signature
  const sigTop = 260;
  doc.setLineWidth(0.2);
  doc.line(150, sigTop, 195, sigTop);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Authorised Signatory", 172.5, sigTop + 5, { align: "center" });

  // Footer
  doc.setFontSize(8);
  doc.text(
    "This is a system-generated invoice. No physical signature is required.",
    15,
    285
  );

  const filename = `invoice-${row.date.replaceAll("-", "")}.pdf`;
  doc.save(filename);
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
