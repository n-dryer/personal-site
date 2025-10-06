import React, { useMemo } from 'react';
import { Badge } from '../Badge/Badge';

type DatePillProps = {
  /** Full date string (e.g., "Jan 2021 - Oct 2022" or "Jan 2021 - Present") */
  date: string;
  /** Whether this date pill represents the currently active timeline item */
  isActive?: boolean;
  /** Accessible label for the button */
  'aria-label'?: string;
  /** Click handler for date pill interaction */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type YearData = {
  startYear: string;
  endYear: string | null;
  present: boolean;
};

/**
 * Extracts year information from a date string
 * @param dateString - Full date range (e.g., "Jan 2021 - Oct 2022")
 * @returns Object containing start year, end year, and present flag
 */
const extractYears = (dateString: string): YearData => {
  // Match all 4-digit years in the string
  const yearMatches = dateString.match(/\b(19|20)\d{2}\b/g);
  const present = /present/i.test(dateString);

  if (!yearMatches || yearMatches.length === 0) {
    return { startYear: 'Unknown', endYear: null, present };
  }

  const startYear = yearMatches[0];
  const endYear = yearMatches.length > 1 ? yearMatches[yearMatches.length - 1] : null;

  return { startYear, endYear, present };
};

/**
 * Date pill component that displays year ranges in a compact format
 * Optimized for mobile viewports by showing only years (e.g., "2021–2022")
 */
export const DatePill = React.memo(
  ({ date, isActive = false, 'aria-label': ariaLabel, onClick }: DatePillProps) => {
    const { startYear, endYear, present } = useMemo(() => extractYears(date), [date]);

    // Determine the display label
    const label = useMemo(() => {
      if (present) {
        return `${startYear}–Present`;
      }
      if (!endYear || endYear === startYear) {
        return startYear;
      }
      return `${startYear}–${endYear}`;
    }, [startYear, endYear, present]);

    // Generate accessible label
    const accessibleLabel = useMemo(() => {
      if (ariaLabel) return ariaLabel;
      if (present) {
        return `${startYear} to Present`;
      }
      if (!endYear || endYear === startYear) {
        return startYear;
      }
      return `${startYear} to ${endYear}`;
    }, [startYear, endYear, present, ariaLabel]);

    const content = (
      <time aria-label={accessibleLabel}>
        {label}
      </time>
    );

    if (onClick) {
      return (
        <button
          type="button"
          onClick={onClick}
          aria-label={accessibleLabel}
          className="focus-visible:ring-offset-resume-bg rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resume-accent focus-visible:ring-offset-2"
        >
          <Badge
            variant="date"
            size="xs"
            data-active={isActive || undefined}
            className="md:px-2.5 md:py-1 md:text-xs"
          >
            {content}
          </Badge>
        </button>
      );
    }

    return (
      <Badge
        variant="date"
        size="xs"
        data-active={isActive || undefined}
        className="md:px-2.5 md:py-1 md:text-xs"
      >
        {content}
      </Badge>
    );
  },
);

DatePill.displayName = 'DatePill';
