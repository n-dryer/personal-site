import React from 'react';

/**
 * Props for the Layout component.
 */
type LayoutProps = {
  /** The child elements to be rendered within the layout. */
  children: React.ReactNode;
  /** Optional additional CSS class names to apply to the layout container. */
  className?: string;
};

/**
 * Main layout component that wraps the entire application.
 * It provides a consistent structure, including a full-height container
 * with background and text colors that respond to theme changes.
 * This component is memoized for performance optimization.
 *
 * Note: The animated GradientBackground is rendered in App.tsx to avoid duplication.
 *
 * @param {LayoutProps} props - The properties passed to the component.
 * @returns {React.ReactElement} The rendered layout container with children.
 * @see React.memo
 */
const LayoutComponent = ({ children, className = '' }: LayoutProps): React.ReactElement => {
  return (
    <div
      className={`relative min-h-screen font-sans text-resume-text-primary transition-colors duration-300 ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const Layout = React.memo(LayoutComponent);

export default Layout;
