// App.jsx (RESET & CLEAN)

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import Header from "./components/common/Header/Header";
import JobPortalLanding from "./pages/Home/JobPortalLanding";

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

      {/* Main Layout */}
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Header />
        <JobPortalLanding />
      </Box>
    </ThemeProvider>
  );
}

export default App;
