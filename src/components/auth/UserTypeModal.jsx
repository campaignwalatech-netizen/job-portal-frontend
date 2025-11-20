import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid
} from '@mui/material';
import {
  Person,
  Business,
  Check
} from '@mui/icons-material';

const UserTypeModal = ({ isOpen, onClose, onNext }) => {
  const { updateOnboardingData } = useAuth();
  const [selectedType, setSelectedType] = useState('');

  const userTypes = [
    {
      id: 'job_seeker',
      title: 'Job Seeker',
      icon: <Person sx={{ fontSize: 32 }} />,
      description: 'Looking for your dream job',
      features: ['Browse jobs', 'Apply easily', 'Track applications'],
      color: '#1976d2'
    },
    {
      id: 'employer',
      title: 'Employer',
      icon: <Business sx={{ fontSize: 32 }} />,
      description: 'Hiring talent for your company',
      features: ['Post jobs', 'Manage applications', 'Find candidates'],
      color: '#2e7d32'
    }
  ];

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      updateOnboardingData({ userType: selectedType });
      onNext();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh'
        }
      }}
    >
      {/* Custom header - NO DialogTitle */}
      <Box sx={{ p: 3, pb: 1, textAlign: 'center' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            fontSize: '1.25rem',
            mb: 1
          }}
        >
          Welcome to JobPortal
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Choose how you want to use our platform
        </Typography>
      </Box>

      <DialogContent sx={{ p: 3, pt: 0 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {userTypes.map((type) => (
            <Grid item xs={12} md={6} key={type.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  border: selectedType === type.id ? `2px solid ${type.color}` : '1px solid #e0e0e0',
                  bgcolor: selectedType === type.id ? 'action.hover' : 'background.paper',
                  height: '100%',
                  '&:hover': {
                    borderColor: type.color
                  }
                }}
                onClick={() => handleSelect(type.id)}
              >
                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                  <Box sx={{ color: type.color, mb: 1 }}>
                    {type.icon}
                  </Box>
                  
                  <Typography 
                    variant="subtitle1" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600, 
                      color: type.color, 
                      fontSize: '1.1rem' 
                    }}
                  >
                    {type.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    gutterBottom 
                    sx={{ mb: 2, fontSize: '0.875rem' }}
                  >
                    {type.description}
                  </Typography>

                  <Box sx={{ textAlign: 'left' }}>
                    {type.features.map((feature, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Check sx={{ fontSize: 16, color: type.color, mr: 1 }} />
                        <Typography variant="caption" sx={{ color: 'text.primary' }}>
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {selectedType === type.id && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: type.color
                      }}
                    >
                      <Check sx={{ fontSize: 20 }} />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            variant="contained"
            onClick={handleContinue}
            disabled={!selectedType}
            fullWidth
            sx={{ py: 1 }}
          >
            Continue
          </Button>
          
          <Button
            variant="text"
            onClick={onClose}
            fullWidth
            sx={{ py: 0.5 }}
          >
            Maybe Later
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UserTypeModal;