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
          color: "#000",
          boxShadow: "none",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: '#ffff',
          padding: '15px'
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
