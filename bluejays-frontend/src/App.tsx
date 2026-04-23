import {
  Box,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import TopNavBar from "./components/TopNavBar";
import Standings from "./pages/Standings";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Leaders from "./pages/Leaders";
import Teams from "./pages/Teams";
import Players from "./pages/Players";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: 14,
  },
  palette: {
    mode: "light",
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#111827",
      secondary: "#475569",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "1500px",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="main" sx={{ py: { xs: 2, md: 3 }, px: { xs: 3, md: 6 } }}>
        <TopNavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/leaders" element={<Leaders />} />
          <Route path="/teams/:teamId" element={<Teams />} />
          <Route path="/players/:playerId" element={ <Players />} />
          <Route
            path="*"
            element={<Typography sx={{ mt: 4 }}>Page not found.</Typography>}
          />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
