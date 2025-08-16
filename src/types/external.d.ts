declare module 'focus-trap-react' {
  import * as React from 'react';

  export interface FocusTrapOptions {
    initialFocus?: HTMLElement | (() => HTMLElement | undefined) | string;
    escapeDeactivates?: boolean | ((e: KeyboardEvent) => boolean);
    clickOutsideDeactivates?: boolean | ((e: MouseEvent) => boolean);
    onActivate?: () => void;
    onDeactivate?: () => void;
    // Allow unknown additional options without using `any` to satisfy strict typing
    [key: string]: unknown;
  }

  export interface FocusTrapProps {
    active?: boolean;
    focusTrapOptions?: FocusTrapOptions;
    children?: React.ReactNode;
  }

  const FocusTrap: React.ComponentType<FocusTrapProps>;
  export default FocusTrap;
}
