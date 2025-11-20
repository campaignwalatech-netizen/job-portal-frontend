import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Stepper, 
  Step, 
  StepLabel,
  Button,
  Paper
} from '@mui/material';
import {
  Person,
  Work,
  School,
  Build,
  Description,
  Favorite
} from '@mui/icons-material';
import PersonalInfoStep from '../../components/onboarding/PersonalInfoStep';
import ProfessionalInfoStep from '../../components/onboarding/ProfessionalInfoStep';
import EducationStep from '../../components/onboarding/EducationStep';
import ExperienceStep from '../../components/onboarding/EducationStep';
import SkillsStep from '../../components/onboarding/SkillsStep';
import ResumeStep from '../../components/onboarding/ResumeStep';
import PreferencesStep from '../../components/onboarding/EducationStep';

const steps = [
  { label: 'Personal Info', icon: <Person /> },
  { label: 'Professional Info', icon: <Work /> },
  { label: 'Education', icon: <School /> },
  { label: 'Experience', icon: <Work /> },
  { label: 'Skills', icon: <Build /> },
  { label: 'Resume', icon: <Description /> },
  { label: 'Preferences', icon: <Favorite /> }
];

const EmployeeOnboarding = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalInfoStep onNext={handleNext} />;
      case 1:
        return <ProfessionalInfoStep onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <EducationStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <ExperienceStep onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <SkillsStep onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <ResumeStep onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <PreferencesStep onComplete={handleNext} onBack={handleBack} />;
      default:
        return 'Unknown step';
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
              <Step key={step.label}>
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

        {/* Progress Indicator */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Step {activeStep + 1} of {steps.length}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default EmployeeOnboarding;