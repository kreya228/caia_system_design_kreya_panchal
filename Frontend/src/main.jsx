import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import App from './App.jsx';
import './index.css';

// ─── MUI Theme Provider (baseline) ───────────────────────────────────────────
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    {/* Redux store available to entire tree */}
    <Provider store={store}>
      {/* MUI theme + CSS reset */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
