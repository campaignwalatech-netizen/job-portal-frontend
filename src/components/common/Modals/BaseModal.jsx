import { Dialog, Box, Typography } from '@mui/material';

export const BaseModal = ({ 
  open, 
  onClose, 
  title, 
  subtitle, 
  children, 
  maxWidth = "xs" 
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth={maxWidth}
    fullWidth
    PaperProps={{
      sx: { borderRadius: 2 }
    }}
  >
    {/* Custom Header */}
    <Box sx={{ p: 2, pb: 1, textAlign: 'center' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.25rem', mb: 1 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>

    {children}
  </Dialog>
);