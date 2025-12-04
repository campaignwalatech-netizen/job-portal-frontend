import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
  DialogActions,
  Box,
} from "@mui/material";

const MOCK_DOCS = [
  { id: "aadhaar", label: "Aadhaar Card" },
  { id: "pan", label: "PAN Card" },
  { id: "itr", label: "ITR Acknowledgment" },
  { id: "gst", label: "GST Certificate" },
];

export default function MockDigiLocker({ open, onClose, onSelect }) {
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    if (!open) setSelected(null);
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Mock DigiLocker</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 1, color: "#475569" }}>
          Select a document to return to the verification form
        </Box>
        <List>
          {MOCK_DOCS.map((d) => (
            <ListItem
              button
              key={d.id}
              selected={selected === d.id}
              onClick={() => setSelected(d.id)}
            >
              <ListItemText primary={d.label} />
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!selected}
          onClick={() => {
            const doc = MOCK_DOCS.find((m) => m.id === selected);
            onSelect({
              name: `${doc.label.replace(/\s+/g, "_")}.pdf`,
              size: 200000,
              type: "application/pdf",
              source: "digilocker",
              label: doc.label,
              number: "MOCK-12345",
            });
            onClose();
          }}
        >
          Use Selected
        </Button>
      </DialogActions>
    </Dialog>
  );
}
