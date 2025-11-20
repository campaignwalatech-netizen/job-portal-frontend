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
import { Add, Delete, School } from '@mui/icons-material';

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

  const handleChange = (field) => (event) => {
    const value = field === 'currentlyStudying' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddEducation = () => {
    if (formData.degree && formData.institution) {
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
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
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Institution"
              value={formData.institution}
              onChange={handleChange('institution')}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Field of Study"
              value={formData.field}
              onChange={handleChange('field')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Grade/Percentage"
              value={formData.grade}
              onChange={handleChange('grade')}
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
            Your Education
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
        <Button type="submit" variant="contained" disabled={education.length === 0}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default EducationStep;