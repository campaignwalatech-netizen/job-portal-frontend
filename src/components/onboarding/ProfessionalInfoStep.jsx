import { useState } from 'react';
import { useOnboarding } from '../../contexts/OnboardingContext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem
} from '@mui/material';

const ProfessionalInfoStep = ({ onNext, onBack }) => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const { professionalInfo } = onboardingData;

  const [formData, setFormData] = useState(professionalInfo);

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOnboardingData('professionalInfo', formData);
    onNext();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Professional Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Current Job Title"
            value={formData.currentTitle}
            onChange={handleChange('currentTitle')}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Total Experience"
            select
            value={formData.totalExperience}
            onChange={handleChange('totalExperience')}
            required
          >
            <MenuItem value="0-1">0-1 years</MenuItem>
            <MenuItem value="1-3">1-3 years</MenuItem>
            <MenuItem value="3-5">3-5 years</MenuItem>
            <MenuItem value="5-8">5-8 years</MenuItem>
            <MenuItem value="8-10">8-10 years</MenuItem>
            <MenuItem value="10+">10+ years</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Current Company"
            value={formData.currentCompany}
            onChange={handleChange('currentCompany')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Current Salary (₹)"
            type="number"
            value={formData.currentSalary}
            onChange={handleChange('currentSalary')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Expected Salary (₹)"
            type="number"
            value={formData.expectedSalary}
            onChange={handleChange('expectedSalary')}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Notice Period"
            select
            value={formData.noticePeriod}
            onChange={handleChange('noticePeriod')}
            required
          >
            <MenuItem value="15">15 days</MenuItem>
            <MenuItem value="30">30 days</MenuItem>
            <MenuItem value="60">60 days</MenuItem>
            <MenuItem value="90">90 days</MenuItem>
            <MenuItem value="immediate">Immediate</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="contained">
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default ProfessionalInfoStep;