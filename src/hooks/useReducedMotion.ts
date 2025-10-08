export function useReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
