import React from 'react';
import './FluidBackground.css';

/**
 * FluidBackground Component
 *
 * Renders a static, multi-layered background with a gradient and grain texture.
 * It provides a fallback for users with reduced motion preferences.
 */
const FluidBackgroundComponent: React.FC = () => {
  return (
    <div className="fluid-background" aria-hidden="true">
      <div
        className="fluid-base-layer"
        style={{
          background:
            'radial-gradient(ellipse at top left, hsl(210, 100%, 45%) 0%, transparent 50%), radial-gradient(ellipse at top right, hsl(200, 100%, 50%) 0%, transparent 50%), radial-gradient(ellipse at bottom, hsl(220, 90%, 35%) 0%, transparent 50%), hsl(220, 20%, 8%)',
        }}
      />
    </div>
  );
};

export const FluidBackground = React.memo(FluidBackgroundComponent);
