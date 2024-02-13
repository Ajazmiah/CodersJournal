import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3", // Change this to your preferred primary color
    },
    secondary: {
      main: "#FF4081", // Change this to your preferred secondary color
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h5: {
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: 14,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          cursor: "pointer",
          borderRadius: 12,
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.02)",
          },
        },
      },
    },
  },
});

function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Card>{children}</Card>
    </ThemeProvider>
  );
}

export default App;
