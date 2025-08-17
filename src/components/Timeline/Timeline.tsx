import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Experience } from '../../types';

/**
 * Props for the Timeline component.
 */
type TimelineProps = {
  /** Array of experience data to display in the timeline. */
  experienceData: Experience[];
};

type TimelineItem = Experience & { slug: string; year: string };

/**
 * Generate a slug from the experience start year and company.
 */
const toSlug = (exp: Experience): { slug: string; year: string } => {
  const yearMatch = exp.date.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? yearMatch[0] : 'na';
  const companySlug = exp.company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return { slug: `${year}-${companySlug}`, year };
};

/**
 * Accessible master-detail timeline with vertical tabs.
 * Desktop: two-column grid with sticky tab rail and detail panel.
 * Mobile: stacked list with detail panel below.
 */
export const Timeline = ({ experienceData }: TimelineProps) => {
  const items: TimelineItem[] = useMemo(
    () => experienceData.map((exp) => ({ ...exp, ...toSlug(exp) })),
    [experienceData],
  );

  const [activeSlug, setActiveSlug] = useState(items[0]?.slug);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Select tab based on hash on mount
  useEffect(() => {
    const match = window.location.hash.match(/exp=([^&]+)/);
    if (match && items.some((i) => i.slug === match[1])) {
      setActiveSlug(match[1]);
    }
  }, [items]);

  const selectTab = useCallback((slug: string, idx: number) => {
    setActiveSlug(slug);
    history.replaceState(null, '', `#exp=${slug}`);
    window.dispatchEvent(new CustomEvent('timeline:change', { detail: slug }));
    if (!window.matchMedia('(min-width: 1024px)').matches) {
      requestAnimationFrame(() => {
        document
          .getElementById(`panel-${slug}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    tabRefs.current[idx]?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const max = items.length - 1;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = index === max ? 0 : index + 1;
      tabRefs.current[next]?.focus();
      selectTab(items[next].slug, next);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = index === 0 ? max : index - 1;
      tabRefs.current[prev]?.focus();
      selectTab(items[prev].slug, prev);
    } else if (e.key === 'Home') {
      e.preventDefault();
      tabRefs.current[0]?.focus();
      selectTab(items[0].slug, 0);
    } else if (e.key === 'End') {
      e.preventDefault();
      tabRefs.current[max]?.focus();
      selectTab(items[max].slug, max);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectTab(items[index].slug, index);
    }
  };

  return (
    <section id="timeline" className="bg-bg-surface-subtle px-4 py-[var(--space-section)]">
      <div className="container mx-auto w-full">
        <h2 className="mb-6 text-center font-display text-4xl font-semibold tracking-tight">
          Professional Timeline
        </h2>
        <div className="lg:grid lg:grid-cols-[360px_1fr] lg:gap-x-[var(--space-8)]">
          <div className="lg:sticky lg:top-[var(--space-8)]">
            <div
              role="tablist"
              aria-orientation="vertical"
              className="flex flex-col gap-[var(--space-2)]"
            >
              {items.map((item, idx) => {
                const isSelected = item.slug === activeSlug;
                const showYear = idx === 0 || item.year !== items[idx - 1].year;
                return (
                  <React.Fragment key={item.slug}>
                    {showYear && (
                      <div className="sticky top-0 z-10 bg-bg-surface py-[var(--space-1)] text-xs font-semibold text-text-secondary">
                        {item.year}
                      </div>
                    )}
                    <button
                      ref={(el) => {
                        tabRefs.current[idx] = el;
                      }}
                      id={`tab-${item.slug}`}
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls={`panel-${item.slug}`}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => selectTab(item.slug, idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className={`w-full rounded-lg px-[var(--space-4)] py-[var(--space-2)] text-left motion-reduce:transition-none transition-colors ${
                        isSelected
                          ? 'bg-accent text-on-accent'
                          : 'bg-bg-surface text-text-primary hover:bg-text-secondary/10'
                      }`}
                      style={{ minHeight: 44 }}
                    >
                      <span className="block text-sm font-semibold">{item.company}</span>
                      <span className="block text-xs text-text-secondary">{item.title}</span>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="mt-[var(--space-8)] lg:mt-0">
            {items.map((item) => {
              const isSelected = item.slug === activeSlug;
              return (
                <article
                  key={item.slug}
                  id={`panel-${item.slug}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${item.slug}`}
                  hidden={!isSelected}
                  className="space-y-[var(--space-4)] rounded-lg bg-bg-surface p-[var(--space-5)] shadow-sm"
                >
                  <header className="space-y-[var(--space-1)]">
                    <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                    <p className="text-sm text-text-secondary">
                      {item.company} • {item.location}
                    </p>
                    <p className="text-sm text-text-secondary">{item.date}</p>
                  </header>
                  <p className="text-text-secondary">{item.description}</p>
                  {item.achievements.length > 0 && (
                    <ul className="list-disc space-y-[var(--space-1)] pl-[var(--space-4)]">
                      {item.achievements.map((ach, i) => (
                        <li key={i} className="text-sm">
                          {ach}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-text-secondary/10 rounded-full px-3 py-[var(--space-1)] text-xs font-medium text-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/*
Manual QA checklist:
- Arrow Up/Down/Home/End navigate tabs
- Tab/Shift+Tab move focus in/out of tablist
- Click or Enter/Space selects tab and updates hash without scrolling
- URL deep-link #exp=slug preselects matching item
- dispatches 'timeline:change' event on selection
- Sticky year headers in tablist
- Tap targets >=44px, verify on mobile
- Panel respects prefers-reduced-motion
*/
