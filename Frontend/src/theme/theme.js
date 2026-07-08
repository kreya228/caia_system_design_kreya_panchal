import { createTheme } from '@mui/material/styles';

/**
 * CAIA MUI Theme
 * Defines the primary design language: dark navy + electric blue accent.
 * All MUI components inherit from this theme via ThemeProvider in main.jsx.
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',       // Indigo-500
      light: '#818cf8',      // Indigo-400
      dark: '#4f46e5',       // Indigo-600
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#06b6d4',       // Cyan-500
      light: '#22d3ee',      // Cyan-400
      dark: '#0891b2',       // Cyan-600
      contrastText: '#ffffff',
    },
    error: {
      main: '#f43f5e',       // Rose-500
    },
    warning: {
      main: '#f59e0b',       // Amber-500
    },
    success: {
      main: '#10b981',       // Emerald-500
    },
    background: {
      default: '#0f0f1a',    // Deep navy
      paper: '#1a1a2e',      // Slightly lighter card surface
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#94a3b8',
      disabled: '#475569',
    },
    divider: 'rgba(148, 163, 184, 0.12)',
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.025em' },
    h2: { fontWeight: 700, letterSpacing: '-0.015em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.7 },
    button: { fontWeight: 600, textTransform: 'none' },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 20px',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 500 },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'small' },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#334155 transparent',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#334155',
            borderRadius: 3,
          },
        },
      },
    },
  },
});

export default theme;
