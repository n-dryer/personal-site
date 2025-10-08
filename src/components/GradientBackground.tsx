import { GrainGradient } from '@paper-design/shaders-react';

type GradientBackgroundProps = {
  darkMode: boolean;
};

const DARK_PALETTE = {
  colorBack: 'hsl(220, 20%, 8%)',
  colors: ['hsl(210, 100%, 45%)', 'hsl(200, 100%, 50%)', 'hsl(220, 90%, 35%)'],
  intensity: 0.6,
};

const LIGHT_PALETTE = {
  colorBack: 'hsl(212, 78%, 22%)',
  colors: ['hsl(204, 88%, 52%)', 'hsl(192, 82%, 56%)', 'hsl(232, 70%, 52%)'],
  intensity: 0.75,
};

export function GradientBackground({ darkMode }: GradientBackgroundProps) {
  const palette = darkMode ? DARK_PALETTE : LIGHT_PALETTE;

  return (
    <div className="absolute inset-0 -z-10">
      <GrainGradient
        style={{ height: '100%', width: '100%' }}
        colorBack={palette.colorBack}
        softness={0.85}
        intensity={palette.intensity}
        noise={0.25}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={1}
        colors={palette.colors}
      />
    </div>
  );
}
