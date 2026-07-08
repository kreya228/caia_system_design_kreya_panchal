import React from 'react';

const FOOTER_LINKS = [
  { label: 'Docs', href: '#' },
  { label: 'API Reference', href: '#' },
  { label: 'Changelog', href: '#' },
  { label: 'Status', href: '#' },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="dashboard-footer" className="dashboard-footer" role="contentinfo">
      {/* Left: copyright */}
      <span>
        &copy; {currentYear} CAIA &mdash; System Design Knowledge Base. All rights reserved.
      </span>

      {/* Centre: quick nav links */}
      <nav className="footer-links" aria-label="Footer navigation">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="footer-link"
            target={link.href !== '#' ? '_blank' : undefined}
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right: API status chip */}
      <div
        className="footer-api-status"
        aria-label="API status: operational"
        title="All CAIA API endpoints are responding normally"
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--color-success)',
            display: 'inline-block',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }}
          aria-hidden="true"
        />
        <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>API&nbsp;Operational</span>
        <span style={{ color: 'var(--color-on-surface-faint)' }}>&mdash;</span>
        <span>v1.0.0-beta</span>
      </div>
    </footer>
  );
}

export default Footer;
