"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    cream: Palette["primary"];
    mint: Palette["primary"];
  }
  interface PaletteOptions {
    cream?: PaletteOptions["primary"];
    mint?: PaletteOptions["primary"];
  }
}

export const crochetTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#E8829A",
      light: "#F4B8C5",
      dark: "#C85F78",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#A78BCA",
      light: "#C9B4E6",
      dark: "#7C5FA0",
      contrastText: "#FFFFFF",
    },
    error: { main: "#E57373" },
    warning: { main: "#FFB74D" },
    success: { main: "#66BB6A" },
    background: {
      default: "#FFF8F4",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#3D2B1F",
      secondary: "#7A6255",
    },
    divider: "#F0DDD5",
    cream: {
      main: "#FFF8F4",
      light: "#FFFAF7",
      dark: "#F5E8DF",
      contrastText: "#3D2B1F",
    },
    mint: {
      main: "#A8E6CF",
      light: "#C8F0E0",
      dark: "#7DCBAA",
      contrastText: "#1A4731",
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
          boxShadow: "0 2px 8px rgba(61, 43, 31, 0.06)",
          borderRadius: "16px",
          transition: "box-shadow 0.2s ease, transform 0.2s ease",
          "&:hover": { boxShadow: "0 8px 24px rgba(61, 43, 31, 0.12)" },
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
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E8829A" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E8829A",
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
        root: { borderColor: "#F0DDD5" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
  },
});
