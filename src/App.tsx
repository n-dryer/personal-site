import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Updated imports to use barrel exports
import {
  Header,
  Footer,
  ScrollDownButton,
  FloatingCommandButton,
  Timeline,
  Skills,
  CommandMenu,
  TimelineCarousel,
} from './components';

// Import the useTheme hook
import { useTheme, useCommandMenu } from './hooks'; // Assuming useTheme is in './hooks'

import { experienceData } from 'content/experience';
import { skillsData } from 'content/skills';
import { userData } from 'content/user';
import { Layout } from './layouts/Layout';

/**
 * Main application component for the personal portfolio.
 * It orchestrates the overall layout, manages global state such as theme and command menu visibility,
 * and renders the primary sections of the site including Header, Timeline, Skills, and Footer.
 * This component also integrates error boundaries for robust rendering of child sections.
 *
 * @returns {JSX.Element} The fully rendered application structure.
 */
const App = () => {
  const { darkMode, toggleTheme } = useTheme(); // Use the theme hook
  const {
    isOpen: isCommandMenuOpenFromHook,
    setIsOpen: setIsCommandMenuOpenFromHook,
    toggle: toggleCommandMenuFromHook,
  } = useCommandMenu();

  // Simple demo toggle between tabbed Timeline and Carousel version
  const [timelineView, setTimelineView] = React.useState<'tabs' | 'carousel'>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('timeline') === 'carousel' ? 'carousel' : 'tabs';
  });

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('timeline', timelineView);
    const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    window.history.replaceState(null, '', newUrl);
  }, [timelineView]);

  return (
    <Layout>
      <Header
        userData={userData}
        toggleCommandMenu={toggleCommandMenuFromHook}
        darkMode={darkMode} // Pass darkMode from useTheme hook
        toggleTheme={toggleTheme} // Pass toggleTheme from useTheme hook
      />
      <main>
        <ErrorBoundary
          fallback={<div className="text-red-500">Something went wrong with the Timeline.</div>}
        >
          <div className="container mx-auto mb-4 flex items-center justify-center gap-2 px-4">
            <div className="inline-flex overflow-hidden rounded-lg border border-white/10">
              <button
                type="button"
                className={`px-3 py-2 text-sm ${
                  timelineView === 'tabs' ? 'bg-accent text-on-accent' : 'bg-bg-surface text-text-primary'
                }`}
                onClick={() => setTimelineView('tabs')}
                aria-pressed={timelineView === 'tabs'}
              >
                Tabs
              </button>
              <button
                type="button"
                className={`px-3 py-2 text-sm ${
                  timelineView === 'carousel'
                    ? 'bg-accent text-on-accent'
                    : 'bg-bg-surface text-text-primary'
                }`}
                onClick={() => setTimelineView('carousel')}
                aria-pressed={timelineView === 'carousel'}
              >
                Carousel
              </button>
            </div>
          </div>
          {timelineView === 'carousel' ? (
            <TimelineCarousel experienceData={experienceData} />
          ) : (
            <Timeline experienceData={experienceData} />
          )}
        </ErrorBoundary>
        <ErrorBoundary
          fallback={
            <div className="text-red-500">Something went wrong with the Skills section.</div>
          }
        >
          <div className="container mx-auto px-4">
            <Skills skillsData={skillsData} />
          </div>
        </ErrorBoundary>
      </main>
      <Footer userData={userData} />
      <CommandMenu isOpen={isCommandMenuOpenFromHook} setIsOpen={setIsCommandMenuOpenFromHook} />
      <ScrollDownButton />
      <FloatingCommandButton toggleCommandMenu={toggleCommandMenuFromHook} />
    </Layout>
  );
};

export default App;
