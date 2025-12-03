
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';

const JobPortalLanding = lazy(() => import('./pages/Home/JobPortalLanding'));
const EmployeeLanding = lazy(() => import('./pages/employee/EmployeeLanding'));
const EmployeeDashboard = lazy(() => import('./pages/employee/EmployeeDashboard'));
const EmployerLanding = lazy(() => import('./pages/employer/EmployerLanding'));
const EmployerDashboard = lazy(() => import('./pages/employer/EmployerDashboard'));
const PostJob = lazy(() => import('./pages/employer/PostJob/PostJobWrapper'));
const EmployerRegister = lazy(() => import('./pages/employer/Register'));

const theme = createTheme({
  palette: {
    primary: { main: "#2563eb" },
    background: { default: "#ffffff" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<JobPortalLanding />} />
            <Route path="/employer" element={<EmployerLanding />} />
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employee" element={<EmployeeLanding />} />
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="*" element={<JobPortalLanding />} />
            <Route path="/employer/post-job" element={<PostJob />} />
            <Route path="/employer/register" element={<EmployerRegister />} />
            
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
