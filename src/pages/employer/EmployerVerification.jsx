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
  Divider,
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

const MAX_BYTES = 10 * 1024 * 1024;


export default function EmployerVerification() {
  const navigate = useNavigate();

  const [companyDocType, setCompanyDocType] = React.useState("");
  const [companyNumber, setCompanyNumber] = React.useState("");
  const [companyFile, setCompanyFile] = React.useState(null);

  const [personalDocType, setPersonalDocType] = React.useState("");
  const [personalNumber, setPersonalNumber] = React.useState("");
  const [personalFile, setPersonalFile] = React.useState(null);

  const [snack, setSnack] = React.useState({
    open: false,
    severity: "success",
    message: "",
  });

  const [digilockerOpen, setDigilockerOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type))
      return "Invalid file type. Allowed: pdf, png, jpg, jpeg";

    if (file.size > MAX_BYTES) return "File size must be less than 10MB";

    return null;
  };

  const onChooseFile = (e, type) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const err = validateFile(f);
    if (err) {
      setSnack({ open: true, severity: "error", message: err });
      return;
    }

    const fileObject = {
      name: f.name,
      type: f.type,
      size: f.size,
      origin: "local",
      file: f,
    };

    if (type === "company") setCompanyFile(fileObject);
    else setPersonalFile(fileObject);
  };

  const removeFile = (type) => {
    if (type === "company") setCompanyFile(null);
    else setPersonalFile(null);
  };
  const handleDigilockerSelect = (doc) => {
    setPersonalFile({
      name: doc.name,
      type: doc.type,
      size: doc.size,
      origin: "digilocker",
    });

    setPersonalDocType(doc.label);
    setPersonalNumber(doc.number);

    setSnack({
      open: true,
      severity: "info",
      message: "Selected from DigiLocker",
    });
  };
  const mockUpload = async (payload) => {
    return new Promise((res) =>
      setTimeout(() => res({ ok: true }), 1000)
    );
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
      company: { companyDocType, companyNumber, file: companyFile.name },
      personal: { personalDocType, personalNumber, file: personalFile.name },
    };

    const res = await mockUpload(payload);

    if (res.ok) {
      setSnack({
        open: true,
        severity: "success",
        message: "Documents submitted successfully!",
      });

      setTimeout(() => navigate("/employer/dashboard"), 1500);
    }

    setSubmitting(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f6f9fe" }}>
      <DashboardHeader />

      <Box
        sx={{
          maxWidth: "960px",
          margin: "0 auto",
          px: { xs: 2, md: 3 },
          py: { xs: 4, md: 5 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 26, md: 32 },
            fontWeight: 700,
            mb: 4,
            color: "#0b2149",
          }}
        >
          Company Verification
        </Typography>

        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: "14px",
            background: "#ffffff",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>
            Company Documents
          </Typography>
          <Typography sx={{ color: "#64748b", mb: 3 }}>
            Upload Company documents for verification
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
                placeholder="Enter document number"
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
                  <IconButton
                    component="span"
                    color="primary"
                    sx={{
                      background: "#e7f1ff",
                      p: 1.4,
                      borderRadius: "10px",
                    }}
                  >
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
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  background: "#f1f5ff",
                  border: "1px solid #d0ddff",
                }}
              >
                <Typography sx={{ fontSize: 14 }}>{companyFile.name}</Typography>
                <IconButton size="small" onClick={() => removeFile("company")}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Stack>
        </Paper>
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: "14px",
            background: "#ffffff",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 0.5 }}>
            Personal Documents
          </Typography>
          <Typography sx={{ color: "#64748b", mb: 3 }}>
            Upload employee documents for verification
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
                placeholder="Enter document number"
                value={personalNumber}
                onChange={(e) => setPersonalNumber(e.target.value)}
                fullWidth
              />

              <Button
                variant="contained"
                sx={{
                  background: "#14b866",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2.5,
                  py: 1,
                  borderRadius: "8px",
                }}
                onClick={() => setDigilockerOpen(true)}
              >
                Use DigiLocker
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
                <IconButton
                  component="span"
                  color="primary"
                  sx={{
                    background: "#e7f1ff",
                    p: 1.4,
                    borderRadius: "10px",
                  }}
                >
                  <UploadFileIcon />
                </IconButton>
              </label>

              {personalFile && (
                <Box
                  sx={{
                    mt: 1.5,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    background: "#f1f5ff",
                    border: "1px solid #d0ddff",
                  }}
                >
                  <Typography sx={{ fontSize: 14 }}>
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

        {/* SUBMIT BUTTON */}
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            disabled={submitting}
            onClick={handleSubmit}
            sx={{
              background: "linear-gradient(90deg,#3b82f6,#6d5bff)",
              textTransform: "none",
              fontWeight: 600,
              px: 4,
              py: 1.4,
              borderRadius: "10px",
            }}
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
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.severity}
          sx={{ width: "100%", fontWeight: 600 }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
