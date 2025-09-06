import React from 'react';

type DatePillProps = {
  date: string;
  isActive?: boolean;
};

export const DatePill = React.memo(({ date, isActive }: DatePillProps) => {
  return (
    <div
      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 ${
        isActive
          ? 'border-accent bg-accent text-on-accent'
          : 'border-text-secondary/30 bg-surface text-text-secondary'
      }`}
    >
      {date}
    </div>
  );
});

DatePill.displayName = 'DatePill';
