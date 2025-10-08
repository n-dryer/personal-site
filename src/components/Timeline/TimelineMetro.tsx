import { AnimatePresence, m } from 'framer-motion';
import React, { useCallback, useMemo } from 'react';
import { Experience } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTimelineObserver } from '../../hooks/useTimelineObserver';
import { DatePill } from '../ui';
import { TimelineCard } from './TimelineCard';
import { TIMELINE_CARD_ID_PREFIX } from './constants';

type TimelineMetroProps = {
  /** Array of experience data to display in the timeline */
  experienceData: Experience[];
  /** The currently active skill filter */
  activeSkill: string | null;
};

type TimelineItem = Experience & { slug: string; year: string };

/**
 * Generate a slug from the experience start year and company
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
 * Metro map style timeline with central vertical thread and alternating cards
 * Features scroll-based active detection and smooth animations
 */
export const TimelineMetro = ({ experienceData = [], activeSkill }: TimelineMetroProps) => {
  const shouldReduceMotion = useReducedMotion();
  const { activeId, registerCard, setActiveId } = useTimelineObserver();

  const items: TimelineItem[] = useMemo(() => {
    const allItems = experienceData.map((exp) => ({ ...exp, ...toSlug(exp) }));
    if (!activeSkill) {
      return allItems;
    }
    return allItems.filter((item) =>
      item.technologies.some((tech) => tech.toLowerCase() === activeSkill.toLowerCase()),
    );
  }, [experienceData, activeSkill]);

  const handleCardInViewChange = useCallback(
    (id: string, inView: boolean) => {
      if (inView) {
        registerCard(id, document.getElementById(`${TIMELINE_CARD_ID_PREFIX}${id}`));
      }
    },
    [registerCard],
  );

  const handleCardClick = useCallback(
    (item: TimelineItem) => {
      const newActiveId = activeId === item.id ? null : item.id;
      setActiveId(newActiveId);

      // Update URL hash for deep linking
      if (newActiveId) {
        history.replaceState(null, '', `#exp=${item.slug}`);
        window.dispatchEvent(new CustomEvent('timeline:change', { detail: item.slug }));
      } else {
        // Clear hash when no card is active
        history.replaceState(null, '', window.location.pathname);
        window.dispatchEvent(new CustomEvent('timeline:change', { detail: null }));
      }
    },
    [activeId, setActiveId],
  );

  if (!items.length) {
    return (
      <section id="timeline" className="section-spacing-y">
        <div className="container-padding-x mx-auto w-full">
          <div className="relative mx-auto max-w-4xl text-center">
            <h2 className="heading-margin font-instrument text-4xl font-semibold tracking-tight text-resume-text-primary">
              Work Experience
            </h2>
            <p className="text-resume-text-secondary">
              {activeSkill ? (
                <>
                  No experience found matching{' '}
                  <strong className="text-resume-accent">{activeSkill}</strong>.
                  <br />
                  <button
                    onClick={() => {
                      const skillsSection = document.getElementById('skills');
                      if (skillsSection) {
                        skillsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="mt-2 text-resume-accent underline hover:text-resume-accent-light"
                  >
                    Try selecting a different skill
                  </button>
                </>
              ) : (
                'No work experience data available at this time.'
              )}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" className="section-spacing-y">
      <div className="container-padding-x mx-auto w-full">
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="heading-margin font-instrument text-4xl font-semibold tracking-tight text-resume-text-primary">
            Work Experience
          </h2>
        </div>

        <div className="relative mx-auto max-w-lg sm:max-w-4xl">
          {/* Timeline Cards with Date Pills */}
          <ol role="list" className="relative z-10 w-full">
            <AnimatePresence>
              {items.map((item, index) => {
                const isActive = activeId === item.id;
                const isFiltered =
                  activeSkill &&
                  !item.technologies.some(
                    (tech) => tech.toLowerCase() === activeSkill.toLowerCase(),
                  );

                return (
                  <m.li
                    key={item.id}
                    id={`${TIMELINE_CARD_ID_PREFIX}${item.id}`}
                    className={`flex min-h-[12rem] flex-col items-start sm:flex-row sm:items-start sm:gap-6 ${isFiltered ? 'opacity-40' : ''}`}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -50 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.6,
                      delay: shouldReduceMotion ? 0 : index * 0.1,
                      ease: 'easeOut',
                    }}
                  >
                    {/* Date pill - mobile above card, desktop to the left */}
                    <div className="mb-3 flex w-full justify-center sm:mb-0 sm:w-40 sm:flex-shrink-0 sm:justify-end sm:pt-6">
                      <DatePill
                        date={item.date}
                        isActive={isActive}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(item);
                        }}
                        aria-label={`View details for ${item.company}`}
                      />
                    </div>

                    {/* Timeline card */}
                    <div className="w-full flex-1">
                      <TimelineCard
                        {...item}
                        isActive={isActive}
                        side="right"
                        index={index}
                        onClick={() => handleCardClick(item)}
                        onInViewChange={(inView) => handleCardInViewChange(item.id, inView)}
                        className={`mb-8 ${isActive ? 'timeline-card--active' : ''}`}
                      />
                    </div>
                  </m.li>
                );
              })}
            </AnimatePresence>
          </ol>
        </div>
      </div>
    </section>
  );
};
