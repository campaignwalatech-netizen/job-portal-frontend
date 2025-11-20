import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Alert
} from '@mui/material';
import {
  VerifiedUser,
  ArrowBack,
  Refresh,
  Sms
} from '@mui/icons-material';

const CustomOtpInput = ({ value, onChange, inputRefs }) => {
  const handleInputChange = (val, index) => {
    if (/^\d?$/.test(val)) {
      onChange(val, index);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 2 }}>
      {[...Array(6)].map((_, index) => (
        <Box
          key={index}
          sx={{
            width: 40,
            height: 48,
            border: 1,
            borderColor: value[index] ? 'primary.main' : 'grey.400',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.paper',
            '&:focus-within': {
              borderColor: 'primary.main',
              borderWidth: 2
            }
          }}
        >
          <input
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            value={value[index]}
            onChange={(e) => handleInputChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: 'transparent',
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 500,
              outline: 'none'
            }}
            maxLength={1}
          />
        </Box>
      ))}
    </Box>
  );
};

const OtpVerificationModal = ({ isOpen, onClose, onSuccess, mobile }) => {
  const { completeOnboarding } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen && timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [isOpen, timer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 10);
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otpString.startsWith('1') || otpString === '123456') {
        completeOnboarding({
          id: Date.now(),
          name: 'New User',
          joinedAt: new Date().toISOString()
        });
        onSuccess();
      } else {
        setError('Invalid code. Use 123456 for demo.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    setTimer(30);
    setError('');
    setOtp(['', '', '', '', '', '']);
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 10);
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
          <Sms color="primary" />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              fontSize: '1.25rem'
            }}
          >
            Verify OTP
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Enter code sent to +91 {mobile}
        </Typography>
      </Box>

      <DialogContent sx={{ p: 2 }}>
        <Box sx={{ textAlign: 'center' }}>
          <CustomOtpInput
            value={otp}
            onChange={handleOtpChange}
            inputRefs={inputRefs}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2, fontSize: '0.875rem' }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {timer > 0 ? (
                `Resend code in ${timer}s`
              ) : (
                <Button
                  onClick={handleResendOtp}
                  startIcon={<Refresh />}
                  size="small"
                  sx={{ textTransform: 'none' }}
                >
                  Resend Code
                </Button>
              )}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Demo: Use 123456
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleVerify}
              disabled={isLoading || otp.join('').length !== 6}
              startIcon={<VerifiedUser />}
              fullWidth
              sx={{ py: 1 }}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
            
            <Button
              variant="outlined"
              onClick={onClose}
              startIcon={<ArrowBack />}
              fullWidth
              sx={{ py: 0.5 }}
            >
              Change Number
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OtpVerificationModal;