import React from 'react';
import { GrainGradient } from '@paper-design/shaders-react';
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
      <div className="fluid-overlay-layer" />
      {!shouldReduceMotion && (
        <GrainGradient
          style={{ height: '100%', width: '100%' }}
          colorBack="hsl(220, 20%, 8%)"
          softness={0.85}
          intensity={0.6}
          noise={0}
          shape="corners"
          offsetX={0}
          offsetY={0}
          scale={1}
          rotation={0}
          speed={1}
          colors={[
            'hsl(210, 100%, 45%)',
            'hsl(200, 100%, 50%)',
            'hsl(220, 90%, 35%)',
          ]}
        />
      )}
    </div>
  );
};

export const FluidBackground = React.memo(FluidBackgroundComponent);
