import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import '../styles/dashboard.css';

/**
 * DashboardLayout — Reusable shell layout for all authenticated dashboard pages.
 *
 * Structure:
 *   ┌────────────────────────────────────────────┐
 *   │  Sidebar (fixed, 260px)  │  Navbar (sticky) │
 *   │                          ├──────────────────┤
 *   │                          │  <Outlet />      │
 *   │                          │  (page content)  │
 *   │                          ├──────────────────┤
 *   │                          │  Footer          │
 *   └────────────────────────────────────────────┘
 *
 * On screens < 1024px the sidebar becomes an overlay drawer
 * toggled via the hamburger button in the Navbar.
 */
function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div
      id="dashboard-layout"
      style={{
        minHeight: '100dvh',
        background: 'var(--color-surface)',
        color: 'var(--color-on-surface)',
        display: 'flex',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Ambient background glow meshes ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '-15%',
          left: '-10%',
          width: '55%',
          height: '55%',
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: '-15%',
          right: '-10%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Sidebar ── */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* ── Main content area (offset for fixed sidebar on desktop) ── */}
      <div className="dashboard-main-area" style={{ position: 'relative', zIndex: 1 }}>
        {/* Sticky top navbar */}
        <Navbar onToggleSidebar={toggleSidebar} />

        {/* Page content via React Router Outlet */}
        <main
          id="dashboard-main-content"
          style={{
            flex: 1,
            padding: '32px 32px',
            overflowY: 'auto',
          }}
          aria-label="Main content"
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;
