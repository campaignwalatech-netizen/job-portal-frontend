import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BaseModal } from '../common/Modals/BaseModal';
import { PrimaryButton } from '../common/Buttons/PrimaryButton';
import { SecondaryButton } from '../common/Buttons/SecondaryButton';
import { TextField, Box, Alert, InputAdornment } from '@mui/material';
import { Phone, Send, ArrowBack } from '@mui/icons-material';

const MobileInputModal = ({ isOpen, onClose, onVerify }) => {
  const { onboardingData, updateOnboardingData } = useAuth();
  const [mobile, setMobile] = useState(onboardingData.mobile || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateMobile = (number) => /^[6-9]\d{9}$/.test(number);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateMobile(mobile)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
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
    <BaseModal
      open={isOpen}
      onClose={onClose}
      title="Enter Mobile Number"
      subtitle="We'll send you a verification code"
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
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
          <PrimaryButton
            type="submit"
            loading={isLoading}
            disabled={mobile.length !== 10}
            startIcon={<Send />}
            fullWidth
          >
            Send Code
          </PrimaryButton>
          
          <SecondaryButton
            onClick={onClose}
            startIcon={<ArrowBack />}
            fullWidth
          >
            Back
          </SecondaryButton>
        </Box>
      </Box>
    </BaseModal>
  );
};

export default MobileInputModal;