import { createTheme } from '@mui/material/styles';

/**
 * CAIA MUI Theme - Premium AI Platform Palette
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c3aed',       // Violet
      light: '#a78bfa',
      dark: '#6d28d9',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3b82f6',       // Blue
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444',       // Danger Red
    },
    warning: {
      main: '#f59e0b',       // Amber Yellow
    },
    success: {
      main: '#22c55e',       // Success Green
    },
    background: {
      default: '#0b1120',    // Slate Dark
      paper: '#111827',      // Surface Dark
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
      disabled: '#475569',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },

  typography: {
    fontFamily: '"Inter", "Poppins", "Roboto", sans-serif',
    h1: { fontFamily: '"Poppins", sans-serif', fontWeight: 800, letterSpacing: '-0.025em' },
    h2: { fontFamily: '"Poppins", sans-serif', fontWeight: 700, letterSpacing: '-0.015em' },
    h3: { fontFamily: '"Poppins", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    body1: { lineHeight: 1.7 },
    button: { fontWeight: 600, textTransform: 'none' },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
        },
      },
    },
  },
});

export default theme;
