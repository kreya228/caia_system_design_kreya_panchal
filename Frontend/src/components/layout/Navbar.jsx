import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* ─── Breadcrumb label map ──────────────────────────────────────────────────── */
const ROUTE_LABELS = {
  '/dashboard': 'Overview',
  '/dashboard/concepts': 'Concepts',
  '/dashboard/categories': 'Categories',
  '/dashboard/search': 'Search',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/docs': 'Documentation',
  '/dashboard/settings': 'Settings',
};

/* ─── Navbar Component ──────────────────────────────────────────────────────── */
function Navbar({ onToggleSidebar }) {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const currentLabel = ROUTE_LABELS[location.pathname] ?? 'Dashboard';

  /* Close notification dropdown when clicking outside */
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="dashboard-navbar" role="banner">
      {/* Left: hamburger + breadcrumb */}
      <div className="navbar-left">
        <button
          id="sidebar-toggle-btn"
          className="navbar-hamburger"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation sidebar"
          aria-expanded={false}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z" clipRule="evenodd" />
          </svg>
        </button>

        <nav className="navbar-breadcrumb" aria-label="Breadcrumb">
          <span>CAIA</span>
          <span className="navbar-breadcrumb-sep" aria-hidden="true">/</span>
          <span className="navbar-breadcrumb-current">{currentLabel}</span>
        </nav>
      </div>

      {/* Right: search + actions */}
      <div className="navbar-right">
        {/* Search bar (hidden on mobile via CSS) */}
        <div
          id="navbar-search-bar"
          className="navbar-search"
          role="search"
          aria-label="Global search"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="currentColor"
            style={{ color: 'var(--color-on-surface-faint)', flexShrink: 0 }}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            id="navbar-search-input"
            type="search"
            placeholder="Search concepts…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label="Search concepts"
          />
          {searchValue && (
            <span
              style={{ fontSize: '10px', color: 'var(--color-on-surface-faint)', fontFamily: 'var(--font-family-mono)' }}
              aria-hidden="true"
            >
              ⌘K
            </span>
          )}
        </div>

        {/* Notifications */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            id="navbar-notifications-btn"
            className="navbar-icon-btn"
            onClick={() => setNotifOpen((o) => !o)}
            aria-label="Notifications (3 new)"
            aria-expanded={notifOpen}
            aria-haspopup="true"
          >
            <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a2 2 0 002-2H8a2 2 0 002 2z" />
            </svg>
            <span className="navbar-notif-badge" aria-hidden="true">3</span>
          </button>

          {notifOpen && (
            <div
              id="navbar-notifications-panel"
              role="dialog"
              aria-label="Notifications"
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: 300,
                background: 'rgba(26, 26, 46, 0.97)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--color-border)',
                borderRadius: 14,
                boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
                zIndex: 100,
                animation: 'fade-in 0.15s ease both',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--color-on-surface)' }}>Notifications</span>
                <span style={{ fontSize: 10, color: 'var(--color-primary-400)', cursor: 'pointer', fontWeight: 600 }}>Mark all read</span>
              </div>
              {[
                { title: 'Concept sync complete', time: '2m ago', dot: 'var(--color-success)' },
                { title: 'Analytics report ready', time: '1h ago', dot: 'var(--color-primary-500)' },
                { title: 'Node C4 alert resolved', time: 'Yesterday', dot: 'var(--color-warning)' },
              ].map((n, i) => (
                <div
                  key={i}
                  style={{
                    padding: '11px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    transition: 'background 150ms ease',
                    borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: n.dot, flexShrink: 0 }} aria-hidden="true" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-on-surface)' }}>{n.title}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--color-on-surface-faint)', fontFamily: 'var(--font-family-mono)' }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Theme / light mode toggle placeholder */}
        <button
          id="navbar-theme-btn"
          className="navbar-icon-btn"
          aria-label="Toggle theme (coming soon)"
          title="Theme toggle coming soon"
        >
          <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </button>

        {/* Profile */}
        <div
          id="navbar-profile-btn"
          className="navbar-profile"
          role="button"
          tabIndex={0}
          aria-label="User profile and settings"
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()}
        >
          <div className="navbar-profile-avatar" aria-hidden="true">KP</div>
          <span className="navbar-profile-name">Kriya</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 20 20"
            fill="currentColor"
            style={{ color: 'var(--color-on-surface-faint)' }}
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
