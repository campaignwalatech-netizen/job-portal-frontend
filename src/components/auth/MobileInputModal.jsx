import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Alert
} from '@mui/material';
import {
  Phone,
  Send,
  ArrowBack
} from '@mui/icons-material';

const MobileInputModal = ({ isOpen, onClose, onVerify }) => {
  const { onboardingData, updateOnboardingData } = useAuth();
  const [mobile, setMobile] = useState(onboardingData.mobile || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateMobile = (number) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateMobile(mobile)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateOnboardingData({ mobile });
      onVerify();
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2
        }
      }}
    >
      {/* Custom header - NO DialogTitle */}
      <Box sx={{ p: 2, pb: 1, textAlign: 'center' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            fontSize: '1.25rem',
            mb: 1
          }}
        >
          Enter Mobile Number
        </Typography>
        <Typography variant="body2" color="text.secondary">
          We'll send you a verification code
        </Typography>
      </Box>

      <DialogContent sx={{ p: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter mobile number"
            variant="outlined"
            error={!!error}
            helperText={error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="action" />
                </InputAdornment>
              ),
              sx: { py: 1 }
            }}
            inputProps={{
              maxLength: 10,
              style: { fontSize: '14px' }
            }}
            sx={{ mb: 2 }}
          />

          <Alert severity="info" sx={{ mb: 2, fontSize: '0.875rem' }}>
            Your number is safe with us. We use encryption.
          </Alert>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || mobile.length !== 10}
              startIcon={<Send />}
              fullWidth
              sx={{ py: 1 }}
            >
              {isLoading ? 'Sending...' : 'Send Code'}
            </Button>
            
            <Button
              variant="outlined"
              onClick={onClose}
              startIcon={<ArrowBack />}
              fullWidth
              sx={{ py: 0.5 }}
            >
              Back
            </Button>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
            By continuing, you agree to our Terms and Privacy Policy
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MobileInputModal;