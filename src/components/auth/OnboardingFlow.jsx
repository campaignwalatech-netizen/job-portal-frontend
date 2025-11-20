import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserTypeModal from './UserTypeModal';
import MobileInputModal from './MobileInputModal';
import OtpVerificationModal from './OtpVerificationModal';

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(null);
  const { user, isProfileComplete, onboardingData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only show initial onboarding modals for new users (not logged in)
    if (!user) {
      setCurrentStep('userType');
    }
    // For logged-in users with incomplete profiles, they'll be redirected via routes
  }, [user, isProfileComplete, navigate]);

  const handleUserTypeSelected = () => {
    setCurrentStep('mobileInput');
  };

  const handleMobileVerified = () => {
    setCurrentStep('otpVerification');
  };

  const handleOtpVerified = () => {
    setCurrentStep(null);
    // After OTP verification, user is created but profile is not complete
    // They will be redirected to appropriate onboarding form via App.js routing
  };

  const handleBackToUserType = () => {
    setCurrentStep('userType');
  };

  const handleClose = () => {
    setCurrentStep(null);
  };

  // Don't show modals if user exists (they'll be redirected via routes)
  if (user) {
    return null;
  }

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