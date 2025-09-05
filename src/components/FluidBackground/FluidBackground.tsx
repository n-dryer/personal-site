import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './FluidBackground.css';

/**
 * FluidBackground Component
 *
 * Renders a static, multi-layered background with a gradient and grain texture.
 * It provides a fallback for users with reduced motion preferences.
 */
const FluidBackgroundComponent: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fluid-background" aria-hidden="true">
      <div className="fluid-base-layer" style={{ background: 'var(--bg-primary-gradient)' }} />
      <div
        className="fluid-grain-layer"
        style={{
          backgroundImage: 'var(--bg-grain)',
          opacity: shouldReduceMotion ? 0.08 : 0.18,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

export const FluidBackground = React.memo(FluidBackgroundComponent);
