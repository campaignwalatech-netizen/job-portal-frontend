import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useOnboarding } from '../../contexts/OnboardingContext';
import { 
  Container, 
  Typography, 
  Box, 
  Stepper, 
  Step, 
  StepLabel,
  Paper,
  Button,
  Alert
} from '@mui/material';
import {
  Person,
  Work,
  School,
  Build,
  Description
} from '@mui/icons-material';

// Import your step components
import PersonalInfoStep from '../../components/onboarding/PersonalInfoStep';
import ProfessionalInfoStep from '../../components/onboarding/ProfessionalInfoStep';
import EducationStep from '../../components/onboarding/EducationStep';
import SkillsStep from '../../components/onboarding/SkillsStep';
import ResumeStep from '../../components/onboarding/ResumeStep';

const steps = [
  { label: 'Personal Info', icon: <Person />, key: 'personal' },
  { label: 'Professional Info', icon: <Work />, key: 'professional' },
  { label: 'Education', icon: <School />, key: 'education' },
  { label: 'Skills', icon: <Build />, key: 'skills' },
  { label: 'Resume', icon: <Description />, key: 'resume' }
];

const EmployeeOnboarding = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { completeProfile, user } = useAuth();
  const { onboardingData } = useOnboarding();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is not logged in or is not a job seeker
    if (!user) {
      navigate('/');
      return;
    }
    
    if (user.userType !== 'employee') {
      navigate('/employer/onboarding');
      return;
    }
  }, [user, navigate]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Last step - complete profile and redirect to job seeker dashboard
      console.log('Completing employee profile...');
      completeProfile();
      navigate('/jobseeker/dashboard');
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleStepComplete = () => {
    handleNext();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalInfoStep onNext={handleStepComplete} />;
      case 1:
        return <ProfessionalInfoStep onNext={handleStepComplete} onBack={handleBack} />;
      case 2:
        return <EducationStep onNext={handleStepComplete} onBack={handleBack} />;
      case 3:
        return <SkillsStep onNext={handleStepComplete} onBack={handleBack} />;
      case 4:
        return <ResumeStep onNext={handleStepComplete} onBack={handleBack} />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Complete Your Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Let's build your professional profile to help you find the best job opportunities
          </Typography>
        </Box>

        {/* Progress Stepper */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={step.key}>
                <StepLabel 
                  icon={step.icon}
                  sx={{
                    '& .MuiStepLabel-label': {
                      fontSize: '0.875rem',
                      fontWeight: activeStep === index ? 600 : 400
                    }
                  }}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Step Content */}
        <Paper sx={{ p: 4 }}>
          {getStepContent(activeStep)}
        </Paper>
      </Container>
    </Box>
  );
};

export default EmployeeOnboarding;