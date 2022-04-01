import React from 'react';

export default function ProductCard({ children }) {
  return (
    <div className="flex flex-col space-y-2 max-w-2xl mx-auto mt-8 p-4 bg-gray-200 rounded-lg shadow-md">
      {children}
    </div>
  );
}
