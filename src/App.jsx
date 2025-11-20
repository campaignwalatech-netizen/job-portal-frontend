import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import {
  ProtectedRoute,
  PublicRoute,
  ProfileCompleteRoute,
} from "./components/auth";
import OnboardingFlow from "./components/auth/OnboardingFlow";
import Header from "./components/common/Header/Header";
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import JobSeekerDashboard from "./pages/jobseeker/JobSeekerDashboard";
import EmployeeOnboarding from "./pages/jobseeker/EmployeeOnboarding";
import EmployerOnboarding from "./pages/Employer/EmployerOnboarding";
import ProfilePage from "./components/profile/ProfileForm";
import { Box, Typography, Button } from "@mui/material";

const theme = createTheme({
  typography: {
    fontSize: 14,
    h6: {
      fontSize: "1.1rem",
      fontWeight: 600,
    },
    body2: {
      fontSize: "0.875rem",
    },
    caption: {
      fontSize: "0.75rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            fontSize: "0.875rem",
          },
        },
      },
    },
  },
});

// Simple landing page component
const LandingPage = () => {
  return (
    <Box sx={{ 
      p: 4, 
      textAlign: 'center',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
        Welcome to JobPortal
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Find your dream job or hire the best talent
      </Typography>
      <Button 
        variant="contained" 
        size="large"
        sx={{ px: 4, py: 1.5 }}
        onClick={() => window.location.reload()}
      >
        Get Started
      </Button>
    </Box>
  );
};

// New component to handle redirection based on user status
const HomeRedirect = () => {
  const { user, isProfileComplete } = useAuth();
  
  console.log('HomeRedirect - User:', user, 'ProfileComplete:', isProfileComplete);
  
  if (!user) {
    return <LandingPage />;
  }
  
  // If profile is not complete, redirect to onboarding
  if (!isProfileComplete) {
    if (user.userType === 'employer') {
      return <Navigate to="/employer/onboarding" replace />;
    } else {
      return <Navigate to="/onboarding" replace />;
    }
  }
  
  // Profile is complete, redirect to dashboard
  if (user.userType === 'employer') {
    return <Navigate to="/employer/dashboard" replace />;
  } else {
    return <Navigate to="/jobseeker/dashboard" replace />;
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <OnboardingProvider>
            <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
              <Header />
              <OnboardingFlow />
              <Routes>
                {/* Public routes - only accessible when not logged in */}
                <Route
                  path="/"
                  element={
                    <PublicRoute>
                      <HomeRedirect />
                    </PublicRoute>
                  }
                />

                {/* Onboarding routes */}
                <Route
                  path="/onboarding"
                  element={
                    <ProtectedRoute>
                      <EmployeeOnboarding />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/employer/onboarding"
                  element={
                    <ProtectedRoute>
                      <EmployerOnboarding />
                    </ProtectedRoute>
                  }
                />

                {/* Profile routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                {/* Dashboard routes - require both auth and complete profile */}
                <Route
                  path="/employer/dashboard"
                  element={
                    <ProfileCompleteRoute>
                      <EmployerDashboard />
                    </ProfileCompleteRoute>
                  }
                />

                <Route
                  path="/jobseeker/dashboard"
                  element={
                    <ProfileCompleteRoute>
                      <JobSeekerDashboard />
                    </ProfileCompleteRoute>
                  }
                />

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Box>
          </OnboardingProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;