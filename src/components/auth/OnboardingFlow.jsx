import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import UserTypeModal from './UserTypeModal.jsx';
import MobileInputModal from './MobileInputModal.jsx';
import OtpVerificationModal from './OtpVerificationModal.jsx';

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(null);
  const { user, onboardingData, shouldRedirect, resetRedirect } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only show onboarding if user is not logged in
    if (!user) {
      setCurrentStep('userType');
    }
  }, [user]);

  useEffect(() => {
    // Handle redirection after onboarding completion
    if (shouldRedirect && user) {
      if (user.userType === 'employer') {
        navigate('/employer/dashboard');
      } else {
        navigate('/jobs');
      }
      resetRedirect();
    }
  }, [shouldRedirect, user, navigate, resetRedirect]);

  const handleUserTypeSelected = () => {
    setCurrentStep('mobileInput');
  };

  const handleMobileVerified = () => {
    setCurrentStep('otpVerification');
  };

  const handleOtpVerified = () => {
    setCurrentStep('complete');
  };

  const handleBackToUserType = () => {
    setCurrentStep('userType');
  };

  const handleClose = () => {
    setCurrentStep(null);
  };

  if (currentStep === null) return null;

  return (
    <>
      <UserTypeModal
        isOpen={currentStep === 'userType'}
        onClose={handleClose}
        onNext={handleUserTypeSelected}
      />

      <MobileInputModal
        isOpen={currentStep === 'mobileInput'}
        onClose={handleBackToUserType}
        onVerify={handleMobileVerified}
      />

      <OtpVerificationModal
        isOpen={currentStep === 'otpVerification'}
        onClose={handleBackToUserType}
        onSuccess={handleOtpVerified}
        mobile={onboardingData.mobile}
      />
    </>
  );
};

export default OnboardingFlow;