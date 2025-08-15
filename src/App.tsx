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
  CommandMenu
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
  const { isOpen: isCommandMenuOpenFromHook, setIsOpen: setIsCommandMenuOpenFromHook, toggle: toggleCommandMenuFromHook } = useCommandMenu();

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
          fallback={
            <div className='text-red-500'>
              Something went wrong with the Timeline.
            </div>
          }
        >
          <Timeline experienceData={experienceData} />
        </ErrorBoundary>
        <ErrorBoundary
          fallback={
            <div className='text-red-500'>
              Something went wrong with the Skills section.
            </div>
          }
        >
          <div className='container mx-auto px-4'>
            <Skills skillsData={skillsData} />
          </div>
        </ErrorBoundary>
      </main>
      <Footer userData={userData} />
      <CommandMenu
        isOpen={isCommandMenuOpenFromHook}
        setIsOpen={setIsCommandMenuOpenFromHook}
      />
      <ScrollDownButton />
      <FloatingCommandButton toggleCommandMenu={toggleCommandMenuFromHook} />
    </Layout>
  );
};

export default App;
