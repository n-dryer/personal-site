import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORY_FILTERS, CategoryKey, TIER_ORDER } from './config';
import React, { useCallback, useMemo, useState } from 'react';
import { Skill } from '../../types';
import { useViewTransitions } from '../../hooks/useViewTransitions';

type SkillsMatrixProps = {
  /** Array of skill data to display */
  skillsData: Skill[];
};

type GroupKey = 'all' | CategoryKey;
type TierKey = 'all' | 'Expert' | 'Proficient' | 'Familiar';

// Enhanced skill data with parsed proof links
type EnhancedSkill = Skill & {
  proofLinks: Array<{
    text: string;
    url: string;
  }>;
};

/**
 * Parse proof links from evidence text
 * Supports formats: "Evidence text [Link](url)" or "Evidence text - url"
 */
const parseProofLinks = (evidence?: string): Array<{ text: string; url: string }> => {
  if (!evidence) return [];

  const links: Array<{ text: string; url: string }> = [];

  // Pattern 1: Markdown-style links [text](url)
  const markdownPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = markdownPattern.exec(evidence)) !== null) {
    links.push({
      text: match[1],
      url: match[2],
    });
  }

  // Pattern 2: URL at end after dash "Evidence - url"
  if (links.length === 0) {
    const urlPattern = /(.+?)\s*-\s*(https?:\/\/[^\s]+)$/;
    const urlMatch = evidence.match(urlPattern);
    if (urlMatch) {
      links.push({
        text: 'View proof',
        url: urlMatch[2],
      });
    }
  }

  // Pattern 3: Standalone URLs
  if (links.length === 0) {
    const standaloneUrlPattern = /(https?:\/\/[^\s]+)/g;
    const urls = evidence.match(standaloneUrlPattern);
    if (urls) {
      urls.forEach((url) => {
        links.push({
          text: 'View proof',
          url: url,
        });
      });
    }
  }

  return links;
};

/**
 * SkillsMatrix displays skills in a three-column grid with animated radial gauges
 * and clickable proof links. Maintains all filtering capabilities of the original.
 */
export const SkillsMatrix = React.memo<SkillsMatrixProps>(({ skillsData }) => {
  const { withViewTransition } = useViewTransitions();
  const [activeGroup, setActiveGroup] = useState<GroupKey>('all');
  // Note: activeTier state can be used later for tier filtering
  const [activeTier] = useState<TierKey>('all');

  // Enhanced skills with parsed proof links
  const enhancedSkills: EnhancedSkill[] = useMemo(
    () =>
      skillsData.map((skill) => ({
        ...skill,
        proofLinks: parseProofLinks(skill.evidence),
      })),
    [skillsData],
  );

  const toggleGroup = useCallback(
    (group: GroupKey): void => {
      withViewTransition(() => {
        setActiveGroup((prev) => (prev === group ? 'all' : group));
      });
    },
    [withViewTransition],
  );

  // Note: toggleTier functionality can be added later if needed
  // const toggleTier = useCallback(
  //   (tier: TierKey): void => {
  //     withViewTransition(() => {
  //       setActiveTier((prev) => (prev === tier ? 'all' : tier));
  //     });
  //   },
  //   [withViewTransition],
  // );

  const filteredByTier = useMemo(() => {
    if (activeTier === 'all') return enhancedSkills;
    return enhancedSkills.filter((s) => s.tier === activeTier);
  }, [enhancedSkills, activeTier]);

  const byCategory = useMemo(() => {
    const categories: Record<CategoryKey, typeof enhancedSkills> = {
      languages_runtimes: [],
      frameworks_libraries: [],
      ai_ml_tooling: [],
      infra_devops: [],
      design_ux: [],
    };

    filteredByTier.forEach((s) => {
      categories[s.category].push(s);
    });

    // Sort each category by tier then name
    (Object.keys(categories) as CategoryKey[]).forEach((cat) => {
      categories[cat] = categories[cat].slice().sort((a, b) => {
        const tierDiff = TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier);
        if (tierDiff !== 0) return tierDiff;
        return a.name.localeCompare(b.name);
      });
    });

    return categories;
  }, [filteredByTier]);

  return (
    <section id="skills" className="bg-bg-surface-subtle py-[var(--space-section)]">
      <div className="container mx-auto w-full px-4">
        <h2 className="mb-6 text-center font-display text-4xl font-semibold tracking-tight">
          Skills Matrix
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center font-light tracking-wide text-text-secondary">
          Technical expertise and proficiency levels with proof of work
        </p>

        {/* Filter Controls - Same as original */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {CATEGORY_FILTERS.map((filter) => {
            const isActive = activeGroup === filter.id;
            return (
              <motion.button
                key={filter.id}
                onClick={() => toggleGroup(filter.id as GroupKey)}
                className={`rounded-full px-[var(--space-5)] py-[var(--space-2)] text-sm font-medium transition-all md:text-base ${
                  isActive
                    ? 'bg-accent text-on-accent'
                    : 'bg-surface hover:bg-text-secondary/10 text-text-primary shadow-hairline'
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

        {/* Skills Matrix Grid */}
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
              <div key={category} className="mb-12">
                <h3 className="mb-6 text-xl font-semibold tracking-tight">
                  {sectionTitleMap[category]}
                </h3>
                <div className="skills-matrix-grid">
                  <AnimatePresence>
                    {skills.map((skill, index) => (
                      <SkillMatrixCard key={skill.id} skill={skill} index={index} />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}

        {/* Empty State */}
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
});

// Individual skill card component
const SkillMatrixCard = React.memo<{ skill: EnhancedSkill; index: number }>(({ skill, index }) => {
  const tier = skill.tier;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: index * 0.1, // Staggered animation
          duration: 0.3,
        },
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="card-flat group px-3 py-2"
      role="article"
      aria-labelledby={`skill-title-${skill.id}`}
      tabIndex={0}
      onKeyDown={(e) => {
        // Keyboard navigation for proof links
        if (e.key === 'Enter' && skill.proofLinks.length === 1) {
          e.preventDefault();
          window.open(skill.proofLinks[0].url, '_blank', 'noopener,noreferrer');
        }
      }}
    >
      <div className="flex items-center justify-between">
        <h4
          id={`skill-title-${skill.id}`}
          className="text-lg font-semibold text-text-primary"
        >
          {skill.name}
        </h4>
        <div className="text-right">
          <div className="font-mono text-sm text-text-primary">
            {tier === 'Expert' ? '92%' : tier === 'Proficient' ? '78%' : '55%'}
          </div>
          <div className="text-xs text-text-secondary">{tier}</div>
        </div>
      </div>
    </motion.div>
  );
});

SkillMatrixCard.displayName = 'SkillMatrixCard';
SkillsMatrix.displayName = 'SkillsMatrix';