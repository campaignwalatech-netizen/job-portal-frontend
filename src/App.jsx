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
import Header from "./components/common/Header/Header";
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import JobSeekerDashboard from "./pages/jobseeker/JobSeekerDashboard";
import EmployeeOnboarding from "./pages/jobseeker/EmployeeOnboarding";
import EmployerOnboarding from "./pages/Employer/EmployerOnboarding";
import ProfilePage from "./components/profile/ProfileForm";
import JobPortalLanding from "./pages/landing/JobPortalLanding";
import { Box } from "@mui/material";
import EmployeeLanding from "./pages/landing/EmployeeLanding";
import EmployerLanding from "./pages/landing/EmployerLanding";

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#64748b',
      light: '#94a3b8',
      dark: '#475569',
    },
    background: {
      default: '#ffffff',
      paper: '#f8fafc',
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "1.1rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
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
          borderRadius: '8px',
          fontWeight: 600,
          padding: '8px 24px',
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

// Component to handle redirection based on user status
const HomeRedirect = () => {
  const { user, isProfileComplete } = useAuth();
  
  if (!user) {
    return <JobPortalLanding />;
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
              <Routes>
                {/* Public routes */}
                <Route
                  path="/"
                  element={
                    <PublicRoute>
                      <HomeRedirect />
                    </PublicRoute>
                  }
                />

                {/* Landing pages */}
                <Route
                  path="/employee-login"
                  element={
                    <PublicRoute>
                      <EmployeeLanding />
                    </PublicRoute>
                  }
                />

                <Route
                  path="/employer-login"
                  element={
                    <PublicRoute>
                      <EmployerLanding />
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

                {/* Dashboard routes */}
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