import { AnimatePresence, motion } from 'framer-motion';
import {
  CATEGORY_FILTERS,
  CategoryKey,
  TIER_META,
  TIER_ORDER,
  mapLegacyTierToDepth,
} from './config';
import React, { useCallback, useMemo, useState } from 'react';

import { Skill } from '../../types';
import { useViewTransitions } from '../../hooks/useViewTransitions';

/**
 * Props for the Skills component.
 */
type SkillsProps = {
  /** Array of skill data to display. */
  skillsData: Skill[];
};

type GroupKey = 'all' | CategoryKey; // new categories
type TierKey = 'all' | 'Expert' | 'Proficient' | 'Familiar';

/**
 * SkillsComponent displays a categorized and filterable list of skills with proficiency levels.
 * It uses animations and view transitions for a smooth user experience.
 * @param {SkillsProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered SkillsComponent.
 */
const SkillsComponent = ({ skillsData }: SkillsProps) => {
  const { withViewTransition } = useViewTransitions();
  const [activeGroup, setActiveGroup] = useState<GroupKey>('all');
  const [activeTier, setActiveTier] = useState<TierKey>('all');

  const toggleGroup = useCallback(
    (group: GroupKey): void => {
      withViewTransition(() => {
        setActiveGroup((prev) => (prev === group ? 'all' : group));
      });
    },
    [withViewTransition],
  );

  const toggleTier = useCallback(
    (tier: TierKey): void => {
      withViewTransition(() => {
        setActiveTier((prev) => (prev === tier ? 'all' : tier));
      });
    },
    [withViewTransition],
  );

  const filteredByTier = useMemo(() => {
    if (activeTier === 'all') return skillsData;
    return skillsData.filter((s) => mapLegacyTierToDepth(s.tier) === activeTier);
  }, [skillsData, activeTier]);

  const byCategory = useMemo(() => {
    const categories: Record<CategoryKey, typeof skillsData> = {
      languages_runtimes: [],
      frameworks_libraries: [],
      ai_ml_tooling: [],
      infra_devops: [],
      design_ux: [],
    };
    filteredByTier.forEach((s) => {
      // Back-compat mapping: map legacy 'group' into categories if 'category' missing
      const inferredCategory: CategoryKey = s.category
        ? s.category
        : s.group === 'technical'
          ? 'frameworks_libraries'
          : 'design_ux';
      categories[inferredCategory].push(s);
    });
    // Sort each category by depth then name
    (Object.keys(categories) as CategoryKey[]).forEach((cat) => {
      categories[cat] = categories[cat].slice().sort((a, b) => {
        const aTier = mapLegacyTierToDepth(a.tier);
        const bTier = mapLegacyTierToDepth(b.tier);
        const tierDiff = TIER_ORDER.indexOf(aTier) - TIER_ORDER.indexOf(bTier);
        if (tierDiff !== 0) return tierDiff;
        return a.name.localeCompare(b.name);
      });
    });
    return categories;
  }, [filteredByTier]);

  return (
    <section id="skills" className="bg-bg-surface-subtle py-[var(--space-12)]">
      <div className="container mx-auto w-full px-4">
        <h2 className="mb-6 text-center font-display text-4xl font-semibold tracking-tight">
          Skills & Expertise
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center font-light tracking-wide text-text-secondary">
          Professional competencies across technical and leadership domains
        </p>
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {CATEGORY_FILTERS.map((filter) => {
            const isActive = activeGroup === filter.id;
            return (
              <motion.button
                key={filter.id}
                onClick={() => toggleGroup(filter.id as GroupKey)}
                className={`rounded-full px-[var(--space-5)] py-[var(--space-2)] text-sm font-medium shadow-sm transition-all md:text-base ${
                  isActive
                    ? 'bg-accent text-on-accent'
                    : 'bg-surface hover:bg-text-secondary/10 glass-surface text-text-primary'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                style={{ minHeight: 44 }}
              >
                {filter.label}
              </motion.button>
            );
          })}
        </div>
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {(['all', 'Expert', 'Proficient', 'Familiar'] as TierKey[]).map((tier) => {
            const isActive = activeTier === tier;
            return (
              <motion.button
                key={tier}
                onClick={() => toggleTier(tier)}
                className={`rounded-full px-[var(--space-5)] py-[var(--space-2)] text-sm font-medium shadow-sm transition-all md:text-base ${
                  isActive
                    ? 'bg-accent text-on-accent'
                    : 'bg-surface hover:bg-text-secondary/10 glass-surface text-text-primary'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                style={{ minHeight: 44 }}
              >
                {tier === 'all' ? 'All Depths' : tier}
              </motion.button>
            );
          })}
        </div>
        {(
          [
            'languages_runtimes',
            'frameworks_libraries',
            'ai_ml_tooling',
            'infra_devops',
            'design_ux',
          ] as CategoryKey[]
        )
          .filter((category) => activeGroup === 'all' || activeGroup === category)
          .map((category) => {
            const skills = byCategory[category];
            if (!skills || skills.length === 0) return null;
            const sectionTitleMap: Record<CategoryKey, string> = {
              languages_runtimes: 'Languages & Runtimes',
              frameworks_libraries: 'Frameworks & Libraries',
              ai_ml_tooling: 'AI/ML & Tooling',
              infra_devops: 'Infra & DevOps',
              design_ux: 'Design & UX',
            };
            return (
              <div key={category} className="mb-10">
                <h3 className="mb-4 text-xl font-semibold tracking-tight">
                  {sectionTitleMap[category]}
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <AnimatePresence>
                    {skills.map((skill) => {
                      const depth = mapLegacyTierToDepth(skill.tier);
                      const tierMeta = TIER_META[depth];
                      return (
                        <motion.div
                          key={skill.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="skill-card bg-surface border-text-secondary/10 glass-surface overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md"
                          whileHover={{ y: -6 }}
                          role="group"
                          tabIndex={0}
                          aria-label={`${skill.name}, ${tierMeta.ariaLabel}`}
                          style={{ minHeight: 44 }}
                        >
                          <div className="w-full p-5">
                            <div className="mb-2 flex items-start justify-between gap-2">
                              <h4 className="text-lg font-semibold text-text-primary">
                                {skill.name}
                              </h4>
                              <span
                                className="rounded-full px-2 py-1 text-xs font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                style={{
                                  backgroundColor: `color-mix(in srgb, ${tierMeta.color} 20%, transparent)`,
                                  color: tierMeta.color,
                                }}
                                aria-label={`${tierMeta.ariaLabel} for ${skill.name}`}
                                tabIndex={0}
                              >
                                {depth}
                              </span>
                            </div>
                            {skill.evidence && (
                              <p className="text-sm text-text-secondary">{skill.evidence}</p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}

        {(
          [
            'languages_runtimes',
            'frameworks_libraries',
            'ai_ml_tooling',
            'infra_devops',
            'design_ux',
          ] as CategoryKey[]
        ).every((cat) => (byCategory[cat] || []).length === 0) && (
          <motion.div
            className="bg-surface rounded-lg py-10 text-center shadow-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <p className="font-medium text-text-secondary">No matching skills.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

/**
 * Memoized Skills component for performance optimization.
 * This component displays a filterable grid of skills with proficiency levels.
 * @see SkillsComponent
 */
export const Skills = React.memo(SkillsComponent);
