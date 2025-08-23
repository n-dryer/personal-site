import React, { useState } from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

const events: TimelineEvent[] = [
  {
    date: '2024-08',
    title: 'Joined StartUp X',
    description: 'Full-stack development with React, Node.js, and cloud functions.',
  },
  {
    date: '2022-05',
    title: 'Graduated University',
    description: 'B.S. in Computer Science.',
  },
];

export const MinimalTimeline: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="relative ml-4 border-l border-text-secondary/20">
      {events.map((ev, idx) => (
        <div
          key={ev.date}
          className="relative mb-4 cursor-pointer pl-6"
          onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
        >
          <span className="absolute -left-[0.41rem] top-2 h-3 w-3 rounded-full border border-bg-surface bg-accent" />
          <time className="block text-xs text-text-secondary">{ev.date}</time>
          <h3 className="font-medium">{ev.title}</h3>
          {openIdx === idx && <p className="mt-1 text-sm text-text-secondary">{ev.description}</p>}
        </div>
      ))}
    </div>
  );
};
