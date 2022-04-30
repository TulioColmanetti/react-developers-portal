import React from 'react';

export default function FormCard({ children }) {
  return (
    <form className="flex flex-col w-full py-4 px-8 mt-8 max-w-2xl lg:max-w-4xl bg-gray-200 rounded-lg shadow-md">
      {children}
    </form>
  );
}
