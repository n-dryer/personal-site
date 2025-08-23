import React from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const events: TimelineEvent[] = [
  {
    date: '2024',
    title: 'Hackathon Winner',
    description: 'Built an AI tool in 24 hours and won the grand prize.',
    icon: '🏆',
  },
  {
    date: '2023',
    title: 'Conference Speaker',
    description: 'Presented modern UI trends at JSConf.',
    icon: '🎤',
  },
];

export const ZigzagTimeline: React.FC = () => (
  <div className="relative mx-auto max-w-2xl before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:-translate-x-1/2 before:bg-text-secondary/20">
    {events.map((ev, idx) => (
      <div
        key={ev.date}
        className={`mb-8 flex items-start ${idx % 2 ? 'flex-row-reverse text-right' : ''}`}
      >
        <div className="flex-1 group px-4">
          <time className="text-xs text-text-secondary">{ev.date}</time>
          <h3 className="font-semibold">{ev.title}</h3>
          <p className="mt-1 hidden text-sm text-text-secondary group-hover:block">
            {ev.description}
          </p>
        </div>
        <div className="mx-4 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xl">
          {ev.icon}
        </div>
      </div>
    ))}
  </div>
);
