import React, { useId } from 'react';

/**
 * Input — Reusable labelled text input field.
 *
 * Props:
 *   label       : string
 *   hint        : string — helper text beneath the input
 *   error       : string — error message (replaces hint, adds error styling)
 *   leftIcon    : ReactNode
 *   rightIcon   : ReactNode
 *   size        : 'sm' | 'md' | 'lg'   (default: 'md')
 *   fullWidth   : boolean
 *   id          : string — auto-generated if not provided
 *   className   : string
 *   ...rest     : native <input> props
 */

const SIZE_CLASSES = {
  sm: 'h-8  text-xs  px-3',
  md: 'h-10 text-sm  px-3.5',
  lg: 'h-12 text-sm  px-4',
};

function Input({
  label,
  hint,
  error,
  leftIcon,
  rightIcon,
  size = 'md',
  fullWidth = true,
  id: externalId,
  className = '',
  disabled,
  ...rest
}) {
  const autoId = useId();
  const id = externalId ?? autoId;
  const hintId = `${id}-hint`;
  const hasError = Boolean(error);
  const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;

  const inputCls = [
    'w-full rounded-xl font-[family-name:var(--font-family-sans)] outline-none',
    'bg-white/[0.04] border transition-all duration-150',
    'text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-faint)]',
    hasError
      ? 'border-[var(--color-error)]/50 focus:border-[var(--color-error)] focus:shadow-[0_0_0_3px_rgba(244,63,94,0.15)]'
      : 'border-white/[0.1] focus:border-[var(--color-primary-500)]/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]',
    disabled ? 'opacity-40 cursor-not-allowed' : '',
    leftIcon ? 'pl-10' : '',
    rightIcon ? 'pr-10' : '',
    sizeClass,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${fullWidth ? 'w-full' : 'inline-block'} ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-1.5 text-xs font-semibold text-[var(--color-on-surface-muted)] tracking-wide uppercase"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Left icon */}
        {leftIcon && (
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-faint)] pointer-events-none"
            aria-hidden="true"
          >
            {leftIcon}
          </span>
        )}

        <input
          id={id}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hint || error ? hintId : undefined}
          className={inputCls}
          {...rest}
        />

        {/* Right icon */}
        {rightIcon && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-faint)] pointer-events-none"
            aria-hidden="true"
          >
            {rightIcon}
          </span>
        )}
      </div>

      {/* Hint / Error */}
      {(hint || error) && (
        <p
          id={hintId}
          className={`mt-1.5 text-xs ${
            hasError ? 'text-[var(--color-error)]' : 'text-[var(--color-on-surface-faint)]'
          }`}
          role={hasError ? 'alert' : undefined}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export default Input;
