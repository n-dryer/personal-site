export const TIER_ORDER = ['Expert', 'Proficient', 'Familiar'] as const;

export const TIER_META: Record<(typeof TIER_ORDER)[number], { color: string; ariaLabel: string }> =
  {
    Expert: { color: 'var(--accent)', ariaLabel: 'Expert level' },
    Proficient: { color: 'var(--text-primary)', ariaLabel: 'Proficient level' },
    Familiar: { color: 'var(--text-secondary)', ariaLabel: 'Familiar level' },
  };

export type CategoryKey =
  | 'languages_runtimes'
  | 'frameworks_libraries'
  | 'ai_ml_tooling'
  | 'infra_devops'
  | 'design_ux';

export const CATEGORY_FILTERS: Array<{ id: 'all' | CategoryKey; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'languages_runtimes', label: 'Languages & Runtimes' },
  { id: 'frameworks_libraries', label: 'Frameworks & Libraries' },
  { id: 'ai_ml_tooling', label: 'AI/ML & Tooling' },
  { id: 'infra_devops', label: 'Infra & DevOps' },
  { id: 'design_ux', label: 'Design & UX' },
];
