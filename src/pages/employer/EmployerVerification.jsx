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
import DashboardHeader from "../../components/Employer/dashboard/dashboardheader";
import MockDigiLocker from "../../components/Employer/dashboard/MiniDigiLocker";
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

const MAX_BYTES = 10 * 1024 * 1024;

export default function EmployerVerification() {
  const navigate = useNavigate();

  const [companyDocType, setCompanyDocType] = React.useState("");
  const [companyNumber, setCompanyNumber] = React.useState("");
  const [companyFile, setCompanyFile] = React.useState(null);

  const [personalDocType, setPersonalDocType] = React.useState("");
  const [personalNumber, setPersonalNumber] = React.useState("");
  const [personalFile, setPersonalFile] = React.useState(null);

  const [digilockerOpen, setDigilockerOpen] = React.useState(false);

  const [snack, setSnack] = React.useState({
    open: false,
    severity: "success",
    message: "",
  });

  const [submitting, setSubmitting] = React.useState(false);

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type))
      return "Invalid file type. Allowed: pdf, png, jpg, jpeg";

    if (file.size > MAX_BYTES) return "File size must be less than 10MB";

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

  const removeFile = (type) => {
    if (type === "company") setCompanyFile(null);
    else setPersonalFile(null);
  };

  const handleDigilockerSelect = (doc) => {
    setPersonalDocType(doc.label);
    setPersonalNumber(doc.number);
    setPersonalFile({
      name: doc.name,
      size: doc.size,
      type: doc.type,
      origin: "digilocker",
    });

    setSnack({
      open: true,
      severity: "info",
      message: "Selected from DigiLocker",
    });
  };

  const mockUpload = async (payload) => {
    return new Promise((res) => setTimeout(() => res({ status: "ok" }), 900));
  };

  const handleSubmit = async () => {
    if (!companyDocType || !companyNumber || !companyFile) {
      setSnack({
        open: true,
        severity: "error",
        message: "Complete Company Document section",
      });
      return;
    }

    if (!personalDocType || !personalNumber || !personalFile) {
      setSnack({
        open: true,
        severity: "error",
        message: "Complete Personal Document section",
      });
      return;
    }

    setSubmitting(true);

    const payload = {
      company: {
        docType: companyDocType,
        number: companyNumber,
        fileName: companyFile.name,
      },
      personal: {
        docType: personalDocType,
        number: personalNumber,
        fileName: personalFile.name,
      },
    };

    const res = await mockUpload(payload);

    if (res?.status === "ok") {
      setSnack({
        open: true,
        severity: "success",
        message: "Documents submitted successfully",
      });

      setTimeout(() => navigate("/employer/dashboard"), 1400);
    }

    setSubmitting(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f9fbff" }}>
      <DashboardHeader />

      <Box
        sx={{
          px: { xs: 2, md: 8 },
          py: { xs: 3, md: 5 },
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 700,
            mb: 4,
            color: "#0b2236",
          }}
        >
          Company Verification
        </Typography>

        {/* COMPANY DOCUMENTS */}
        <Paper
          elevation={0}
          sx={{
            background: "#eff3f9",
            borderRadius: "14px",
            p: { xs: 2.5, md: 3 },
            mb: 4,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Company Documents
          </Typography>
          <Typography sx={{ color: "#6b7280", mb: 3, mt: 0.5, fontSize: 14 }}>
            Upload Company Documents for verification
          </Typography>

          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Select Document Type</InputLabel>
              <Select
                label="Select Document Type"
                value={companyDocType}
                onChange={(e) => setCompanyDocType(e.target.value)}
              >
                <MenuItem value="">-- Select --</MenuItem>
                {COMPANY_DOCS.map((doc) => (
                  <MenuItem key={doc} value={doc}>
                    {doc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
                gap: 2,
                alignItems: "center",
              }}
            >
              <TextField
                placeholder="enter number e.g 765464568"
                value={companyNumber}
                onChange={(e) => setCompanyNumber(e.target.value)}
                fullWidth
              />

              <Box>
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
              </Box>
            </Box>

            {companyFile && (
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  background: "#fff",
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  border: "1px solid #dbe3ee",
                }}
              >
                <Typography sx={{ fontSize: 13 }}>
                  {companyFile.name}
                </Typography>
                <IconButton size="small" onClick={() => removeFile("company")}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Stack>
        </Paper>

        {/* PERSONAL DOCUMENTS */}
        <Paper
          elevation={0}
          sx={{
            background: "#eff3f9",
            borderRadius: "14px",
            p: { xs: 2.5, md: 3 },
            mb: 4,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
            Personal Documents
          </Typography>
          <Typography sx={{ color: "#6b7280", mb: 3, mt: 0.5, fontSize: 14 }}>
            Upload your Documents for verification
          </Typography>

          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Select Document Type</InputLabel>
              <Select
                label="Select Document Type"
                value={personalDocType}
                onChange={(e) => setPersonalDocType(e.target.value)}
              >
                <MenuItem value="">-- Select --</MenuItem>
                {PERSONAL_DOCS.map((doc) => (
                  <MenuItem key={doc} value={doc}>
                    {doc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr auto" },
                gap: 2,
                alignItems: "center",
              }}
            >
              <TextField
                placeholder="enter number e.g 765464568"
                value={personalNumber}
                onChange={(e) => setPersonalNumber(e.target.value)}
                fullWidth
              />

              <Button
                variant="contained"
                sx={{
                  background: "#14b866",
                  textTransform: "none",
                  px: 2,
                }}
                onClick={() => setDigilockerOpen(true)}
              >
                Use Digilocker to verify
              </Button>
            </Box>

            <Box>
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
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    background: "#fff",
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    border: "1px solid #dbe3ee",
                  }}
                >
                  <Typography sx={{ fontSize: 13 }}>
                    {personalFile.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => removeFile("personal")}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Stack>
        </Paper>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg,#3b82f6,#8b5cf6)",
              textTransform: "none",
              borderRadius: "10px",
              px: 4,
              py: 1.3,
            }}
            disabled={submitting}
            onClick={handleSubmit}
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
