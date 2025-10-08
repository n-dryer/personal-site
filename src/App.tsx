// Updated imports to use barrel exports
import { lazy, Suspense, useState } from 'react';
import {
  CommandMenu,
  FloatingCommandButton,
  Footer,
  Header,
  ScrollDownButton,
  GradientBackground,
} from './components';
// Import the useTheme hook
import { useCommandMenu, useTheme } from './hooks'; // Assuming useTheme is in './hooks'

import { ErrorBoundary } from 'react-error-boundary';
import { Layout } from './layouts/Layout';
import { experienceData } from 'content/experience';
import { skillsData } from 'content/skills';
import { userData } from 'content/user';

// Lazy load major components for code splitting
const TimelineMetro = lazy(() =>
  import('./components/Timeline/TimelineMetro').then((m) => ({ default: m.TimelineMetro })),
);
const SkillsMatrix = lazy(() =>
  import('./components/Skills/SkillsMatrix').then((m) => ({ default: m.SkillsMatrix })),
);

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
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientBackground darkMode={darkMode} />
      <div className="absolute inset-0 -z-10 bg-resume-overlay" />

      <Layout>
        <Header
          userData={userData}
          toggleCommandMenu={toggleCommandMenuFromHook}
          darkMode={darkMode} // Pass darkMode from useTheme hook
          toggleTheme={toggleTheme} // Pass toggleTheme from useTheme hook
        />
        <main>
          <ErrorBoundary
            fallback={
              <div className="text-red-500">Something went wrong with the Skills section.</div>
            }
          >
            <Suspense
              fallback={
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                  <div className="bg-resume-surface-secondary h-96 animate-pulse rounded-lg opacity-50" />
                </div>
              }
            >
              <SkillsMatrix
                skillsData={skillsData}
                activeSkill={activeSkill}
                setActiveSkill={setActiveSkill}
              />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary
            fallback={<div className="text-red-500">Something went wrong with the Timeline.</div>}
          >
            <Suspense
              fallback={
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                  <div className="bg-resume-surface-secondary h-96 animate-pulse rounded-lg opacity-50" />
                </div>
              }
            >
              <TimelineMetro experienceData={experienceData} activeSkill={activeSkill} />
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer userData={userData} />
        <CommandMenu isOpen={isCommandMenuOpenFromHook} setIsOpen={setIsCommandMenuOpenFromHook} />
        <ScrollDownButton />
        <div className="hidden md:block">
          <FloatingCommandButton
            toggleCommandMenu={toggleCommandMenuFromHook}
            isCommandMenuOpen={isCommandMenuOpenFromHook}
          />
        </div>
      </Layout>
    </main>
  );
};

export default App;
