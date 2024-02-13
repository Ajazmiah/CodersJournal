import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
   primary: {
    main:'#000',
    light: '#000000d6',
   },
   secondary: {
    main: '#ff8c57',
    light: '#ff8c57cf'
   }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "#fff",
          boxShadow: "none",
          zIndex: "10",
          position: "relative",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: '#ff8c57', 
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          backgroundColor: "#000",
        },
      },
    },
   },
});
