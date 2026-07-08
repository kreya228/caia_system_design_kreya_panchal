import React from 'react';

/**
 * Card — Glassmorphism surface container.
 *
 * Props:
 *   variant   : 'default' | 'elevated' | 'flat' | 'glow'   (default: 'default')
 *   padding   : 'none' | 'sm' | 'md' | 'lg' | 'xl'        (default: 'md')
 *   header    : ReactNode — rendered in a bordered top section
 *   footer    : ReactNode — rendered in a bordered bottom section
 *   hoverable : boolean — subtle lift on hover
 *   as        : string — HTML element tag                   (default: 'div')
 *   className : string
 *   children  : ReactNode
 */

const VARIANTS = {
  default:
    'bg-[rgba(26,26,46,0.6)] border border-[var(--color-border)] backdrop-blur-[12px]',

  elevated:
    'bg-[rgba(26,26,46,0.8)] border border-white/[0.1] backdrop-blur-[16px] ' +
    'shadow-[0_8px_32px_rgba(0,0,0,0.4)]',

  flat:
    'bg-white/[0.03] border border-white/[0.06]',

  glow:
    'bg-[rgba(26,26,46,0.6)] border border-[var(--color-primary-500)]/25 backdrop-blur-[12px] ' +
    'shadow-[0_0_24px_rgba(99,102,241,0.12),0_4px_24px_rgba(0,0,0,0.4)]',
};

const PADDING = {
  none: '',
  sm:   'p-4',
  md:   'p-5',
  lg:   'p-6',
  xl:   'p-8',
};

function Card({
  variant = 'default',
  padding = 'md',
  header,
  footer,
  hoverable = false,
  as: Tag = 'div',
  className = '',
  children,
  ...rest
}) {
  const baseCls = [
    'rounded-2xl overflow-hidden transition-all duration-200',
    VARIANTS[variant] ?? VARIANTS.default,
    hoverable
      ? 'cursor-pointer hover:border-white/[0.14] hover:translate-y-[-2px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const bodyPadding = PADDING[padding] ?? PADDING.md;

  /* If header or footer are provided, ignore padding on the wrapper and apply per section */
  const hasSlots = Boolean(header || footer);

  return (
    <Tag className={baseCls} {...rest}>
      {header && (
        <div className="px-5 py-4 border-b border-[var(--color-border)]">
          {header}
        </div>
      )}

      <div className={hasSlots ? bodyPadding : bodyPadding}>{children}</div>

      {footer && (
        <div className="px-5 py-3 border-t border-[var(--color-border)] bg-white/[0.015]">
          {footer}
        </div>
      )}
    </Tag>
  );
}

/* ─── Sub-component: Card.Title ─────────────────────────────────────────────── */
Card.Title = function CardTitle({ children, className = '' }) {
  return (
    <h3
      className={`text-sm font-bold text-[var(--color-on-surface)] tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
};

/* ─── Sub-component: Card.Description ──────────────────────────────────────── */
Card.Description = function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-xs text-[var(--color-on-surface-muted)] leading-relaxed ${className}`}>
      {children}
    </p>
  );
};

/* ─── Sub-component: Card.Divider ───────────────────────────────────────────── */
Card.Divider = function CardDivider({ className = '' }) {
  return <hr className={`border-[var(--color-border)] my-4 ${className}`} />;
};

export default Card;
