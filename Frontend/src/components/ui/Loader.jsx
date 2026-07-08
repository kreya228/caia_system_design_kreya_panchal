import React from 'react';

/**
 * Loader — Reusable loading spinner / skeleton indicator.
 *
 * Props:
 *   variant  : 'spinner' | 'dots' | 'bar' | 'ring'   (default: 'spinner')
 *   size     : 'xs' | 'sm' | 'md' | 'lg' | 'xl'     (default: 'md')
 *   color    : 'primary' | 'accent' | 'white' | 'muted'  (default: 'primary')
 *   label    : string — visually shown below; always present as sr-only for a11y
 *   center   : boolean — wrap in a flex-center container
 *   fullPage : boolean — full viewport centering
 *   className: string
 */

const RING_SIZES = {
  xs: 16,
  sm: 24,
  md: 36,
  lg: 52,
  xl: 72,
};

const STROKE_WIDTH = { xs: 2, sm: 2, md: 3, lg: 3, xl: 4 };

const COLOR_MAP = {
  primary: 'var(--color-primary-500)',
  accent:  'var(--color-accent-500)',
  white:   '#ffffff',
  muted:   'var(--color-on-surface-faint)',
};

/* ── Spinner variant ────────────────────────────────────────────────────────── */
function SpinnerVariant({ size, color }) {
  const px = RING_SIZES[size] ?? RING_SIZES.md;
  const sw = STROKE_WIDTH[size] ?? 3;
  const r  = (px - sw * 2) / 2;
  const c  = px / 2;
  const circumference = 2 * Math.PI * r;
  const clr = COLOR_MAP[color] ?? COLOR_MAP.primary;

  return (
    <svg
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      fill="none"
      style={{ animation: 'spin 0.8s linear infinite' }}
      aria-hidden="true"
    >
      {/* Track */}
      <circle cx={c} cy={c} r={r} stroke={clr} strokeWidth={sw} opacity="0.15" />
      {/* Spinner arc */}
      <circle
        cx={c}
        cy={c}
        r={r}
        stroke={clr}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.75}
        transform={`rotate(-90 ${c} ${c})`}
      />
    </svg>
  );
}

/* ── Ring variant (dual concentric rings) ───────────────────────────────────── */
function RingVariant({ size, color }) {
  const px = RING_SIZES[size] ?? RING_SIZES.md;
  const clr = COLOR_MAP[color] ?? COLOR_MAP.primary;
  const accentClr = COLOR_MAP.accent;

  return (
    <div style={{ position: 'relative', width: px, height: px }} aria-hidden="true">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: `2px solid ${clr}`,
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: px * 0.18,
          border: `1.5px solid ${accentClr}`,
          borderBottomColor: 'transparent',
          borderRadius: '50%',
          opacity: 0.6,
          animation: 'spin 1.1s linear infinite reverse',
        }}
      />
    </div>
  );
}

/* ── Dots variant ───────────────────────────────────────────────────────────── */
function DotsVariant({ size, color }) {
  const dotSize = { xs: 4, sm: 5, md: 7, lg: 9, xl: 12 }[size] ?? 7;
  const gap = Math.round(dotSize * 0.9);
  const clr = COLOR_MAP[color] ?? COLOR_MAP.primary;

  return (
    <div style={{ display: 'flex', gap }} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            background: i === 1 ? COLOR_MAP.accent : clr,
            animation: `bounce-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Bar variant (progress-style indeterminate) ─────────────────────────────── */
function BarVariant({ size, color }) {
  const height = { xs: 2, sm: 2, md: 3, lg: 4, xl: 5 }[size] ?? 3;
  const clr = COLOR_MAP[color] ?? COLOR_MAP.primary;

  return (
    <div
      style={{
        width: '100%',
        height,
        borderRadius: height,
        background: `${clr}20`,
        overflow: 'hidden',
        position: 'relative',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(90deg, transparent, ${clr}, ${COLOR_MAP.accent}, transparent)`,
          animation: 'shimmer-bar 1.4s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes shimmer-bar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%);  }
        }
      `}</style>
    </div>
  );
}

/* ── Main Loader ────────────────────────────────────────────────────────────── */
function Loader({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  label,
  center = false,
  fullPage = false,
  className = '',
}) {
  const labelFontSize = { xs: 10, sm: 11, md: 12, lg: 13, xl: 14 }[size] ?? 12;

  const inner = (
    <div
      role="status"
      aria-label={label ?? 'Loading'}
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {variant === 'spinner' && <SpinnerVariant size={size} color={color} />}
      {variant === 'ring'    && <RingVariant    size={size} color={color} />}
      {variant === 'dots'    && <DotsVariant    size={size} color={color} />}
      {variant === 'bar'     && <BarVariant     size={size} color={color} />}

      {/* Visually hidden accessible label always present */}
      <span className={label ? 'block' : 'sr-only'} style={{ fontSize: labelFontSize, color: 'var(--color-on-surface-muted)', fontFamily: 'var(--font-family-mono)', letterSpacing: '0.04em' }}>
        {label ?? 'Loading…'}
      </span>
    </div>
  );

  if (fullPage) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-surface)',
          zIndex: 9999,
        }}
      >
        {inner}
      </div>
    );
  }

  if (center) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        {inner}
      </div>
    );
  }

  return inner;
}

export default Loader;
