import { useState } from 'react';
import { useOnboarding } from '../../contexts/OnboardingContext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const EducationStep = ({ onNext, onBack }) => {
  const { onboardingData, addEducation, removeEducation } = useOnboarding();
  const { education } = onboardingData;

  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    field: '',
    startDate: '',
    endDate: '',
    currentlyStudying: false,
    grade: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (field) => (event) => {
    const value = field === 'currentlyStudying' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.degree.trim()) {
      errors.degree = 'Degree is required';
    }
    if (!formData.institution.trim()) {
      errors.institution = 'Institution is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddEducation = () => {
    if (!validateForm()) {
      return;
    }

    addEducation({ ...formData, id: Date.now() });
    setFormData({
      degree: '',
      institution: '',
      field: '',
      startDate: '',
      endDate: '',
      currentlyStudying: false,
      grade: ''
    });
    setFormErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Remove the HTML5 validation by using our custom validation
    if (education.length === 0) {
      // If no education added, show error but don't prevent form submission
      // Let the user decide if they want to proceed
      const shouldProceed = window.confirm(
        'You haven\'t added any education. Are you sure you want to continue?'
      );
      if (!shouldProceed) {
        return;
      }
    }
    
    onNext();
  };

  return (
    // Remove form validation by using noValidate
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Education Details
      </Typography>

      {/* Add Education Form */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          Add Education
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Degree/Course"
              value={formData.degree}
              onChange={handleChange('degree')}
              error={!!formErrors.degree}
              helperText={formErrors.degree}
              // REMOVE required attribute to avoid HTML5 validation
              placeholder="e.g., Bachelor of Technology"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Institution"
              value={formData.institution}
              onChange={handleChange('institution')}
              error={!!formErrors.institution}
              helperText={formErrors.institution}
              // REMOVE required attribute to avoid HTML5 validation
              placeholder="e.g., University of Delhi"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Field of Study"
              value={formData.field}
              onChange={handleChange('field')}
              placeholder="e.g., Computer Science"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Grade/Percentage"
              value={formData.grade}
              onChange={handleChange('grade')}
              placeholder="e.g., 8.5 CGPA"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Start Date"
              type="month"
              value={formData.startDate}
              onChange={handleChange('startDate')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="End Date"
              type="month"
              value={formData.endDate}
              onChange={handleChange('endDate')}
              InputLabelProps={{ shrink: true }}
              disabled={formData.currentlyStudying}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleAddEducation}
              disabled={!formData.degree || !formData.institution}
            >
              Add Education
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Education List */}
      {education.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            Your Education ({education.length})
          </Typography>
          {education.map((edu, index) => (
            <Card key={edu.id} sx={{ mb: 1 }}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {edu.degree}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu.institution} • {edu.field}
                  </Typography>
                  <Typography variant="caption">
                    {edu.startDate} - {edu.currentlyStudying ? 'Present' : edu.endDate}
                  </Typography>
                  {edu.grade && (
                    <Chip label={`Grade: ${edu.grade}`} size="small" sx={{ ml: 1 }} />
                  )}
                </Box>
                <IconButton onClick={() => removeEducation(index)} color="error">
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack}>
          Back
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          // Remove disabled to allow form submission even without education
          // disabled={education.length === 0}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default EducationStep;