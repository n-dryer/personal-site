import { AnimatePresence, motion } from 'framer-motion';
import React, { forwardRef, useEffect } from 'react';
import { extractKPIs, formatKPI } from '../../utils/kpiExtractor';

import { Badge } from '../ui';
import { Card } from '../ui';
import { LucideIcon } from 'lucide-react';
import { useInView } from '../../hooks/useIntersectionObserver';

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
          id={`timeline-card-${id}`}
          className={`timeline-card group relative w-full max-w-lg cursor-pointer ${props.className}`}
          role="article"
          aria-labelledby={`timeline-title-${id}`}
          onClick={onClick}
        >
          <Card
            className={`p-6 ${isActive ? 'border-accent/50 shadow-2xl' : ''} bg-surface/80 ring-1 ring-white/5 backdrop-blur-xl transition-all duration-300`}
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="bg-surface/80 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/10 ring-1 ring-white/5 backdrop-blur-xl"
                animate={{
                  scale: isActive ? 1.08 : 1,
                }}
                transition={{
                  duration: 0.2,
                  ease: 'easeOut',
                }}
              >
                <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
              </motion.div>
              <div className="min-w-0 flex-1">
                <h3
                  id={`timeline-title-${id}`}
                  className="text-lg font-semibold leading-tight text-text-primary md:text-xl"
                >
                  {title}
                </h3>
                <p className="text-sm font-medium text-accent md:text-base">{company}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-text-secondary md:text-sm">
                  <span>{location}</span>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0, y: -8 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -8 }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeOut',
                        type: 'spring',
                        stiffness: 300,
                        damping: 35,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4">
                        <p className="mb-4 text-sm leading-relaxed text-text-secondary md:text-base">
                          {description}
                        </p>

                        {kpis.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-text-secondary/80 mb-2 text-xs font-semibold uppercase tracking-wider">
                              Key Metrics
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
                            <h4 className="text-text-secondary/80 mb-2 text-xs font-semibold uppercase tracking-wider">
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {technologies.map((tech) => (
                                <Badge key={tech} variant="tech" size="sm">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
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
