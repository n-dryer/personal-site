import React, { useState } from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  media?: string;
}

const events: TimelineEvent[] = [
  {
    date: '2025-01',
    title: 'Launched Portfolio',
    description: 'Showcased projects with 3D visuals.',
    media: 'screenshot.png',
  },
  {
    date: '2024-06',
    title: 'Open Source Release',
    description: 'Published a React library.',
  },
];

export const GlassTimeline: React.FC = () => {
  const [active, setActive] = useState<TimelineEvent | null>(null);
  return (
    <div className="relative mx-auto max-w-md pl-6">
      <div className="absolute left-2 top-0 h-full w-px bg-white/30" />
      {events.map((ev) => (
        <div
          key={ev.date}
          className="mb-6 cursor-pointer rounded-xl bg-white/20 p-4 shadow-sm backdrop-blur"
          onClick={() => setActive(ev)}
        >
          <time className="block text-xs">{ev.date}</time>
          <h3 className="font-semibold">{ev.title}</h3>
        </div>
      ))}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="max-w-md rounded-xl bg-bg-surface p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-2 text-xl font-semibold">{active.title}</h2>
            <p className="mb-4 text-sm text-text-secondary">{active.description}</p>
            {active.media && <img src={active.media} alt="" className="rounded" />}
            <button
              className="mt-4 rounded bg-accent px-4 py-2 text-on-accent"
              onClick={() => setActive(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
