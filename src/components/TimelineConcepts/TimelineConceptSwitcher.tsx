import React, { useState } from 'react';
import { MinimalTimeline } from './MinimalTimeline';
import { ZigzagTimeline } from './ZigzagTimeline';
import { YearAccordionTimeline } from './YearAccordionTimeline';
import { GlassTimeline } from './GlassTimeline';

type Variant = 'minimal' | 'zigzag' | 'accordion' | 'glass';

const variantMap: Record<Variant, React.ReactNode> = {
  minimal: <MinimalTimeline />,
  zigzag: <ZigzagTimeline />,
  accordion: <YearAccordionTimeline />,
  glass: <GlassTimeline />,
};

export const TimelineConceptSwitcher: React.FC = () => {
  const [variant, setVariant] = useState<Variant>('minimal');
  return (
    <section id="timeline-concepts" className="py-[var(--space-section)]">
      <h2 className="mb-6 text-center font-display text-3xl font-semibold tracking-tight">
        Timeline Concepts
      </h2>
      <div className="mb-8 flex justify-center">
        <label className="sr-only" htmlFor="timeline-variant">
          Select timeline variant
        </label>
        <select
          id="timeline-variant"
          className="rounded border border-text-secondary/20 bg-bg-surface px-3 py-2"
          value={variant}
          onChange={(e) => setVariant(e.target.value as Variant)}
        >
          <option value="minimal">Minimal</option>
          <option value="zigzag">Zigzag</option>
          <option value="accordion">Year Accordion</option>
          <option value="glass">Glassmorphic</option>
        </select>
      </div>
      <div className="mx-auto max-w-3xl">{variantMap[variant]}</div>
    </section>
  );
};
