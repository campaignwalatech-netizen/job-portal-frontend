import { useState, useEffect } from 'react';
import { useOnboarding } from '../../contexts/OnboardingContext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Paper,
  IconButton,
  MenuItem,
  Alert,
  LinearProgress,
  Tooltip,
  Fade,
  Slide,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge
} from '@mui/material';
import {
  PhotoCamera,
  Edit,
  Save,
  Cancel,
  Add,
  Delete,
  School,
  Work,
  Build,
  CheckCircle,
  Warning,
  Info,
  Upload,
  LinkedIn,
  GitHub,
  Language,
  LocationOn,
  Email,
  Phone,
  CalendarToday,
  Business,
  AttachMoney,
  Schedule,
  Star,
  StarBorder,
  Visibility,
  VisibilityOff,
  CloudUpload,
  Description
} from '@mui/icons-material';

const ProfileForm = () => {
  const { onboardingData, updateOnboardingData, addEducation, removeEducation, addExperience, removeExperience, addSkill, removeSkill, setProfilePhoto, setResume } = useOnboarding();
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [formData, setFormData] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [resumeUploading, setResumeUploading] = useState(false);

  const popularSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'Java',
    'HTML5', 'CSS3', 'AWS', 'Docker', 'Kubernetes', 'Git',
    'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'REST API',
    'Machine Learning', 'Data Analysis', 'UI/UX Design',
    'Project Management', 'Agile', 'Scrum', 'Communication',
    'Leadership', 'Problem Solving', 'Team Management'
  ];

  // Initialize formData with onboardingData, ensuring no undefined values
  useEffect(() => {
    if (onboardingData) {
      setFormData({
        personalInfo: onboardingData.personalInfo || {},
        professionalInfo: onboardingData.professionalInfo || {},
        education: onboardingData.education || [],
        experience: onboardingData.experience || [],
        skills: onboardingData.skills || [],
        resume: onboardingData.resume || null,
        profilePhoto: onboardingData.profilePhoto || null,
        ...onboardingData
      });
    }
  }, [onboardingData]);

  // Safe calculateProfileCompletion function
  const calculateProfileCompletion = () => {
    const sections = {
      personalInfo: 20,
      professionalInfo: 20,
      education: 15,
      experience: 20,
      skills: 15,
      resume: 10
    };

    let totalScore = 0;

    Object.entries(sections).forEach(([key, weight]) => {
      const section = formData[key];
      
      if (!section) {
        return; // Skip if section doesn't exist
      }

      if (Array.isArray(section)) {
        // For arrays (education, experience, skills)
        totalScore += section.length > 0 ? weight : 0;
      } else if (typeof section === 'object') {
        // For objects (personalInfo, professionalInfo)
        const filledFields = Object.values(section).filter(value => 
          value !== null && value !== undefined && value.toString().trim() !== ''
        ).length;
        const totalFields = Object.keys(section).length;
        
        if (totalFields > 0) {
          totalScore += (filledFields / totalFields) * weight;
        }
      } else {
        // For simple values (resume)
        totalScore += section ? weight : 0;
      }
    });

    return Math.min(Math.round(totalScore), 100);
  };

  const profileCompletion = calculateProfileCompletion();

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'error';
  };

  // Safe section completion calculation
  const calculateSectionCompletion = (sectionKey) => {
    const section = formData[sectionKey];
    if (!section || typeof section !== 'object') return 0;
    
    const filled = Object.values(section).filter(value => 
      value !== null && value !== undefined && value.toString().trim() !== ''
    ).length;
    const total = Object.keys(section).length;
    
    return total > 0 ? Math.round((filled / total) * 100) : 0;
  };

  const handleChange = (section, field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}), // Ensure section exists
        [field]: event.target.value
      }
    }));
  };

  const handleArrayChange = (section, index, field) => (event) => {
    const updatedArray = [...formData[section]];
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: event.target.value
    };
    setFormData(prev => ({
      ...prev,
      [section]: updatedArray
    }));
  };

  // Missing function: handlePhotoUpload
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB');
        return;
      }
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Missing function: handleResumeUpload
  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['.pdf', '.doc', '.docx'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      if (!allowedTypes.includes(fileExtension)) {
        alert('Please upload a PDF or Word document');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      setResumeUploading(true);
      // Simulate upload process
      setTimeout(() => {
        setResume(file);
        setResumeUploading(false);
      }, 1500);
    }
  };

  // Missing function: handleSave
  const handleSave = () => {
    Object.keys(formData).forEach(section => {
      if (typeof formData[section] === 'object' && !Array.isArray(formData[section])) {
        updateOnboardingData(section, formData[section]);
      }
    });
    setIsEditing(false);
    localStorage.setItem('profileComplete', 'true');
  };

  // Missing function: handleCancel
  const handleCancel = () => {
    setFormData(onboardingData);
    setIsEditing(false);
  };

  // Missing function: handleAddEducation
  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now(),
      degree: '',
      institution: '',
      field: '',
      startDate: '',
      endDate: '',
      currentlyStudying: false,
      grade: ''
    };
    addEducation(newEducation);
  };

  // Missing function: handleAddExperience
  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: '',
      location: ''
    };
    addExperience(newExperience);
  };

  // Missing function: handleAddSkill
  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      addSkill(newSkill.trim());
      setNewSkill('');
      setSkillDialogOpen(false);
    }
  };

  // Missing function: handleQuickSkillAdd
  const handleQuickSkillAdd = (skill) => {
    if (!formData.skills.includes(skill)) {
      addSkill(skill);
    }
  };

  // Define sections for navigation
  const sections = [
    { 
      id: 'personal', 
      label: 'Personal Info', 
      icon: <Edit />,
      description: 'Basic personal information',
      completion: calculateSectionCompletion('personalInfo')
    },
    { 
      id: 'professional', 
      label: 'Professional', 
      icon: <Work />,
      description: 'Career and work details',
      completion: calculateSectionCompletion('professionalInfo')
    },
    { 
      id: 'education', 
      label: 'Education', 
      icon: <School />,
      description: 'Academic background',
      completion: formData.education?.length > 0 ? 100 : 0
    },
    { 
      id: 'experience', 
      label: 'Experience', 
      icon: <Work />,
      description: 'Work experience history',
      completion: formData.experience?.length > 0 ? 100 : 0
    },
    { 
      id: 'skills', 
      label: 'Skills', 
      icon: <Build />,
      description: 'Technical and soft skills',
      completion: formData.skills?.length > 0 ? 100 : 0
    },
    { 
      id: 'resume', 
      label: 'Resume', 
      icon: <Description />,
      description: 'Upload your resume',
      completion: formData.resume ? 100 : 0
    }
  ];

  return (
    <Box sx={{ maxWidth: 1400, margin: '0 auto', p: { xs: 2, md: 4 } }}>
      {/* Header with Profile Completion */}
      <Slide in={true} direction="down" timeout={800}>
        <Card sx={{ 
          mb: 4, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <CardContent sx={{ p: 4, position: 'relative' }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                  <Box sx={{ position: 'relative' }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <Tooltip title="Change Photo">
                          <IconButton
                            component="label"
                            sx={{
                              bgcolor: 'white',
                              color: 'primary.main',
                              '&:hover': { bgcolor: 'grey.100' },
                              width: 32,
                              height: 32
                            }}
                          >
                            <PhotoCamera />
                            <input
                              type="file"
                              hidden
                              accept="image/*"
                              onChange={handlePhotoUpload}
                            />
                          </IconButton>
                        </Tooltip>
                      }
                    >
                      <Avatar
                        src={photoPreview || (formData.profilePhoto ? URL.createObjectURL(formData.profilePhoto) : null)}
                        sx={{ 
                          width: 120, 
                          height: 120,
                          border: '4px solid rgba(255,255,255,0.3)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }}
                      />
                    </Badge>
                  </Box>
                  <Box>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
                      {formData.personalInfo?.fullName || 'Your Name'}
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ opacity: 0.9, mb: 2 }}>
                      {formData.professionalInfo?.currentTitle || 'Professional Title'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {formData.personalInfo?.location && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOn sx={{ fontSize: 20 }} />
                          <Typography variant="body1">{formData.personalInfo.location}</Typography>
                        </Box>
                      )}
                      {formData.personalInfo?.email && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Email sx={{ fontSize: 20 }} />
                          <Typography variant="body1">{formData.personalInfo.email}</Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                  <Box sx={{ display: 'inline-block', textAlign: 'left' }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                      Profile Completion
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={profileCompletion} 
                          color={getCompletionColor(profileCompletion)}
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: 'rgba(255,255,255,0.3)'
                          }}
                        />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, minWidth: 60 }}>
                        {profileCompletion}%
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      {profileCompletion >= 80 ? '🎉 Excellent! Your profile looks great' :
                       profileCompletion >= 60 ? '👍 Good start, keep going' :
                       '💪 Complete your profile for better opportunities'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Edit/Save buttons */}
            <Fade in={true} timeout={1000}>
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                {!isEditing ? (
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => setIsEditing(true)}
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        bgcolor: 'grey.100',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSave}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5
                      }}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        px: 4,
                        py: 1.5
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Box>
            </Fade>
          </CardContent>
        </Card>
      </Slide>

      <Grid container spacing={4}>
        {/* Enhanced Navigation */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ 
            p: 3, 
            position: 'sticky', 
            top: 100,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 3
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              📋 Profile Sections
            </Typography>
            <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {sections.map((section) => (
                <ListItem
                  key={section.id}
                  button
                  onClick={() => setActiveSection(section.id)}
                  sx={{
                    borderRadius: 2,
                    bgcolor: activeSection === section.id ? 'primary.main' : 'transparent',
                    color: activeSection === section.id ? 'white' : 'text.primary',
                    mb: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: activeSection === section.id ? 'primary.dark' : 'action.hover',
                      transform: 'translateX(4px)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: activeSection === section.id ? 'white' : 'primary.main',
                    minWidth: 40
                  }}>
                    {section.completion === 100 ? <CheckCircle color="success" /> : section.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {section.label}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography variant="caption" sx={{ opacity: 0.8 }}>
                            {section.completion}%
                          </Typography>
                          {section.completion === 100 && <CheckCircle sx={{ fontSize: 16 }} />}
                        </Box>
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" sx={{ 
                        opacity: activeSection === section.id ? 0.9 : 0.7,
                        fontSize: '0.75rem'
                      }}>
                        {section.description}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>

            {/* Quick Stats */}
            <Box sx={{ mt: 4, p: 2, bgcolor: 'white', borderRadius: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                📊 Quick Stats
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption">Education</Typography>
                  <Typography variant="caption" fontWeight="600">
                    {formData.education?.length || 0}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption">Experience</Typography>
                  <Typography variant="caption" fontWeight="600">
                    {formData.experience?.length || 0}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption">Skills</Typography>
                  <Typography variant="caption" fontWeight="600">
                    {formData.skills?.length || 0}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Enhanced Content Area */}
        <Grid item xs={12} md={9}>
          <Zoom in={true} timeout={500}>
            <Box>
              {activeSection === 'personal' && (
                <PersonalInfoSection 
                  formData={formData} 
                  onChange={handleChange}
                  isEditing={isEditing}
                />
              )}

              {activeSection === 'professional' && (
                <ProfessionalInfoSection 
                  formData={formData} 
                  onChange={handleChange}
                  isEditing={isEditing}
                />
              )}

              {activeSection === 'education' && (
                <EducationSection 
                  formData={formData}
                  onAdd={handleAddEducation}
                  onRemove={removeEducation}
                  onChange={handleArrayChange}
                  isEditing={isEditing}
                />
              )}

              {activeSection === 'experience' && (
                <ExperienceSection 
                  formData={formData}
                  onAdd={handleAddExperience}
                  onRemove={removeExperience}
                  onChange={handleArrayChange}
                  isEditing={isEditing}
                />
              )}

              {activeSection === 'skills' && (
                <SkillsSection 
                  formData={formData}
                  onAdd={() => setSkillDialogOpen(true)}
                  onRemove={removeSkill}
                  onQuickAdd={handleQuickSkillAdd}
                  popularSkills={popularSkills}
                  isEditing={isEditing}
                />
              )}

              {activeSection === 'resume' && (
                <ResumeSection 
                  formData={formData}
                  onUpload={handleResumeUpload}
                  uploading={resumeUploading}
                  isEditing={isEditing}
                />
              )}
            </Box>
          </Zoom>
        </Grid>
      </Grid>

      {/* Skill Selection Dialog */}
      <Dialog 
        open={skillDialogOpen} 
        onClose={() => setSkillDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Add Skills
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Enter skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            sx={{ mb: 3 }}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
          />
          
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            Popular Skills
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {popularSkills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onClick={() => handleQuickSkillAdd(skill)}
                variant={formData.skills?.includes(skill) ? "filled" : "outlined"}
                color={formData.skills?.includes(skill) ? "primary" : "default"}
                clickable
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSkillDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
          >
            Add Skill
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Enhanced Sub-components with better design
const PersonalInfoSection = ({ formData, onChange, isEditing }) => (
  <Card sx={{ mb: 3 }}>
    <CardContent sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box sx={{ 
          width: 4, 
          height: 24, 
          bgcolor: 'primary.main', 
          borderRadius: 2 
        }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Personal Information
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Full Name"
            value={formData.personalInfo?.fullName || ''}
            onChange={onChange('personalInfo', 'fullName')}
            disabled={!isEditing}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1, color: 'text.secondary' }}>👤</Typography>,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={formData.personalInfo?.email || ''}
            onChange={onChange('personalInfo', 'email')}
            disabled={!isEditing}
            InputProps={{
              startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone Number"
            value={formData.personalInfo?.phone || ''}
            onChange={onChange('personalInfo', 'phone')}
            disabled={!isEditing}
            InputProps={{
              startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Current Location"
            value={formData.personalInfo?.location || ''}
            onChange={onChange('personalInfo', 'location')}
            disabled={!isEditing}
            InputProps={{
              startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            value={formData.personalInfo?.dateOfBirth || ''}
            onChange={onChange('personalInfo', 'dateOfBirth')}
            InputLabelProps={{ shrink: true }}
            disabled={!isEditing}
            InputProps={{
              startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Gender"
            select
            value={formData.personalInfo?.gender || ''}
            onChange={onChange('personalInfo', 'gender')}
            disabled={!isEditing}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
            <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const ProfessionalInfoSection = ({ formData, onChange, isEditing }) => (
  <Card sx={{ mb: 3 }}>
    <CardContent sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box sx={{ 
          width: 4, 
          height: 24, 
          bgcolor: 'secondary.main', 
          borderRadius: 2 
        }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Professional Information
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Current Job Title"
            value={formData.professionalInfo?.currentTitle || ''}
            onChange={onChange('professionalInfo', 'currentTitle')}
            disabled={!isEditing}
            InputProps={{
              startAdornment: <Work sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Total Experience"
            select
            value={formData.professionalInfo?.totalExperience || ''}
            onChange={onChange('professionalInfo', 'totalExperience')}
            disabled={!isEditing}
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
            value={formData.professionalInfo?.currentCompany || ''}
            onChange={onChange('professionalInfo', 'currentCompany')}
            disabled={!isEditing}
            InputProps={{
              startAdornment: <Business sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Current Salary (₹)"
            type="number"
            value={formData.professionalInfo?.currentSalary || ''}
            onChange={onChange('professionalInfo', 'currentSalary')}
            disabled={!isEditing}
            InputProps={{
              startAdornment: <AttachMoney sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Expected Salary (₹)"
            type="number"
            value={formData.professionalInfo?.expectedSalary || ''}
            onChange={onChange('professionalInfo', 'expectedSalary')}
            disabled={!isEditing}
            InputProps={{
              startAdornment: <AttachMoney sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Notice Period"
            select
            value={formData.professionalInfo?.noticePeriod || ''}
            onChange={onChange('professionalInfo', 'noticePeriod')}
            disabled={!isEditing}
            InputProps={{
              startAdornment: <Schedule sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          >
            <MenuItem value="15">15 days</MenuItem>
            <MenuItem value="30">30 days</MenuItem>
            <MenuItem value="60">60 days</MenuItem>
            <MenuItem value="90">90 days</MenuItem>
            <MenuItem value="immediate">Immediate</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

// Enhanced Education Section
const EducationSection = ({ formData, onAdd, onRemove, onChange, isEditing }) => (
  <Card sx={{ mb: 3 }}>
    <CardContent sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ 
            width: 4, 
            height: 24, 
            bgcolor: 'info.main', 
            borderRadius: 2 
          }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Education
          </Typography>
        </Box>
        {isEditing && (
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={onAdd}
            sx={{ borderRadius: 2 }}
          >
            Add Education
          </Button>
        )}
      </Box>

      {(!formData.education || formData.education.length === 0) ? (
        <Paper sx={{ p: 6, textAlign: 'center', bgcolor: 'grey.50' }}>
          <School sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Education Added
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add your educational background to showcase your qualifications
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {formData.education?.map((edu, index) => (
            <Paper 
              key={edu.id} 
              sx={{ 
                p: 3, 
                position: 'relative',
                border: '2px solid',
                borderColor: 'grey.100',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.light',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }
              }}
            >
              {isEditing && (
                <Tooltip title="Remove Education">
                  <IconButton
                    sx={{ 
                      position: 'absolute', 
                      top: 16, 
                      right: 16,
                      bgcolor: 'error.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'error.dark' }
                    }}
                    onClick={() => onRemove(index)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Degree/Course"
                    value={edu.degree || ''}
                    onChange={onChange('education', index, 'degree')}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Institution"
                    value={edu.institution || ''}
                    onChange={onChange('education', index, 'institution')}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Field of Study"
                    value={edu.field || ''}
                    onChange={onChange('education', index, 'field')}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Grade/Percentage"
                    value={edu.grade || ''}
                    onChange={onChange('education', index, 'grade')}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="month"
                    value={edu.startDate || ''}
                    onChange={onChange('education', index, 'startDate')}
                    InputLabelProps={{ shrink: true }}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    type="month"
                    value={edu.endDate || ''}
                    onChange={onChange('education', index, 'endDate')}
                    InputLabelProps={{ shrink: true }}
                    disabled={!isEditing || edu.currentlyStudying}
                  />
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
      )}
    </CardContent>
  </Card>
);

// Enhanced Skills Section
const SkillsSection = ({ formData, onAdd, onRemove, onQuickAdd, popularSkills, isEditing }) => (
  <Card sx={{ mb: 3 }}>
    <CardContent sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ 
            width: 4, 
            height: 24, 
            bgcolor: 'warning.main', 
            borderRadius: 2 
          }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Skills & Expertise
          </Typography>
        </Box>
        {isEditing && (
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={onAdd}
            sx={{ borderRadius: 2 }}
          >
            Add Skill
          </Button>
        )}
      </Box>

      {(!formData.skills || formData.skills.length === 0) ? (
        <Paper sx={{ p: 6, textAlign: 'center', bgcolor: 'grey.50' }}>
          <Build sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Skills Added
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Add your skills to help employers discover you
          </Typography>
          {isEditing && (
            <Button variant="contained" onClick={onAdd}>
              Add Your First Skill
            </Button>
          )}
        </Paper>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 4 }}>
            {formData.skills?.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={isEditing ? () => onRemove(index) : undefined}
                color="primary"
                variant="filled"
                sx={{ 
                  fontSize: '0.95rem', 
                  py: 2,
                  fontWeight: 600,
                  '& .MuiChip-deleteIcon': {
                    color: 'white',
                    '&:hover': { color: 'grey.300' }
                  }
                }}
              />
            ))}
          </Box>

          {isEditing && (
            <Paper sx={{ p: 3, bgcolor: 'primary.50' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                💡 Quick Add Popular Skills
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {popularSkills.slice(0, 12).map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onClick={() => onQuickAdd(skill)}
                    variant={formData.skills?.includes(skill) ? "filled" : "outlined"}
                    color={formData.skills?.includes(skill) ? "primary" : "default"}
                    clickable
                    sx={{ 
                      transition: 'all 0.2s ease',
                      '&:hover': { transform: 'translateY(-1px)' }
                    }}
                  />
                ))}
              </Box>
            </Paper>
          )}
        </>
      )}
    </CardContent>
  </Card>
);

// New Resume Section
const ResumeSection = ({ formData, onUpload, uploading, isEditing }) => (
  <Card sx={{ mb: 3 }}>
    <CardContent sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box sx={{ 
          width: 4, 
          height: 24, 
          bgcolor: 'success.main', 
          borderRadius: 2 
        }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Resume
        </Typography>
      </Box>

      {formData.resume ? (
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'success.50' }}>
          <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Resume Uploaded Successfully!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {formData.resume.name} • {(formData.resume.size / 1024 / 1024).toFixed(2)} MB
          </Typography>
          {isEditing && (
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
            >
              Replace Resume
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={onUpload}
              />
            </Button>
          )}
        </Paper>
      ) : (
        <Paper sx={{ p: 6, textAlign: 'center', border: '2px dashed', borderColor: 'grey.300' }}>
          <Description sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Upload Your Resume
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Upload your resume to help employers discover you. We support PDF and Word documents.
          </Typography>
          {isEditing && (
            <>
              <Button
                variant="contained"
                component="label"
                startIcon={uploading ? <></> : <CloudUpload />}
                disabled={uploading}
                sx={{ mb: 2 }}
              >
                {uploading ? (
                  <>
                    <Box sx={{ 
                      width: 16, 
                      height: 16, 
                      border: '2px solid', 
                      borderColor: 'transparent', 
                      borderTop: '2px solid', 
                      borderRadius: '50%', 
                      animation: 'spin 1s linear infinite',
                      mr: 1 
                    }} />
                    Uploading...
                  </>
                ) : (
                  'Choose File'
                )}
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={onUpload}
                />
              </Button>
              <Typography variant="caption" color="text.secondary" display="block">
                Max file size: 5MB • Supported formats: PDF, DOC, DOCX
              </Typography>
            </>
          )}
        </Paper>
      )}
    </CardContent>
  </Card>
);

export default ProfileForm;