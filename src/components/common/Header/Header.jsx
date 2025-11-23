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
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse
} from '@mui/material';
import {
  Work,
  Business,
  Logout,
  Person,
  KeyboardArrowDown,
  Menu,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Indian Flag Color Palette
const colors = {
  saffron: '#FF9933',
  white: '#FFFFFF',
  green: '#138808',
  blue: '#000080',
  darkSaffron: '#E68900',
  darkGreen: '#0A5C08',
};

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // State for dropdown menus
  const [jobTypeAnchor, setJobTypeAnchor] = useState(null);
  const [campusAnchor, setCampusAnchor] = useState(null);
  
  // State for mobile drawer
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  
  // State for mobile menu expansions
  const [jobTypeExpanded, setJobTypeExpanded] = useState(false);
  const [campusExpanded, setCampusExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileDrawerOpen(false);
  };

  const handleDashboard = () => {
    if (user.userType === 'employer') {
      navigate('/employer/dashboard');
    } else {
      navigate('/jobseeker/dashboard');
    }
    setMobileDrawerOpen(false);
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

  // Mobile drawer handlers
  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  // Handle employee login navigation
  const handleEmployeeLogin = () => {
    navigate('/employee-login');
    setMobileDrawerOpen(false);
  };

  // Handle employer login navigation
  const handleEmployerLogin = () => {
    navigate('/employer-login');
    setMobileDrawerOpen(false);
  };

  // Navigation handlers for mobile
  const handleMobileNavigation = (path) => {
    navigate(path);
    setMobileDrawerOpen(false);
  };

  // Mobile menu expansion handlers
  const handleJobTypeExpand = () => {
    setJobTypeExpanded(!jobTypeExpanded);
  };

  const handleCampusExpand = () => {
    setCampusExpanded(!campusExpanded);
  };

  // Mobile menu items
  const mobileJobTypeItems = [
    { text: 'Work From Home', path: '/jobs?type=work-from-home' },
    { text: 'Work From Office', path: '/jobs?type=work-from-office' },
    { text: 'Hybrid', path: '/jobs?type=hybrid' },
    { text: 'Remote', path: '/jobs?type=remote' },
    { text: 'Part-time', path: '/jobs?type=part-time' },
    { text: 'Full-time', path: '/jobs?type=full-time' },
    { text: 'Contract', path: '/jobs?type=contract' },
    { text: 'Internship', path: '/jobs?type=internship' },
  ];

  const mobileCampusItems = [
    { text: 'Career Guidance', path: '/career-guidance' },
    { text: 'Skill Development', path: '/skill-development' },
    { text: 'Interview Tips', path: '/interview-tips' },
    { text: 'Resume Building', path: '/resume-building' },
    { text: 'Webinars', path: '/webinars' },
  ];

  return (
    <AppBar 
      position="static" 
      elevation={1} 
      sx={{ 
        bgcolor: colors.white, 
        color: colors.blue,
        borderBottom: `2px solid ${colors.saffron}`
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Left Section: Logo + Navigation Items */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {/* Logo */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                cursor: 'pointer' 
              }} 
              onClick={() => navigate('/')}
            >
              <Work sx={{ 
                fontSize: 24, 
                color: colors.green,
                filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.1))'
              }} />
              <Typography 
                variant="h6" 
                component="h1" 
                sx={{ 
                  fontWeight: 700, 
                  background: `linear-gradient(135deg, ${colors.saffron}, ${colors.green})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0px 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Naukari Chahiye
              </Typography>
            </Box>

            {/* Desktop Navigation Items - Only show if user is not logged in or is an employee */}
            {(!user || user.userType === 'employee') && (
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
                {/* Job Type Dropdown */}
                <Box
                  onMouseEnter={handleJobTypeOpen}
                  onMouseLeave={handleJobTypeClose}
                  sx={{ position: 'relative' }}
                >
                  <Button
                    color="inherit"
                    endIcon={<KeyboardArrowDown />}
                    sx={{ 
                      fontWeight: 600, 
                      textTransform: 'none',
                      color: colors.blue,
                      '&:hover': {
                        backgroundColor: `${colors.saffron}15`,
                        color: colors.saffron
                      }
                    }}
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
                        border: `2px solid ${colors.saffron}`,
                        borderRadius: 2,
                        boxShadow: `0 8px 32px ${colors.saffron}20`
                      }
                    }}
                    disableRestoreFocus
                  >
                    <Box onMouseEnter={handleJobTypeOpen} onMouseLeave={handleJobTypeClose}>
                      <Grid container spacing={2}>
                        {/* Left Section - Work Type */}
                        <Grid item xs={6}>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              fontWeight: 700, 
                              mb: 1, 
                              color: colors.green,
                              fontSize: '0.8rem'
                            }}
                          >
                            WORK TYPE
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {mobileJobTypeItems.map((item, index) => (
                              <MenuItem 
                                key={index}
                                onClick={() => {
                                  handleJobTypeClose();
                                  navigate(item.path);
                                }} 
                                sx={{ 
                                  fontSize: '0.9rem', 
                                  py: 1,
                                  borderRadius: 1,
                                  '&:hover': {
                                    backgroundColor: `${colors.saffron}15`,
                                    color: colors.saffron
                                  }
                                }}
                              >
                                {item.text}
                              </MenuItem>
                            ))}
                          </Box>
                        </Grid>

                        {/* Vertical Divider */}
                        <Grid item xs={1}>
                          <Divider 
                            orientation="vertical" 
                            sx={{ 
                              height: '100%', 
                              mx: 'auto',
                              backgroundColor: colors.saffron 
                            }} 
                          />
                        </Grid>

                        {/* Right Section - Job Categories */}
                        <Grid item xs={5}>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              fontWeight: 700, 
                              mb: 1, 
                              color: colors.green,
                              fontSize: '0.8rem'
                            }}
                          >
                            JOB CATEGORIES
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <MenuItem 
                              onClick={handleJobTypeClose} 
                              sx={{ 
                                fontSize: '0.9rem', 
                                py: 1,
                                borderRadius: 1,
                                '&:hover': {
                                  backgroundColor: `${colors.green}15`,
                                  color: colors.green
                                }
                              }}
                            >
                              Job by City
                            </MenuItem>
                            <MenuItem 
                              onClick={handleJobTypeClose} 
                              sx={{ 
                                fontSize: '0.9rem', 
                                py: 1,
                                borderRadius: 1,
                                '&:hover': {
                                  backgroundColor: `${colors.green}15`,
                                  color: colors.green
                                }
                              }}
                            >
                              Job by Department
                            </MenuItem>
                            <MenuItem 
                              onClick={handleJobTypeClose} 
                              sx={{ 
                                fontSize: '0.9rem', 
                                py: 1,
                                borderRadius: 1,
                                '&:hover': {
                                  backgroundColor: `${colors.green}15`,
                                  color: colors.green
                                }
                              }}
                            >
                              IT & Software
                            </MenuItem>
                            <MenuItem 
                              onClick={handleJobTypeClose} 
                              sx={{ 
                                fontSize: '0.9rem', 
                                py: 1,
                                borderRadius: 1,
                                '&:hover': {
                                  backgroundColor: `${colors.green}15`,
                                  color: colors.green
                                }
                              }}
                            >
                              Sales & Marketing
                            </MenuItem>
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
                    sx={{ 
                      fontWeight: 600, 
                      textTransform: 'none',
                      color: colors.blue,
                      '&:hover': {
                        backgroundColor: `${colors.saffron}15`,
                        color: colors.saffron
                      }
                    }}
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
                        border: `2px solid ${colors.green}`,
                        borderRadius: 2,
                        boxShadow: `0 8px 32px ${colors.green}20`
                      }
                    }}
                    disableRestoreFocus
                  >
                    <Box onMouseEnter={handleCampusOpen} onMouseLeave={handleCampusClose}>
                      {mobileCampusItems.map((item, index) => (
                        <MenuItem 
                          key={index}
                          onClick={() => {
                            handleCampusClose();
                            navigate(item.path);
                          }}
                          sx={{
                            '&:hover': {
                              backgroundColor: `${colors.green}15`,
                              color: colors.green
                            }
                          }}
                        >
                          {item.text}
                        </MenuItem>
                      ))}
                    </Box>
                  </Popover>
                </Box>

                {/* Blog */}
                <Button 
                  color="inherit" 
                  sx={{ 
                    fontWeight: 600, 
                    textTransform: 'none',
                    color: colors.blue,
                    '&:hover': {
                      backgroundColor: `${colors.saffron}15`,
                      color: colors.saffron
                    }
                  }}
                  onClick={() => navigate('/blog')}
                >
                  Blog
                </Button>
              </Box>
            )}

            {/* Employer Navigation Items - Only show if user is an employer */}
            {user && user.userType === 'employer' && (
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
                <Button 
                  color="inherit" 
                  sx={{ 
                    fontWeight: 600, 
                    textTransform: 'none',
                    color: colors.blue,
                    '&:hover': {
                      backgroundColor: `${colors.saffron}15`,
                      color: colors.saffron
                    }
                  }}
                  onClick={() => navigate('/employer/dashboard')}
                >
                  Dashboard
                </Button>
                <Button 
                  color="inherit" 
                  sx={{ 
                    fontWeight: 600, 
                    textTransform: 'none',
                    color: colors.blue,
                    '&:hover': {
                      backgroundColor: `${colors.saffron}15`,
                      color: colors.saffron
                    }
                  }}
                  onClick={() => navigate('/employer/jobs')}
                >
                  My Jobs
                </Button>
                <Button 
                  color="inherit" 
                  sx={{ 
                    fontWeight: 600, 
                    textTransform: 'none',
                    color: colors.blue,
                    '&:hover': {
                      backgroundColor: `${colors.saffron}15`,
                      color: colors.saffron
                    }
                  }}
                  onClick={() => navigate('/employer/candidates')}
                >
                  Candidates
                </Button>
              </Box>
            )}
          </Box>

          {/* Right Section: Auth Buttons / User Info */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            {user ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: colors.green,
                    border: `2px solid ${colors.saffron}`
                  }}>
                    {user.userType === 'employer' ? <Business /> : <Person />}
                  </Avatar>
                  <Box>
                    <Chip 
                      label={user.userType === 'employer' ? 'Recruiter' : 'Job Seeker'} 
                      size="small" 
                      sx={{
                        bgcolor: colors.saffron,
                        color: colors.white,
                        fontWeight: 600,
                        fontSize: '0.7rem'
                      }}
                    />
                    <Typography variant="caption" sx={{ display: 'block', color: colors.blue }}>
                      +91 {user.mobile}
                    </Typography>
                  </Box>
                </Box>
                
                <Button 
                  variant="outlined"
                  onClick={handleDashboard}
                  size="small"
                  sx={{
                    borderColor: colors.green,
                    color: colors.green,
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: colors.green,
                      color: colors.white,
                      borderColor: colors.darkGreen
                    }
                  }}
                >
                  Dashboard
                </Button>
                
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                  size="small"
                  startIcon={<Logout />}
                  sx={{
                    color: colors.blue,
                    '&:hover': {
                      color: colors.saffron,
                      bgcolor: `${colors.saffron}15`
                    }
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={handleEmployeeLogin}
                  sx={{ 
                    fontWeight: 600,
                    borderColor: colors.saffron,
                    color: colors.saffron,
                    '&:hover': {
                      bgcolor: colors.saffron,
                      color: colors.white,
                      borderColor: colors.darkSaffron
                    }
                  }}
                >
                  Employee Login
                </Button>
                <Button
                  variant="contained"
                  onClick={handleEmployerLogin}
                  sx={{ 
                    fontWeight: 600,
                    bgcolor: colors.green,
                    '&:hover': {
                      bgcolor: colors.darkGreen
                    }
                  }}
                >
                  Employer Login
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                color: colors.blue,
                '&:hover': {
                  bgcolor: `${colors.saffron}15`
                }
              }}
            >
              <Menu />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            bgcolor: colors.white
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* User Info if logged in */}
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, p: 2, bgcolor: `${colors.green}10`, borderRadius: 2 }}>
              <Avatar sx={{ 
                width: 40, 
                height: 40, 
                bgcolor: colors.green,
                border: `2px solid ${colors.saffron}`
              }}>
                {user.userType === 'employer' ? <Business /> : <Person />}
              </Avatar>
              <Box>
                <Chip 
                  label={user.userType === 'employer' ? 'Recruiter' : 'Job Seeker'} 
                  size="small" 
                  sx={{
                    bgcolor: colors.saffron,
                    color: colors.white,
                    fontWeight: 600
                  }}
                />
                <Typography variant="body2" sx={{ color: colors.blue, mt: 0.5 }}>
                  +91 {user.mobile}
                </Typography>
              </Box>
            </Box>
          )}

          <List>
            {/* Navigation for non-logged in users or employees */}
            {(!user || user.userType === 'employee') && (
              <>
                {/* Job Type Expandable Menu */}
                <ListItem button onClick={handleJobTypeExpand}>
                  <ListItemText 
                    primary="Job Type" 
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      color: colors.blue
                    }} 
                  />
                  {jobTypeExpanded ? <ExpandLess sx={{ color: colors.saffron }} /> : <ExpandMore sx={{ color: colors.saffron }} />}
                </ListItem>
                <Collapse in={jobTypeExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {mobileJobTypeItems.map((item, index) => (
                      <ListItem 
                        key={index}
                        button 
                        sx={{ pl: 4 }}
                        onClick={() => handleMobileNavigation(item.path)}
                      >
                        <ListItemText 
                          primary={item.text} 
                          primaryTypographyProps={{ 
                            fontSize: '0.9rem',
                            color: colors.blue
                          }} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>

                {/* Career Campus Expandable Menu */}
                <ListItem button onClick={handleCampusExpand}>
                  <ListItemText 
                    primary="Career Campus" 
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      color: colors.blue
                    }} 
                  />
                  {campusExpanded ? <ExpandLess sx={{ color: colors.green }} /> : <ExpandMore sx={{ color: colors.green }} />}
                </ListItem>
                <Collapse in={campusExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {mobileCampusItems.map((item, index) => (
                      <ListItem 
                        key={index}
                        button 
                        sx={{ pl: 4 }}
                        onClick={() => handleMobileNavigation(item.path)}
                      >
                        <ListItemText 
                          primary={item.text} 
                          primaryTypographyProps={{ 
                            fontSize: '0.9rem',
                            color: colors.blue
                          }} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>

                {/* Blog */}
                <ListItem 
                  button 
                  onClick={() => handleMobileNavigation('/blog')}
                >
                  <ListItemText 
                    primary="Blog" 
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      color: colors.blue
                    }} 
                  />
                </ListItem>
              </>
            )}

            {/* Employer Navigation */}
            {user && user.userType === 'employer' && (
              <>
                <ListItem 
                  button 
                  onClick={() => handleMobileNavigation('/employer/dashboard')}
                >
                  <ListItemText 
                    primary="Dashboard" 
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      color: colors.blue
                    }} 
                  />
                </ListItem>
                <ListItem 
                  button 
                  onClick={() => handleMobileNavigation('/employer/jobs')}
                >
                  <ListItemText 
                    primary="My Jobs" 
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      color: colors.blue
                    }} 
                  />
                </ListItem>
                <ListItem 
                  button 
                  onClick={() => handleMobileNavigation('/employer/candidates')}
                >
                  <ListItemText 
                    primary="Candidates" 
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      color: colors.blue
                    }} 
                  />
                </ListItem>
              </>
            )}

            {/* Auth Buttons */}
            {user ? (
              <>
                <ListItem 
                  button 
                  onClick={handleDashboard}
                  sx={{
                    bgcolor: `${colors.green}10`,
                    borderRadius: 1,
                    mt: 1
                  }}
                >
                  <ListItemIcon>
                    <Person sx={{ color: colors.green }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Dashboard" 
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      color: colors.green
                    }} 
                  />
                </ListItem>
                <ListItem 
                  button 
                  onClick={handleLogout}
                  sx={{
                    bgcolor: `${colors.saffron}10`,
                    borderRadius: 1,
                    mt: 1
                  }}
                >
                  <ListItemIcon>
                    <Logout sx={{ color: colors.saffron }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Logout" 
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      color: colors.saffron
                    }} 
                  />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem 
                  button 
                  onClick={handleEmployeeLogin}
                  sx={{
                    bgcolor: `${colors.saffron}10`,
                    borderRadius: 1,
                    mt: 1
                  }}
                >
                  <ListItemText 
                    primary="Employee Login" 
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      color: colors.saffron
                    }} 
                  />
                </ListItem>
                <ListItem 
                  button 
                  onClick={handleEmployerLogin}
                  sx={{
                    bgcolor: colors.green,
                    borderRadius: 1,
                    mt: 1
                  }}
                >
                  <ListItemText 
                    primary="Employer Login" 
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      color: colors.white
                    }} 
                  />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;