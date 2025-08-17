import React from 'react';

export default function LoadingIndicator() {
  return (
    <div className="mt-6 flex items-center justify-center space-x-2 animate-pulse">
      <span className="text-black font-medium text-lg">🐾 Pawli is thinking</span>
      <div className="w-4 h-4 bg-gray-800 rounded-full animate-bounce"></div>
    </div>
  );
}
