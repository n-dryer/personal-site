import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

type ErrorFallbackProps = {
  /** Error message to display */
  message?: string;
  /** Optional retry function */
  onRetry?: () => void;
  /** Component or section name that failed */
  componentName?: string;
  /** Additional CSS classes */
  className?: string;
};

/**
 * ErrorFallback component for consistent error handling across the application.
 * Used by Error Boundaries to provide graceful degradation.
 */
export const ErrorFallback = React.memo<ErrorFallbackProps>(
  ({ message = 'Something went wrong', onRetry, componentName = 'section', className = '' }) => {
    const handleRetry = () => {
      if (onRetry) {
        onRetry();
      } else {
        window.location.reload();
      }
    };

    return (
      <div className={`py-12 text-center ${className}`}>
        <div className="mx-auto flex max-w-md flex-col items-center space-y-4">
          <AlertTriangle className="h-12 w-12 text-red-500" aria-hidden="true" />

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-text-primary">
              {componentName} temporarily unavailable
            </h3>
            <p className="text-sm text-text-secondary">{message}</p>
          </div>

          <button
            onClick={handleRetry}
            className="hover:bg-accent/90 bg-accent text-on-accent focus-visible:ring-accent inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ minHeight: '44px' }}
            aria-label={`Retry loading ${componentName}`}
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            {onRetry ? 'Try Again' : 'Refresh Page'}
          </button>
        </div>
      </div>
    );
  },
);

ErrorFallback.displayName = 'ErrorFallback';
