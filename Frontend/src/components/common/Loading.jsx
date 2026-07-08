import React from 'react';

/**
 * Loading — Reusable animated loading indicator.
 * Props:
 *   size    : 'sm' | 'md' | 'lg'   (default: 'md')
 *   label   : string                (optional text beneath the spinner)
 *   fullPage: boolean               (centers in the full viewport)
 */
function Loading({ size = 'md', label, fullPage = false }) {
  const sizeMap = {
    sm: { ring: 32, outer: 44 },
    md: { ring: 48, outer: 60 },
    lg: { ring: 64, outer: 80 },
  };

  const { ring, outer } = sizeMap[size] || sizeMap.md;

  const content = (
    <div
      className="loading-container"
      role="status"
      aria-label={label || 'Loading…'}
    >
      {/* Spinner rings */}
      <div className="loading-ring" style={{ width: ring, height: ring }}>
        <div className="loading-ring-inner" />
        <div
          className="loading-ring-outer"
          style={{
            inset: -(outer - ring) / 2,
          }}
        />

        {/* Centre glow dot */}
        <div
          style={{
            position: 'absolute',
            inset: '50%',
            width: 6,
            height: 6,
            translate: '-50% -50%',
            borderRadius: '50%',
            background: 'var(--color-primary-500)',
            boxShadow: '0 0 10px 3px rgba(99, 102, 241, 0.5)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        />
      </div>

      {/* Bouncing dots */}
      <div className="loading-dots" aria-hidden="true">
        <span className="loading-dot" />
        <span className="loading-dot" />
        <span className="loading-dot" />
      </div>

      {/* Optional label */}
      {label && (
        <p
          style={{
            fontSize: '12px',
            color: 'var(--color-on-surface-muted)',
            fontFamily: 'var(--font-family-mono)',
            letterSpacing: '0.05em',
            margin: 0,
            animation: 'fade-in 0.5s ease both',
          }}
        >
          {label}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-surface)',
        }}
      >
        {content}
      </div>
    );
  }

  return content;
}

export default Loading;
