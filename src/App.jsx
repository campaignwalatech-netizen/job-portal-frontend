
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
const EmployeeRegister = lazy(() => import('./pages/employee/register'));
const EmployerVerification = lazy(() => import('./pages/employer/EmployerVerification'));
const JobManagement = lazy(() => import('./pages/employer/jobs/JobManagement'));
const EmployerDashboardHome = lazy(() => import('./pages/employer/EmployerDashboardHome'));
const SearchCandidates = lazy(() => import('./pages/employer/database/SearchCandidates'));




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
            <Route path="/employee" element={<EmployeeLanding />} />
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="*" element={<JobPortalLanding />} />
            <Route path="/employer/post-job" element={<PostJob />} />
            <Route path="/employer/register" element={<EmployerRegister />} />
            <Route path="/employee/register" element={<EmployeeRegister />} />
            <Route path="/employer/verification" element={<EmployerVerification />} />
            <Route path="/employer/dashboard" element={<EmployerDashboard />}>
              <Route index element={<EmployerDashboardHome />} />
              <Route path="home" element={<EmployerDashboardHome />} />
              <Route path="job-listing" element={<JobManagement />} />
              <Route path="database/search" element={<SearchCandidates />} />

            </Route>



          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
