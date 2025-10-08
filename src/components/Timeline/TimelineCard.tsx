import { AnimatePresence, m } from 'framer-motion';
import React, { forwardRef, useEffect } from 'react';
import { extractKPIs, formatKPI } from '../../utils/kpiExtractor';

import { Badge } from '../ui';
import { Card } from '../ui';
import { LucideIcon } from 'lucide-react';
import { useInView } from '../../hooks/useIntersectionObserver';
import { TIMELINE_CARD_ID_PREFIX } from './constants';

export type TimelineCardProps = {
  id: string;
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  icon: LucideIcon;
  achievements: string[];
  technologies: string[];
  isActive?: boolean;
  side: 'left' | 'right';
  index: number;
  onClick?: () => void;
  year: string;
  onFocus?: () => void;
  tabIndex?: number;
  'aria-describedby'?: string;
  className?: string;
  onInViewChange: (inView: boolean) => void;
};

export const TimelineCard = React.memo(
  forwardRef<HTMLElement, TimelineCardProps>(
    (
      {
        id,
        title,
        company,
        location,
        date: _date,
        description,
        icon: Icon,
        achievements,
        technologies,
        isActive = false,
        onClick,
        onInViewChange,
        ...props
      },
      ref,
    ) => {
      const kpis = extractKPIs(achievements);
      const { ref: inViewRef, inView } = useInView({
        threshold: 0.4,
        rootMargin: '-15% 0% -25% 0%',
        once: false,
      });

      const isExpanded = isActive;

      useEffect(() => {
        onInViewChange(inView);
      }, [inView, onInViewChange]);

      const combinedRef = (node: HTMLElement | null) => {
        inViewRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      };

      return (
        <article
          ref={combinedRef}
          id={`${TIMELINE_CARD_ID_PREFIX}${id}`}
          className={`timeline-card group relative w-full max-w-lg cursor-pointer ${props.className}`}
          role="article"
          aria-labelledby={`timeline-title-${id}`}
          onClick={onClick}
        >
          <Card className="p-6" hover={true}>
            <div className="flex items-start gap-4">
              <m.div
                className="bg-resume-card/90 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-resume-card-border text-resume-accent shadow-inner"
                animate={{
                  scale: isActive ? 1.08 : 1,
                }}
                transition={{
                  duration: 0.2,
                  ease: 'easeOut',
                }}
              >
                <Icon className="h-6 w-6 text-resume-accent" aria-hidden="true" />
              </m.div>
              <div className="min-w-0 flex-1">
                <h3
                  id={`timeline-title-${id}`}
                  className="text-lg font-semibold leading-tight text-resume-text-primary md:text-xl"
                >
                  {title}
                </h3>
                <p className="text-sm font-medium text-resume-accent md:text-base">{company}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-resume-text-muted md:text-sm">
                  <span>{location}</span>
                </div>

                <div className="hidden sm:block">
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <m.div
                        key="date"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="mt-1 text-xs text-resume-text-muted md:text-sm">{_date}</p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <m.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.25,
                        ease: [0.4, 0.0, 0.2, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4">
                        <p className="mb-4 font-body text-sm leading-[1.625] text-resume-text-secondary md:text-base md:leading-[1.625]">
                          {description}
                        </p>

                        {kpis.length > 0 && (
                          <div className="mb-4">
                            <h4 className="mb-2.5 text-overline uppercase text-resume-text-secondary">
                              Metrics
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {kpis.map((kpi, kpiIndex) => (
                                <Badge key={kpiIndex} variant="kpi" size="sm">
                                  {formatKPI(kpi)}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {technologies.length > 0 && (
                          <div className="mb-4">
                            <h4 className="mb-2.5 text-overline uppercase text-resume-text-secondary">
                              Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {technologies.map((tech) => (
                                <button
                                  key={tech}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const skillsSection = document.getElementById('skills');
                                    if (skillsSection) {
                                      skillsSection.scrollIntoView({ behavior: 'smooth' });
                                      // Dispatch custom event to highlight the skill
                                      window.dispatchEvent(
                                        new CustomEvent('highlight-skill', { detail: tech }),
                                      );
                                    }
                                  }}
                                  className="group/skill focus:ring-offset-resume-bg rounded-full transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-resume-accent focus:ring-offset-2"
                                  aria-label={`View ${tech} in Skills section`}
                                >
                                  <Badge variant="tech" size="sm" className="cursor-pointer">
                                    {tech}
                                  </Badge>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        </article>
      );
    },
  ),
);

TimelineCard.displayName = 'TimelineCard';
