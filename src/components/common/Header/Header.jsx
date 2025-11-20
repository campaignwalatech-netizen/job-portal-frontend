import { useAuth } from '../../../contexts/AuthContext.jsx';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Chip,
  Avatar,
  Button
} from '@mui/material';
import {
  Work,
  Business,
  Logout
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Work sx={{ fontSize: 24 }} />
          <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
            Naukri Chahiye
          </Typography>
         
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  {user.userType === 'employer' ? <Business /> : <Work />}
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {user.userType === 'employer' ? 'Recruiter' : 'Job Seeker'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    +91 {user.mobile}
                  </Typography>
                </Box>
              </Box>
              <Button 
                color="inherit" 
                startIcon={<Logout />} 
                onClick={handleLogout}
                size="small"
              >
                Logout
              </Button>
            </>
          ) : (
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Find your dream job
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;