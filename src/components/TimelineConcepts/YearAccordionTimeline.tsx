import React, { useState } from 'react';

interface TimelineEvent {
  date: string; // YYYY-MM
  title: string;
  description: string;
}

const events: TimelineEvent[] = [
  {
    date: '2024-02',
    title: 'Promotion to Lead',
    description: 'Led a new product launch and managed a small team.',
  },
  {
    date: '2023-09',
    title: 'Joined Company Y',
    description: 'Started as a front-end engineer.',
  },
  {
    date: '2023-01',
    title: 'Bootcamp Mentor',
    description: 'Mentored 30+ students in web development.',
  },
];

const grouped = events.reduce<Record<string, TimelineEvent[]>>((acc, ev) => {
  const year = ev.date.slice(0, 4);
  (acc[year] ??= []).push(ev);
  return acc;
}, {});

export const YearAccordionTimeline: React.FC = () => {
  const [openYear, setOpenYear] = useState<string | null>(null);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
  return (
    <div className="mx-auto max-w-md">
      {years.map((year) => (
        <div key={year} className="mb-4 rounded border border-text-secondary/20">
          <button
            className="flex w-full items-center justify-between bg-bg-surface px-4 py-2 font-medium"
            onClick={() => setOpenYear(openYear === year ? null : year)}
          >
            {year}
            <span>{openYear === year ? '-' : '+'}</span>
          </button>
          {openYear === year && (
            <ul className="space-y-2 px-4 py-2">
              {[...grouped[year]]
                .sort((a, b) => (a.date > b.date ? -1 : 1))
                .map((ev) => (
                  <li key={ev.date}>
                    <time className="block text-xs text-text-secondary">{ev.date}</time>
                    <h4 className="font-semibold">{ev.title}</h4>
                    <p className="text-sm text-text-secondary">{ev.description}</p>
                  </li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};
