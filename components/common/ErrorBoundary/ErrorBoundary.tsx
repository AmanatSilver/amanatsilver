import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
          <div className="text-center px-6">
            <h1 className="text-3xl font-light serif mb-4">Something went wrong</h1>
            <p className="text-stone-600 mb-8">We apologize for the inconvenience. Please refresh the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-stone-900 text-white px-8 py-3 text-xs uppercase tracking-[0.3em] hover:bg-stone-800 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
