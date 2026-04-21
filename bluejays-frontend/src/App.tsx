import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import TopNavBar from "./components/TopNavBar";
import Standings from "./pages/Standings";

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
          maxWidth: 1500,
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
      <Container>
        <Box component="main" sx={{ py: { xs: 2, md: 3 } }}>
          <TopNavBar />
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, my: 2 }}
          >
            Dashboard
          </Typography>
          <Standings simplified />

          <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              App scaffold
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              }}
            >
              <Box
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                  Standings
                </Typography>
                <Typography color="text.secondary">
                  Render league standings and division data here.
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                  News
                </Typography>
                <Typography color="text.secondary">
                  Render team news feeds and headlines here.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
              <Button variant="contained">Get started</Button>
              <Button variant="outlined">View structure</Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
