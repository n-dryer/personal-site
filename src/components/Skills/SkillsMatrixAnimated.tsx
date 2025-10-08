import { cn } from '@/utils/cn';
import { AnimatePresence, m } from 'framer-motion';
import { CATEGORY_FILTERS, CategoryKey } from './config';
import React, { useCallback, useMemo, useState } from 'react';
import { Skill } from '../../types';
import { useViewTransitions } from '../../hooks/useViewTransitions';
import { Badge } from '../ui';

type SkillsMatrixProps = {
  /** Array of skill data to display */
  skillsData: Skill[];
  /** The currently active skill filter */
  activeSkill: string | null;
  /** Function to set the active skill filter */
  setActiveSkill: (skill: string | null) => void;
};

type GroupKey = 'all' | CategoryKey;

export const SkillsMatrix = React.memo<SkillsMatrixProps>(
  ({ skillsData, activeSkill, setActiveSkill }) => {
    const { withViewTransition } = useViewTransitions();
    const [activeGroup, setActiveGroup] = useState<GroupKey>('all');

    const toggleGroup = useCallback(
      (group: GroupKey): void => {
        withViewTransition(() => {
          setActiveGroup((prev) => (prev === group ? 'all' : group));
        });
      },
      [withViewTransition],
    );

    const handleSkillClick = (skillName: string) => {
      setActiveSkill(activeSkill === skillName ? null : skillName);
    };

    const filteredSkills = useMemo(() => {
      if (activeGroup === 'all') return skillsData;
      return skillsData.filter((s) => s.category === activeGroup);
    }, [skillsData, activeGroup]);

    return (
      <section id="skills" className="section-spacing-y">
        <div className="container-padding-x mx-auto w-full">
          <h2 className="heading-margin text-center font-instrument text-4xl font-semibold tracking-tight text-resume-text-primary">
            Skills
          </h2>

          {/* Category Filters */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {CATEGORY_FILTERS.map((filter) => {
              const isActive = activeGroup === filter.id;
              return (
                <m.button
                  key={filter.id}
                  onClick={() => toggleGroup(filter.id as GroupKey)}
                  role="button"
                  aria-pressed={isActive}
                  aria-label={`Filter by ${filter.label}`}
                  className="focus-visible:ring-offset-resume-bg group min-h-[44px] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resume-accent focus-visible:ring-offset-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                >
                  <Badge
                    variant="date"
                    size="sm"
                    data-active={isActive || undefined}
                    className="cursor-pointer px-3 py-1.5 text-xs transition-colors duration-300 group-hover:text-resume-accent md:px-4 md:py-2 md:text-sm"
                  >
                    {filter.label}
                  </Badge>
                </m.button>
              );
            })}
            {activeSkill && (
              <m.button
                onClick={() => setActiveSkill(null)}
                role="button"
                aria-label="Clear skill filter"
                className="focus-visible:ring-offset-resume-bg group min-h-[44px] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resume-accent focus-visible:ring-offset-2"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98, y: 0 }}
              >
                <Badge
                  variant="date"
                  size="sm"
                  data-active={true}
                  className="cursor-pointer border-2 px-3 py-1.5 text-xs transition-colors duration-300 group-hover:text-resume-accent-light md:px-4 md:py-2 md:text-sm"
                >
                  Clear Filter
                </Badge>
              </m.button>
            )}
          </div>

          {/* Skills Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <m.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="group relative"
                >
                  <button
                    onClick={() => handleSkillClick(skill.name)}
                    aria-label={`Filter timeline by ${skill.name}`}
                    aria-pressed={activeSkill === skill.name}
                    className={cn(
                      'focus:ring-offset-resume-bg min-h-[44px] rounded-full transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-resume-accent focus:ring-offset-2',
                      activeSkill === skill.name ? 'scale-105' : '',
                    )}
                  >
                    <Badge
                      variant="tech"
                      size="sm"
                      className={
                        activeSkill === skill.name
                          ? 'cursor-pointer border-resume-accent shadow-md transition-all duration-200'
                          : 'cursor-pointer'
                      }
                    >
                      {skill.name}
                    </Badge>
                  </button>
                  {/* Tooltip */}
                  <div
                    className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max max-w-xs -translate-x-1/2 rounded-lg border border-resume-card-border bg-resume-card px-3 py-2 text-xs text-resume-text-primary opacity-0 shadow-2xl backdrop-blur-xl transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                    role="tooltip"
                  >
                    <div className="font-semibold">{skill.tier}</div>
                    <div className="text-resume-text-secondary">{skill.evidence}</div>
                  </div>
                </m.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    );
  },
);
