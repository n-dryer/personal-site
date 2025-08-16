import React, { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { UserData } from '../../types'; // Adjusted import path

/**
 * Props for the ShipLog component.
 */
type ShipLogProps = {
  /** User data object. Currently unused but kept for future compatibility with a more detailed timeline. */
  userData: UserData;
};

/**
 * ShipLogComponent is intended to display a professional journey or a log of significant events/projects.
 * Currently, it renders a "Coming Soon" message as the interactive timeline feature is under development.
 * It uses framer-motion for animations triggered when the component scrolls into view.
 * This component is memoized for performance, as its re-render depends on the `userData` prop.
 *
 * @param {ShipLogProps} props - The properties passed to the component.
 * @returns {React.ReactElement} The rendered ShipLog section.
 * @see React.memo
 */
const ShipLogComponent = ({ userData: _userData }: ShipLogProps): React.ReactElement => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 15,
      },
    },
  };

  return (
    <section
      ref={ref}
      id="shiplog"
      className="mt-20 bg-bg-primary py-16 text-text-primary md:mt-32"
    >
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Professional Journey</h2>

        <motion.div
          ref={containerRef}
          className="flex flex-col items-center justify-center py-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div
            className="bg-surface max-w-md rounded-lg p-8 text-center shadow-sm"
            variants={itemVariants}
          >
            <h3 className="mb-4 text-xl font-bold text-accent">Coming Soon</h3>
            <p className="text-text-secondary">
              The professional journey timeline is currently being updated with a new interactive
              format. Check back soon to explore my career path in detail.
            </p>
            <div className="mt-6">
              <div className="inline-block h-1 w-10 rounded-full bg-accent"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * Memoized ShipLog component.
 * @see ShipLogComponent
 */
export const ShipLog = React.memo(ShipLogComponent);
