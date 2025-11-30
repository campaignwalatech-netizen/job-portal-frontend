
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobPortalLanding from "./pages/Home/JobPortalLanding";
import EmployeeLanding from "./pages/employee/EmployeeLanding";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployerLanding from "./pages/employer/EmployerLanding";
import EmployerDashboard from "./pages/employer/EmployerDashboard";




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
        <Routes>

          <Route path="/" element={<JobPortalLanding />} />
          <Route path="/employer" element={<EmployerLanding />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employee" element={<EmployeeLanding />} />
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="*" element={<JobPortalLanding />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
