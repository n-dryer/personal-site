import { AnimatePresence, motion, easeOut } from 'framer-motion';

import { Experience } from '../../types';
import React from 'react';

/**
 * Props for the TimelineItem component.
 */
type TimelineItemProps = {
  item: Experience;
  isExpanded: boolean;
  getYearRange: (dateString: string) => string;
  toggleExpand: (id: string) => void;
  announceStateChange: (id: string, isExpanding: boolean) => void;
  handleKeyDown: (e: React.KeyboardEvent, id: string) => void;
  setTimelineRef: (id: string) => (el: HTMLDivElement | null) => void;
  shouldReduceMotion: boolean;
  itemIndex: number;
  itemsCount: number;
};

// Animation variants for individual timeline items
const timelineItemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

/**
 * TimelineItemComponent renders a single item in the professional timeline.
 * It handles the display of experience details and manages its own expand/collapse animation state.
 * @param {TimelineItemProps} props - The properties passed to the component.
 * @returns {React.ReactElement} The rendered TimelineItemComponent.
 */
const TimelineItemComponent = ({
  item,
  isExpanded,
  getYearRange,
  toggleExpand,
  announceStateChange,
  handleKeyDown,
  setTimelineRef,
  shouldReduceMotion,
  itemIndex,
  itemsCount,
}: TimelineItemProps): React.ReactElement => {
  const { id, title, company, location, date, technologies, icon: IconComponent } = item;

  return (
    <React.Fragment>
      {/* VERTICAL LINE / ICON - Renders the timeline's central vertical line and icon for each item. */}
      <div
        className="col-start-1 flex items-center justify-center md:col-start-2"
        style={{ gridRow: `${itemIndex * 2 + 1} / span 2` }}
      >
        {/* Vertical line that connects timeline items, extending into the grid gap. */}
        <div
          className="absolute w-px bg-accent"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            top: itemIndex === 0 ? '50%' : 'calc(var(--timeline-gap-y, 2rem) / -2)', // Use custom property for grid gap.
            bottom: itemIndex === itemsCount - 1 ? '50%' : 'calc(var(--timeline-gap-y, 2rem) / -2)',
          }}
          aria-hidden="true"
        />

        {/* Icon button, centered over the line. */}
        <button
          className={`timeline-icon timeline-icon-focus absolute flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-accent text-on-accent shadow-lg`}
          onClick={() => {
            toggleExpand(id);
            announceStateChange(id, !isExpanded);
          }}
          onKeyDown={(e) => handleKeyDown(e, id)}
          type="button"
          role="button"
          aria-expanded={isExpanded}
          aria-controls={`timeline-content-${id}`}
          aria-labelledby={`timeline-title-${id}`}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for ${title} at ${company}`}
          aria-describedby={`timeline-content-${id}`}
        >
          <IconComponent size={20} />
        </button>
      </div>

      {/* YEAR */}
      <div
        className="col-start-1 self-center text-right text-sm font-semibold text-text-secondary md:col-start-1"
        style={{ gridRow: itemIndex * 2 + 1 }}
      >
        {getYearRange(date)}
      </div>

      {/* CARD */}
      <div
        className="col-start-2 md:col-start-3"
        style={{ gridRow: `${itemIndex * 2 + 1} / span 2`, paddingBottom: 'var(--space-8)' }}
      >
        <motion.div
          ref={setTimelineRef(id)}
          className="timeline-grid-item"
          variants={shouldReduceMotion ? undefined : timelineItemVariants}
        >
          <motion.div
            layout="position"
            id={`timeline-content-${id}`}
            className={`timeline-card-wrapper relative w-full`}
            initial={false}
            animate={{
              transition: shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.4,
                    ease: easeOut,
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  },
            }}
          >
            <motion.div
              layout="position"
              className={`timeline-card-hover timeline-card-focus glass-surface relative cursor-pointer rounded-lg border border-white/10 p-4 text-left shadow-sm ${shouldReduceMotion ? '' : 'transition-all duration-300'}`}
              data-view-transition-name={`timeline-card-${itemIndex + 1}`}
              style={
                {
                  '--view-transition-name': `timeline-card-${itemIndex + 1}`,
                  backgroundColor: 'var(--bg-primary)',
                } as React.CSSProperties
              }
              onClick={() => {
                toggleExpand(id);
                announceStateChange(id, !isExpanded);
              }}
              role="button"
              tabIndex={0}
              aria-controls={`timeline-expanded-${id}`}
              aria-labelledby={`timeline-title-${id}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleExpand(id);
                  announceStateChange(id, !isExpanded);
                }
                handleKeyDown(e, id);
              }}
            >
              <motion.div layout="position" className="space-y-2">
                <h3
                  id={`timeline-title-${id}`}
                  className={`text-base font-semibold leading-tight text-text-primary md:text-lg`}
                >
                  {company}
                </h3>
                <p className={`text-sm font-medium leading-snug text-text-secondary md:text-base`}>
                  {title}
                </p>
                {isExpanded && (
                  <p className="text-sm font-normal text-text-secondary">{location}</p>
                )}
              </motion.div>
              <AnimatePresence mode="wait">
                {isExpanded && (
                  <motion.div
                    id={`timeline-expanded-${id}`}
                    className="timeline-expanded-content pt-4"
                    data-view-transition-name={`expanded-content-${itemIndex + 1}`}
                    style={
                      {
                        overflow: 'hidden',
                        '--view-transition-name': `expanded-content-${itemIndex + 1}`,
                      } as React.CSSProperties
                    }
                    initial={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                            height: 'auto',
                            transition: {
                              duration: 0.3,
                              ease: easeOut,
                              staggerChildren: 0.1,
                              type: 'spring',
                              stiffness: 300,
                              damping: 30,
                            },
                          }
                    }
                    exit={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 0,
                            height: 0,
                            transition: {
                              duration: 0.2,
                              ease: easeOut,
                            },
                          }
                    }
                  >
                    <motion.div
                      className="space-y-4"
                      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={shouldReduceMotion ? undefined : { delay: 0.05 }}
                    >
                      {technologies && (
                        <div>
                          <div className="flex flex-wrap justify-start gap-2">
                            {technologies.map((tech, techIdx) => (
                              <span
                                key={techIdx}
                                className="bg-text-secondary/10 hover:bg-text-secondary/20 inline-block rounded-full px-3 py-[var(--space-1)] text-sm font-medium text-text-secondary backdrop-blur-sm transition-colors duration-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Placeholder for achievements and projects if they are to be displayed */}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </React.Fragment>
  );
};

export const TimelineItem = React.memo(TimelineItemComponent);
