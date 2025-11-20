import { useState } from 'react';
import { useOnboarding } from '../../contexts/OnboardingContext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Grid,
  Autocomplete,
  Alert
} from '@mui/material';
import { Add } from '@mui/icons-material';

const popularSkills = [
  'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'HTML', 'CSS',
  'TypeScript', 'Angular', 'Vue.js', 'PHP', 'MySQL', 'MongoDB',
  'AWS', 'Docker', 'Kubernetes', 'Git', 'REST API', 'GraphQL',
  'Machine Learning', 'Data Analysis', 'UI/UX Design', 'Project Management',
  'Agile Methodology', 'Scrum', 'Communication', 'Leadership', 'Problem Solving'
];

const SkillsStep = ({ onNext, onBack }) => {
  const { onboardingData, addSkill, removeSkill } = useOnboarding();
  const { skills } = onboardingData;

  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SkillsStep - Submitting, skills count:', skills.length);
    
    if (skills.length === 0) {
      alert('Please add at least one skill');
      return;
    }
    
    onNext();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Skills & Expertise
      </Typography>

      {/* Add Skills */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Autocomplete
            freeSolo
            options={popularSkills}
            value={newSkill}
            onChange={(event, newValue) => setNewSkill(newValue || '')}
            inputValue={newSkill}
            onInputChange={(event, newInputValue) => setNewSkill(newInputValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add your skills"
                onKeyPress={handleKeyPress}
                placeholder="Type a skill or select from popular ones"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
            fullWidth
            sx={{ height: '56px' }}
          >
            Add Skill
          </Button>
        </Grid>
      </Grid>

      {/* Skills List */}
      {skills.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Your Skills ({skills.length})
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => removeSkill(index)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Popular Skills Suggestions */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
          Popular Skills
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {popularSkills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              onClick={() => setNewSkill(skill)}
              variant={skills.includes(skill) ? "filled" : "outlined"}
              color={skills.includes(skill) ? "primary" : "default"}
            />
          ))}
        </Box>
      </Box>

      {/* Debug Info */}
      <Alert severity="info" sx={{ mb: 2 }}>
        Skills added: {skills.length} | {skills.length >= 3 ? 'Ready to continue!' : 'Add at least 3 skills'}
      </Alert>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack}>
          Back
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          disabled={skills.length === 0}
        >
          Continue to Resume
        </Button>
      </Box>
    </Box>
  );
};

export default SkillsStep;