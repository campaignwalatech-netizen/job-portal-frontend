
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import JobPortalLanding from "./pages/Home/JobPortalLanding";
import EmployerLanding from "./pages/Employer/EmployerLanding";
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import EmployerRegister from "./pages/Employer/Register";

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
          <Route path="/employer/register" element={<EmployerRegister />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
