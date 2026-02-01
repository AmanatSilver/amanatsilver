import React from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  message, 
  actionLabel, 
  onAction,
  icon
}) => (
  <div className="text-center py-20">
    {icon && <div className="mb-6 flex justify-center opacity-30">{icon}</div>}
    <h3 className="text-2xl font-light serif mb-3">{title}</h3>
    <p className="text-stone-600 mb-8 max-w-md mx-auto">{message}</p>
    {actionLabel && onAction && (
      <button 
        onClick={onAction}
        className="bg-stone-900 text-white px-8 py-3 text-xs uppercase tracking-[0.3em] hover:bg-stone-800 transition-colors"
      >
        {actionLabel}
      </button>
    )}
  </div>
);
