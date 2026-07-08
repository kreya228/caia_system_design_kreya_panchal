import React, { useState } from 'react';

/**
 * Table — Feature-rich data table component.
 *
 * Props:
 *   columns        : Array<{
 *                      key       : string,
 *                      header    : ReactNode,
 *                      render?   : (value, row, index) => ReactNode,
 *                      align?    : 'left' | 'center' | 'right',
 *                      sortable? : boolean,
 *                      width?    : string   (e.g. '120px', '20%')
 *                    }>
 *   data           : Array<object>
 *   keyField       : string — unique key in each row object   (default: 'id')
 *   loading        : boolean — shows skeleton rows
 *   emptyState     : ReactNode — shown when data is empty
 *   onRowClick     : (row) => void
 *   stickyHeader   : boolean
 *   striped        : boolean
 *   compact        : boolean — tighter row padding
 *   caption        : string — accessible table caption (screen readers)
 *   className      : string
 */

/* Sort icons */
const SortIcon = ({ direction }) => (
  <span className="inline-flex flex-col ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden="true">
    <svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor" style={{ opacity: direction === 'asc' ? 1 : 0.3 }}>
      <path d="M4 0L8 5H0L4 0z" />
    </svg>
    <svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor" style={{ opacity: direction === 'desc' ? 1 : 0.3 }}>
      <path d="M4 5L0 0H8L4 5z" />
    </svg>
  </span>
);

/* Skeleton row */
function SkeletonRow({ cols, compact }) {
  return (
    <tr aria-hidden="true">
      {cols.map((_, i) => (
        <td key={i} className={compact ? 'px-4 py-2' : 'px-4 py-3.5'}>
          <div
            className="h-3.5 rounded-md bg-white/[0.06] animate-pulse"
            style={{ width: `${55 + Math.random() * 30}%` }}
          />
        </td>
      ))}
    </tr>
  );
}

function Table({
  columns = [],
  data = [],
  keyField = 'id',
  loading = false,
  emptyState,
  onRowClick,
  stickyHeader = false,
  striped = false,
  compact = false,
  caption,
  className = '',
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  function handleSort(colKey) {
    if (sortKey === colKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(colKey);
      setSortDir('asc');
    }
  }

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av === bv) return 0;
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const cellPad = compact ? 'px-4 py-2 text-xs' : 'px-4 py-3.5 text-xs';
  const headPad = compact ? 'px-4 py-2' : 'px-4 py-3';
  const clickable = typeof onRowClick === 'function';

  return (
    <div
      className={[
        'w-full overflow-x-auto rounded-xl border border-[var(--color-border)]',
        'bg-[rgba(15,15,26,0.5)] backdrop-blur-[8px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <table
        className="w-full border-collapse text-left"
        aria-label={caption}
      >
        {caption && <caption className="sr-only">{caption}</caption>}

        {/* Head */}
        <thead
          className={[
            'text-[10px] font-semibold tracking-widest uppercase text-[var(--color-on-surface-faint)]',
            'border-b border-[var(--color-border)]',
            stickyHeader ? 'sticky top-0 z-10 bg-[rgba(15,15,26,0.95)] backdrop-blur-[8px]' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <tr>
            {columns.map((col) => {
              const align = col.align ?? 'left';
              const isSorted = sortKey === col.key;
              return (
                <th
                  key={col.key}
                  scope="col"
                  style={{ width: col.width }}
                  className={[
                    headPad,
                    align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left',
                    col.sortable ? 'cursor-pointer select-none group' : '',
                    isSorted ? 'text-[var(--color-on-surface-muted)]' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  aria-sort={
                    col.sortable && isSorted
                      ? sortDir === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  <span className="inline-flex items-center">
                    {col.header}
                    {col.sortable && (
                      <SortIcon direction={isSorted ? sortDir : null} />
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-white/[0.04]">
          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} cols={columns} compact={compact} />
            ))}

          {!loading &&
            sortedData.map((row, rowIdx) => (
              <tr
                key={row[keyField] ?? rowIdx}
                onClick={clickable ? () => onRowClick(row) : undefined}
                className={[
                  'transition-colors duration-100',
                  striped && rowIdx % 2 === 0 ? 'bg-white/[0.01]' : '',
                  clickable ? 'cursor-pointer hover:bg-white/[0.04]' : 'hover:bg-white/[0.02]',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-selected={clickable ? undefined : undefined}
              >
                {columns.map((col) => {
                  const value = row[col.key];
                  const align = col.align ?? 'left';
                  return (
                    <td
                      key={col.key}
                      className={[
                        cellPad,
                        'text-[var(--color-on-surface-muted)]',
                        align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {col.render ? col.render(value, row, rowIdx) : value}
                    </td>
                  );
                })}
              </tr>
            ))}

          {!loading && sortedData.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-16 text-center">
                {emptyState ?? (
                  <span className="text-xs text-[var(--color-on-surface-faint)]">
                    No results found.
                  </span>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
