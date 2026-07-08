import React from 'react';
import { NavLink } from 'react-router-dom';

/* ─── Inline SVG icon set ──────────────────────────────────────────────────── */
const icons = {
  dashboard: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="sidebar-link-icon">
      <path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-4a1 1 0 00-1 1v3H6a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7a1 1 0 00-1-1z" />
    </svg>
  ),
  concepts: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="sidebar-link-icon">
      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1h10v8H5V6zm4 2a1 1 0 00-1 1v2a1 1 0 102 0V9a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  categories: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="sidebar-link-icon">
      <path d="M2 4a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm0 8a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4zm8-8a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V4zm0 8a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4z" />
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="sidebar-link-icon">
      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="sidebar-link-icon">
      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="sidebar-link-icon">
      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
  ),
  docs: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="sidebar-link-icon">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
  ),
};

/* ─── Navigation config ─────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {
    section: 'Core',
    links: [
      { to: '/dashboard', icon: icons.dashboard, label: 'Overview', end: true },
      { to: '/dashboard/concepts', icon: icons.concepts, label: 'Concepts', badge: '124' },
      { to: '/dashboard/categories', icon: icons.categories, label: 'Categories' },
      { to: '/dashboard/search', icon: icons.search, label: 'Search' },
    ],
  },
  {
    section: 'Insights',
    links: [
      { to: '/dashboard/analytics', icon: icons.analytics, label: 'Analytics' },
      { to: '/dashboard/docs', icon: icons.docs, label: 'Docs' },
    ],
  },
  {
    section: 'System',
    links: [
      { to: '/dashboard/settings', icon: icons.settings, label: 'Settings' },
    ],
  },
];

/* ─── Sidebar Component ─────────────────────────────────────────────────────── */
function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay backdrop */}
      <div
        id="sidebar-overlay"
        className={`sidebar-overlay${isOpen ? '' : ' hidden'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        id="dashboard-sidebar"
        className={`sidebar${isOpen ? ' sidebar-open' : ''}`}
        aria-label="Main navigation"
      >
        {/* Logo / Brand */}
        <div className="sidebar-logo-area">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2L18 7V13L10 18L2 13V7L10 2Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="10" r="2.5" fill="white" />
              </svg>
            </div>
            <span className="sidebar-logo-text">CAIA</span>
            <span className="sidebar-logo-badge">v1.0</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav" aria-label="Dashboard navigation">
          {NAV_ITEMS.map((group) => (
            <div key={group.section}>
              <div className="sidebar-section-label">{group.section}</div>
              {group.links.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `sidebar-link${isActive ? ' active' : ''}`
                  }
                  onClick={() => {
                    /* auto-close drawer on mobile after navigation */
                    if (window.innerWidth < 1024) onClose();
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className="sidebar-link-badge"
                      style={{
                        background: 'rgba(99,102,241,0.1)',
                        color: 'var(--color-primary-400)',
                        border: '1px solid rgba(99,102,241,0.2)',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer — system status + user card */}
        <div className="sidebar-footer">
          {/* System health indicator */}
          <div className="sidebar-status-indicator" aria-label="System status: all systems operational">
            <span className="status-dot" aria-hidden="true" />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-on-surface)' }}>
                All Systems Operational
              </div>
              <div style={{ fontSize: '10px', color: 'var(--color-on-surface-faint)', fontFamily: 'var(--font-family-mono)' }}>
                99.98% uptime
              </div>
            </div>
          </div>

          {/* User card */}
          <div className="sidebar-user-card" role="button" tabIndex={0} aria-label="User profile">
            <div className="sidebar-user-avatar" aria-hidden="true">KP</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="sidebar-user-name">Kriya Panchal</div>
              <div className="sidebar-user-role">System Admin</div>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={{ color: 'var(--color-on-surface-faint)', flexShrink: 0 }}
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
