import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * Modal — Accessible dialog overlay.
 *
 * Props:
 *   open          : boolean
 *   onClose       : () => void
 *   title         : string | ReactNode
 *   description   : string | ReactNode
 *   size          : 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'  (default: 'md')
 *   hideClose     : boolean — hide the × button
 *   closeOnOverlay: boolean — close when clicking backdrop       (default: true)
 *   footer        : ReactNode — rendered in the modal footer
 *   children      : ReactNode — modal body
 *   className     : string
 */

const SIZE_CLASSES = {
  xs:   'max-w-xs',
  sm:   'max-w-sm',
  md:   'max-w-lg',
  lg:   'max-w-2xl',
  xl:   'max-w-4xl',
  full: 'max-w-[95vw] min-h-[80vh]',
};

/* Close icon */
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  hideClose = false,
  closeOnOverlay = true,
  footer,
  children,
  className = '',
}) {
  const dialogRef = useRef(null);
  const prevFocusRef = useRef(null);

  /* Trap focus within the modal */
  const trapFocus = useCallback((e) => {
    if (!dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
    if (e.key === 'Escape') onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      /* Focus the dialog after mounting */
      setTimeout(() => dialogRef.current?.focus(), 16);
      document.addEventListener('keydown', trapFocus);
    } else {
      document.body.style.overflow = '';
      prevFocusRef.current?.focus();
      document.removeEventListener('keydown', trapFocus);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', trapFocus);
    };
  }, [open, trapFocus]);

  if (!open) return null;

  const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[4px] animate-fade-in"
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Dialog panel */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
        tabIndex={-1}
        className={[
          'relative w-full rounded-2xl outline-none',
          'bg-[rgba(22,22,40,0.96)] backdrop-blur-[20px]',
          'border border-white/[0.1]',
          'shadow-[0_24px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)]',
          'flex flex-col overflow-hidden',
          'animate-fade-in',
          sizeClass,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ maxHeight: 'calc(100dvh - 48px)' }}
      >
        {/* Decorative top gradient line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(6,182,212,0.5), transparent)',
          }}
          aria-hidden="true"
        />

        {/* Header */}
        {(title || !hideClose) && (
          <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-white/[0.07] flex-shrink-0">
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className="text-base font-bold text-[var(--color-on-surface)] leading-snug"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-description"
                  className="mt-1 text-xs text-[var(--color-on-surface-muted)] leading-relaxed"
                >
                  {description}
                </p>
              )}
            </div>

            {!hideClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex-shrink-0 p-1.5 rounded-lg text-[var(--color-on-surface-faint)] hover:text-[var(--color-on-surface)] hover:bg-white/[0.06] transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
                aria-label="Close dialog"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}

        {/* Body (scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex-shrink-0 px-6 py-4 border-t border-white/[0.07] bg-white/[0.02]">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
