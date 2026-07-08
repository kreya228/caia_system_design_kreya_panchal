import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import './index.css';

/**
 * App — Root component.
 * BrowserRouter is provided here so all child components (including layouts)
 * can consume routing context (useLocation, NavLink, etc.).
 */
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
