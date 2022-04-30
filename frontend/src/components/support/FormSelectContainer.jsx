import React from 'react';

export default function FormSelectContainer({ children }) {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-8 lg:space-y-0 lg:justify-between mt-4 mb-8">
      {children}
    </div>
  );
}
