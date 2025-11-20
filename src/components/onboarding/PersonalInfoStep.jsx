import { useState } from 'react';
import { useOnboarding } from '../../contexts/OnboardingContext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const PersonalInfoStep = ({ onNext }) => {
  const { onboardingData, updateOnboardingData, setProfilePhoto } = useOnboarding();
  const { personalInfo } = onboardingData;

  const [formData, setFormData] = useState(personalInfo);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOnboardingData('personalInfo', formData);
    onNext();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Personal Information
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Photo */}
        <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              src={photoPreview}
              sx={{ width: 120, height: 120, mb: 2 }}
            />
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
              size="small"
              sx={{ position: 'absolute', bottom: 10, right: -10 }}
            >
              Upload
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </Button>
          </Box>
          <Typography variant="caption" color="text.secondary">
            Upload a professional photo
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange('fullName')}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange('phone')}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Current Location"
            value={formData.location}
            onChange={handleChange('location')}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange('dateOfBirth')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Gender"
            select
            value={formData.gender}
            onChange={handleChange('gender')}
            SelectProps={{ native: true }}
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </TextField>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained" size="large">
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalInfoStep;