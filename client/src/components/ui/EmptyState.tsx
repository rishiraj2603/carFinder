import React from 'react';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message = 'No cars found matching your criteria.' }) => {
  return (
    <div className="text-center py-8">
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default EmptyState; 