import { useState, useEffect, useCallback } from 'react';

/**
 * Describes the return value of the `useCommandMenu` hook.
 */
interface UseCommandMenuReturn {
  /** Boolean indicating whether the command menu is currently open. */
  isOpen: boolean;
  /** Function to directly set the open state of the command menu. */
  setIsOpen: (open: boolean) => void;
  /** Function to toggle the open state of the command menu. */
  toggle: () => void;
}

/**
 * Custom hook for managing the state and keyboard shortcuts (Cmd+K / Ctrl+K) of a command menu.
 * It provides the current visibility state of the menu, a function to set the state directly,
 * and a function to toggle the state. It also handles the global keydown listener for the shortcut.
 *
 * @returns {UseCommandMenuReturn} An object containing the menu state and state management functions.
 * @see UseCommandMenuReturn
 */
export const useCommandMenu = (): UseCommandMenuReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Toggle function - Memoized to prevent infinite re-renders
  // PERFORMANCE FIX: Removed isOpen dependency that was causing infinite re-renders
  const toggle = useCallback((): void => {
    setIsOpen((prev) => !prev);
  }, []);

  // Keyboard shortcut for command menu (Cmd+K / Ctrl+K)
  // PERFORMANCE FIX: Removed isOpen from dependency array to prevent infinite re-renders
  // Using functional state update (prev => !prev) instead of direct state access
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle]); // Only depend on toggle function, not isOpen state

  return {
    isOpen,
    setIsOpen,
    toggle,
  };
};
