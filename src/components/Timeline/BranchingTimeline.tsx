import React from 'react';

export const BranchingTimeline: React.FC = () => {
  return (
    <section className="px-4 py-[var(--space-section)]">
      <div className="container mx-auto rounded-lg border border-white/10 bg-bg-surface p-6 text-text-secondary">
        <h2 className="mb-2 text-xl font-semibold text-text-primary">
          Branching Timeline (Prototype Placeholder)
        </h2>
        <p>
          This is a placeholder for an experimental branching timeline view. Use the toggle above to
          explore the standard tabbed timeline or the new carousel prototype.
        </p>
      </div>
    </section>
  );
};
