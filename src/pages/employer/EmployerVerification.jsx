import React from "react";
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import MockDigiLocker from "../../components/Employer/dashboard/MiniDigiLocker";
import DashboardHeader from "../../components/Employer/dashboard/dashboardheader";
import { useNavigate } from "react-router-dom";

const COMPANY_DOCS = [
  "Certificate of Incorporation (CoI)",
  "Memorandum of Association (MoA)",
  "Articles of Association (AoA)",
  "Company PAN Card",
  "Registered Office Address Proof",
  "Director Identification Number (DIN) Documents",
  "Digital Signature Certificate (DSC) Documents",
  "GST Registration Certificate (GSTIN)",
  "TAN Registration Certificate",
  "Audited Financial Statements",
  "Income Tax Return (ITR) Acknowledgment",
  "TDS/TCS Return Filing Acknowledgment",
  "Import Export Code (IEC)",
  "Shop and Establishment License",
  "FSSAI License",
  "EPFO Registration Certificate",
  "ESIC Registration Certificate",
  "MSME/Udyam Registration Certificate",
  "Fire Safety Certificate",
  "Environmental Clearances",
  "Board Meeting Minutes",
  "General Meeting Minutes (AGM/EGM)",
  "Statutory Registers",
  "Share Allotment/Transfer Deeds",
];

const PERSONAL_DOCS = [
  "Offer Letter",
  "Appointment Letter",
  "Employment Contract",
  "Non-Disclosure Agreement (NDA)",
  "Aadhaar Card Copy (Employee KYC)",
  "PAN Card Copy (Employee KYC & Tax)",
  "Bank Account Details / Cancelled Cheque",
  "Background Verification Report",
  "Form 16",
  "Salary/Pay Slips",
  "EPF Nomination Form (Form 2)",
  "EPF Declaration Form (Form 11)",
  "ESIC Declaration Form",
  "Gratuity Nomination Form (Form F)",
  "Leave Records / Leave Cards",
  "Attendance Records",
  "Performance Appraisal Documents",
  "Medical/Fitness Certificate",
  "Resignation/Termination Letter",
  "Exit Interview Form",
  "Full and Final Settlement Document",
];

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
];

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export default function EmployerVerification() {
  const navigate = useNavigate();

  // Company card state
  const [companyDocType, setCompanyDocType] = React.useState("");
  const [companyNumber, setCompanyNumber] = React.useState("");
  const [companyFile, setCompanyFile] = React.useState(null);

  // Personal card state
  const [personalDocType, setPersonalDocType] = React.useState("");
  const [personalNumber, setPersonalNumber] = React.useState("");
  const [personalFile, setPersonalFile] = React.useState(null);

  const [digilockerOpen, setDigilockerOpen] = React.useState(false);

  // UI
  const [snack, setSnack] = React.useState({ open: false, severity: "success", message: "" });
  const [submitting, setSubmitting] = React.useState(false);

  // ---------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------
  const validateFile = (file) => {
    if (!file) return "No file";
    if (!ACCEPTED_TYPES.includes(file.type))
      return "Invalid file type. Allowed: pdf, png, jpg, jpeg";
    if (file.size > MAX_BYTES) return "File is larger than 10 MB";
    return null;
  };

  const onChooseFile = (e, target) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const err = validateFile(f);
    if (err) {
      setSnack({ open: true, severity: "error", message: err });
      return;
    }

    const fileObj = {
      name: f.name,
      size: f.size,
      type: f.type,
      origin: "local",
      file: f,
    };

    if (target === "company") setCompanyFile(fileObj);
    else setPersonalFile(fileObj);
  };

  const removeFile = (target) => {
    if (target === "company") setCompanyFile(null);
    else setPersonalFile(null);
  };

  const handleDigilockerSelect = (doc) => {
    // Fill personal area with mock digilocker data
    setPersonalFile({
      name: doc.name,
      size: doc.size,
      type: doc.type,
      origin: doc.source || "digilocker",
    });
    // If doc.label exists, set type accordingly
    if (doc.label) setPersonalDocType(doc.label);
    if (doc.number) setPersonalNumber(doc.number);
    setSnack({ open: true, severity: "info", message: "Selected from DigiLocker" });
  };

  // ---------------------------------------------------------------------
  // Submit logic -> mock backend upload
  // ---------------------------------------------------------------------
  const mockUpload = async (payload) => {
    // simulate upload latency
    return new Promise((res) => {
      setTimeout(() => {
        res({ status: "ok", uploaded: true, id: "VER_" + Date.now() });
      }, 900);
    });
  };

  const handleSubmit = async () => {
    // basic validation
    if (!companyDocType || !companyNumber || !companyFile) {
      setSnack({ open: true, severity: "error", message: "Complete Company document section" });
      return;
    }
    if (!personalDocType || !personalNumber || !personalFile) {
      setSnack({ open: true, severity: "error", message: "Complete Personal document section" });
      return;
    }

    // validate file sizes/types again
    let err = validateFile(companyFile.file || companyFile);
    if (err) {
      setSnack({ open: true, severity: "error", message: "Company file: " + err });
      return;
    }
    err = validateFile(personalFile.file || personalFile);
    if (err) {
      setSnack({ open: true, severity: "error", message: "Personal file: " + err });
      return;
    }

    setSubmitting(true);

    // mock multi-part: prepare payload (we keep files in state, here we simulate an upload)
    const payload = {
      company: {
        docType: companyDocType,
        number: companyNumber,
        fileName: companyFile.name,
        origin: companyFile.origin || "local",
      },
      personal: {
        docType: personalDocType,
        number: personalNumber,
        fileName: personalFile.name,
        origin: personalFile.origin || "local",
      },
    };

    try {
      const res = await mockUpload(payload);
      if (res?.status === "ok") {
        setSnack({ open: true, severity: "success", message: "Documents submitted for verification" });
        // auto redirect to dashboard home after short delay
        setTimeout(() => {
          navigate("/employer/dashboard");
        }, 1400);
      } else {
        setSnack({ open: true, severity: "error", message: "Upload failed (mock)" });
      }
    } catch (e) {
      setSnack({ open: true, severity: "error", message: "Unexpected error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#fbfdff" }}>
      <DashboardHeader />

      <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
        <Typography sx={{ fontSize: 26, fontWeight: 700, mb: 3 }}>Company Verification</Typography>

        {/* Company Documents Card */}
        <Paper
          elevation={0}
          sx={{
            background: "#e9edf2",
            borderRadius: 2,
            p: { xs: 2, md: 3 },
            mb: 4,
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 1 }}>Company Documents</Typography>
          <Typography sx={{ color: "#6b7280", mb: 2, fontSize: 14 }}>
            Upload Company Documents for verification
          </Typography>

          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="company-doc-label">Select Document Type</InputLabel>
              <Select
                labelId="company-doc-label"
                value={companyDocType}
                label="Select Document Type"
                onChange={(e) => setCompanyDocType(e.target.value)}
              >
                <MenuItem value="">-- Select --</MenuItem>
                {COMPANY_DOCS.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <TextField
                placeholder="enter number e.g 765464568"
                value={companyNumber}
                onChange={(e) => setCompanyNumber(e.target.value)}
                fullWidth
              />

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <input
                  id="company-file"
                  type="file"
                  accept=".pdf,image/png,image/jpeg,image/jpg"
                  style={{ display: "none" }}
                  onChange={(e) => onChooseFile(e, "company")}
                />
                <label htmlFor="company-file">
                  <IconButton component="span" color="primary">
                    <UploadFileIcon />
                  </IconButton>
                </label>

                {companyFile && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      background: "#fff",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      border: "1px solid #E6EEF8",
                    }}
                  >
                    <Typography sx={{ fontSize: 13 }}>{companyFile.name}</Typography>
                    <IconButton size="small" onClick={() => removeFile("company")}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Box>
          </Stack>
        </Paper>

        {/* Personal Documents Card */}
        <Paper
          elevation={0}
          sx={{
            background: "#e9edf2",
            borderRadius: 2,
            p: { xs: 2, md: 3 },
            mb: 4,
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 1 }}>Personal Documents</Typography>
          <Typography sx={{ color: "#6b7280", mb: 2, fontSize: 14 }}>
            Upload your Documents for verification
          </Typography>

          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="personal-doc-label">Select Document Type</InputLabel>
              <Select
                labelId="personal-doc-label"
                value={personalDocType}
                label="Select Document Type"
                onChange={(e) => setPersonalDocType(e.target.value)}
              >
                <MenuItem value="">-- Select --</MenuItem>
                {PERSONAL_DOCS.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <TextField
                placeholder="enter number e.g 765464568"
                value={personalNumber}
                onChange={(e) => setPersonalNumber(e.target.value)}
                fullWidth
              />

              <Button
                variant="contained"
                sx={{ background: "#14b866", textTransform: "none", ml: 0 }}
                onClick={() => setDigilockerOpen(true)}
              >
                Use Digilocker to verify
              </Button>
            </Box>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <input
                id="personal-file"
                type="file"
                accept=".pdf,image/png,image/jpeg,image/jpg"
                style={{ display: "none" }}
                onChange={(e) => onChooseFile(e, "personal")}
              />
              <label htmlFor="personal-file">
                <IconButton component="span" color="primary">
                  <UploadFileIcon />
                </IconButton>
              </label>

              {personalFile && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    background: "#fff",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    border: "1px solid #E6EEF8",
                  }}
                >
                  <Typography sx={{ fontSize: 13 }}>{personalFile.name}</Typography>
                  <IconButton size="small" onClick={() => removeFile("personal")}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Stack>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg,#3b82f6,#8b5cf6)",
              textTransform: "none",
              borderRadius: 2,
              px: 3,
            }}
            onClick={handleSubmit}
            disabled={submitting}
          >
            Submit For Verification
          </Button>
        </Box>
      </Box>

      <MockDigiLocker
        open={digilockerOpen}
        onClose={() => setDigilockerOpen(false)}
        onSelect={handleDigilockerSelect}
      />

      <Snackbar
        open={snack.open}
        autoHideDuration={2200}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          sx={{ width: "100%", fontWeight: 600 }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
