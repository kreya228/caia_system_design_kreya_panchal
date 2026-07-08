import React, { useId, useRef } from 'react';

/**
 * SearchInput — Dedicated search field with clear button and keyboard shortcut hint.
 *
 * Props:
 *   value       : string
 *   onChange    : (e) => void
 *   onClear     : () => void   — called when × is clicked or Escape pressed
 *   placeholder : string       (default: 'Search…')
 *   shortcut    : string       — e.g. '⌘K' displayed inside the field when empty
 *   size        : 'sm' | 'md' | 'lg'
 *   fullWidth   : boolean
 *   autoFocus   : boolean
 *   id          : string
 *   className   : string
 *   ...rest     : native <input> props
 */

const SIZE_CLASSES = {
  sm: 'h-8  text-xs',
  md: 'h-10 text-sm',
  lg: 'h-11 text-sm',
};

/* Magnifying-glass icon */
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
);

/* × clear icon */
const ClearIcon = () => (
  <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

function SearchInput({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search…',
  shortcut,
  size = 'md',
  fullWidth = true,
  autoFocus = false,
  id: externalId,
  className = '',
  disabled,
  ...rest
}) {
  const autoId = useId();
  const id = externalId ?? autoId;
  const inputRef = useRef(null);
  const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;
  const hasValue = value.length > 0;

  function handleKeyDown(e) {
    if (e.key === 'Escape' && hasValue) {
      onClear?.();
      rest.onKeyDown?.(e);
    } else {
      rest.onKeyDown?.(e);
    }
  }

  return (
    <div
      className={[
        'group relative flex items-center rounded-xl border transition-all duration-150',
        'bg-white/[0.04] border-white/[0.1]',
        'focus-within:bg-white/[0.06] focus-within:border-[var(--color-primary-500)]/50',
        'focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]',
        disabled ? 'opacity-40' : '',
        sizeClass,
        fullWidth ? 'w-full' : 'inline-flex',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Search icon */}
      <span
        className="absolute left-3 text-[var(--color-on-surface-faint)] group-focus-within:text-[var(--color-primary-400)] transition-colors duration-150 pointer-events-none"
        aria-hidden="true"
      >
        <SearchIcon />
      </span>

      <input
        ref={inputRef}
        id={id}
        type="search"
        role="searchbox"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete="off"
        spellCheck={false}
        className={[
          'w-full bg-transparent outline-none pl-9 pr-3',
          'text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-faint)]',
          'font-[family-name:var(--font-family-sans)]',
          hasValue || !shortcut ? 'pr-8' : 'pr-14',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label={rest['aria-label'] ?? placeholder}
        {...rest}
        onKeyDown={handleKeyDown}
      />

      {/* Right side: shortcut hint OR clear button */}
      <span className="absolute right-3 flex items-center gap-1 pointer-events-none">
        {!hasValue && shortcut && (
          <kbd
            className="text-[10px] font-mono font-medium text-[var(--color-on-surface-faint)] bg-white/[0.06] border border-white/[0.08] px-1.5 py-0.5 rounded-md"
            aria-label={`Keyboard shortcut: ${shortcut}`}
          >
            {shortcut}
          </kbd>
        )}
        {hasValue && onClear && (
          <button
            type="button"
            onClick={() => {
              onClear();
              inputRef.current?.focus();
            }}
            className="pointer-events-auto p-0.5 rounded-md text-[var(--color-on-surface-faint)] hover:text-[var(--color-on-surface)] hover:bg-white/[0.08] transition-all duration-100"
            aria-label="Clear search"
          >
            <ClearIcon />
          </button>
        )}
      </span>
    </div>
  );
}

export default SearchInput;
