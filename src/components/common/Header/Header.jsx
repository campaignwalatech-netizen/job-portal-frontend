import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  Chip,
  Popover,
  MenuItem,
  Grid,
  Divider
} from '@mui/material';
import {
  Work,
  Business,
  Logout,
  Person,
  KeyboardArrowDown
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // State for dropdown menus
  const [jobTypeAnchor, setJobTypeAnchor] = useState(null);
  const [campusAnchor, setCampusAnchor] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDashboard = () => {
    if (user.userType === 'employer') {
      navigate('/employer/dashboard');
    } else {
      navigate('/jobseeker/dashboard');
    }
  };

  // Job Type hover handlers
  const handleJobTypeOpen = (event) => {
    setJobTypeAnchor(event.currentTarget);
  };

  const handleJobTypeClose = () => {
    setJobTypeAnchor(null);
  };

  // Career Campus hover handlers
  const handleCampusOpen = (event) => {
    setCampusAnchor(event.currentTarget);
  };

  const handleCampusClose = () => {
    setCampusAnchor(null);
  };

  // Handle employee login navigation
  const handleEmployeeLogin = () => {
    navigate('/employee-login');
  };

  // Handle employer login navigation
  const handleEmployerLogin = () => {
    navigate('/employer-login');
  };

  return (
    <AppBar position="static" elevation={1} sx={{ bgcolor: 'white', color: 'text.primary' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Left Section: Logo + Navigation Items */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
              <Work sx={{ fontSize: 24, color: 'primary.main' }} />
              <Typography variant="h6" component="h1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Naukari Chahiye
              </Typography>
            </Box>

            {/* Navigation Items - Only show if user is not logged in or is an employee */}
            {(!user || user.userType === 'employee') && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {/* Job Type Dropdown */}
                <Box
                  onMouseEnter={handleJobTypeOpen}
                  onMouseLeave={handleJobTypeClose}
                  sx={{ position: 'relative' }}
                >
                  <Button
                    color="inherit"
                    endIcon={<KeyboardArrowDown />}
                    sx={{ fontWeight: 600, textTransform: 'none' }}
                  >
                    Job Type
                  </Button>
                  <Popover
                    open={Boolean(jobTypeAnchor)}
                    anchorEl={jobTypeAnchor}
                    onClose={handleJobTypeClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    sx={{
                      pointerEvents: 'none',
                      '& .MuiPopover-paper': {
                        pointerEvents: 'auto',
                        mt: 1,
                        minWidth: 400,
                        p: 2,
                      }
                    }}
                    disableRestoreFocus
                  >
                    <Box onMouseEnter={handleJobTypeOpen} onMouseLeave={handleJobTypeClose}>
                      <Grid container spacing={2}>
                        {/* Left Section - Work Type */}
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                            WORK TYPE
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>Work From Home</MenuItem>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>Work From Office</MenuItem>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>Hybrid</MenuItem>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>Remote</MenuItem>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>Part-time</MenuItem>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>Full-time</MenuItem>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>Contract</MenuItem>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>Internship</MenuItem>
                          </Box>
                        </Grid>

                        {/* Vertical Divider */}
                        <Grid item xs={1}>
                          <Divider orientation="vertical" sx={{ height: '100%', mx: 'auto' }} />
                        </Grid>

                        {/* Right Section - Job Categories */}
                        <Grid item xs={5}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                            JOB CATEGORIES
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>Job by City</MenuItem>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>Job by Department</MenuItem>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>IT & Software</MenuItem>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>Sales & Marketing</MenuItem>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>Finance & Accounting</MenuItem>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>HR & Recruiting</MenuItem>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>Engineering</MenuItem>
                            <MenuItem onClick={handleJobTypeClose} sx={{ fontSize: '0.9rem', py: 1 }}>Healthcare</MenuItem>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Popover>
                </Box>

                {/* Career Campus Dropdown */}
                <Box
                  onMouseEnter={handleCampusOpen}
                  onMouseLeave={handleCampusClose}
                  sx={{ position: 'relative' }}
                >
                  <Button
                    color="inherit"
                    endIcon={<KeyboardArrowDown />}
                    sx={{ fontWeight: 600, textTransform: 'none' }}
                  >
                    Career Campus
                  </Button>
                  <Popover
                    open={Boolean(campusAnchor)}
                    anchorEl={campusAnchor}
                    onClose={handleCampusClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    sx={{
                      pointerEvents: 'none',
                      '& .MuiPopover-paper': {
                        pointerEvents: 'auto',
                        mt: 1,
                        minWidth: 180,
                      }
                    }}
                    disableRestoreFocus
                  >
                    <Box onMouseEnter={handleCampusOpen} onMouseLeave={handleCampusClose}>
                      <MenuItem onClick={handleCampusClose}>Career Guidance</MenuItem>
                      <MenuItem onClick={handleCampusClose}>Skill Development</MenuItem>
                      <MenuItem onClick={handleCampusClose}>Interview Tips</MenuItem>
                      <MenuItem onClick={handleCampusClose}>Resume Building</MenuItem>
                      <MenuItem onClick={handleCampusClose}>Webinars</MenuItem>
                    </Box>
                  </Popover>
                </Box>

                {/* Blog */}
                <Button 
                  color="inherit" 
                  sx={{ fontWeight: 600, textTransform: 'none' }}
                  onClick={() => navigate('/blog')}
                >
                  Blog
                </Button>
              </Box>
            )}

            {/* Employer Navigation Items - Only show if user is an employer */}
            {user && user.userType === 'employer' && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Button 
                  color="inherit" 
                  sx={{ fontWeight: 600, textTransform: 'none' }}
                  onClick={() => navigate('/employer/dashboard')}
                >
                  Dashboard
                </Button>
                <Button 
                  color="inherit" 
                  sx={{ fontWeight: 600, textTransform: 'none' }}
                  onClick={() => navigate('/employer/jobs')}
                >
                  My Jobs
                </Button>
                <Button 
                  color="inherit" 
                  sx={{ fontWeight: 600, textTransform: 'none' }}
                  onClick={() => navigate('/employer/candidates')}
                >
                  Candidates
                </Button>
              </Box>
            )}
          </Box>

          {/* Right Section: Auth Buttons / User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    {user.userType === 'employer' ? <Business /> : <Person />}
                  </Avatar>
                  <Box>
                    <Chip 
                      label={user.userType === 'employer' ? 'Recruiter' : 'Job Seeker'} 
                      size="small" 
                      color="primary"
                      variant="outlined"
                    />
                    <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                      +91 {user.mobile}
                    </Typography>
                  </Box>
                </Box>
                
                <Button 
                  variant="outlined"
                  onClick={handleDashboard}
                  size="small"
                >
                  Dashboard
                </Button>
                
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                  size="small"
                  startIcon={<Logout />}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={handleEmployeeLogin}
                  sx={{ fontWeight: 600 }}
                >
                  Employee Login
                </Button>
                <Button
                  variant="contained"
                  onClick={handleEmployerLogin}
                  sx={{ fontWeight: 600 }}
                >
                  Employer Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;