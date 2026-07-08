import React from 'react';

/**
 * Button — Reusable primary & secondary button component.
 *
 * Props:
 *   variant    : 'primary' | 'secondary' | 'ghost' | 'danger'   (default: 'primary')
 *   size       : 'xs' | 'sm' | 'md' | 'lg'                      (default: 'md')
 *   leftIcon   : ReactNode — icon rendered before the label
 *   rightIcon  : ReactNode — icon rendered after the label
 *   loading    : boolean — shows an inline spinner, disables interaction
 *   disabled   : boolean
 *   fullWidth  : boolean
 *   onClick    : function
 *   type       : 'button' | 'submit' | 'reset'                   (default: 'button')
 *   children   : ReactNode
 *   className  : string — additional classes (merged last)
 */

const BASE =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-xl ' +
  'transition-all duration-150 ease-out focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] ' +
  'disabled:opacity-40 disabled:cursor-not-allowed select-none whitespace-nowrap';

const VARIANTS = {
  primary:
    'bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] text-white ' +
    'shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_28px_rgba(99,102,241,0.45)] ' +
    'hover:brightness-110 active:scale-[0.97] focus-visible:ring-[var(--color-primary-500)]',

  secondary:
    'bg-white/[0.06] border border-white/[0.1] text-[var(--color-on-surface)] ' +
    'hover:bg-white/[0.1] hover:border-white/[0.18] active:scale-[0.97] ' +
    'focus-visible:ring-[var(--color-primary-500)]',

  ghost:
    'bg-transparent text-[var(--color-on-surface-muted)] ' +
    'hover:bg-white/[0.06] hover:text-[var(--color-on-surface)] active:scale-[0.97] ' +
    'focus-visible:ring-[var(--color-primary-500)]',

  danger:
    'bg-[var(--color-error)]/10 border border-[var(--color-error)]/25 text-[var(--color-error)] ' +
    'hover:bg-[var(--color-error)]/20 hover:border-[var(--color-error)]/40 active:scale-[0.97] ' +
    'focus-visible:ring-[var(--color-error)]',
};

const SIZES = {
  xs: 'h-7  px-3   text-xs  gap-1.5',
  sm: 'h-8  px-4   text-xs  gap-1.5',
  md: 'h-9  px-4   text-sm  gap-2',
  lg: 'h-11 px-6   text-sm  gap-2',
};

/* Inline spinner */
function BtnSpinner() {
  return (
    <svg
      className="animate-spin"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  children,
  className = '',
  ...rest
}) {
  const cls = [
    BASE,
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={cls}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <BtnSpinner /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}

export default Button;
