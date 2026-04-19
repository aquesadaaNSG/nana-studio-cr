"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    cream: Palette["primary"];
    aqua: Palette["primary"];
  }
  interface PaletteOptions {
    cream?: PaletteOptions["primary"];
    aqua?: PaletteOptions["primary"];
  }
}

export const crochetTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#AED9E0",
      light: "#CCE9F0",
      dark: "#82BEC8",
      contrastText: "#2C4A5A",
    },
    secondary: {
      main: "#A8C5DA",
      light: "#C5DCE9",
      dark: "#7A9BB5",
      contrastText: "#2C4A5A",
    },
    error: { main: "#E57373" },
    warning: { main: "#FFB74D" },
    success: { main: "#66BB6A" },
    background: {
      default: "#F2F9FB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2C4A5A",
      secondary: "#5B7A8A",
    },
    divider: "#CBE3EA",
    cream: {
      main: "#F2F9FB",
      light: "#F8FCFD",
      dark: "#E0EFF4",
      contrastText: "#2C4A5A",
    },
    aqua: {
      main: "#9DD4D8",
      light: "#BDE6E9",
      dark: "#6FBABE",
      contrastText: "#1A3A40",
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    h1: { fontWeight: 700, letterSpacing: "-0.025em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 600, letterSpacing: "-0.015em" },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "999px",
          fontWeight: 600,
          padding: "10px 24px",
          boxShadow: "none",
          "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.12)" },
        },
        outlined: {
          borderWidth: "2px",
          "&:hover": { borderWidth: "2px" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(44, 74, 90, 0.06)",
          borderRadius: "16px",
          transition: "box-shadow 0.2s ease, transform 0.2s ease",
          "&:hover": { boxShadow: "0 8px 24px rgba(44, 74, 90, 0.12)" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: "999px", fontWeight: 500 },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#AED9E0" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#82BEC8",
              borderWidth: "2px",
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { borderRadius: "24px 0 0 24px" },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: { fontWeight: 700, fontSize: "0.65rem" },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: "#CBE3EA" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
  },
});
