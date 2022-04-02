import React from 'react';

export default function ProductHeader({ children }) {
  return <div className="flex flex-col sm:flex-row sm:space-x-4 items-center mx-auto mb-2">{children}</div>;
}
