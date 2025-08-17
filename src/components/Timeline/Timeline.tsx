import React, { useEffect, useMemo, useRef, useState, KeyboardEvent } from 'react';
import { Experience } from '../../types';

/**
 * Props for the Timeline component.
 */
type TimelineProps = {
  /** Array of experience data to display */
  experienceData: Experience[];
};

/** Create a slug from start year and company */
const buildSlug = (exp: Experience): string => {
  const yearMatch = exp.date.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? yearMatch[0] : '0000';
  return `${year}-${exp.company}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

/** Group experiences by start year */
const groupByYear = (items: (Experience & { slug: string; index: number })[]) => {
  const groups: Record<string, (Experience & { slug: string; index: number })[]> = {};
  items.forEach((item) => {
    const yearMatch = item.date.match(/\b(19|20)\d{2}\b/);
    const year = yearMatch ? yearMatch[0] : 'Unknown';
    if (!groups[year]) groups[year] = [];
    groups[year].push(item);
  });
  return Object.entries(groups).sort((a, b) => Number(b[0]) - Number(a[0]));
};

/**
 * Desktop master-detail timeline with mobile fallback.
 */
export const Timeline = ({ experienceData }: TimelineProps) => {
  const items = useMemo(
    () =>
      experienceData.map((exp, index) => ({
        ...exp,
        slug: exp.slug ?? buildSlug(exp),
        index,
      })),
    [experienceData],
  );

  const groups = useMemo(() => groupByYear(items), [items]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug);

  // Select from hash on mount
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/exp=([^&]+)/);
    if (match) {
      const slug = decodeURIComponent(match[1]);
      if (items.some((i) => i.slug === slug)) {
        setActiveSlug(slug);
      }
    }
  }, [items]);

  const select = (slug: string, index: number) => {
    setActiveSlug(slug);
    history.replaceState(null, '', `#exp=${slug}`);
    window.dispatchEvent(new CustomEvent('exp-change', { detail: slug }));
    if (window.innerWidth < 1024) {
      document.getElementById('timeline-panel')?.scrollIntoView({ behavior: 'smooth' });
    }
    tabRefs.current[index]?.focus();
  };

  const handleKey = (e: KeyboardEvent, index: number) => {
    const max = items.length - 1;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = index === max ? 0 : index + 1;
      select(items[next].slug, next);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = index === 0 ? max : index - 1;
      select(items[prev].slug, prev);
    } else if (e.key === 'Home') {
      e.preventDefault();
      select(items[0].slug, 0);
    } else if (e.key === 'End') {
      e.preventDefault();
      select(items[max].slug, max);
    }
  };

  const active = items.find((i) => i.slug === activeSlug) ?? items[0];

  return (
    <section id="timeline" className="bg-bg-surface-subtle py-[var(--space-section)]">
      <div className="container mx-auto w-full px-4 lg:grid lg:grid-cols-[320px_1fr] lg:gap-[var(--space-8)]">
        <div
          role="tablist"
          aria-orientation="vertical"
          className="mb-[var(--space-8)] flex flex-col lg:mb-0 lg:max-h-[calc(100vh-2*var(--space-section))] lg:overflow-y-auto"
        >
          {groups.map(([year, exps]) => (
            <div key={year} className="pb-[var(--space-4)]">
              <div className="bg-bg-surface-subtle sticky top-0 z-10 py-[var(--space-1)] text-sm font-semibold text-text-secondary">
                {year}
              </div>
              {exps.map((exp) => (
                <button
                  key={exp.slug}
                  ref={(el) => {
                    tabRefs.current[exp.index] = el;
                  }}
                  id={`tab-${exp.slug}`}
                  role="tab"
                  type="button"
                  aria-selected={active.slug === exp.slug}
                  aria-controls="timeline-panel"
                  tabIndex={active.slug === exp.slug ? 0 : -1}
                  onClick={() => select(exp.slug, exp.index)}
                  onKeyDown={(e) => handleKey(e, exp.index)}
                  className={`w-full rounded-md px-[var(--space-4)] py-[var(--space-2)] text-left transition-colors motion-reduce:transition-none ${
                    active.slug === exp.slug
                      ? 'bg-accent text-on-accent'
                      : 'hover:bg-text-secondary/10'
                  }`}
                  style={{ minHeight: 44 }}
                >
                  <span className="block text-sm font-medium leading-snug">{exp.title}</span>
                  <span className="block text-xs text-text-secondary">{exp.company}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div
          id="timeline-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`tab-${active.slug}`}
          className="rounded-lg bg-bg-surface p-[var(--space-6)] shadow-md"
        >
          <h3 className="font-display text-2xl font-semibold tracking-tight">{active.title}</h3>
          <p className="text-text-secondary">
            {active.company} • {active.location}
          </p>
          <p className="mt-[var(--space-4)]">{active.description}</p>
          {active.achievements && active.achievements.length > 0 && (
            <ul className="mt-[var(--space-4)] list-disc space-y-2 pl-[var(--space-5)]">
              {active.achievements.map((ach, i) => (
                <li key={i} className="text-sm">
                  {ach}
                </li>
              ))}
            </ul>
          )}
          {active.technologies && active.technologies.length > 0 && (
            <div className="mt-[var(--space-4)] flex flex-wrap gap-2">
              {active.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="bg-text-secondary/10 rounded-full px-3 py-[var(--space-1)] text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* Manual QA checklist
- Arrow Up/Down, Home/End move focus and selection within the tablist
- Tab/Shift+Tab move focus out of the tablist and panel
- Hash deep-link #exp={slug} selects matching item on load
- Selecting a tab updates hash and dispatches exp-change event
- Prefers-reduced-motion respected via motion-reduce utilities
- Buttons maintain ≥44px hit area
- Year headers remain sticky while scrolling
- Mobile: tablist stacks above panel and selection scrolls panel into view
*/
