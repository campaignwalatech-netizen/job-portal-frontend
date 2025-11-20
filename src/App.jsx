import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { OnboardingProvider } from "./contexts/OnboardingContext.jsx";
import OnboardingFlow from "./components/auth/OnboardingFlow.jsx";
import Header from "./components/common/Header/Header.jsx";
import EmployerDashboard from "./pages/Employer/EmployerDashboard.jsx";
import JobSeekerDashboard from "./pages/jobseeker/JobSeekerDashboard.jsx";
import EmployeeOnboarding from "./pages/jobseeker/EmployeeOnboarding.jsx";
import ProfilePage from "./components/profile/ProfileForm.jsx";
import { Box, Typography } from '@mui/material';

const theme = createTheme({
  typography: {
    fontSize: 14,
    h6: {
      fontSize: '1.1rem',
      fontWeight: 600
    },
    body2: {
      fontSize: '0.875rem'
    },
    caption: {
      fontSize: '0.75rem'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          textTransform: 'none'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            fontSize: '0.875rem'
          }
        }
      }
    }
  }
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.userType ? children : <Navigate to="/" />;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return !user.userType ? children : <Navigate to={user.userType === 'employer' ? '/employer/dashboard' : '/jobs'} />;
};

function HomePage() {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <JobSeekerDashboard />
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <OnboardingProvider>
          <AuthProvider>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
              <Header />
              <OnboardingFlow />
              <Routes>
                <Route path="/" element={
                  <PublicRoute>
                    <HomePage />
                  </PublicRoute>
                } />
                <Route path="/employer/dashboard" element={
                  <ProtectedRoute>
                    <EmployerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/jobs" element={
                  <ProtectedRoute>
                    <JobSeekerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/onboarding" element={
                  <ProtectedRoute>
                    <EmployeeOnboarding />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Box>
          </AuthProvider>
        </OnboardingProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;