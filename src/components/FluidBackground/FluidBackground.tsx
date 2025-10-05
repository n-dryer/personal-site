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
      <div
        className="fluid-base-layer"
        style={{
          background:
            'radial-gradient(ellipse at top left, hsl(210, 100%, 45%) 0%, transparent 50%), radial-gradient(ellipse at top right, hsl(200, 100%, 50%) 0%, transparent 50%), radial-gradient(ellipse at bottom, hsl(220, 90%, 35%) 0%, transparent 50%), hsl(220, 20%, 8%)',
          backgroundSize: '200% 200%',
        }}
      />
      <div
        className="fluid-grain-layer"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 600 600\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noiseFilter\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.85\\' numOctaves=\\'6\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noiseFilter)\\'/%3E%3C/svg%3E')",
          opacity: shouldReduceMotion ? 0.06 : 0.14,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

export const FluidBackground = React.memo(FluidBackgroundComponent);
