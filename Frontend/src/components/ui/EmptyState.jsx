import React from 'react';
import Button from './Button';

/**
 * EmptyState — Zero-data placeholder with icon, title, description, and CTA.
 *
 * Props:
 *   icon        : ReactNode — custom icon/illustration (defaults to a box icon)
 *   title       : string | ReactNode                    (default: 'Nothing here yet')
 *   description : string | ReactNode
 *   action      : { label: string, onClick: fn, variant?: ButtonVariant }
 *   secondaryAction : { label: string, onClick: fn }
 *   size        : 'sm' | 'md' | 'lg'                   (default: 'md')
 *   className   : string
 */

/* Default decorative icon */
const DefaultIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden="true"
  >
    <rect x="4" y="10" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2.5" />
    <path d="M4 18h40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M16 10V6m16 4V6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="24" cy="31" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M19 39c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SIZE_CONFIG = {
  sm: {
    wrapper: 'py-10 px-6',
    iconWrap: 'w-12 h-12',
    title: 'text-sm font-bold',
    desc: 'text-xs max-w-xs',
  },
  md: {
    wrapper: 'py-16 px-8',
    iconWrap: 'w-16 h-16',
    title: 'text-base font-bold',
    desc: 'text-xs max-w-sm',
  },
  lg: {
    wrapper: 'py-20 px-10',
    iconWrap: 'w-20 h-20',
    title: 'text-lg font-bold',
    desc: 'text-sm max-w-md',
  },
};

function EmptyState({
  icon,
  title = 'Nothing here yet',
  description,
  action,
  secondaryAction,
  size = 'md',
  className = '',
}) {
  const config = SIZE_CONFIG[size] ?? SIZE_CONFIG.md;

  return (
    <div
      className={[
        'flex flex-col items-center justify-center text-center',
        config.wrapper,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="status"
      aria-live="polite"
    >
      {/* Icon container */}
      <div
        className={[
          config.iconWrap,
          'rounded-2xl flex items-center justify-center mb-5',
          'bg-gradient-to-br from-[var(--color-primary-500)]/10 to-[var(--color-accent-500)]/10',
          'border border-[var(--color-primary-500)]/15',
          'text-[var(--color-primary-400)]',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      >
        {icon ?? <DefaultIcon />}
      </div>

      {/* Text */}
      <h3
        className={`${config.title} text-[var(--color-on-surface)] tracking-tight`}
      >
        {title}
      </h3>

      {description && (
        <p
          className={`mt-2 ${config.desc} text-[var(--color-on-surface-muted)] leading-relaxed mx-auto`}
        >
          {description}
        </p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          {action && (
            <Button
              variant={action.variant ?? 'primary'}
              size="sm"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="ghost"
              size="sm"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Preset variants ───────────────────────────────────────────────────────── */

/* Search empty state */
EmptyState.NoResults = function NoResults({ query, onClear }) {
  return (
    <EmptyState
      icon={
        <svg width="32" height="32" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      }
      title="No results found"
      description={query ? `We couldn't find anything matching "${query}". Try adjusting your search.` : 'Try a different search term.'}
      action={onClear ? { label: 'Clear search', onClick: onClear, variant: 'secondary' } : undefined}
    />
  );
};

/* Error empty state */
EmptyState.Error = function ErrorState({ onRetry }) {
  return (
    <EmptyState
      icon={
        <svg width="32" height="32" viewBox="0 0 20 20" fill="currentColor" style={{ color: 'var(--color-error)' }} aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      }
      title="Something went wrong"
      description="An unexpected error occurred. Please try again, or contact support if the issue persists."
      action={onRetry ? { label: 'Try again', onClick: onRetry } : undefined}
    />
  );
};

export default EmptyState;
