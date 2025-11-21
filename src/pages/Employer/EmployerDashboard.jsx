import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Alert
} from '@mui/material';
import {
  Business,
  LocationOn,
  Description
} from '@mui/icons-material';

const steps = ['Company Info', 'Business Details', 'Complete'];

const EmployerOnboarding = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    companyType: '',
    industry: '',
    companySize: '',
    website: '',
    foundedYear: '',
    description: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const { completeProfile, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is not logged in or is not an employer
    if (!user) {
      navigate('/');
      return;
    }
    
    if (user.userType !== 'employer') {
      navigate('/onboarding');
      return;
    }
  }, [user, navigate]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Complete profile and redirect to employer dashboard
      console.log('Completing employer profile...');
      completeProfile();
      navigate('/employer/dashboard');
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                value={formData.companyName}
                onChange={handleChange('companyName')}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Type"
                select
                value={formData.companyType}
                onChange={handleChange('companyType')}
                required
                SelectProps={{ native: true }}
              >
                <option value=""></option>
                <option value="private">Private Limited</option>
                <option value="public">Public Limited</option>
                <option value="llp">LLP</option>
                <option value="proprietorship">Proprietorship</option>
                <option value="partnership">Partnership</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Industry"
                value={formData.industry}
                onChange={handleChange('industry')}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Size"
                select
                value={formData.companySize}
                onChange={handleChange('companySize')}
                required
                SelectProps={{ native: true }}
              >
                <option value=""></option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Website"
                value={formData.website}
                onChange={handleChange('website')}
              />
            </Grid>
          </Grid>
        );
      
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Founded Year"
                type="number"
                value={formData.foundedYear}
                onChange={handleChange('foundedYear')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange('description')}
                placeholder="Tell us about your company..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={formData.address}
                onChange={handleChange('address')}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="City"
                value={formData.city}
                onChange={handleChange('city')}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="State"
                value={formData.state}
                onChange={handleChange('state')}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Pincode"
                value={formData.pincode}
                onChange={handleChange('pincode')}
                required
              />
            </Grid>
          </Grid>
        );
      
      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Business sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Ready to Start Hiring!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Your company profile is complete. You can now post jobs and start finding the best talent.
            </Typography>
            <Alert severity="success" sx={{ mb: 3 }}>
              Your profile is 100% complete and ready to use.
            </Alert>
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
            <Business sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Company Profile Setup
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Complete your company profile to start hiring talent
          </Typography>
        </Box>

        {/* Progress Stepper */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Step Content */}
        <Paper sx={{ p: 4 }}>
          {getStepContent(activeStep)}
          
          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Finish Setup' : 'Continue'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default EmployerOnboarding;