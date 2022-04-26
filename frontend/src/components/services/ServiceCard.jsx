import React from 'react';

export default function ServiceCard({ children }) {
  return (
    <div className="flex flex-col space-y-2 max-w-2xl lg:max-w-4xl mx-auto mt-8 p-4 bg-gray-200 rounded-lg shadow-md">
      {children}
    </div>
  );
}
