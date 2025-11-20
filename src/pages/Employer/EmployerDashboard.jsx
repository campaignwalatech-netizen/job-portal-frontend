import { 
    Container, 
    Typography, 
    Box, 
    Card, 
    CardContent, 
    Button,
    Grid,
    Stepper,
    Step,
    StepLabel,
    Paper
  } from '@mui/material';
  import {
    Business,
    PostAdd,
    Group,
    Dashboard
  } from '@mui/icons-material';
  
  const steps = ['Company Profile', 'Post First Job', 'Setup Payments', 'Go Live'];
  
  const EmployerDashboard = () => {
    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Business sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                  Employer Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Complete your setup to start hiring
                </Typography>
              </Box>
            </Box>
            
            {/* Onboarding Progress */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Setup Progress
              </Typography>
              <Stepper activeStep={1} alternativeLabel sx={{ mt: 3 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </Box>
  
          {/* Quick Actions */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <PostAdd sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Post a Job
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Create your first job posting to attract talent
                  </Typography>
                  <Button variant="contained" fullWidth>
                    Post Job
                  </Button>
                </CardContent>
              </Card>
            </Grid>
  
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Group sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Company Profile
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Setup your company information and branding
                  </Typography>
                  <Button variant="outlined" fullWidth>
                    Setup Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
  
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Dashboard sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    View Analytics
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Track your hiring performance and metrics
                  </Typography>
                  <Button variant="outlined" fullWidth>
                    View Stats
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
  
          {/* Recent Activity */}
          <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Getting Started
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                Complete your company profile to build trust with candidates
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                Post detailed job descriptions to attract quality applicants
              </Typography>
              <Typography component="li" variant="body1">
                Setup interview scheduling to streamline your hiring process
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  };
  
  export default EmployerDashboard;