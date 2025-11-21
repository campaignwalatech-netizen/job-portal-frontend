import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
  Stack
} from '@mui/material';
import {
  Phone,
  Send,
  ArrowBack,
  Close,
  VerifiedUser,
  Refresh
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

// Mobile Input Modal
export const MobileInputModal = () => {
  const { authModal, tempUserType, handleMobileSubmit, closeAuthModal } = useAuth();
  const [mobile, setMobile] = useState('');
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
      handleMobileSubmit(mobile);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (authModal !== 'mobile') return null;

  return (
    <Dialog
      open={true}
      onClose={closeAuthModal}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0
        }}
      />
      
      <Box sx={{ p: 3, pb: 2, position: 'relative', zIndex: 1 }}>
        <IconButton
          onClick={closeAuthModal}
          sx={{ 
            position: 'absolute', 
            right: 12, 
            top: 12,
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.2)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.3)'
            }
          }}
        >
          <Close />
        </IconButton>
        
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
            }}
          >
            <Phone sx={{ fontSize: 30, color: '#667eea' }} />
          </Box>
          
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'white', mb: 1 }}>
            Enter Mobile Number
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            We'll send you a verification code
          </Typography>
        </Box>
      </Box>

      <DialogContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            p: 3,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
            Mobile Number
          </Typography>
          
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
                <InputAdornment 
                  position="start"
                  sx={{ 
                    mr: 1,
                    minWidth: 'auto'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      backgroundColor: '#f8f9fa',
                      borderRadius: 1,
                      px: 1.5,
                      py: 0.5,
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    {/* Indian Flag Emoji or you can use an actual flag image */}
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      🇮🇳
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      +91
                    </Typography>
                  </Box>
                </InputAdornment>
              ),
              sx: { 
                py: 1.5,
                pl: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea',
                  borderWidth: 2
                }
              }
            }}
            inputProps={{
              maxLength: 10,
              style: { 
                fontSize: '16px',
                fontWeight: 500,
                marginLeft: '8px'
              }
            }}
            sx={{ mb: 3 }}
          />

          <Alert 
            severity="info" 
            sx={{ 
              mb: 3, 
              fontSize: '0.875rem',
              borderRadius: 2,
              backgroundColor: '#e3f2fd',
              '& .MuiAlert-icon': {
                color: '#1976d2'
              }
            }}
          >
            Your number is safe with us. We use end-to-end encryption.
          </Alert>

          <Stack spacing={1.5}>
            <Button
              type="submit"
              variant="contained"
              loading={isLoading}
              disabled={mobile.length !== 10}
              startIcon={<Send />}
              fullWidth
              sx={{ 
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                fontSize: '16px',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                  transform: 'translateY(-1px)'
                },
                '&:disabled': {
                  background: 'grey.300',
                  boxShadow: 'none'
                }
              }}
            >
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// OTP Verification Modal - Also updated to match the new design
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
    <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', mb: 3 }}>
      {[...Array(6)].map((_, index) => (
        <Box
          key={index}
          sx={{
            width: 48,
            height: 56,
            border: 2,
            borderColor: value[index] ? 'primary.main' : 'grey.300',
            borderRadius: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.paper',
            transition: 'all 0.2s ease',
            '&:focus-within': {
              borderColor: 'primary.main',
              boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
              transform: 'scale(1.05)'
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
              fontSize: '18px',
              fontWeight: 600,
              outline: 'none',
              color: '#333'
            }}
            maxLength={1}
          />
        </Box>
      ))}
    </Box>
  );
};

export const OtpVerificationModal = () => {
  const { authModal, tempMobile, handleOtpVerify, closeAuthModal } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (authModal === 'otp' && timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [authModal, timer]);

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
        handleOtpVerify();
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

  if (authModal !== 'otp') return null;

  return (
    <Dialog
      open={true}
      onClose={closeAuthModal}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 70% 20%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0
        }}
      />
      
      <Box sx={{ p: 3, pb: 2, position: 'relative', zIndex: 1 }}>
        <IconButton
          onClick={closeAuthModal}
          sx={{ 
            position: 'absolute', 
            right: 12, 
            top: 12,
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.2)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.3)'
            }
          }}
        >
          <Close />
        </IconButton>
        
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
            }}
          >
            <VerifiedUser sx={{ fontSize: 30, color: '#667eea' }} />
          </Box>
          
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'white', mb: 1 }}>
            Verify OTP
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Enter code sent to +91 {tempMobile}
          </Typography>
        </Box>
      </Box>

      <DialogContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <Box 
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            p: 3,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}
        >
          <CustomOtpInput
            value={otp}
            onChange={handleOtpChange}
            inputRefs={inputRefs}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2, fontSize: '0.875rem' }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {timer > 0 ? (
                `Resend code in ${timer}s`
              ) : (
                <Button
                  onClick={handleResendOtp}
                  startIcon={<Refresh />}
                  size="small"
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  Resend Code
                </Button>
              )}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Demo: Use 123456 or any code starting with 1
            </Typography>
          </Box>

          <Stack spacing={1.5}>
            <Button
              variant="contained"
              onClick={handleVerify}
              disabled={isLoading || otp.join('').length !== 6}
              startIcon={<VerifiedUser />}
              fullWidth
              sx={{ 
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                fontSize: '16px',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </Button>
            
            <Button
              variant="outlined"
              onClick={closeAuthModal}
              startIcon={<ArrowBack />}
              fullWidth
              sx={{ 
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                borderColor: 'grey.300',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(102, 126, 234, 0.04)'
                }
              }}
            >
              Change Number
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

// Export all modals
export const AuthModals = () => {
  return (
    <>
      <MobileInputModal />
      <OtpVerificationModal />
    </>
  );
};